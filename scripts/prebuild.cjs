// Copy the scraped catalog JSON into public/data before build so Vite includes it in dist
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../data/mayvenn-products.json');
const destDir = path.resolve(__dirname, '../public/data');
const dest = path.join(destDir, 'mayvenn-products.json');

try {
  if (!fs.existsSync(src)) {
    console.warn('[prebuild] No catalog file found at', src);
    process.exit(0);
  }
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`[prebuild] Copied catalog JSON to ${dest}`);
} catch (e) {
  console.warn('[prebuild] Failed to copy catalog JSON:', e.message);
}
