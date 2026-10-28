import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { m as motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiClock, FiMonitor, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { blogPosts, getBlogPost } from '../data/blogPosts';
import BlogComments from '../components/BlogComments';
import styles from './BlogDetailPage.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Article not found.</h1>
          <Link to="/blog">Back to journal</Link>
        </div>
      </main>
    );
  }

  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = blogPosts.length > 1 ? blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length] : null;
  const nextPost = blogPosts.length > 1 ? blogPosts[(currentIndex + 1) % blogPosts.length] : null;
  const relatedPosts = post.related
    .map((relatedSlug) => blogPosts.find((item) => item.slug === relatedSlug))
    .filter(Boolean);
  const imageOne = relatedPosts[0]?.image || post.image;
  const imageTwo = relatedPosts[1]?.image || post.image;
  const relatedRail = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 4);

  return (
    <main className={styles.page}>
      <motion.div className={styles.progress} style={{ scaleX }} />

      <header className={styles.hero}>
        <div className={styles.iconStack} aria-hidden="true"><span><FiMonitor /></span><span><FiSearch /></span><span><FiTrendingUp /></span></div>
        <div className={styles.heroMeta}>
          <Link to="/blog"><FiArrowLeft /> Journal</Link>
          <div><span>{post.category}</span><span><FiClock /> {post.readTime}</span></div>
        </div>
        <motion.div className={styles.heroCopy} initial="hidden" animate="visible" variants={fadeUp}>
          <span className={styles.eyebrow}>Field Note / {post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.intro}</p>
        </motion.div>
        <motion.figure className={styles.heroPhoto} initial={{ opacity: 0, y: 34, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .85, ease: [0.16, 1, 0.3, 1] }}>
          <span className={styles.tape} />
          <img src={post.image} alt={post.imageAlt} fetchPriority="high" />
          <figcaption>BrandPixo Journal — {post.category}</figcaption>
        </motion.figure>
      </header>

      <article className={styles.article}>
        {relatedRail.length > 0 && <aside className={styles.relatedRail} aria-label="Related blogs">
          <div className={styles.relatedRailInner}>
            <span className={styles.relatedLabel}>Keep reading</span>
            <h2>Related blogs</h2>
            <div className={styles.relatedList}>
              {relatedRail.map((item, index) => (
                <Link key={item.slug} to={`/blog/${item.slug}`} className={styles.relatedCard}>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <div>
                    <span>0{index + 1} / {item.category}</span>
                    <h3>{item.title}</h3>
                    <small>{item.readTime} <FiArrowUpRight /></small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>}

        <div className={styles.articleContent}>
        <div className={styles.openingGrid}><p className={styles.lead}>{post.excerpt}</p></div>

        {post.sections.map((section, index) => (
          <React.Fragment key={section.title}>
            <motion.section id={`section-${index + 1}`} className={styles.articleSection} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <span>0{index + 1} / Insight</span>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.body && <p>{section.body}</p>}
              {section.table && <div className={styles.tableWrap}><table><thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
              {section.list && <ul className={styles.articleList}>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.faqs && <div className={styles.articleFaqs}>{section.faqs.map((item) => <div key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</div>}
              {section.closing && <p>{section.closing}</p>}
              {section.link && <Link className={styles.inlineLink} to={section.link.to}>{section.link.label} <FiArrowUpRight /></Link>}
              {section.links && <div className={styles.serviceLinks}>{section.links.map((link) => <Link key={link.to} to={link.to}>{link.label} <FiArrowUpRight /></Link>)}</div>}
            </motion.section>

            {index === 0 && (
              <>
                <blockquote>{post.pullQuote}</blockquote>
                {relatedPosts.length > 0 && <div className={styles.photoPair}>
                  <figure><span>Related perspective</span><img src={imageOne} alt={relatedPosts[0]?.imageAlt || post.imageAlt} loading="lazy" /><figcaption>{relatedPosts[0]?.title || post.title}</figcaption></figure>
                  <figure><span>Another angle</span><img src={imageTwo} alt={relatedPosts[1]?.imageAlt || post.imageAlt} loading="lazy" /><figcaption>{relatedPosts[1]?.title || post.title}</figcaption></figure>
                </div>}
              </>
            )}

          </React.Fragment>
        ))}

        <section className={styles.authorCard}>
          <div className={styles.authorMark}>BP</div>
          <div><span>Written by</span><h3>BrandPixo Editorial Team</h3><p>Practical guidance shaped by brand strategy, digital design, and conversion experience.</p><div className={styles.authorTags}><span>Brand strategy</span><span>Digital craft</span></div></div>
          <Link to="/blog" className={styles.tapLink}>More field notes <FiArrowUpRight /></Link>
        </section>

        <Link to="/contact" className={`${styles.askButton} hover-target`}>Ask our team <FiArrowUpRight /></Link>

        <BlogComments slug={post.slug} />

        {previousPost && nextPost && <nav className={styles.postNav} aria-label="Article navigation">
          <Link to={`/blog/${previousPost.slug}`}><span><FiArrowLeft /> Previous</span><strong>{previousPost.title}</strong></Link>
          <Link to={`/blog/${nextPost.slug}`}><span>Next <FiArrowRight /></span><strong>{nextPost.title}</strong></Link>
        </nav>}
        </div>
      </article>
    </main>
  );
}
