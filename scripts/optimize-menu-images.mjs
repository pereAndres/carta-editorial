import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/images/menus');
const removePng = process.argv.includes('--remove-png');

async function findPngs(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findPngs(fullPath));
    else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.png') files.push(fullPath);
  }
  return files;
}

const pngs = await findPngs(root);
for (const input of pngs) {
  const output = input.replace(/\.png$/i, '.webp');
  await sharp(input)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(output);
  if (removePng) await unlink(input);
  console.log(`${path.relative(root, output)}${removePng ? ' (PNG source removed)' : ''}`);
}

console.log(`Optimized ${pngs.length} menu images.`);
