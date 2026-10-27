import React from 'react';
import { m as motion } from 'framer-motion';
import styles from './Hero.module.scss';
import { AnimatedGridPattern } from './AnimatedGridPattern';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.canvasContainer}>
        <AnimatedGridPattern className={styles.gridPattern} numSquares={40} maxOpacity={0.4} duration={3} />
      </div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.subtitle} variants={itemVariants}>
          Award Winning Digital Agency
        </motion.span>
        
        <motion.h1 className={styles.title} variants={itemVariants}>
          A digital marketing agency crafting <br />
          <span className="gradient-text">premium brand experiences</span>
        </motion.h1>
        
      </motion.div>

      <button type="button" className={styles.scrollIndicator} onClick={handleScrollDown} aria-label="Scroll to learn about BrandPixo">
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll</span>
      </button>
    </section>
  );
}
