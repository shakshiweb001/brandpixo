// Industry landing pages: /industries/:slug. `projectSlugs` link to existing case studies, `serviceIds` to servicesData keys.
export const industries = {
  healthcare: {
    slug: 'healthcare',
    name: 'Healthcare',
    short: 'Clear, reassuring websites for clinics, practices and aesthetic providers.',
    metaTitle: 'Healthcare Website Design | BrandPixo',
    metaDescription: 'Website design and SEO for clinics, specialist practices and aesthetic providers. Clear, trustworthy websites that make it easy to book a consultation.',
    heading: 'Healthcare website design that builds trust',
    intro: 'Patients want clarity before they get in touch. We design healthcare websites that explain treatments plainly, show credibility early and make booking a consultation feel simple.',
    points: [
      ['Calm, accessible layouts', 'Readable typography, strong contrast and simple navigation so every patient and family can find what they need.'],
      ['Treatment and service pages', 'Dedicated pages that explain each service, answer common questions and support local search.'],
      ['Clear enquiry paths', 'Consultation prompts, phone and WhatsApp links placed where visitors are ready to act.']
    ],
    projectSlugs: ['specialty-pediatric-solutions', 'aqualyx-leeds'],
    serviceIds: ['custom-website', 'seo', 'ui-ux']
  },
  education: {
    slug: 'education',
    name: 'Education',
    short: 'Expressive websites that make programmes and admissions easy to understand.',
    metaTitle: 'Education Website Design | BrandPixo',
    metaDescription: 'Website design for schools, academies and training providers. Programme pages and admissions journeys that help families and students take the next step.',
    heading: 'Education website design for schools and academies',
    intro: 'Families compare several schools before they enquire. We create education websites that show your culture, explain your programmes and guide visitors toward admissions.',
    points: [
      ['Programme-first structure', 'Courses, age groups and pathways organised so visitors reach the right information quickly.'],
      ['Admissions-focused journeys', 'Prominent enquiry, visit and application prompts that reduce friction for parents and students.'],
      ['Content you can update', 'Flexible pages for events, news and announcements that your team can manage themselves.']
    ],
    projectSlugs: ['arts-academy-school'],
    serviceIds: ['custom-website', 'wordpress', 'seo']
  },
  'home-services': {
    slug: 'home-services',
    name: 'Home services',
    short: 'Fast, mobile-first websites that turn local searches into booked jobs.',
    metaTitle: 'Home Services Website Design | BrandPixo',
    metaDescription: 'Website design and local SEO for home service businesses. Mobile-first sites with clear service pages and booking prompts that turn searches into jobs.',
    heading: 'Website design for home service businesses',
    intro: 'Most home service customers search on their phone and call the first business that looks reliable. We build fast, clear websites that earn that call.',
    points: [
      ['Mobile-first and fast', 'Pages that load quickly on any connection, with tap-to-call and quote buttons always within reach.'],
      ['Local SEO foundations', 'Service and area pages structured to help you appear for the searches your customers actually make.'],
      ['Proof of reliability', 'Space for reviews, guarantees and real project photos that reassure visitors before they book.']
    ],
    projectSlugs: ['live-junk-free'],
    serviceIds: ['landing-page', 'seo', 'custom-website']
  },
  ecommerce: {
    slug: 'ecommerce',
    name: 'E-commerce',
    short: 'Storefronts designed to turn product discovery into confident purchases.',
    metaTitle: 'E-commerce Website Design | BrandPixo',
    metaDescription: 'E-commerce website design and Shopify development for growing brands. Storefronts that present products clearly and make checkout feel effortless.',
    heading: 'E-commerce website design that helps products sell',
    intro: 'A good online store makes products easy to find, easy to trust and easy to buy. We design and build storefronts around how your customers actually shop.',
    points: [
      ['Product-led design', 'Collection pages, product detail layouts and imagery that show your range at its best.'],
      ['Shopify and custom builds', 'The right platform for your catalogue, budget and plans for growth.'],
      ['Checkout confidence', 'Clear delivery, returns and payment information that removes doubt at the final step.']
    ],
    projectSlugs: ['elan-botanics', 'form-house', 'kora-studio'],
    serviceIds: ['shopify', 'ui-ux', 'performance-marketing']
  }
};
export const industryList = Object.values(industries);
