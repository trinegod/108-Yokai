import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "source-art", "martyrs", "audio", "martyrs-master.wav");
const outputDirectory = path.join(root, "public", "assets", "audio");
const outputPath = path.join(outputDirectory, "martyrs-master.wav");

const source = await readFile(sourcePath);
if (source.toString("ascii", 0, 4) !== "RIFF" || source.toString("ascii", 8, 12) !== "WAVE") {
  throw new Error("MART¥RS audio source must be a RIFF/WAVE file.");
}

const channels = source.readUInt16LE(22);
const sampleRate = source.readUInt32LE(24);
const bitsPerSample = source.readUInt16LE(34);
if (channels !== 2 || sampleRate !== 48_000 || bitsPerSample !== 16) {
  throw new Error("MART¥RS audio source must be 48 kHz, 16-bit stereo PCM.");
}

await mkdir(outputDirectory, { recursive: true });
await copyFile(sourcePath, outputPath);
console.log("Copied the owner-approved MART¥RS master byte-for-byte for gesture-only playback.");
