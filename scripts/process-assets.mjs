import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = (...parts) => path.join(root, "source-art", ...parts);
const derived = (name) => path.join(root, "derived-art", "clean-plates", name);
const output = (...parts) => path.join(root, "public", "assets", ...parts);

const desktopPowerupFrames = [
  "kintaro-powerup-desktop-00.jpg",
  "kintaro-powerup-desktop-01.jpg",
  "kintaro-powerup-desktop-02.jpg",
  "kintaro-powerup-desktop-03.jpg",
  "kintaro-powerup-desktop-04.jpg",
  "kintaro-powerup-desktop-05.jpg",
  "kintaro-powerup-desktop-06.jpg",
  "kintaro-powerup-desktop-07.jpg",
  "kintaro-powerup-desktop-08-surge.jpg",
];

async function ensureDirectories() {
  await Promise.all([
    mkdir(output("backgrounds", "threshold"), { recursive: true }),
    mkdir(output("relics"), { recursive: true }),
    mkdir(output("sprites", "characters"), { recursive: true }),
    mkdir(output("sprites", "characters", "kintaro-powerup-desktop"), { recursive: true }),
  ]);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(edgeStart, edgeEnd, value) {
  const position = clamp((value - edgeStart) / (edgeEnd - edgeStart), 0, 1);
  return position * position * (3 - 2 * position);
}

async function decodeDesktopPowerupFrame(sourceName) {
  const input = sharp(source("kintaro", "desktop-powerup", sourceName)).removeAlpha();
  const { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
  const corners = [
    0,
    (info.width - 1) * info.channels,
    (info.height - 1) * info.width * info.channels,
    (info.width * info.height - 1) * info.channels,
  ];
  const matte = corners.reduce(
    (total, offset) => ({
      red: total.red + data[offset],
      green: total.green + data[offset + 1],
      blue: total.blue + data[offset + 2],
    }),
    { red: 0, green: 0, blue: 0 },
  );
  matte.red /= corners.length;
  matte.green /= corners.length;
  matte.blue /= corners.length;

  const rgba = Buffer.alloc(info.width * info.height * 4);
  const bounds = {
    left: info.width,
    top: info.height,
    right: 0,
    bottom: 0,
  };

  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    const inputOffset = pixel * info.channels;
    const outputOffset = pixel * 4;
    const red = data[inputOffset];
    const green = data[inputOffset + 1];
    const blue = data[inputOffset + 2];
    const distance = Math.sqrt(
      (red - matte.red) ** 2 * 1.25
      + (green - matte.green) ** 2
      + (blue - matte.blue) ** 2,
    );
    const distanceAlpha = smoothstep(10, 68, distance);
    const cyanExcess = Math.min(green, blue) - red;
    const cyanSuppression = 1 - smoothstep(10, 52, cyanExcess);
    const alphaUnit = distanceAlpha * cyanSuppression;
    const alpha = alphaUnit < 0.015 ? 0 : alphaUnit > 0.985 ? 255 : Math.round(alphaUnit * 255);

    if (alpha > 0) {
      const safeAlpha = Math.max(alphaUnit, 0.18);
      const unmattedRed = clamp(Math.round((red - matte.red * (1 - safeAlpha)) / safeAlpha), 0, 255);
      const unmattedGreen = clamp(Math.round((green - matte.green * (1 - safeAlpha)) / safeAlpha), 0, 255);
      const unmattedBlue = clamp(Math.round((blue - matte.blue * (1 - safeAlpha)) / safeAlpha), 0, 255);
      const edgeChannelCap = unmattedRed + 16 + alphaUnit * 48;
      rgba[outputOffset] = unmattedRed;
      rgba[outputOffset + 1] = Math.min(unmattedGreen, edgeChannelCap);
      rgba[outputOffset + 2] = Math.min(unmattedBlue, edgeChannelCap);
      rgba[outputOffset + 3] = alpha;

      if (alpha > 18) {
        const x = pixel % info.width;
        const y = Math.floor(pixel / info.width);
        bounds.left = Math.min(bounds.left, x);
        bounds.top = Math.min(bounds.top, y);
        bounds.right = Math.max(bounds.right, x);
        bounds.bottom = Math.max(bounds.bottom, y);
      }
    }
  }

  return {
    sourceName,
    rgba,
    width: info.width,
    height: info.height,
    bounds,
  };
}

async function buildDesktopPowerupSequence() {
  const decodedFrames = await Promise.all(desktopPowerupFrames.map(decodeDesktopPowerupFrame));
  const union = decodedFrames.reduce(
    (bounds, frame) => ({
      left: Math.min(bounds.left, frame.bounds.left),
      top: Math.min(bounds.top, frame.bounds.top),
      right: Math.max(bounds.right, frame.bounds.right),
      bottom: Math.max(bounds.bottom, frame.bounds.bottom),
    }),
    {
      left: decodedFrames[0].width,
      top: decodedFrames[0].height,
      right: 0,
      bottom: 0,
    },
  );
  const padding = 18;
  const crop = {
    left: Math.max(0, union.left - padding),
    top: Math.max(0, union.top - padding),
    width: Math.min(decodedFrames[0].width, union.right + padding + 1) - Math.max(0, union.left - padding),
    height: Math.min(decodedFrames[0].height, union.bottom + padding + 1) - Math.max(0, union.top - padding),
  };

  await Promise.all(decodedFrames.map(async (frame, index) => {
    const filename = `kintaro-powerup-desktop-${String(index).padStart(2, "0")}.webp`;
    await sharp(frame.rgba, {
      raw: { width: frame.width, height: frame.height, channels: 4 },
    })
      .extract(crop)
      .webp({ quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true })
      .toFile(output("sprites", "characters", "kintaro-powerup-desktop", filename));
  }));

  await writeFile(
    output("sprites", "characters", "kintaro-powerup-desktop", "sequence.json"),
    `${JSON.stringify({
      schemaVersion: 1,
      sourceCanvas: { width: decodedFrames[0].width, height: decodedFrames[0].height },
      sharedCrop: crop,
      frameCount: decodedFrames.length,
      frames: decodedFrames.map((frame, index) => ({
        index,
        source: frame.sourceName,
        runtime: `kintaro-powerup-desktop-${String(index).padStart(2, "0")}.webp`,
        role: index === 8 ? "optional-maximum-surge" : index === 7 ? "garment-follow-through" : "powerup",
      })),
    }, null, 2)}\n`,
  );
}

async function responsiveIllustration({
  sourceName,
  directory,
  stem,
  widths,
  position = "centre",
}) {
  for (const width of widths) {
    const base = sharp(source(sourceName)).resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
      position,
    });

    await Promise.all([
      base
        .clone()
        .webp({ quality: 82, effort: 5, smartSubsample: true })
        .toFile(output(directory, `${stem}-${width}.webp`)),
      base
        .clone()
        .avif({ quality: 54, effort: 5, chromaSubsampling: "4:4:4" })
        .toFile(output(directory, `${stem}-${width}.avif`)),
    ]);
  }
}

async function responsiveCleanPlate({ sourceName, stem, widths, aspect }) {
  for (const width of widths) {
    const height = Math.round((width * aspect.height) / aspect.width);
    const base = sharp(derived(sourceName)).resize({ width, height, fit: "fill" });

    await Promise.all([
      base
        .clone()
        .webp({ quality: 84, effort: 5, smartSubsample: true })
        .toFile(output("backgrounds", "threshold", `${stem}-${width}.webp`)),
      base
        .clone()
        .avif({ quality: 56, effort: 5, chromaSubsampling: "4:4:4" })
        .toFile(output("backgrounds", "threshold", `${stem}-${width}.avif`)),
    ]);
  }
}

await ensureDirectories();

await Promise.all([
  buildDesktopPowerupSequence(),
  responsiveCleanPlate({
    sourceName: "ashigara-threshold-desktop-actorless-v1.png",
    stem: "ashigara-threshold-desktop-actorless",
    widths: [960, 1440, 1672],
    aspect: { width: 1672, height: 941 },
  }),
  responsiveCleanPlate({
    sourceName: "ashigara-threshold-mobile-actorless-v1.png",
    stem: "ashigara-threshold-mobile-actorless",
    widths: [640, 941],
    aspect: { width: 941, height: 1672 },
  }),
  responsiveIllustration({
    sourceName: "ashigara-threshold-desktop-master.png",
    directory: path.join("backgrounds", "threshold"),
    stem: "ashigara-threshold-desktop",
    widths: [960, 1440, 1672],
  }),
  responsiveIllustration({
    sourceName: "ashigara-threshold-mobile-reference.png",
    directory: path.join("backgrounds", "threshold"),
    stem: "ashigara-threshold-mobile",
    widths: [640, 941],
  }),
  responsiveIllustration({
    sourceName: "hoju-concept-master.png",
    directory: "relics",
    stem: "hoju-concept",
    widths: [480, 720],
  }),
  responsiveIllustration({
    sourceName: "hoju-32bit-state-sheet.png",
    directory: "relics",
    stem: "hoju-state-reference",
    widths: [656, 1312],
  }),
  responsiveIllustration({
    sourceName: "kintaro-character-master.png",
    directory: path.join("sprites", "characters"),
    stem: "kintaro-character",
    widths: [480, 720],
  }),
  responsiveIllustration({
    sourceName: "kintaro-sprite-reference.png",
    directory: path.join("sprites", "characters"),
    stem: "kintaro-sprite-reference",
    widths: [724, 1448],
  }),
]);

await sharp(source("ashigara-threshold-desktop-master.png"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toFile(path.join(root, "public", "og.jpg"));

await sharp(source("hoju-concept-master.png"))
  .resize(96, 96, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(root, "public", "favicon.png"));

console.log("Generated nondestructive AVIF/WebP derivatives and the social preview.");
