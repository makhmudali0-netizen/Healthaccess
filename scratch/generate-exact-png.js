import fs from 'fs';
import zlib from 'zlib';

function renderExactIcon(size, fileName) {
  const width = size;
  const height = size;
  const buffer = Buffer.alloc(width * height * 4);

  // Background teal: #0d9488
  const bgR = 13, bgG = 148, bgB = 136;
  // White stroke: #ffffff
  const fgR = 255, fgG = 255, fgB = 255;

  const cx = width / 2;
  const cy = height / 2;

  const cornerRadius = size * 0.28;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Rounded squircle container test
      let inBox = true;
      const minX = size * 0.06;
      const maxX = size * 0.94;
      const minY = size * 0.06;
      const maxY = size * 0.94;

      if (x < minX || x > maxX || y < minY || y > maxY) {
        inBox = false;
      } else {
        // Test 4 rounded corners
        if (x < minX + cornerRadius && y < minY + cornerRadius) {
          inBox = Math.hypot(x - (minX + cornerRadius), y - (minY + cornerRadius)) <= cornerRadius;
        } else if (x > maxX - cornerRadius && y < minY + cornerRadius) {
          inBox = Math.hypot(x - (maxX - cornerRadius), y - (minY + cornerRadius)) <= cornerRadius;
        } else if (x < minX + cornerRadius && y > maxY - cornerRadius) {
          inBox = Math.hypot(x - (minX + cornerRadius), y - (maxY - cornerRadius)) <= cornerRadius;
        } else if (x > maxX - cornerRadius && y > maxY - cornerRadius) {
          inBox = Math.hypot(x - (maxX - cornerRadius), y - (maxY - cornerRadius)) <= cornerRadius;
        }
      }

      if (!inBox) {
        buffer[idx] = 0;
        buffer[idx + 1] = 0;
        buffer[idx + 2] = 0;
        buffer[idx + 3] = 0;
        continue;
      }

      // Default background teal
      buffer[idx] = bgR;
      buffer[idx + 1] = bgG;
      buffer[idx + 2] = bgB;
      buffer[idx + 3] = 255;

      // Normalized coordinates
      const nx = (x - cx) / (size * 0.5);
      const ny = (y - cy) / (size * 0.5);

      // Heart outline calculation
      // Outer heart: (x^2 + (y - sqrt(|x|))^2) approx
      const heartX = nx * 1.35;
      const heartY = -ny * 1.35 + 0.15;

      const heartDist = Math.pow(heartX * heartX + heartY * heartY - 0.5, 3) - heartX * heartX * Math.pow(heartY, 3);
      
      const strokeThick = 0.14;
      const isHeartStroke = Math.abs(heartDist) < strokeThick;

      // ECG pulse line path
      let isPulseStroke = false;
      const strokeW = 0.06;
      if (Math.abs(ny - 0.0) < strokeW && nx > -0.6 && nx < 0.6) {
        // ECG waveform points
        if (nx > -0.2 && nx < -0.08) {
          // Peak up
          const t = (nx - (-0.2)) / 0.12;
          const expectedY = -0.3 * Math.sin(t * Math.PI);
          if (Math.abs(ny - expectedY) < strokeW) isPulseStroke = true;
        } else if (nx >= -0.08 && nx < 0.05) {
          // Deep V down
          const t = (nx - (-0.08)) / 0.13;
          const expectedY = 0.35 * Math.sin(t * Math.PI);
          if (Math.abs(ny - expectedY) < strokeW) isPulseStroke = true;
        } else if (nx >= 0.05 && nx < 0.2) {
          // Peak up 2
          const t = (nx - 0.05) / 0.15;
          const expectedY = -0.22 * Math.sin(t * Math.PI);
          if (Math.abs(ny - expectedY) < strokeW) isPulseStroke = true;
        } else {
          isPulseStroke = true;
        }
      }

      if (isHeartStroke || isPulseStroke) {
        buffer[idx] = fgR;
        buffer[idx + 1] = fgG;
        buffer[idx + 2] = fgB;
        buffer[idx + 3] = 255;
      }
    }
  }

  // Write PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
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

renderExactIcon(192, 'public/logo192.png');
renderExactIcon(512, 'public/logo512.png');
renderExactIcon(192, 'public/icon-192.png');
renderExactIcon(512, 'public/icon-512.png');
renderExactIcon(64, 'public/favicon.png');

console.log('Successfully created exact matching logo PNGs!');
