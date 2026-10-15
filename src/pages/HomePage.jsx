import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  { number: '01', title: 'Brand & identity', copy: 'Positioning, visual systems, and a distinctive point of view built to last.', icon: <FiCompass />, link: '/services/brand-identity' },
  { number: '02', title: 'Digital experiences', copy: 'Clear, compelling interfaces that make every interaction feel considered.', icon: <FiPenTool />, link: '/services/ui-ux' },
  { number: '03', title: 'Web development', copy: 'Fast, responsive builds engineered to perform quietly and scale confidently.', icon: <FiCode />, link: '/services/custom-website' }
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
          <p>We combine sharp thinking, expressive design, and careful technology. The result is work that looks distinctive, communicates clearly, and performs where it matters.</p>
          <Link to="/about">Meet BrandPixo <FiArrowUpRight /></Link>
        </motion.div>
        <div className={styles.collage}>
          <figure><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85" alt="Creative team collaborating around a table" /></figure>
          <figure><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=85" alt="Bright modern creative studio" /></figure>
          <div><strong>10+</strong><span>Years of<br />combined craft</span></div>
        </div>
      </section>

      <section className={styles.statement}>
        <span>Our point of view</span>
        <h2>Good design gets attention.<br /><em>Great design creates movement.</em></h2>
        <p>We build every brand experience to do more than look distinctive—clarifying the message, earning trust, and moving the right people toward action.</p>
      </section>

      <section className={styles.services}>
        <div className={styles.sectionHead}><span>Capabilities</span><h2>Built to move brands forward.</h2><Link to="/services">View all services <FiArrowUpRight /></Link></div>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <motion.article key={service.title} initial="hidden" whileInView="visible" whileHover={{ y: -8 }} viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
              <div><span>{service.number}</span>{service.icon}</div>
              <h3>{service.title}</h3><p>{service.copy}</p>
              <Link to={service.link} aria-label={`Explore ${service.title}`}><FiArrowUpRight /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.projectsHead}>
          <div><span>Selected projects</span><h2>Work made to be<br />experienced.</h2></div>
          <div className={styles.projectsIntro}><p>A selection of digital experiences created for service, healthcare, and community-focused brands.</p><Link to="/work">View all work <FiArrowUpRight /></Link></div>
        </div>
        <ProjectGallery limit={3} />
      </section>

      <section className={styles.process}>
        <div className={styles.processLead}><span>Our process</span><h2>Clarity from first thought to final detail.</h2><p>No mystery, no unnecessary layers. Just a thoughtful, collaborative process that keeps the work and the outcome in focus.</p></div>
        <div className={styles.steps}>{steps.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>

      <section className={styles.proof}>
        <div><strong>150+</strong><span>Projects delivered</span></div>
        <div><strong>98%</strong><span>Client satisfaction</span></div>
        <div><strong>25M+</strong><span>Revenue influenced</span></div>
        <p>Measured outcomes.<br />Memorable work.</p>
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

      <section className={styles.cta}>
        <span>Bring us the ambition</span>
        <h2>Ready to become<br /><em>the obvious choice?</em></h2>
        <p>Tell us what you’re building and where you want it to go.</p>
        <Link to="/contact">Begin your project <FiArrowUpRight /></Link>
      </section>
    </main>
  );
}
