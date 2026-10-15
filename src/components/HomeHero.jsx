import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import styles from './HomeHero.module.scss';
import { projects } from '../data/projectsData';
import { servicesData } from '../data/servicesData';

const ease = [0.16, 1, 0.3, 1];

// Counts come straight from the site's own data, so they never drift out of date.
const facts = [
  { value: projects.length, label: 'portfolio projects' },
  { value: Object.keys(servicesData).length, label: 'services' },
  { value: 3, label: 'disciplines: design, development, marketing' },
];

export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const driftUp = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -48]);
  const driftDown = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 36]);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section className={styles.hero} id="home">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.span className={styles.eyebrow} {...reveal(0.05)}>Branding · Web design · Development</motion.span>
          <motion.h1 {...reveal(0.12)}>
            We design brands people remember{' '}
            <span className={styles.highlight}>and websites that <em>work.</em></span>
          </motion.h1>
          <motion.p className={styles.lead} {...reveal(0.22)}>
            BrandPixo brings strategy, design and development together, so your brand looks distinctive, your website is fast and clear, and visitors know exactly what to do next.
          </motion.p>
          <motion.div className={styles.actions} {...reveal(0.32)}>
            <Link to="/contact" className={styles.primary}>Start a project <FiArrowUpRight /></Link>
            <Link to="/work" className={styles.secondary}>See our work</Link>
          </motion.div>
          <motion.ul className={styles.facts} {...reveal(0.42)}>
            {facts.map((fact) => (
              <li key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className={styles.visual}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <div className={styles.glow} aria-hidden="true" />

          <figure className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>sola-retreats</span></div>
            <img
              src="/projects/sola-retreats.webp"
              alt="Sola Retreats travel website concept designed by BrandPixo"
              width="1024"
              height="1536"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>Website concept</figcaption>
          </figure>

          <motion.figure className={styles.appCard} style={{ y: driftUp }}>
            <img
              src="/projects/pulse-habit-app.webp"
              alt="Pulse Habit fitness app interface concept designed by BrandPixo"
              width="1536"
              height="1024"
              decoding="async"
            />
            <figcaption>App concept</figcaption>
          </motion.figure>

          <motion.figure className={styles.clientCard} style={{ y: driftDown }}>
            <img
              src="/projects/aqualyx-leeds-website.webp"
              alt="Aqualyx Leeds aesthetic healthcare website built by BrandPixo"
              width="1400"
              height="7248"
              decoding="async"
            />
            <figcaption>Live client site</figcaption>
          </motion.figure>
        </motion.div>
      </div>

      <a className={styles.scrollCue} href="#studio"><FiArrowDown /><span>Explore our studio</span></a>
    </section>
  );
}
