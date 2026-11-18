import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { testimonials, testimonialCategories } from '../data/testimonialsData';
import styles from './TestimonialsPage.module.scss';

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } } };
const initials = (name) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('All');
  const featured = testimonials.find((item) => item.featured);
  const list = testimonials.filter((item) => item !== featured && (filter === 'All' || item.category === filter));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Testimonials</strong></div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className={styles.eyebrow}>Client stories</span>
          <h1>Kind words from<br /><mark>people we&rsquo;ve built for.</mark></h1>
        </motion.div>
      </section>

      {featured && (
        <section className={styles.featured}>
          <motion.figure initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className={styles.mark} aria-hidden="true">&ldquo;</span>
            <blockquote>{featured.quote}</blockquote>
            <figcaption><b>{initials(featured.name)}</b><div><strong>{featured.name}</strong><small>{featured.role}, {featured.company}</small></div></figcaption>
          </motion.figure>
        </section>
      )}

      <section className={styles.wall}>
        <div className={styles.filters} role="group" aria-label="Filter testimonials">
          {testimonialCategories.map((category) => (
            <button key={category} type="button" className={filter === category ? styles.active : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>
          ))}
        </div>
        <div className={styles.grid}>
          {list.map((item) => (
            <motion.figure key={item.id} className={styles.card} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}>
              <span className={styles.tag}>{item.category}</span>
              <blockquote>{item.quote}</blockquote>
              <figcaption><b>{initials(item.name)}</b><div><strong>{item.name}</strong><small>{item.role}, {item.company}</small></div></figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <span className={styles.eyebrow}>Your story is next</span>
        <h2>Ready to be our<br /><em>next success story?</em></h2>
        <div><Link to="/contact">Start your project <FiArrowUpRight /></Link><Link to="/work" className={styles.ghost}>See our work</Link></div>
      </section>
    </main>
  );
}
