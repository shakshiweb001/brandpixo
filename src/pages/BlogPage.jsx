import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiLayers, FiPenTool, FiTrendingUp } from 'react-icons/fi';
import { blogPosts } from '../data/blogPosts';
import styles from './BlogPage.module.scss';

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Journal</strong></div>

        <div className={styles.iconStack} aria-hidden="true">
          <span><FiPenTool /></span>
          <span><FiLayers /></span>
          <span><FiTrendingUp /></span>
        </div>

        <div className={styles.heroTitle}>
          <span className={styles.eyebrow}>BrandPixo Journal</span>
          <h1>Digital marketing insights.<br /><mark>Sharper brands.</mark></h1>
        </div>

        <div className={styles.heroBanner}>
          <div className={styles.bannerFrame}>
            <img 
              src="/blog/blog-hero-banner.jpg" 
              alt="BrandPixo Journal — The New Era of Digital Creativity" 
              className={styles.bannerImage}
              fetchPriority="high"
            />
            <div className={styles.bannerTagline}>
              <span className={styles.bannerIssue}>Volume 2026 // Studio Notes</span>
              <span className={styles.bannerCategory}>Digital Craft &amp; Growth Insights</span>
            </div>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <span className={styles.quoteMark}>“</span>
          <div className={styles.statementCard}>
            <h2>Clear thinking.<br />No empty trends.</h2>
            <p>Practical perspectives on premium design, brand trust, and growth-focused digital experiences.</p>
          </div>
        </div>
      </section>

      <section className={styles.journal}>
        <div className={styles.sectionHeading}>
          <h2>Fresh from<br /><span>the studio.</span></h2>
          <p>Considered reads for ambitious teams building a more trusted and effective digital presence.</p>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
            <article className={`${styles.blogCard} ${index === 1 ? styles.accentCard : ''}`} key={post.slug}>
              <div className={styles.cardImage}>
                <img src={post.image} alt={post.imageAlt} loading="lazy" />
                <span>BrandPixo Journal</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.blogMeta}><span>0{index + 1} · {post.category}</span><span>{post.readTime}</span></div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className={`${styles.cardLink} hover-target`} aria-label={`Read ${post.title}`}><FiArrowUpRight /></Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cardCount}><span>01</span><div><i /></div><span>0{blogPosts.length}</span></div>
      </section>

      <section className={styles.cta}>
        <span className={styles.eyebrow}>Ready to make an impression?</span>
        <h2>Let’s shape<br /><em>your digital presence.</em></h2>
        <p>Bring clarity, character, and performance together in one premium experience.</p>
        <div>
          <a href="mailto:brandpixo@gmail.com">Email BrandPixo</a>
          <Link to="/contact" className="hover-target">Start a project <FiArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}
