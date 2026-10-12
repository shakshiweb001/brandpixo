// Central analytics helper.
//
// Configure through environment variables (see .env.example):
//   VITE_GTM_ID         Google Tag Manager container, e.g. GTM-XXXXXXX  (recommended)
//   VITE_GA4_ID         GA4 Measurement ID, e.g. G-XXXXXXXXXX            (only used when no GTM)
//   VITE_META_PIXEL_ID  Meta (Facebook) Pixel ID                         (only used when no GTM)
//
// When GTM is configured, add GA4 / Meta Pixel / Google Ads tags inside GTM and use the
// events pushed to the dataLayer below as triggers. Without GTM, GA4 and the Meta Pixel
// are loaded directly. Nothing loads when no ID is set, so local dev stays clean.

const GTM_ID = import.meta.env.VITE_GTM_ID;
const GA4_ID = import.meta.env.VITE_GA4_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

let initialised = false;

const hasGtm = () => Boolean(GTM_ID);

function loadScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initGtm() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
}

function initGa4() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are sent manually on route change, so disable the automatic one.
  window.gtag('config', GA4_ID, { send_page_view: false });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
}

function initMetaPixel() {
  if (window.fbq) return;
  const fbq = function fbq() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = window._fbq = fbq;
  loadScript('https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', META_PIXEL_ID);
}

export function initAnalytics() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;

  if (hasGtm()) {
    initGtm();
    return;
  }
  if (GA4_ID) initGa4();
  if (META_PIXEL_ID) initMetaPixel();
}

export function trackPageView(path) {
  if (typeof window === 'undefined') return;
  const page = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };

  if (hasGtm()) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'page_view', ...page });
    return;
  }
  if (GA4_ID && window.gtag) window.gtag('event', 'page_view', page);
  if (META_PIXEL_ID && window.fbq) window.fbq('track', 'PageView');
}

// Meta standard events that map to our custom event names.
const META_EVENT_MAP = {
  generate_lead: 'Lead',
  whatsapp_click: 'Contact',
  phone_click: 'Contact',
  email_click: 'Contact',
};

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;

  if (hasGtm()) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    return;
  }
  if (GA4_ID && window.gtag) window.gtag('event', name, params);
  if (META_PIXEL_ID && window.fbq && META_EVENT_MAP[name]) {
    window.fbq('track', META_EVENT_MAP[name], params);
  }
}

// Classify a clicked link so one delegated listener can track every contact link on the site.
export function classifyLink(href = '') {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return 'whatsapp_click';
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.startsWith('mailto:')) return 'email_click';
  return null;
}
