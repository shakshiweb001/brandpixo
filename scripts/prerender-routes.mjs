// Pre-renders every route of the built site into real HTML (title, meta tags, JSON-LD,
// headings, text and internal links) so search engines, link previews and AI crawlers get
// full content from the first response instead of an empty <div id="root">.
//
// Runs after `vite build` (see postbuild). It opens each route from the sitemap in a local
// headless Chrome, waits for React + react-helmet to finish, strips things that must only
// exist at runtime (injected analytics scripts) and writes the result to
//   build/<route>.html  and  build/<route>/index.html   (build/index.html for "/")
// If Chrome is not available the script exits quietly and the plain SPA shell files created
// by generate-route-pages.mjs stay in place, so the build never fails because of this step.
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const buildDir = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : join(dirname(fileURLToPath(import.meta.url)), '..', 'build');

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((path) => existsSync(path));
if (!executablePath) {
  console.warn('Prerender skipped: no Chrome/Edge found (set CHROME_PATH). Plain SPA route pages are kept.');
  process.exit(0);
}

let puppeteer;
try {
  puppeteer = (await import('puppeteer-core')).default;
} catch {
  console.warn('Prerender skipped: puppeteer-core is not installed. Plain SPA route pages are kept.');
  process.exit(0);
}

const shellPath = join(buildDir, 'index.html');
const shell = await readFile(shellPath, 'utf8'); // original shell, used to detect runtime-only scripts
const sitemap = await readFile(join(buildDir, 'sitemap.xml'), 'utf8');
const routes = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1].replace(/&amp;/g, '&')).pathname.replace(/\/+$/, '') || '/'))];

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2' };

// Static server with SPA fallback (always serves the untouched shell for unknown paths).
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = resolve(join(buildDir, path));
  try {
    if (file.startsWith(buildDir) && extname(file) && existsSync(file)) {
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
      res.end(await readFile(file));
      return;
    }
  } catch { /* fall through to the shell */ }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(shell);
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({ executablePath, headless: 'new', args: ['--disable-gpu', '--no-sandbox'] });

const shellScripts = shell;
async function render(route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setRequestInterception(true);
    page.on('request', (request) => (request.url().startsWith(origin) ? request.continue() : request.abort()));
    await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('h1', { timeout: 30000 });
    // Let react-helmet apply the per-route <head>, then reveal scroll-triggered sections.
    await new Promise((done) => setTimeout(done, 600));
    await page.evaluate(async () => {
      const step = Math.max(400, window.innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((done) => setTimeout(done, 90));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((done) => setTimeout(done, 400));

    let html = await page.evaluate((original) => {
      document.querySelectorAll('.custom-cursor, .custom-cursor-dot').forEach((node) => node.remove());
      document.body.removeAttribute('style');
      document.documentElement.removeAttribute('style');
      document.documentElement.className = [...document.documentElement.classList].filter((name) => !name.startsWith('lenis')).join(' ');
      if (!document.documentElement.className) document.documentElement.removeAttribute('class');
      // The shell and react-helmet both emit the SEO tags. Keep only the last (route-specific)
      // copy of each and mark it, so the app can swap it for its own copy without duplicates.
      const seoSelectors = ['title', 'meta[name="description"]', 'meta[name="robots"]', 'meta[name="author"]', 'meta[property^="og:"]', 'meta[property^="article:"]', 'meta[name^="twitter:"]', 'link[rel="canonical"]'];
      const keyOf = (el) => el.tagName + (el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('rel') || '');
      const lastByKey = new Map();
      [...document.head.children].filter((el) => seoSelectors.some((selector) => el.matches(selector))).forEach((el) => {
        const key = keyOf(el);
        // React puts the route <title> before the shell one, so for titles the first copy wins.
        if (key === 'TITLE' && lastByKey.has(key)) { el.remove(); return; }
        lastByKey.get(key)?.remove();
        lastByKey.set(key, el);
      });
      lastByKey.forEach((el) => el.setAttribute('data-prerendered', ''));
      // Remove anything that only exists because JS ran (analytics tags injected at runtime).
      document.querySelectorAll('script').forEach((script) => {
        if (script.type === 'application/ld+json') return;
        // Third-party tags (Meta Pixel, GTM, GA) are added at runtime by their own loaders; never bake them in.
        if (script.src && !script.src.startsWith(location.origin)) { script.remove(); return; }
        const key = script.getAttribute('src') || script.textContent.trim().slice(0, 60);
        if (key && !original.includes(key)) script.remove();
      });
      return `<!doctype html>\n${document.documentElement.outerHTML}`;
    }, shellScripts);
    // Vite's preload helper records absolute URLs of the temporary local server; make them root-relative.
    html = html.split(origin).join('');
    if (/127.0.0.1|localhost/.test(html)) throw new Error('local address leaked into prerendered HTML');

    const target = route === '/' ? join(buildDir, 'index.html') : join(buildDir, route);
    if (route === '/') {
      await writeFile(target, html, 'utf8');
    } else {
      await mkdir(dirname(target), { recursive: true });
      await writeFile(`${target}.html`, html, 'utf8');
      await mkdir(target, { recursive: true });
      await writeFile(join(target, 'index.html'), html, 'utf8');
    }
    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || '';
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    return { route, ok: true, title, h1Count, bytes: html.length };
  } catch (error) {
    return { route, ok: false, error: error.message };
  } finally {
    await page.close();
  }
}

const results = [];
const queue = [...routes];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) results.push(await render(queue.shift()));
}));
await browser.close();
server.close();

const failed = results.filter((result) => !result.ok);
const dupes = results.filter((r) => r.ok).reduce((map, r) => map.set(r.title, [...(map.get(r.title) || []), r.route]), new Map());
console.log(`Prerendered ${results.length - failed.length}/${results.length} routes.`);
for (const result of failed) console.warn(`  FAILED ${result.route}: ${result.error}`);
for (const result of results.filter((r) => r.ok && r.h1Count !== 1)) console.warn(`  h1 count ${result.h1Count} on ${result.route}`);
for (const [title, list] of dupes) if (list.length > 1) console.warn(`  duplicate title "${title}" on ${list.join(', ')}`);
