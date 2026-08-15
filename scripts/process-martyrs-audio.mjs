import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "source-art", "martyrs", "audio", "martyrs-master.wav");
const outputDirectory = path.join(root, "public", "assets", "audio");
const masterCopyPath = path.join(outputDirectory, "martyrs-master.wav");
const extendedLoopPath = path.join(outputDirectory, "martyrs-extended-loop.wav");
const repeats = 2;
const crossfadeSeconds = 1.2;

function findChunk(buffer, chunkName) {
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const name = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    if (name === chunkName) return { offset: offset + 8, size };
    offset += 8 + size + (size % 2);
  }
  throw new Error(`Missing ${chunkName} chunk.`);
}

function createWaveHeader({ dataBytes, channels, sampleRate, bitsPerSample }) {
  const header = Buffer.alloc(44);
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = channels * bytesPerSample;
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataBytes, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * blockAlign, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataBytes, 40);
  return header;
}

const source = await readFile(sourcePath);
if (source.toString("ascii", 0, 4) !== "RIFF" || source.toString("ascii", 8, 12) !== "WAVE") {
  throw new Error("MART¥RS audio source must be a RIFF/WAVE file.");
}

const formatChunk = findChunk(source, "fmt ");
const dataChunk = findChunk(source, "data");
const audioFormat = source.readUInt16LE(formatChunk.offset);
const channels = source.readUInt16LE(formatChunk.offset + 2);
const sampleRate = source.readUInt32LE(formatChunk.offset + 4);
const bitsPerSample = source.readUInt16LE(formatChunk.offset + 14);

if (audioFormat !== 1 || channels !== 2 || sampleRate !== 48_000 || bitsPerSample !== 16) {
  throw new Error("MART¥RS audio source must be 48 kHz, 16-bit stereo PCM.");
}

const pcm = source.subarray(dataChunk.offset, dataChunk.offset + dataChunk.size);
const frameBytes = channels * (bitsPerSample / 8);
const sourceFrames = Math.floor(pcm.length / frameBytes);
const repeatedFrames = sourceFrames * repeats;
const crossfadeFrames = Math.round(sampleRate * crossfadeSeconds);
const outputFrames = repeatedFrames - crossfadeFrames;

if (outputFrames <= crossfadeFrames) throw new Error("Audio is too short for the requested crossfade.");

const outputPcm = Buffer.alloc(outputFrames * frameBytes);

function readRepeatedSample(frame, channel) {
  const sourceFrame = frame % sourceFrames;
  return pcm.readInt16LE((sourceFrame * channels + channel) * 2);
}

for (let frame = 0; frame < outputFrames; frame += 1) {
  for (let channel = 0; channel < channels; channel += 1) {
    const outputOffset = (frame * channels + channel) * 2;
    let sample;

    if (frame < crossfadeFrames) {
      const progress = frame / Math.max(1, crossfadeFrames - 1);
      const tail = readRepeatedSample(outputFrames + frame, channel);
      const head = readRepeatedSample(frame, channel);
      sample = Math.round(tail * (1 - progress) + head * progress);
    } else {
      sample = readRepeatedSample(frame, channel);
    }

    outputPcm.writeInt16LE(Math.max(-32768, Math.min(32767, sample)), outputOffset);
  }
}

await mkdir(outputDirectory, { recursive: true });
await copyFile(sourcePath, masterCopyPath);
await writeFile(
  extendedLoopPath,
  Buffer.concat([
    createWaveHeader({ dataBytes: outputPcm.length, channels, sampleRate, bitsPerSample }),
    outputPcm,
  ]),
);

const durationSeconds = outputFrames / sampleRate;
console.log(`Generated a ${durationSeconds.toFixed(6)}-second seamless MART¥RS WAV loop while preserving the approved master.`);
