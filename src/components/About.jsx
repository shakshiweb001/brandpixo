import React from 'react';
import { m as motion } from 'framer-motion';
import styles from './About.module.scss';

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className={styles.about} id="about">
      <motion.div 
        className={styles.imageSide}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.collage}>
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
            alt="BrandPixo digital marketing agency workspace"
            className={styles.mainImage}
            loading="lazy"
          />
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
            alt="BrandPixo creative team planning a digital marketing campaign"
            className={styles.subImage}
            loading="lazy"
          />
          <motion.div 
            className={styles.floatingCard}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span>10+</span>
            <span>Years Active</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className={styles.textSide}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.span className={styles.tag} variants={fadeUp}>Who We Are</motion.span>
        <motion.h2 className={styles.title} variants={fadeUp}>
          We design digital solutions that drive measurable growth.
        </motion.h2>
        <motion.p className={styles.desc} variants={fadeUp}>
          At BrandPixo, we believe the best digital experiences are built at the intersection 
          of elegant design and powerful technology. We craft beautiful, user-centric interfaces 
          that capture brand identities and scale businesses efficiently.
        </motion.p>
        
        <motion.div className={styles.statsGrid} variants={staggerContainer}>
          <motion.div className={styles.statItem} variants={fadeUp}>
            <span className={styles.number}>150+</span>
            <span className={styles.label}>Projects Completed</span>
          </motion.div>
          <motion.div className={styles.statItem} variants={fadeUp}>
            <span className={styles.number}>98%</span>
            <span className={styles.label}>Client Satisfaction</span>
          </motion.div>
          <motion.div className={styles.statItem} variants={fadeUp}>
            <span className={styles.number}>25M+</span>
            <span className={styles.label}>Revenue Driven</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
