// Copy the scraped catalog JSON into public/data so the client can fetch it at runtime
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../data/mayvenn-products.json');
const destDirPublic = path.resolve(__dirname, '../public/data');
const destPublic = path.join(destDirPublic, 'mayvenn-products.json');
const destDirDist = path.resolve(__dirname, '../dist/data');
const destDist = path.join(destDirDist, 'mayvenn-products.json');

try {
  if (!fs.existsSync(src)) {
    console.warn('[postbuild] No catalog file found at', src);
    process.exit(0);
  }
  // copy to public (for local dev and future builds)
  fs.mkdirSync(destDirPublic, { recursive: true });
  fs.copyFileSync(src, destPublic);
  console.log(`[postbuild] Copied catalog JSON to ${destPublic}`);
  // copy to dist (for current artifact)
  fs.mkdirSync(destDirDist, { recursive: true });
  fs.copyFileSync(src, destDist);
  console.log(`[postbuild] Copied catalog JSON to ${destDist}`);
} catch (e) {
  console.warn('[postbuild] Failed to copy catalog JSON:', e.message);
}
