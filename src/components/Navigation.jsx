import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMail, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './Navigation.module.scss';
import { submitEnquiry } from '../utils/submitEnquiry';
import logo from '../assets/brandpixo-logo-nav.webp';

function MegaMenu({ openMega, scheduleMegaClose }) {
  const menuCategories = [
    {
      title: 'Development',
      items: [
        { name: 'Custom Website Development', id: 'custom-website' },
        { name: 'WordPress Development', id: 'wordpress' },
        { name: 'Landing Page Development', id: 'landing-page' },
        { name: 'Shopify Development', id: 'shopify' }
      ]
    },
    {
      title: 'Design',
      items: [
        { name: 'UI/UX Design', id: 'ui-ux' },
        { name: 'Graphic Design', id: 'graphic-design' },
        { name: 'Brand Identity Design', id: 'brand-identity' }
      ]
    },
    {
      title: 'Marketing',
      items: [
        { name: 'SEO Optimization', id: 'seo' },
        { name: 'Social Media Marketing', id: 'social-media' },
        { name: 'Performance Marketing', id: 'performance-marketing' }
      ]
    }
  ];

  return (
    <div 
      className={styles.megaMenu}
      onMouseEnter={openMega}
      onMouseLeave={scheduleMegaClose}
    >
      <div className={styles.megaHeader}>
        <div><span>BrandPixo capabilities</span><strong>Choose what you want to build.</strong></div>
        <Link to="/services" onClick={scheduleMegaClose}>View all services</Link>
      </div>
      <div className={styles.megaGrid}>
        {menuCategories.map((cat, idx) => (
          <div key={idx} className={styles.megaCol}>
            <h4 className={styles.megaColTitle}><span>0{idx + 1}</span>{cat.title}</h4>
            <ul className={styles.megaColList}>
              {cat.items.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={`/services/${item.id}`} 
                    className={`${styles.megaItem} hover-target`}
                    onClick={scheduleMegaClose}
                  >
                    <span>{item.name}</span><span>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkActive, setDarkActive] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaCloseTimer = useRef(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect dark section overlays
      const darkSections = document.querySelectorAll('.dark-section');
      let isDarkActive = false;
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 60) {
          isDarkActive = true;
        }
      });
      setDarkActive(isDarkActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!projectOpen) return undefined;
    const handleKey = (event) => { if (event.key === 'Escape') setProjectOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [projectOpen]);

  const handleCtaClick = () => {
    setMobileOpen(false);
    setSubmitted(false);
    setProjectOpen(true);
  };

  const submitProjectBrief = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    setSubmitError('');
    try {
      await submitEnquiry({
        name: data.get('name').trim(),
        email: data.get('email').trim(),
        service: data.get('service') || 'Not selected',
        message: data.get('message').trim(),
      }, 'Project brief');
      setSubmitted(true);
    } catch {
      setSubmitError('We could not send your brief. Please try again or email hello@brandpixo.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const openMega = () => {
    window.clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };

  const scheduleMegaClose = () => {
    window.clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = window.setTimeout(() => setMegaOpen(false), 220);
  };

  useEffect(() => () => window.clearTimeout(megaCloseTimer.current), []);

  const navClass = `${styles.nav} ${scrolled ? styles.scrolled : ''} ${darkActive ? styles.darkSectionActive : ''} ${mobileOpen ? styles.mobileNavOpen : ''}`;

  return (
    <nav className={navClass} aria-label="Main navigation">
      <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="BrandPixo home">
        <img src={logo} alt="BrandPixo digital marketing and branding agency" width="690" height="198" fetchPriority="high" />
      </Link>
      
      <div className={styles.links}>
        <Link to="/about" className={styles.link}>About</Link>
        
        <div 
          className={styles.menuTrigger}
          onMouseEnter={openMega}
          onMouseLeave={scheduleMegaClose}
        >
          <Link to="/services" className={styles.link}>Services</Link>
          {megaOpen && <MegaMenu openMega={openMega} scheduleMegaClose={scheduleMegaClose} />}
        </div>

        <Link to="/blog" className={styles.link}>Blog</Link>
        <Link to="/work" className={styles.link}>Work</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
        <button onClick={handleCtaClick} className={`${styles.cta} magnetic-button`}>
          Start Project
        </button>
      </div>

      <button 
        className={`${styles.burger} ${mobileOpen ? styles.active : ''}`} 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div id="mobile-navigation" className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <Link to="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
        <Link to="/services" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Services</Link>
        <Link to="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Blog</Link>
        <Link to="/work" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Work</Link>
        <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
        <button className={styles.mobileProject} onClick={handleCtaClick}>Start Project</button>
      </div>

      {projectOpen && (
        <div className={styles.modalOverlay} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProjectOpen(false); }}>
          <section className={styles.projectModal} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button className={styles.modalClose} onClick={() => setProjectOpen(false)} aria-label="Close project enquiry"><FiX /></button>
            {!submitted ? (
              <>
                <div className={styles.modalIntro}><span>Start a project</span><h2 id="project-modal-title">Tell us what you’re ready to build.</h2><p>A few useful details are enough. Our team will reply with a clear next step within one business day.</p><div><a href="mailto:hello@brandpixo.com"><FiMail /> hello@brandpixo.com</a><a href="https://wa.me/917650837963" target="_blank" rel="noreferrer"><FaWhatsapp /> +91 76508 37963</a></div></div>
                <form className={styles.modalForm} onSubmit={submitProjectBrief}>
                  <label>Name<input name="name" placeholder="Your name" required autoFocus /></label>
                  <label>Email<input name="email" type="email" placeholder="you@company.com" required /></label>
                  <label>What do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website design & development</option><option>Brand identity</option><option>UI/UX design</option><option>Digital marketing</option></select></label>
                  <label>Project details<textarea name="message" placeholder="Goals, timeline, and anything useful to know…" required /></label>
                  <button type="submit" disabled={submitting} aria-busy={submitting}>{submitting ? 'Sending...' : 'Send project brief'} <FiArrowRight /></button>
                  {submitError && <p role="alert">{submitError}</p>}
                </form>
              </>
            ) : (
              <div className={styles.modalSuccess}><FiCheckCircle /><span>Brief received</span><h2>Thank you. We’ll be in touch shortly.</h2><p>A BrandPixo strategist will review your details and reply within one business day.</p><button onClick={() => setProjectOpen(false)}>Close</button></div>
            )}
          </section>
        </div>
      )}
    </nav>
  );
}
