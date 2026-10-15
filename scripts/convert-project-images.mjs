import { readdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

// Converts concept project PNGs to WebP next to the originals (originals are kept).
const dir = join(process.cwd(), 'public', 'projects');
const pngs = (await readdir(dir)).filter((file) => file.endsWith('.png'));

for (const file of pngs) {
  const out = join(dir, file.replace(/\.png$/, '.webp'));
  try { await access(out); console.log('skip (exists)', file); continue; } catch { /* convert */ }
  const image = await loadImage(join(dir, file));
  const canvas = createCanvas(image.width, image.height);
  canvas.getContext('2d').drawImage(image, 0, 0);
  const buffer = await canvas.encode('webp', 82);
  await writeFile(out, buffer);
  console.log(file, `${image.width}x${image.height}`, '->', `${Math.round(buffer.length / 1024)} KB`);
}
