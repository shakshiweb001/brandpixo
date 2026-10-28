import React from 'react';
import { Link } from 'react-router-dom';
import { m as motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import styles from './HomeHero.module.scss';

const ease = [0.16, 1, 0.3, 1];

export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const driftUp = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -48]);
  const driftDown = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 36]);

  const reveal = (delay = 0) => ({
    // Content is never hidden (opacity stays 1) so text and images can paint immediately.
    initial: reduceMotion ? false : { y: 16 },
    animate: { y: 0 },
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
        </div>

        <motion.div
          className={styles.visual}
          initial={reduceMotion ? false : { scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          <div className={styles.glow} aria-hidden="true" />

          <figure className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>livejunkfree.ca</span></div>
            <img
              src="/projects/live-junk-free-website-card.webp"
              alt="Live Junk Free junk removal website designed and built by BrandPixo"
              width="1000"
              height="1250"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>Live Junk Free</figcaption>
          </figure>

          <motion.figure className={styles.appCard} style={{ y: driftUp }}>
            <img
              src="/projects/arts-academy-school-website-card.webp"
              alt="Arts Academy School website designed and built by BrandPixo"
              width="1000"
              height="1250"
              decoding="async"
            />
            <figcaption>Arts Academy School</figcaption>
          </motion.figure>

          <motion.figure className={styles.clientCard} style={{ y: driftDown }}>
            <img
              src="/projects/aqualyx-leeds-website-card.webp"
              alt="Aqualyx Leeds aesthetic healthcare website designed and built by BrandPixo"
              width="1000"
              height="1250"
              decoding="async"
            />
            <figcaption>Aqualyx Leeds</figcaption>
          </motion.figure>
        </motion.div>
      </div>

      <a className={styles.scrollCue} href="#studio"><FiArrowDown /><span>Explore our studio</span></a>
    </section>
  );
}
