import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { servicesData } from '../data/servicesData';
import Contact from '../components/Contact';
import styles from './ServicesPage.module.scss';

export default function ServicesPage() {
  // Ensure we start at top of page on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className={styles.page}>
      <motion.section 
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.span className={styles.tag} variants={itemVariants}>BrandPixo / Capabilities</motion.span>
        <motion.h1 className={styles.title} variants={itemVariants}>Digital Marketing and Branding Services</motion.h1>
        <motion.nav className={styles.breadcrumbs} variants={itemVariants}><Link to="/">Home</Link><span>/</span><strong>Services</strong></motion.nav>
        <motion.p className={styles.desc} variants={itemVariants}>Design, development, and marketing systems built to make ambitious brands clearer, faster, and more valuable.</motion.p>
      </motion.section>

      <motion.section 
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {Object.entries(servicesData).map(([id, service]) => (
          <Link to={`/services/${id}`} key={id} style={{ display: 'block', textDecoration: 'none' }}>
            <motion.div className={styles.card} variants={itemVariants}>
              <span className={styles.cardCategory}>{service.category}</span>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardDesc}>{service.tagline}</p>
              <div className={styles.cardLink}>
                <span>Explore {service.title}</span>
                <FiArrowRight className={styles.arrow} />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.section>

      <Contact />
    </div>
  );
}
