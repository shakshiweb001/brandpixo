import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiMail,
  FiPlus
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import { getProject, cardImage } from '../data/projectsData';
import { serviceReading, serviceWork } from '../data/internalLinks';
import { servicesData } from '../data/servicesData';
import styles from './ServiceDetailPage.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = servicesData[serviceId];
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(0);
  }, [serviceId]);

  if (!service) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Digital marketing service not found.</h1>
          <Link to="/services">Back to services</Link>
        </div>
      </main>
    );
  }

  const otherServices = Object.entries(servicesData)
    .filter(([id]) => id !== serviceId)
    .slice(0, 2);
  const readingPosts = (serviceReading[serviceId] || []).map((slug) => blogPosts.find((post) => post.slug === slug)).filter(Boolean);
  const workProjects = (serviceWork[serviceId] || []).map((slug) => getProject(slug)).filter(Boolean);
  const faqItems = service.defaultFaqs === false ? service.faqs : [
    ...service.faqs,
    {
      q: `What is included in a ${service.title} engagement?`,
      a: 'Discovery, strategic direction, production, quality assurance, and a polished final handover are included. Your exact deliverables are confirmed before work begins.'
    },
    {
      q: 'How long does the project usually take?',
      a: `Most ${service.title.toLowerCase()} projects move from kickoff to delivery within four to eight weeks, depending on scope and feedback speed.`
    },
    {
      q: 'How do feedback and revisions work?',
      a: 'Feedback is gathered at clear milestones. Every phase includes focused refinement before approval, keeping decisions calm and progress predictable.'
    }
  ];

  return (
    <main className={styles.page}>
      <section className={styles.titleBanner}>
        <motion.div className={styles.bannerInner} initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><strong>{service.title}</strong>
          </nav>
          <span className={styles.kicker}>{service.category}</span>
          <h1>{service.title} <em>Services</em></h1>
          <p className={styles.lead}>{service.tagline}</p>
          <div className={styles.bannerActions}>
            <Link to="/contact" className={styles.bannerPrimary}>Start a project <FiArrowUpRight /></Link>
            <a href="https://wa.me/917650837963" target="_blank" rel="noreferrer" className={styles.bannerSecondary}><FaWhatsapp /> WhatsApp an expert</a>
          </div>
          <ul className={styles.bannerFeatures} aria-label={`What's included in ${service.title}`}>
            {service.features.slice(0, 4).map((feature) => <li key={feature.title}>{feature.title}</li>)}
          </ul>
        </motion.div>
      </section>

      <section className={styles.detailLayout}>
        <div className={styles.mainColumn}>
          <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <img src={service.heroImage} alt={`${service.title} services by BrandPixo`} fetchPriority="high" />
            <span>{service.category}</span>
          </motion.div>

          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}><FiPlus /> What we offer</span>
            <h2>{service.title}</h2>
            <p>{service.aboutText}</p>
          </div>

          <div className={styles.offerGrid}>
            <article>
              <span>Core features</span>
              <ul>
                {service.features.map((feature) => <li key={feature.title}><span className={styles.stackedIcon}><i /><i /><FiCheck /></span><span>{feature.title}</span></li>)}
              </ul>
            </article>
            <article>
              <span>What this improves</span>
              <ul>
                {service.benefits.map((benefit) => <li key={benefit.title}><span className={styles.stackedIcon}><i /><i /><FiCheck /></span><span>{benefit.title}</span></li>)}
                <li><span className={styles.stackedIcon}><i /><i /><FiCheck /></span><span>Thoughtful quality assurance</span></li>
                <li><span className={styles.stackedIcon}><i /><i /><FiCheck /></span><span>Clear final handover</span></li>
              </ul>
            </article>
          </div>

          {service.features.some((feature) => feature.desc) && (
            <div className={styles.detailBlock}>
              <span className={styles.eyebrow}>What's included</span>
              <h2>{service.featuresHeading || `What our ${service.title.toLowerCase()} covers`}</h2>
              <div className={styles.detailGrid}>
                {service.features.map((feature) => (
                  <article key={feature.title}>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {(service.contentSections || []).map((section) => (
            <div className={styles.detailBlock} key={section.title}>
              <h2>{section.title}</h2>
              {(section.paragraphs || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && (
                <ul className={styles.detailList}>
                  {section.list.map((item) => <li key={item}><FiCheck /> <span>{item}</span></li>)}
                </ul>
              )}
            </div>
          ))}

          {service.process?.length > 0 && (
            <div className={styles.detailBlock}>
              <span className={styles.eyebrow}>How we work</span>
              <h2>{service.processHeading || `Our ${service.title.toLowerCase()} process`}</h2>
              <ol className={styles.processList}>
                {service.process.map((step, index) => (
                  <li key={step.title}>
                    <strong>{String(index + 1).padStart(2, '0')}</strong>
                    <div><h3>{step.title}</h3><p>{step.desc}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {service.technologies?.length > 0 && (
            <div className={styles.detailBlock}>
              <span className={styles.eyebrow}>Tools we use</span>
              <div className={styles.toolTags}>
                {service.technologies.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>
          )}

          <div className={styles.whyChoose}>
            <span className={styles.eyebrow}>Why choose BrandPixo</span>
            <h3>{service.tagline}</h3>
            <p>We combine strategic clarity with high-end execution, so the finished work feels distinctive, performs reliably, and stays useful as your business grows.</p>
            <div className={styles.reasons}>
              {['Senior-led expertise', 'Tailored strategy', 'Refined creative craft', 'Results-oriented delivery'].map((reason) => (
                <span key={reason}><FiCheck /> {reason}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sideHeading}><span>Explore</span><h3>Other Services</h3></div>
          {otherServices.map(([id, item]) => (
            <Link className={`${styles.serviceLink} hover-target`} to={`/services/${id}`} key={id}>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
              <FiArrowUpRight />
            </Link>
          ))}
          <div className={styles.contactCard}>
            <span>Start a conversation</span>
            <a href="https://wa.me/917650837963" target="_blank" rel="noreferrer"><FaWhatsapp /><div><small>WhatsApp an expert</small><strong>+91 76508 37963</strong></div></a>
            <a href="mailto:hello@brandpixo.com"><FiMail /><div><small>Email us</small><strong>hello@brandpixo.com</strong></div></a>
            <Link to="/contact" className={`${styles.ctaLink} hover-target`}>Get in touch <FiArrowRight /></Link>
          </div>
        </aside>
      </section>

      {(readingPosts.length > 0 || workProjects.length > 0) && (
        <section className={styles.related}>
          {readingPosts.length > 0 && (
            <div>
              <span className={styles.eyebrow}><FiPlus /> From the journal</span>
              <h2>Helpful reading</h2>
              <div className={styles.relatedList}>
                {readingPosts.map((post) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className={`${styles.relatedItem} hover-target`}>
                    <img src={post.image} alt="" width="1376" height="768" loading="lazy" decoding="async" />
                    <div><span>{post.category}</span><strong>{post.title}</strong></div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {workProjects.length > 0 && (
            <div>
              <span className={styles.eyebrow}><FiPlus /> Selected work</span>
              <h2>Projects we have designed and built</h2>
              <div className={styles.relatedList}>
                {workProjects.map((project) => (
                  <Link key={project.slug} to={`/work/${project.slug}`} className={`${styles.relatedItem} hover-target`}>
                    <img src={cardImage(project)} alt="" width="1000" height="1250" loading="lazy" decoding="async" />
                    <div><span>{project.category}</span><strong>{project.title}</strong></div>
                  </Link>
                ))}
              </div>
              <Link to="/work" className={styles.relatedAll}>View all work <FiArrowUpRight /></Link>
            </div>
          )}
        </section>
      )}

      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <span className={styles.eyebrow}><FiPlus /> FAQs</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`} key={faq.q}>
                <button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-label={`${isOpen ? 'Close' : 'Open'} answer: ${faq.q}`}>
                  <span>{faq.q}</span><FiChevronDown />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div><span>Build with BrandPixo</span><h2>Is your business ready for the <em>digital leap?</em></h2><p>Let’s shape a premium digital experience around your next stage of growth.</p></div>
        <div className={styles.ctaContact}>
          <a href="https://wa.me/917650837963" target="_blank" rel="noreferrer"><FaWhatsapp /><span><small>WhatsApp an expert</small><strong>+91 76508 37963</strong></span></a>
          <a href="mailto:hello@brandpixo.com"><FiMail /><span><small>Email us</small><strong>hello@brandpixo.com</strong></span></a>
          <Link to="/contact" className={`${styles.ctaLink} hover-target`}>Start your project <FiArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}
