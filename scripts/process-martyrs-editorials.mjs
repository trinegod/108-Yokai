import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDirectory = path.join(root, "source-art", "martyrs", "editorials");
const outputDirectory = path.join(root, "public", "assets", "editorials", "martyrs");

await mkdir(outputDirectory, { recursive: true });

const editorials = ["persona", "unfinished", "below"];
const breakpoints = {
  desktop: [960, 1440, 1920],
  mobile: [480, 720, 1080, 1440],
};

const jobs = [];

for (const editorial of editorials) {
  for (const [format, widths] of Object.entries(breakpoints)) {
    const sourcePath = path.join(sourceDirectory, `${editorial}-${format}-master.png`);

    for (const width of widths) {
      const base = sharp(sourcePath).resize({
        width,
        fit: "inside",
        withoutEnlargement: true,
      });

      jobs.push(
        base
          .clone()
          .avif({ quality: 60, effort: 5, chromaSubsampling: "4:4:4" })
          .toFile(path.join(outputDirectory, `${editorial}-${format}-${width}.avif`)),
        base
          .clone()
          .webp({ quality: 86, effort: 6, smartSubsample: true })
          .toFile(path.join(outputDirectory, `${editorial}-${format}-${width}.webp`)),
      );
    }
  }
}

await Promise.all(jobs);

console.log(`Generated ${jobs.length} responsive MART¥RS editorial derivatives without cropping the ${editorials.length * 2} masters.`);
