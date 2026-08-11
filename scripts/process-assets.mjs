import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = (name) => path.join(root, "source-art", name);
const derived = (name) => path.join(root, "derived-art", "clean-plates", name);
const output = (...parts) => path.join(root, "public", "assets", ...parts);

async function ensureDirectories() {
  await Promise.all([
    mkdir(output("backgrounds", "threshold"), { recursive: true }),
    mkdir(output("relics"), { recursive: true }),
    mkdir(output("portraits"), { recursive: true }),
    mkdir(output("sprites", "characters"), { recursive: true }),
  ]);
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
  responsiveIllustration({
    sourceName: path.join("archive", "yamauba-archive-master.jpg"),
    directory: "portraits",
    stem: "yamauba-archive",
    widths: [360, 720],
  }),
  responsiveIllustration({
    sourceName: path.join("archive", "shuten-doji-archive-master.jpg"),
    directory: "portraits",
    stem: "shuten-doji-archive",
    widths: [360, 720],
  }),
  responsiveIllustration({
    sourceName: path.join("archive", "ibaraki-doji-archive-master.jpg"),
    directory: "portraits",
    stem: "ibaraki-doji-archive",
    widths: [360, 720],
  }),
  responsiveIllustration({
    sourceName: path.join("archive", "minamoto-yorimitsu-archive-master.jpg"),
    directory: "portraits",
    stem: "minamoto-yorimitsu-archive",
    widths: [360, 720],
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
