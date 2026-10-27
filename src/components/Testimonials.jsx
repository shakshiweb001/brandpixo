import React from 'react';
import { m as motion } from 'framer-motion';
import styles from './Testimonials.module.scss';

export const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 12,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          paddingBottom: '1.5rem'
        }}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ quote, avatar, name, role }, i) => (
              <div 
                key={`${index}-${i}`}
                style={{
                  padding: '2.5rem',
                  borderRadius: '24px',
                  border: '1px solid #EAEAEA',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.01)',
                  maxWidth: '350px',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(15px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '0.98rem', color: '#1F1F1F', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "{quote}"
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <img
                    width={40}
                    height={40}
                    src={avatar}
                    alt={`${name}, BrandPixo digital marketing client`}
                    loading="lazy"
                    style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#181818' }}>{name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6B6B6B' }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const testimonialsData = [
    {
      quote: "BrandPixo transformed our online presence. Their design process was collaborative and the visual assets they generated put us in a league of our own.",
      name: "Sarah Jenkins",
      role: "CEO, Aura Luxury Group",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "The web development team delivered a high-performance e-commerce platform that increased our sales conversion metrics by 40% in just two months.",
      name: "Marcus Vance",
      role: "Founder, Velo Co.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Their digital marketing strategy is highly targeted and data-driven. The SEO ranking results exceeded our expectations within the first quarter.",
      name: "Elena Rostova",
      role: "Marketing Director, Solstice",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  // Distribute testimonials slightly differently for the columns
  const firstHalf = testimonialsData;
  const secondHalf = [...testimonialsData].reverse();

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.header}>
        <span className={styles.tag}>Client Feedback</span>
        <h2 className={styles.title}>What They Say</h2>
      </div>

      <div className={styles.carouselContainer}>
        <TestimonialsColumn 
          className={styles.column} 
          testimonials={firstHalf} 
          duration={15} 
        />
        <TestimonialsColumn 
          className={`${styles.column} ${styles.mobileHide}`} 
          testimonials={secondHalf} 
          duration={22} 
        />
      </div>
    </section>
  );
}
