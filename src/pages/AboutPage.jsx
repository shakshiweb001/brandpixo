import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiAward, FiFeather, FiLayers, FiTarget } from 'react-icons/fi';
import styles from './AboutPage.module.scss';

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } } };

export default function AboutPage() {
  const principles = [
    { icon: <FiFeather />, title: 'Restraint with purpose', copy: 'Every element earns its place. Good design feels composed, never crowded.' },
    { icon: <FiTarget />, title: 'Strategy before styling', copy: 'We define the commercial and human objective before choosing the visual direction.' },
    { icon: <FiAward />, title: 'Craft through delivery', copy: 'The standard stays high from the first concept to the final responsive detail.' }
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>About us</strong></div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span>Independent digital studio</span>
          <h1>A digital agency.<br /><mark>Serious about impact.</mark></h1>
        </motion.div>
        <div className={styles.heroBottom}><p>BrandPixo brings strategy, design, development, and growth thinking together for brands ready to show up with greater clarity.</p><div className={styles.iconStack} aria-hidden="true"><span><FiTarget /></span><span><FiLayers /></span><span><FiFeather /></span></div></div>
      </section>

      <section className={styles.story}>
        <div className={styles.photoCollage}>
          <figure><img src="/projects/aqualyx-leeds-website.webp" alt="Aqualyx Leeds website designed by BrandPixo" width="1400" height="7248" loading="lazy" decoding="async" /></figure>
          <figure><img src="/projects/arts-academy-school-website.webp" alt="Arts Academy School website designed by BrandPixo" width="1400" height="9060" loading="lazy" decoding="async" /></figure>
        </div>
        <div className={styles.storyCopy}><span>Our story</span><h2>Built for brands that have outgrown ordinary.</h2><p>We created BrandPixo to close the gap between beautiful creative work and practical business outcomes. That means positioning with substance, interfaces people understand, and technology that performs quietly in the background.</p><p>Our approach stays collaborative and direct. You work with the people shaping the strategy and making the work—not layers of account management.</p><Link to="/contact">Start a conversation <FiArrowUpRight /></Link></div>
      </section>

      <section className={styles.beliefBand}><span>What we believe</span><h2>Premium isn’t a visual effect.<br />It’s the feeling of <em>everything working.</em></h2></section>

      <section className={styles.principles}>
        <div className={styles.sectionHeading}><span>How we work</span><h2>Clarity at every stage.</h2><p>A focused process keeps decisions considered, momentum visible, and the final experience coherent.</p></div>
        <div className={styles.principleGrid}>{principles.map((item, index) => <motion.article key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp}><div><span>0{index + 1}</span>{item.icon}</div><h3>{item.title}</h3><p>{item.copy}</p></motion.article>)}</div>
      </section>

      <section className={styles.processStrip}><span>One connected studio</span><div><strong>Strategy</strong><small>Positioning and direction</small></div><div><strong>Design</strong><small>Identity and experience</small></div><div><strong>Build</strong><small>Development and launch</small></div></section>

      <section className={styles.cta}><span>Bring us the ambition</span><h2>Let’s make your brand<br /><em>impossible to overlook.</em></h2><p>Tell us what you’re building and where you want it to go.</p><Link to="/contact">Begin your project <FiArrowUpRight /></Link></section>
    </main>
  );
}
