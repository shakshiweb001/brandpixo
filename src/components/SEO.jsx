import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { blogPosts, getBlogPost } from '../data/blogPosts';
import { homeFaqs } from '../data/homeFaqs';
import { getProject } from '../data/projectsData';

const SITE_NAME = 'BrandPixo';
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://brandpixo.com').replace(/\/$/, '');
const SHARE_IMAGE = `${SITE_URL}/brandpixo-share.png`;
const EMAIL = 'brandpixo@gmail.com';
const PHONE = '+91-76508-37963';
// Add the real BrandPixo profile URLs here (instagram.com/<handle> etc.) to emit them as sameAs.
const SOCIALS = [];

const staticMeta = {
  '/': {
    title: 'BrandPixo | Branding, Web Design & Digital Marketing Agency',
    description: 'BrandPixo is a branding, web design and digital marketing agency. We build memorable brands and fast, conversion-focused websites, backed by SEO and social.'
  },
  '/about': {
    title: 'About BrandPixo | Digital Marketing Agency',
    description: 'Meet BrandPixo, a digital agency combining brand strategy, web design, SEO and performance marketing to help ambitious businesses grow.'
  },
  '/services': {
    title: 'Digital Marketing Services | BrandPixo',
    description: 'Explore BrandPixo services: SEO, social media marketing, performance campaigns, branding, UI/UX and custom website development.'
  },
  '/blog': {
    title: 'Digital Marketing Insights | BrandPixo',
    description: 'Read BrandPixo insights on SEO, branding, conversion, website design and digital marketing strategy for growing businesses.'
  },
  '/work': {
    title: 'Selected Website Projects | BrandPixo',
    description: 'Explore selected BrandPixo website projects across healthcare, home services, education, membership and community-focused brands.'
  },
  '/contact': {
    title: 'Contact BrandPixo | Digital Marketing Agency',
    description: 'Contact BrandPixo for SEO, social media marketing, branding, web design and performance campaigns. Start your project on WhatsApp.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | BrandPixo',
    description: 'Read how BrandPixo collects, uses and protects information submitted through our website and project enquiry forms.'
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | BrandPixo',
    description: 'Read the terms governing use of the BrandPixo website, its content, service enquiries and intellectual property.'
  },
  '/work/websites': {
    title: 'Website Projects | BrandPixo',
    description: 'Explore website design and development projects by BrandPixo for healthcare, home services, education, membership and community brands.'
  },
  '/work/ecommerce': {
    title: 'E-commerce Projects | BrandPixo',
    description: 'Explore e-commerce website and online store design projects by BrandPixo, from skincare and furniture storefronts to conversion-focused shopping journeys.'
  },
  '/work/apps': {
    title: 'Web App Projects | BrandPixo',
    description: 'Explore app and web application interface design projects by BrandPixo, from fitness and finance apps to custom digital products.'
  }
};

const truncate = (value, max) => value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
const titleWithBrand = (value) => truncate(`${value} | BrandPixo`, 59);
const cleanPath = (pathname) => pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
const articleWordCount = (post) => [
  post.title,
  post.intro,
  ...post.sections.flatMap((section) => [
    section.title,
    ...(section.paragraphs || []),
    ...(section.list || []),
    section.closing || '',
    ...(section.faqs || []).flatMap((item) => [item.q, item.a])
  ])
].join(' ').trim().split(/\s+/).length;

const routeDetails = (pathname) => {
  if (pathname.startsWith('/services/')) {
    const id = pathname.slice('/services/'.length);
    const service = servicesData[id];
    if (service) return {
      title: titleWithBrand(`${service.title} Services`),
      description: truncate(`${service.tagline} BrandPixo provides professional ${service.title.toLowerCase()} for ambitious businesses across India.`, 155),
      image: service.heroImage,
      type: 'website',
      service,
      breadcrumbs: [['Home', '/'], ['Services', '/services'], [service.title, pathname]]
    };
  }

  if (pathname.startsWith('/work/')) {
    const project = getProject(pathname.slice('/work/'.length));
    if (project) return {
      title: titleWithBrand(`${project.title} Case Study`),
      description: truncate(project.intro, 155),
      image: project.image,
      type: 'website',
      project,
      breadcrumbs: [['Home', '/'], ['Work', '/work'], [project.title, pathname]]
    };
  }
  if (pathname.startsWith('/blog/')) {
    const post = getBlogPost(pathname.slice('/blog/'.length));
    if (post) return {
      title: post.metaTitle || titleWithBrand(post.title),
      description: post.metaDescription || truncate(post.excerpt, 155),
      image: post.image,
      type: 'article',
      post,
      breadcrumbs: [['Home', '/'], ['Blog', '/blog'], [post.title, pathname]]
    };
  }

  if (staticMeta[pathname]) {
    const labels = { '/about': 'About', '/services': 'Services', '/blog': 'Blog', '/work': 'Work', '/work/websites': 'Websites', '/work/ecommerce': 'E-commerce', '/work/apps': 'Apps', '/contact': 'Contact', '/privacy-policy': 'Privacy Policy', '/terms-and-conditions': 'Terms and Conditions' };
    return {
      ...staticMeta[pathname],
      image: SHARE_IMAGE,
      type: 'website',
      breadcrumbs: pathname === '/' ? [] : [['Home', '/'], [labels[pathname], pathname]]
    };
  }

  return {
    title: 'Page Not Found | BrandPixo',
    description: 'The requested BrandPixo page could not be found. Explore our digital marketing, branding and professional website services.',
    image: SHARE_IMAGE,
    type: 'website',
    noindex: true,
    breadcrumbs: [['Home', '/'], ['Page not found', pathname]]
  };
};

const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: `${SITE_URL}${path === '/' ? '' : path}`
  }))
});

export default function SEO() {
  // Pre-rendered pages ship their own copy of the SEO tags (marked data-prerendered) so crawlers
  // see them without running JS. Once the app has rendered its own tags, drop the static copies.
  useEffect(() => {
    document.head.querySelectorAll('[data-prerendered]').forEach((node) => node.remove());
  }, []);

  const location = useLocation();
  const pathname = cleanPath(location.pathname.toLowerCase());
  const meta = routeDetails(pathname);
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const socialImage = meta.image?.startsWith('/') ? `${SITE_URL}${meta.image}` : (meta.image || SHARE_IMAGE);

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description: 'Branding, web design and digital marketing agency offering brand identity, website development, SEO, social media marketing and performance campaigns.',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: SHARE_IMAGE },
    email: EMAIL,
    telephone: PHONE,
    ...(SOCIALS.length ? { sameAs: SOCIALS } : {}),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    }
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#organization` }
  };

  const pageSchema = meta.post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.post.title,
    description: meta.description,
    image: socialImage,
    datePublished: meta.post.datePublished,
    dateModified: meta.post.dateModified || meta.post.datePublished,
    keywords: meta.post.focusKeyword,
    articleSection: meta.post.category,
    wordCount: articleWordCount(meta.post),
    inLanguage: 'en-IN',
    mainEntityOfPage: canonical,
    author: { '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL }
  } : meta.service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: meta.service.title,
    description: meta.description,
    serviceType: meta.service.category,
    areaServed: { '@type': 'Country', name: 'India' },
    provider: { '@id': `${SITE_URL}/#organization` },
    url: canonical
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: canonical
  };

  const allServicesSchema = pathname === '/services' ? {
    '@context': 'https://schema.org',
    '@graph': Object.entries(servicesData).map(([id, service]) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/services/${id}#service`,
      name: service.title,
      description: service.aboutText,
      serviceType: service.category,
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@id': `${SITE_URL}/#organization` },
      url: `${SITE_URL}/services/${id}`
    }))
  } : null;

  const blogCollectionSchema = pathname === '/blog' ? {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'BrandPixo Journal',
    url: `${SITE_URL}/blog`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.datePublished,
      dateModified: post.dateModified || post.datePublished,
      image: post.image.startsWith('/') ? `${SITE_URL}${post.image}` : post.image
    }))
  } : null;

  const faqSchema = pathname === '/' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
  } : null;

  const articleFaqSchema = meta.post?.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.post.faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
  } : null;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={meta.post?.imageAlt || 'BrandPixo digital marketing and branding agency'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:locale" content="en_IN" />
      {meta.post?.datePublished && <meta property="article:published_time" content={meta.post.datePublished} />}
      {meta.post?.dateModified && <meta property="article:modified_time" content={meta.post.dateModified} />}
      {meta.post?.category && <meta property="article:section" content={meta.post.category} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={meta.post?.imageAlt || 'BrandPixo digital marketing and branding agency'} />

      {pathname === '/' && <script type="application/ld+json">{JSON.stringify(organization)}</script>}
      {pathname === '/' && <script type="application/ld+json">{JSON.stringify(website)}</script>}
      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      {meta.breadcrumbs.length > 0 && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(meta.breadcrumbs))}</script>}
      {allServicesSchema && <script type="application/ld+json">{JSON.stringify(allServicesSchema)}</script>}
      {blogCollectionSchema && <script type="application/ld+json">{JSON.stringify(blogCollectionSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {articleFaqSchema && <script type="application/ld+json">{JSON.stringify(articleFaqSchema)}</script>}
    </Helmet>
  );
}
