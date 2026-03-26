const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'icons');

const variants = [
  { src: 'icon.svg',          out: 'icon-192.png',          size: 192 },
  { src: 'icon.svg',          out: 'icon-512.png',          size: 512 },
  { src: 'icon-maskable.svg', out: 'icon-192-maskable.png', size: 192 },
  { src: 'icon-maskable.svg', out: 'icon-512-maskable.png', size: 512 },
];

(async () => {
  for (const v of variants) {
    const input = path.join(ICONS_DIR, v.src);
    const output = path.join(ICONS_DIR, v.out);
    await sharp(input)
      .resize(v.size, v.size)
      .png()
      .toFile(output);
    const stats = fs.statSync(output);
    console.log(`✓ ${v.out} (${v.size}×${v.size}) — ${(stats.size / 1024).toFixed(1)} KB`);
  }
  console.log('\nDone! All icons generated.');
})();
