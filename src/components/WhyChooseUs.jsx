import React from 'react';
import { m as motion } from 'framer-motion';
import { FiTrendingUp, FiEye, FiZap } from 'react-icons/fi';
import styles from './WhyChooseUs.module.scss';

export default function WhyChooseUs() {
  const cardsData = [
    {
      icon: <FiZap />,
      title: 'High-Impact Designs',
      desc: 'We construct beautiful layouts tailored to elevate brand prestige and capture user retention.'
    },
    {
      icon: <FiEye />,
      title: 'Obsessive Detail Orientation',
      desc: 'Every layout transition, micro-interaction, and responsive breakpoint is curated for smooth experiences.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Performance & Optimization First',
      desc: 'We optimize scripts, structure tags, and target key metrics to ensure search engines rank pages optimally.'
    }
  ];

  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.left}>
        <span className={styles.tag}>Why BrandPixo</span>
        <h2 className={styles.title}>Setting the Standard for Premium Agencies</h2>
        <p className={styles.desc}>
          We merge strategic brand management metrics with striking frontend aesthetics to deliver 
          functional digital platforms that boost organic traffic and conversions.
        </p>
      </div>

      <div className={styles.cards}>
        {cardsData.map((card, idx) => (
          <motion.div 
            key={idx}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <div className={styles.icon}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
