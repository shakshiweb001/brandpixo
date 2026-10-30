// Internal-link map: which articles, projects and services each page should point to.
// Keeping this in one place makes it easy to adjust the site's linking structure.

// Articles worth reading for each service page.
export const serviceReading = {
  'custom-website': ['custom-website-vs-website-builder', 'how-to-choose-a-web-design-agency', 'core-web-vitals-for-small-business-websites'],
  wordpress: ['wordpress-vs-shopify', 'custom-website-vs-website-builder', 'core-web-vitals-for-small-business-websites'],
  'landing-page': ['core-web-vitals-for-small-business-websites', 'seo-friendly-blog-for-today', 'website-design-vs-seo'],
  shopify: ['wordpress-vs-shopify', 'core-web-vitals-for-small-business-websites', 'website-design-vs-seo'],
  'ui-ux': ['website-design-vs-seo', 'how-to-choose-a-web-design-agency', 'what-is-a-brand-identity'],
  'graphic-design': ['what-is-a-brand-identity', 'how-to-choose-a-web-design-agency', 'website-design-vs-seo'],
  'brand-identity': ['what-is-a-brand-identity', 'how-to-choose-a-web-design-agency', 'website-design-vs-seo'],
  seo: ['local-seo-for-small-businesses', 'seo-friendly-blog-for-today', 'website-redesign-without-losing-seo'],
  'social-media': ['what-is-a-brand-identity', 'seo-friendly-blog-for-today', 'local-seo-for-small-businesses'],
  'performance-marketing': ['core-web-vitals-for-small-business-websites', 'seo-friendly-blog-for-today', 'website-design-vs-seo'],
};

// Portfolio projects to show on each service page ("Selected work").
export const serviceWork = {
  'custom-website': ['the-convoke', 'specialty-pediatric-solutions', 'aleem-clubs'],
  wordpress: ['arts-academy-school', 'aqualyx-leeds', 'live-junk-free'],
  'landing-page': ['live-junk-free', 'aqualyx-leeds', 'the-convoke'],
  shopify: ['elan-botanics', 'form-house', 'kora-studio'],
  'ui-ux': ['pulse-habit', 'clover-finance', 'nordhaven-architecture'],
  'graphic-design': ['kora-studio', 'paws-whiskers', 'sola-retreats'],
  'brand-identity': ['aleem-clubs', 'morrow-legal', 'paws-whiskers'],
  seo: ['specialty-pediatric-solutions', 'aqualyx-leeds', 'live-junk-free'],
  'social-media': ['aleem-clubs', 'the-convoke', 'arts-academy-school'],
  'performance-marketing': ['live-junk-free', 'voltly-energy', 'aqualyx-leeds'],
};

// Services shown on a project page, by the project's category.
export const projectServices = {
  websites: ['custom-website', 'ui-ux', 'seo'],
  ecommerce: ['shopify', 'custom-website', 'ui-ux'],
  apps: ['ui-ux', 'graphic-design', 'brand-identity'],
};

// Category slug (matches /work/<slug>) for a project.
export const projectCategory = (project) => (project.type === 'app' ? 'apps' : project.type || 'websites');
export const categoryLabels = { websites: 'website', ecommerce: 'ecommerce', apps: 'app design' };
