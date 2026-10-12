import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView, trackEvent, classifyLink } from '../utils/analytics';

// Mounted once inside <BrowserRouter>. Loads the tags, reports a page view on every
// route change (React Router does not reload the page, so tags would otherwise only
// see the first page), and tracks clicks on WhatsApp / phone / email links.
export default function Analytics() {
  const { pathname, search } = useLocation();
  const lastPath = useRef(null);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const path = `${pathname}${search}`;
    if (lastPath.current === path) return;
    lastPath.current = path;
    // Wait a tick so react-helmet has updated document.title for the new route.
    const timer = setTimeout(() => trackPageView(path), 150);
    return () => clearTimeout(timer);
  }, [pathname, search]);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const name = classifyLink(href);
      if (name) {
        trackEvent(name, {
          link_url: href.split('?')[0],
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
