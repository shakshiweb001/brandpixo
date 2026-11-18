// PLACEHOLDER TESTIMONIALS — replace each entry with a real, approved client quote before launch.
// Keep `name`, `role` and `company` truthful; do not publish quotes the client has not signed off.
// Entries are flagged `placeholder: true` by default. The home page only shows entries where you
// set `placeholder: false` (i.e. real, approved reviews), so sample text never appears on the home page.
export const testimonials = [
  { id: 1, quote: 'BrandPixo took a vague idea and turned it into a website we are proud to send people to. The process was clear and the result felt genuinely considered.', name: 'Client name', role: 'Founder', company: 'Company name', category: 'Websites', featured: true },
  { id: 2, quote: 'Communication was direct and fast. We always knew what was happening and what came next.', name: 'Client name', role: 'Director', company: 'Company name', category: 'Websites' },
  { id: 3, quote: 'Our new brand finally looks like the business we have built. Customers notice the difference straight away.', name: 'Client name', role: 'Owner', company: 'Company name', category: 'Branding' },
  { id: 4, quote: 'The site is quicker, clearer and far easier for patients to navigate. Enquiries are simpler to handle.', name: 'Client name', role: 'Practice Manager', company: 'Company name', category: 'Websites' },
  { id: 5, quote: 'They understood our products and made the shopping experience feel premium without making it complicated.', name: 'Client name', role: 'Co-founder', company: 'Company name', category: 'E-commerce' },
  { id: 6, quote: 'A calm, professional team that cares about the details. We would happily work together again.', name: 'Client name', role: 'Marketing Lead', company: 'Company name', category: 'Marketing' }
].map((item) => ({ placeholder: true, ...item }));
export const realTestimonials = testimonials.filter((item) => !item.placeholder);
export const testimonialCategories = ['All', ...new Set(testimonials.map((item) => item.category))];
