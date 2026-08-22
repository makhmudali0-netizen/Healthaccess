import sharp from 'sharp';

async function renderIcons() {
  const svgPath = 'public/app-icon.svg';

  await sharp(svgPath).resize(192, 192).toFile('public/logo192.png');
  await sharp(svgPath).resize(512, 512).toFile('public/logo512.png');
  await sharp(svgPath).resize(192, 192).toFile('public/icon-192.png');
  await sharp(svgPath).resize(512, 512).toFile('public/icon-512.png');
  await sharp(svgPath).resize(64, 64).toFile('public/favicon.png');
  await sharp(svgPath).resize(180, 180).toFile('public/apple-touch-icon.png');

  console.log('Successfully rendered crisp pixel-perfect PNG icons with sharp!');
}

renderIcons().catch(console.error);
