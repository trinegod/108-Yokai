import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = path.join(root, "source-art", "martyrs", "martyrs-s-sticker-restored-master.png");
const outputDirectory = path.join(root, "public", "assets", "stickers", "martyrs");

await mkdir(outputDirectory, { recursive: true });

// The owner-directed restoration closes the S's previously cropped lower edge.
// Its generated preview contains a pale checkerboard instead of an alpha channel,
// so recover transparency from the neutral matte before creating runtime files.
const source = await sharp(sourcePath).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(source.info.width * source.info.height * 4);
const matte = 246;

for (let sourceIndex = 0, targetIndex = 0; sourceIndex < source.data.length; sourceIndex += 3, targetIndex += 4) {
  const red = source.data[sourceIndex];
  const green = source.data[sourceIndex + 1];
  const blue = source.data[sourceIndex + 2];
  const darkest = Math.min(red, green, blue);
  let alpha = Math.max(0, Math.min(1, (matte - darkest) / 166));

  if (alpha < 0.04) alpha = 0;
  if (alpha > 0.93) alpha = 1;

  const unmatte = (channel) => alpha === 0
    ? 0
    : Math.max(0, Math.min(255, Math.round((channel - matte * (1 - alpha)) / alpha)));

  rgba[targetIndex] = unmatte(red);
  rgba[targetIndex + 1] = unmatte(green);
  rgba[targetIndex + 2] = unmatte(blue);
  rgba[targetIndex + 3] = Math.round(alpha * 255);
}

const trimmed = await sharp(rgba, {
  raw: { width: source.info.width, height: source.info.height, channels: 4 },
})
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 6 })
  .png()
  .toBuffer({ resolveWithObject: true });

const padding = Math.max(48, Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.05));
const prepared = sharp(trimmed.data).extend({
  top: padding,
  right: padding,
  bottom: padding,
  left: padding,
  background: { r: 0, g: 0, b: 0, alpha: 0 },
});

const fullWidth = trimmed.info.width + padding * 2;
const fullHeight = trimmed.info.height + padding * 2;
const runtimeHeight = Math.round((512 * fullHeight) / fullWidth);

await Promise.all([
  prepared
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, "martyrs-s-sticker.png")),
  prepared
    .clone()
    .resize({ width: 512, height: runtimeHeight, fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, "martyrs-s-sticker-512.png")),
  prepared
    .clone()
    .resize({ width: 512, height: runtimeHeight, fit: "fill" })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(outputDirectory, "martyrs-s-sticker-512.webp")),
]);

console.log(`Generated MART¥R(S) sticker derivatives (${fullWidth} × ${fullHeight}; runtime 512 × ${runtimeHeight}).`);
