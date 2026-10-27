import React from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCode, FiLayers, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import styles from './Services.module.scss';

export default function Services() {
  const serviceData = [
    {
      icon: <FiLayers />,
      path: '/services/brand-identity',
      title: 'Brand Identity',
      desc: 'We research, conceptualize, and design visually arresting brand identity packages, styling guidelines, and marketing collaterals to build authority.'
    },
    {
      icon: <FiCode />,
      path: '/services/custom-website',
      title: 'Web Development',
      desc: 'High-fidelity engineering using React and animation frameworks to construct fast, responsive websites with robust backends and optimized performance.'
    },
    {
      icon: <FiTrendingUp />,
      path: '/services/seo',
      title: 'Digital Marketing',
      desc: 'SEO strategies, keyword targeting, content audits, and conversion rate optimization metrics to boost organic discovery and sales performance.'
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className={styles.services} id="services">
      <motion.div 
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.span className={styles.tag} variants={fadeUp}>Our Expertise</motion.span>
        <motion.h2 className={styles.title} variants={fadeUp}>Premium Digital Services</motion.h2>
        <motion.p className={styles.desc} variants={fadeUp}>
          Empowering premium brands with a full suite of marketing, development, and brand design solutions.
        </motion.p>
      </motion.div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {serviceData.map((service, index) => (
          <motion.div 
            key={index}
            className={styles.card}
            variants={fadeUp}
            whileHover={{ y: -8 }}
          >
            <div className={styles.iconContainer}>
              {service.icon}
            </div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.desc}</p>
            <Link to={service.path} className={styles.learnMore} aria-label={`Explore BrandPixo ${service.title} services`}>
              <span>Explore {service.title}</span>
              <FiArrowRight className={styles.arrow} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
