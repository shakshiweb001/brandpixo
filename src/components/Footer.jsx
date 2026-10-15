import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiArrowUp, FiArrowUpRight, FiMail, FiMessageCircle } from 'react-icons/fi';
import { servicesData } from '../data/servicesData';
import styles from './Footer.module.scss';

const serviceLinks = ['custom-website', 'wordpress', 'shopify', 'seo', 'social-media'];

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`dark-section ${styles.footer}`}>
      <div className={styles.top}>
        <div className={styles.ctaText}>
          <span>Let’s work together</span>
          <h2>Ready to elevate your brand?</h2>
          <p>Let's design premium solutions built around your goals.</p>
        </div>
        <Link to="/contact" className={`${styles.btnPrimary} hover-target`}>
          Get In Touch <FiArrowUpRight />
        </Link>
      </div>

      <div className={styles.middle}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>BrandPixo<i>.</i></Link>
          <p>We are a full-service creative digital agency engineering high-end designs and digital marketing solutions.</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover-target" aria-label="BrandPixo on Instagram"><FiInstagram /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover-target" aria-label="BrandPixo on Facebook"><FiFacebook /></a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4>Agency</h4>
          <ul>
            <li><Link to="/about" className="hover-target">About Us</Link></li>
            <li><Link to="/services" className="hover-target">Our Services</Link></li>
            <li><Link to="/work" className="hover-target">Selected Work</Link></li>
            <li><Link to="/blog" className="hover-target">Journal</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Services</h4>
          <ul>
            {serviceLinks.map((id) => (
              <li key={id}><Link to={`/services/${id}`} className="hover-target">{servicesData[id].title}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Connect</h4>
          <ul className={styles.contactList}>
            <li><a href="mailto:brandpixo@gmail.com" className="hover-target"><FiMail /> brandpixo@gmail.com</a></li>
            <li><a href="https://wa.me/917650837963" target="_blank" rel="noreferrer" className="hover-target"><FiMessageCircle /> +91 76508 37963</a></li>
            <li><Link to="/contact" className="hover-target"><FiArrowUpRight /> Get a Quote</Link></li>
          </ul>
          <a href="https://wa.me/917650837963" target="_blank" rel="noreferrer" className={`${styles.qrCard} hover-target`}>
            <img src="/qr-whatsapp-7650837963.svg" alt="QR code to chat with BrandPixo on WhatsApp at +91 76508 37963" width="96" height="96" loading="lazy" />
            <span><strong>Scan to chat</strong>WhatsApp<br />+91 76508 37963</span>
          </a>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">BrandPixo</div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} BrandPixo. All rights reserved.</span>

        <nav className={styles.legalLinks} aria-label="Legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
        </nav>

        <button className={`${styles.backToTop} hover-target`} onClick={scrollUp} aria-label="Back to top">
          Back to top <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
