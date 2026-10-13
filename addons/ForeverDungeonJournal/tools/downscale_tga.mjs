import fs from 'node:fs';
import path from 'node:path';

function downscaleTga32(filePath) {
  const buf = fs.readFileSync(filePath);
  const idLen = buf[0];
  const colorMapType = buf[1];
  const imageType = buf[2];
  if (imageType !== 2) {
    throw new Error(`Unsupported TGA image type: ${imageType}`);
  }

  const width = buf.readUInt16LE(12);
  const height = buf.readUInt16LE(14);
  const bpp = buf[16];
  const desc = buf[17];

  console.log(`Processing ${path.basename(filePath)}: ${width}x${height}, ${bpp} bpp`);
  if (width !== 2048 || height !== 2048 || bpp !== 32) {
    console.log(`Skipping: not a 2048x2048 32-bit TGA.`);
    return;
  }

  const newWidth = 1024;
  const newHeight = 1024;
  const pixelOffset = 18 + idLen;

  const newBuf = Buffer.alloc(18 + idLen + (newWidth * newHeight * 4));
  buf.copy(newBuf, 0, 0, 18 + idLen);

  newBuf.writeUInt16LE(newWidth, 12);
  newBuf.writeUInt16LE(newHeight, 14);

  let inIdx = pixelOffset;
  let outIdx = pixelOffset;

  // 2x2 box downsampling
  for (let y = 0; y < newHeight; y++) {
    const row1 = pixelOffset + (y * 2 * width * 4);
    const row2 = pixelOffset + ((y * 2 + 1) * width * 4);

    for (let x = 0; x < newWidth; x++) {
      const p1 = row1 + (x * 2 * 4);
      const p2 = row1 + ((x * 2 + 1) * 4);
      const p3 = row2 + (x * 2 * 4);
      const p4 = row2 + ((x * 2 + 1) * 4);

      // BGRA
      const b = (buf[p1] + buf[p2] + buf[p3] + buf[p4]) >> 2;
      const g = (buf[p1 + 1] + buf[p2 + 1] + buf[p3 + 1] + buf[p4 + 1]) >> 2;
      const r = (buf[p1 + 2] + buf[p2 + 2] + buf[p3 + 2] + buf[p4 + 2]) >> 2;
      const a = (buf[p1 + 3] + buf[p2 + 3] + buf[p3 + 3] + buf[p4 + 3]) >> 2;

      newBuf[outIdx] = b;
      newBuf[outIdx + 1] = g;
      newBuf[outIdx + 2] = r;
      newBuf[outIdx + 3] = a;
      outIdx += 4;
    }
  }

  // Backup original to .orig.tga first
  const origPath = filePath + '.orig';
  if (!fs.existsSync(origPath)) {
    fs.writeFileSync(origPath, buf);
  }

  fs.writeFileSync(filePath, newBuf);
  console.log(`Saved ${path.basename(filePath)} downscaled to 1024x1024 (${(newBuf.length / 1048576).toFixed(2)} MB)`);
}

const mediaDir = path.resolve('addons/ForeverDungeonJournal/Media');
const targets = ['DalaranCityMap.tga', 'DalaranUnderbellyMap.tga'];

for (const t of targets) {
  const p = path.join(mediaDir, t);
  if (fs.existsSync(p)) {
    downscaleTga32(p);
  }
}
