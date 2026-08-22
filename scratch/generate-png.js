import fs from 'fs';
import zlib from 'zlib';

function generateIcon(size, fileName) {
  const width = size;
  const height = size;
  const buffer = Buffer.alloc(width * height * 4);

  // Background color: #0d9488 (Teal green)
  const bgR = 13, bgG = 148, bgB = 136;
  const fgR = 255, fgG = 255, fgB = 255;

  const cx = width / 2;
  const cy = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Fill background teal
      buffer[idx] = bgR;
      buffer[idx + 1] = bgG;
      buffer[idx + 2] = bgB;
      buffer[idx + 3] = 255;

      // Draw centered white Heart + Pulse shape
      const dx = (x - cx) / (size * 0.4);
      const dy = (y - cy + size * 0.05) / (size * 0.4);

      // Heart equation: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
      const ny = -dy; // inverted y
      const eq = Math.pow(dx * dx + ny * ny - 0.55, 3) - dx * dx * Math.pow(ny, 3);

      // Pulse line (ECG line across middle)
      const pulseY = cy + size * 0.02;
      const isLine = Math.abs(y - pulseY) < (size * 0.025) && Math.abs(x - cx) < (size * 0.35);

      if (eq <= 0 && !isLine) {
        // Draw white heart
        buffer[idx] = fgR;
        buffer[idx + 1] = fgG;
        buffer[idx + 2] = fgB;
        buffer[idx + 3] = 255;
      }
    }
  }

  // PNG Encoder
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);

  const scanlineSize = width * 4 + 1;
  const rawScanlines = Buffer.alloc(height * scanlineSize);
  for (let y = 0; y < height; y++) {
    rawScanlines[y * scanlineSize] = 0;
    buffer.copy(rawScanlines, y * scanlineSize + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressedData = zlib.deflateSync(rawScanlines);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  fs.writeFileSync(fileName, Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]));
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

generateIcon(192, 'public/logo192.png');
generateIcon(512, 'public/logo512.png');
generateIcon(64, 'public/favicon.png');

console.log('Successfully generated logo192.png, logo512.png, favicon.png!');
