// GitHub Pages cannot rewrite unknown URLs to index.html, so a deep link such as /services
// or /work/morrow-legal would be answered with a real 404 (and Google refuses to index it).
// After the Vite build, copy the built SPA shell to a real file for every known route so
// each URL answers with HTTP 200:
//   build/services.html         -> served for /services
//   build/services/index.html   -> served for /services/
// Routes come from the sitemap that scripts/generate-sitemap.mjs produces during prebuild.
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const buildDir = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : join(dirname(fileURLToPath(import.meta.url)), '..', 'build');

const shell = join(buildDir, 'index.html');
const sitemap = await readFile(join(buildDir, 'sitemap.xml'), 'utf8');

const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1].replace(/&amp;/g, '&')).pathname.replace(/\/+$/, ''))
  .filter((path) => path && path !== '/')
  .filter((path) => !path.includes('..'));

let count = 0;
for (const path of [...new Set(paths)]) {
  const target = join(buildDir, path);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(shell, `${target}.html`);
  await mkdir(target, { recursive: true });
  await copyFile(shell, join(target, 'index.html'));
  count += 1;
}

console.log(`Generated static route pages for ${count} URLs.`);
