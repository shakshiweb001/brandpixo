import { readFile, writeFile } from 'node:fs/promises';
import { blogPosts } from '../src/data/blogPosts.js';
import { servicesData } from '../src/data/servicesData.js';
import { projects } from '../src/data/projectsData.js';
import { industries } from '../src/data/industriesData.js';

const siteUrl = (process.env.VITE_SITE_URL || 'https://brandpixo.com').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const routePaths = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]);
const staticPaths = [...new Set(routePaths.filter((path) => path !== '*' && !path.includes(':')))];
const routeSettings = {
  '/': ['weekly', '1.0'], '/services': ['weekly', '0.9'], '/blog': ['weekly', '0.8'],
  '/privacy-policy': ['yearly', '0.3'], '/terms-and-conditions': ['yearly', '0.3']
};
const escapeXml = (value) => value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]);
const entries = [
  ...staticPaths.map((path) => ({ path, lastmod: today, changefreq: routeSettings[path]?.[0] || 'monthly', priority: routeSettings[path]?.[1] || '0.8' })),
  ...Object.keys(servicesData).map((slug) => ({ path: `/services/${slug}`, lastmod: today, changefreq: 'monthly', priority: '0.8' })),
  ...Object.keys(industries).map((slug) => ({ path: `/industries/${slug}`, lastmod: today, changefreq: 'monthly', priority: '0.8' })),
  ...projects.map((project) => ({ path: `/work/${project.slug}`, lastmod: today, changefreq: 'monthly', priority: '0.7' })),
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.dateModified || post.datePublished || today, changefreq: 'monthly', priority: '0.7' }))
];
const urls = entries.map(({ path, lastmod, changefreq, priority }) => `  <url>\n    <loc>${escapeXml(`${siteUrl}${path === '/' ? '/' : path}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8');
console.log(`Generated sitemap with ${entries.length} URLs.`);
