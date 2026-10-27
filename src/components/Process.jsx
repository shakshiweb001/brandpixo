import React from 'react';
import { m as motion } from 'framer-motion';
import styles from './Process.module.scss';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      desc: 'We research your business model, audit competitors, establish benchmarks, and map out your digital trajectory to identify growth parameters.'
    },
    {
      number: '02',
      title: 'UI/UX Design Mockups',
      desc: 'Interactive wireframing and prototyping to translate strategic requirements into sleek, beautiful, and intuitive layouts centered on brand engagement.'
    },
    {
      number: '03',
      title: 'Engineering & Development',
      desc: 'We build your website using modern architectures, ensuring pixel-perfect translation of designs, fast load times, and clean, scalable codebases.'
    },
    {
      number: '04',
      title: 'Launch & Optimization',
      desc: 'Deploying with automated testing suites, configuring SEO tags, and tracking conversions continuously to tweak and scale the performance.'
    }
  ];

  return (
    <section className={styles.process} id="process">
      <div className={styles.header}>
        <span className={styles.tag}>Our Approach</span>
        <h2 className={styles.title}>The Process</h2>
      </div>

      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className={styles.item}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className={styles.stepIndicator}>
              {step.number}
            </div>
            <div className={styles.content}>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
