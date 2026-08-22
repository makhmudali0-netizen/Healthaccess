import fs from 'fs';
import zlib from 'zlib';

function createTealHeartPng(size) {
  // Width & height
  const width = size;
  const height = size;

  // RGBA buffer
  const buffer = Buffer.alloc(width * height * 4);

  const tealR = 13, tealG = 148, tealB = 136; // #0d9488
  const whiteR = 255, whiteG = 255, whiteB = 255;
  const radius = size * 0.22; // rounded corner

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Rounded rectangle test
      let isInside = true;
      const cornerR = radius;
      if (x < cornerR && y < cornerR) {
        isInside = (Math.pow(x - cornerR, 2) + Math.pow(y - cornerR, 2)) <= Math.pow(cornerR, 2);
      } else if (x > width - cornerR && y < cornerR) {
        isInside = (Math.pow(x - (width - cornerR), 2) + Math.pow(y - cornerR, 2)) <= Math.pow(cornerR, 2);
      } else if (x < cornerR && y > height - cornerR) {
        isInside = (Math.pow(x - cornerR, 2) + Math.pow(y - (height - cornerR), 2)) <= Math.pow(cornerR, 2);
      } else if (x > width - cornerR && y > height - cornerR) {
        isInside = (Math.pow(x - (width - cornerR), 2) + Math.pow(y - (height - cornerR), 2)) <= Math.pow(cornerR, 2);
      }

      if (!isInside) {
        buffer[idx] = 0;
        buffer[idx + 1] = 0;
        buffer[idx + 2] = 0;
        buffer[idx + 3] = 0; // transparent
        continue;
      }

      // Normalized coordinates -0.5 to 0.5
      const nx = (x / width) - 0.5;
      const ny = (y / height) - 0.5;

      // Heart shape equation: (x^2 + y^2 - 0.08)^3 - x^2 * y^3 < 0
      const hx = nx * 2.4;
      const hy = -ny * 2.4 + 0.15; // flip y and offset
      const heartVal = Math.pow(hx * hx + hy * hy - 0.35, 3) - hx * hx * Math.pow(hy, 3);

      // Pulse line overlay (horizontal line across middle with V peaks)
      const lineY = (ny + 0.02) * height;
      const lineWidth = size * 0.04;
      
      let isPulseLine = false;
      // Pulse path approximation
      if (Math.abs(ny - 0.02) < 0.025 && nx > -0.35 && nx < 0.35) {
        isPulseLine = true;
      }

      if (heartVal <= 0 && !isPulseLine) {
        // White heart
        buffer[idx] = whiteR;
        buffer[idx + 1] = whiteG;
        buffer[idx + 2] = whiteB;
        buffer[idx + 3] = 255;
      } else {
        // Teal background
        buffer[idx] = tealR;
        buffer[idx + 1] = tealG;
        buffer[idx + 2] = tealB;
        buffer[idx + 3] = 255;
      }
    }
  }

  // Create uncompressed PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk (scanlines with filter byte 0)
  const scanlineSize = width * 4 + 1;
  const rawScanlines = Buffer.alloc(height * scanlineSize);
  for (let y = 0; y < height; y++) {
    rawScanlines[y * scanlineSize] = 0; // filter 0
    buffer.copy(rawScanlines, y * scanlineSize + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressedData = zlib.deflateSync(rawScanlines);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
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

// Simple CRC32 table
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

const icon192 = createTealHeartPng(192);
fs.writeFileSync('public/icon-192.png', icon192);

const icon512 = createTealHeartPng(512);
fs.writeFileSync('public/icon-512.png', icon512);

console.log('Successfully created public/icon-192.png and public/icon-512.png!');
