import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = path.join(root, "source-art", "martyrs", "martyrs-wordmark-generated-master.png");
const outputDirectory = path.join(root, "public", "assets", "wordmarks", "martyrs");

await mkdir(outputDirectory, { recursive: true });

// The generated master contains the requested black wordmark over a pale
// checkerboard preview. Recover genuine alpha without repainting the letters.
const source = await sharp(sourcePath).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(source.info.width * source.info.height * 4);
const matte = 246;

for (let sourceIndex = 0, targetIndex = 0; sourceIndex < source.data.length; sourceIndex += 3, targetIndex += 4) {
  const red = source.data[sourceIndex];
  const green = source.data[sourceIndex + 1];
  const blue = source.data[sourceIndex + 2];
  const darkest = Math.min(red, green, blue);
  let alpha = Math.max(0, Math.min(1, (matte - darkest) / 184));

  if (alpha < 0.045) alpha = 0;
  if (alpha > 0.94) alpha = 1;

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

const paddingX = Math.max(52, Math.round(trimmed.info.width * 0.035));
const paddingY = Math.max(42, Math.round(trimmed.info.height * 0.12));
const prepared = await sharp(trimmed.data).extend({
  top: paddingY,
  right: paddingX,
  bottom: paddingY,
  left: paddingX,
  background: { r: 0, g: 0, b: 0, alpha: 0 },
}).png().toBuffer();

const fullWidth = trimmed.info.width + paddingX * 2;
const fullHeight = trimmed.info.height + paddingY * 2;
const runtimeWidth = 1200;
const runtimeHeight = Math.round((runtimeWidth * fullHeight) / fullWidth);

await Promise.all([
  sharp(prepared)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, "martyrs-wordmark.png")),
  sharp(prepared)
    .resize({ width: runtimeWidth, height: runtimeHeight, fit: "fill" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, "martyrs-wordmark-1200.png")),
  sharp(prepared)
    .resize({ width: runtimeWidth, height: runtimeHeight, fit: "fill" })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(outputDirectory, "martyrs-wordmark-1200.webp")),
]);

console.log(`Generated MART¥RS wordmark derivatives (${fullWidth} × ${fullHeight}; runtime ${runtimeWidth} × ${runtimeHeight}).`);
