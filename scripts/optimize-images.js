import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imageDir = path.join(__dirname, '../public/images/unsplash');
const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.jpg'));

async function optimizeImages() {
  for (const file of files) {
    const baseName = file.replace('.jpg', '');
    const inputPath = path.join(imageDir, file);

    console.log(`Processing ${baseName}...`);

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: 72, effort: 3 })
      .toFile(path.join(imageDir, `${baseName}.webp`));

    // Convert to AVIF
    await sharp(inputPath)
      .avif({ quality: 65, effort: 4 })
      .toFile(path.join(imageDir, `${baseName}.avif`));

    console.log(`✓ Generated WebP and AVIF for ${baseName}`);
  }

  // List all files
  console.log('\n=== Final Image Assets ===');
  const allFiles = fs.readdirSync(imageDir).sort();
  const grouped = {};
  allFiles.forEach(f => {
    const base = f.replace(/\.(jpg|webp|avif)$/, '');
    if (!grouped[base]) grouped[base] = [];
    grouped[base].push(f);
  });

  Object.entries(grouped).forEach(([base, formats]) => {
    const sizes = formats
      .map(f => {
        const size = fs.statSync(path.join(imageDir, f)).size;
        return `${path.extname(f).slice(1).toUpperCase()}: ${(size / 1024).toFixed(1)}KB`;
      })
      .join(' | ');
    console.log(`${base}: ${sizes}`);
  });
}

optimizeImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
