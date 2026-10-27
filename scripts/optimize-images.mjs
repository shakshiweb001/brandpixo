// Builds the lightweight image variants the site actually displays, so visitors do not
// download full-page screenshots for small cards. Originals are never modified.
//   public/projects/<name>-card.webp   top crop of each project image, 1000px wide
//   src/assets/brandpixo-logo-nav.webp the navigation logo, cropped to what is visible
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const projectsDir = join(process.cwd(), 'public', 'projects');
const CARD_WIDTH = 1000;
const MAX_RATIO = 1.25; // crop tall page screenshots to a 4:5 top section

const sources = (await readdir(projectsDir)).filter((file) => /\.(webp|png|jpg)$/.test(file) && !file.endsWith('-card.webp'));
// prefer the webp variant when both a PNG and a WebP exist
const bases = [...new Set(sources.map((file) => file.replace(/\.(webp|png|jpg)$/, '')))];

for (const base of bases) {
  const file = ['webp', 'png', 'jpg'].map((ext) => `${base}.${ext}`).find((name) => sources.includes(name));
  const image = await loadImage(join(projectsDir, file));
  const sourceHeight = Math.min(image.height, Math.round(image.width * MAX_RATIO));
  const width = Math.min(CARD_WIDTH, image.width);
  const height = Math.round((sourceHeight / image.width) * width);
  const canvas = createCanvas(width, height);
  canvas.getContext('2d').drawImage(image, 0, 0, image.width, sourceHeight, 0, 0, width, height);
  const buffer = await canvas.encode('webp', 76);
  await writeFile(join(projectsDir, `${base}-card.webp`), buffer);
  console.log(`${base}-card.webp ${width}x${height} ${Math.round(buffer.length / 1024)} KB (from ${file} ${Math.round((await stat(join(projectsDir, file))).size / 1024)} KB)`);
}

// Navigation logo: the old markup showed a 66px-tall band of a 230px square image.
const logo = await loadImage(join(process.cwd(), 'src', 'assets', 'brandpixo-logo.png'));
const scale = logo.width / 230;
const cropY = Math.round(82 * scale);
const cropH = Math.round(66 * scale);
const out = createCanvas(690, 198);
out.getContext('2d').drawImage(logo, 0, cropY, logo.width, cropH, 0, 0, 690, 198);
const logoBuffer = await out.encode('webp', 90);
await mkdir(join(process.cwd(), 'src', 'assets'), { recursive: true });
await writeFile(join(process.cwd(), 'src', 'assets', 'brandpixo-logo-nav.webp'), logoBuffer);
console.log(`brandpixo-logo-nav.webp 690x198 ${Math.round(logoBuffer.length / 1024)} KB`);
