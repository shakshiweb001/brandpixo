import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import styles from './FAQ.module.scss';
import { homeFaqs } from '../data/homeFaqs';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.header}>
        <span className={styles.tag}>Good questions, clear answers</span>
        <h2 className={styles.title}>Before we begin, here’s what clients usually ask.</h2>
        <p>A quick overview of timelines, technology, SEO, and how we work so you can move forward with clarity.</p>
      </div>

      <div className={styles.list}>
        {homeFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={faq.q} className={styles.item}>
              <button className={`${styles.trigger} hover-target`} onClick={() => toggle(idx)} aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`}>
                <span>0{idx + 1}</span><h3>{faq.q}</h3>
                <FiChevronDown className={`${styles.icon} ${isOpen ? styles.active : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={styles.answer}
                    id={`faq-answer-${idx}`}
                  >
                    <p style={{ paddingBottom: '1.5rem' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
