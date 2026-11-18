import React from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiPlus } from 'react-icons/fi';
import { pricingPlans, pricingSteps, pricingFaqs } from '../data/pricingData';
import styles from './PricingPage.module.scss';

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } } };

export default function PricingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Pricing</strong></div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className={styles.eyebrow}>Transparent pricing</span>
          <h1>Clear packages.<br /><mark>No surprises.</mark></h1>
          <p>Choose a starting point, then we shape the scope around your goals. You will always know the full cost before we begin.</p>
        </motion.div>
      </section>

      <section className={styles.plans} aria-label="Pricing packages">
        {pricingPlans.map((plan) => (
          <motion.article key={plan.id} className={`${styles.card} ${plan.featured ? styles.featured : ''}`} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
            {plan.badge && <em className={styles.badge}>{plan.badge}</em>}
            <h2>{plan.name}</h2>
            <p className={styles.tagline}>{plan.tagline}</p>
            <div className={styles.price}><strong>{plan.price}</strong><small>{plan.note}</small></div>
            <ul>{plan.features.map((feature) => <li key={feature}><FiCheck aria-hidden="true" /><span>{feature}</span></li>)}</ul>
            <Link to="/contact" className={styles.planCta}>{plan.cta} <FiArrowUpRight /></Link>
          </motion.article>
        ))}
      </section>

      <section className={styles.steps}>
        <div className={styles.heading}><span className={styles.eyebrow}>How it works</span><h2>From first call to launch day.</h2></div>
        <ol>{pricingSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
      </section>

      <section className={styles.faq}>
        <div className={styles.heading}><span className={styles.eyebrow}>Pricing questions</span><h2>Good to know.</h2></div>
        <div className={styles.faqList}>
          {pricingFaqs.map((item) => (
            <details key={item.q}><summary>{item.q}<FiPlus aria-hidden="true" /></summary><p>{item.a}</p></details>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <span className={styles.eyebrow}>Not sure which fits?</span>
        <h2>Tell us what you need.<br /><em>We will recommend the right plan.</em></h2>
        <Link to="/contact">Get a free quote <FiArrowUpRight /></Link>
      </section>
    </main>
  );
}
