import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiCheckCircle, FiClock, FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './ContactPage.module.scss';
import { submitEnquiry } from '../utils/submitEnquiry';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', company: '', service: '', contact: 'WhatsApp', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const updateField = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const submitForm = async (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitting(true);
    setError('');
    try {
      await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'Not provided',
        company: formData.company.trim() || 'Not provided',
        service: formData.service || 'Not selected',
        preferred_contact: formData.contact,
        message: formData.message.trim(),
      }, 'Contact page enquiry');
      setSent(true);
    } catch {
      setError('We could not send your enquiry. Please try again or email brandpixo@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Contact us</strong></div>
        <h1>Contact our digital agency.<br /><mark>We’ll shape what’s next.</mark></h1>
        <div className={styles.heroBottom}><span>“</span><div><h2>Big projects can feel complex.<br />Starting shouldn’t.</h2><p>Share what you are building and we’ll suggest a clear, practical next step—without pressure.</p></div></div>
      </section>

      <section className={styles.contactCards}>
        <a href="https://wa.me/917650837963" target="_blank" rel="noreferrer"><FaWhatsapp /><FiArrowUpRight /><span>WhatsApp our team</span><strong>+91 76508 37963</strong><small>Chat directly with a strategist.</small></a>
        <a href="mailto:brandpixo@gmail.com"><FiMail /><FiArrowUpRight /><span>Email us</span><strong>brandpixo@gmail.com</strong><small>Send project details or attach a brief.</small></a>
        <div><FiMapPin /><FiArrowUpRight /><span>Service area</span><strong>India</strong><small>Working with ambitious brands across India.</small></div>
      </section>

      <section className={styles.enquirySection}>
        <div className={styles.enquiryIntro}>
          <span>Private project enquiry</span><h2>A little detail.<br /><em>A clear next step.</em></h2>
          <p>Tell us what you need, where the project stands, and what success should look like. We’ll help make the path forward clear.</p>
          <div className={styles.promises}>
            <div><FiCheck /><span><strong>No-pressure advice</strong><small>Clarity comes before scope.</small></span></div>
            <div><FiClock /><span><strong>Prompt response</strong><small>We reply within one business day.</small></span></div>
            <div><FiCheckCircle /><span><strong>Senior-led support</strong><small>Your enquiry is reviewed by our core team.</small></span></div>
          </div>
        </div>

        <div className={styles.formCard}>
          {!sent ? (
            <form onSubmit={submitForm}>
              <span>Enquiry form</span><h2>How can we help?</h2>
              <div className={styles.formGrid}>
                <label>Your name *<input name="name" value={formData.name} onChange={updateField} placeholder="Full name" required /></label>
                <label>Phone number<input name="phone" value={formData.phone} onChange={updateField} placeholder="Your phone number" /></label>
                <label>Email address *<input name="email" type="email" value={formData.email} onChange={updateField} placeholder="you@example.com" required /></label>
                <label>Company<input name="company" value={formData.company} onChange={updateField} placeholder="Company or brand" /></label>
                <label className={styles.fullField}>What do you need help with?<select name="service" value={formData.service} onChange={updateField}><option value="">Select a service</option><option>Brand strategy</option><option>Website design & development</option><option>UI/UX design</option><option>Digital marketing</option></select></label>
                <fieldset className={styles.fullField}><legend>How should we contact you?</legend><div className={styles.contactChoices}><label className={styles.selectedChoice}><input type="radio" name="contact" value="WhatsApp" checked readOnly />WhatsApp only</label></div></fieldset>
                <label className={styles.fullField}>Tell us about the project *<textarea name="message" value={formData.message} onChange={updateField} placeholder="What are you creating, changing, or ready to improve?" required /></label>
              </div>
              <button type="submit" className="hover-target" disabled={submitting} aria-busy={submitting}>{submitting ? 'Sending...' : 'Send enquiry'} <FiSend /></button>
              {error && <p role="alert">{error}</p>}
            </form>
          ) : (
            <motion.div className={styles.sentPanel} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}><FiCheckCircle /><h2>Inquiry received.</h2><p>A BrandPixo strategist will review your details and reply within one business day.</p></motion.div>
          )}
        </div>
      </section>

      <section className={styles.assuranceStrip}><span>Before you begin</span><div><strong>One business day</strong><small>Typical response time</small></div><div><strong>Worldwide</strong><small>Remote collaboration</small></div><div><strong>Clear proposals</strong><small>Scope before commitment</small></div></section>

      <section className={styles.cta}><span>Ready when you are</span><h2>Let’s build<br /><em>something exceptional.</em></h2><p>Your next digital chapter can start with one clear conversation.</p><a href="https://wa.me/917650837963" target="_blank" rel="noreferrer">WhatsApp our studio <FiArrowUpRight /></a></section>
    </main>
  );
}
