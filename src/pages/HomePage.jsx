import React from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { FiArrowUpRight, FiCode, FiCompass, FiPenTool } from 'react-icons/fi';
import styles from './HomePage.module.scss';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import ProjectGallery from '../components/ProjectGallery';
import HomeHero from '../components/HomeHero';
import { servicesData } from '../data/servicesData';
import { blogPosts } from '../data/blogPosts';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } }
};

const services = [
  { number: '01', title: 'Brand & identity', copy: 'Brand strategy, logo design and visual identity that give your business a consistent, recognisable presence.', icon: <FiCompass />, link: '/services/brand-identity' },
  { number: '02', title: 'Digital experiences', copy: 'User-focused UI/UX design that makes your website easier to navigate, understand and use.', icon: <FiPenTool />, link: '/services/ui-ux' },
  { number: '03', title: 'Web development', copy: 'Responsive WordPress and custom websites built around your content, customers and business goals.', icon: <FiCode />, link: '/services/custom-website' }
];

const steps = [
  ['Discover', 'We listen, question, and define the opportunity.'],
  ['Define', 'We turn insight into a focused creative direction.'],
  ['Design', 'We shape the identity and experience in detail.'],
  ['Deliver', 'We build, refine, launch, and keep momentum moving.']
];

const marqueeItems = Object.values(servicesData).map((service) => service.title);
const latestPosts = blogPosts.slice(0, 3);

export default function HomePage() {
  return (
    <main className={styles.page}>
      <HomeHero />

      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map((group) => (
            <div key={group} aria-hidden={group === 1}>
              {marqueeItems.map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </div>

      <section className={styles.studio} id="studio">
        <motion.div className={styles.studioCopy} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <span>What we do</span>
          <h2>One studio.<br />Every part connected.</h2>
          <p>We bring brand strategy, website design and development together in one process. That means a clearer message, a consistent visual identity and a website built to support real business goals.</p>
          <Link to="/about">Meet BrandPixo <FiArrowUpRight /></Link>
        </motion.div>
        <div className={styles.collage}>
          <figure><img src="/projects/the-convoke-website-card.webp" alt="The Convoke community platform website designed by BrandPixo" width="1000" height="1250" loading="lazy" decoding="async" /></figure>
          <figure><img src="/projects/specialty-pediatric-solutions-website-card.webp" alt="Specialty Pediatric Solutions website designed by BrandPixo" width="1000" height="1250" loading="lazy" decoding="async" /></figure>
        </div>
      </section>

      <section className={styles.statement}>
        <span>Our point of view</span>
        <h2>A better website does more than look good.<br /><em>It makes the next step clear.</em></h2>
        <p>From the first impression to the enquiry form, we focus on clear messaging, useful page structure and thoughtful design that helps visitors understand your offer and take action.</p>
      </section>

      <section className={styles.services}>
        <div className={styles.sectionHead}><span>Capabilities</span><h2>Website design, branding and digital growth.</h2><Link to="/services">View all services <FiArrowUpRight /></Link></div>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <motion.article key={service.title} initial="hidden" whileInView="visible" whileHover={{ y: -8 }} viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
              <div><span>{service.number}</span>{service.icon}</div>
              <h3>{service.title}</h3><p>{service.copy}</p>
              <Link to={service.link} aria-label={`Explore ${service.title}`}><FiArrowUpRight /></Link>
            </motion.article>
          ))}
        </div>
        <nav className={styles.allServices} aria-label="All services">
          <span>All services</span>
          {Object.entries(servicesData).map(([id, service]) => <Link key={id} to={`/services/${id}`}>{service.title}</Link>)}
        </nav>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.projectsHead}>
          <div><span>Selected projects</span><h2>Work made to be<br />experienced.</h2></div>
          <div className={styles.projectsIntro}><p>Explore selected website design and development projects across service businesses, healthcare, education and community-focused organisations.</p><Link to="/work">View all work <FiArrowUpRight /></Link></div>
        </div>
        <ProjectGallery limit={3} />
      </section>

      <section className={styles.process}>
        <div className={styles.processLead}><span>Our process</span><h2>Clarity from first thought to final detail.</h2><p>You stay involved at every stage. We agree on the goals, share progress, gather feedback and test the finished experience before launch.</p></div>
        <div className={styles.steps}>{steps.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>

      <section className={styles.journal}>
        <div className={styles.sectionHead}><span>From the journal</span><h2>Fresh thinking, plainly put.</h2><Link to="/blog">Read all articles <FiArrowUpRight /></Link></div>
        <div className={styles.journalGrid}>
          {latestPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.journalCard}>
              <img src={post.image} alt={post.imageAlt} loading="lazy" />
              <div>
                <span>{post.category} · {post.readTime}</span>
                <h3>{post.title}</h3>
                <small>Read article <FiArrowUpRight /></small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.faqContact} id="faq-contact">
        <FAQ />
        <Contact />
      </section>
    </main>
  );
}
