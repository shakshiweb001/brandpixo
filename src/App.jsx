import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import useSmoothScroll from './hooks/useSmoothScroll';
import CustomCursor from './components/CustomCursor';
import SEO from './components/SEO';
import Analytics from './components/Analytics';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const WorkCategoryPage = lazy(() => import('./pages/WorkCategoryPage'));  
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function Home() {
  return <HomePage />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function App() {
  // Initialize Lenis Smooth Scroll
  useSmoothScroll();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEO />
      <Analytics />
      <CustomCursor />
      <Navigation />
      <Suspense fallback={<main aria-live="polite" style={{ minHeight: '70vh', paddingTop: '9rem' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/websites" element={<WorkCategoryPage />} />
          <Route path="/work/ecommerce" element={<WorkCategoryPage />} />
          <Route path="/work/apps" element={<WorkCategoryPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
