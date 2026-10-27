import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import styles from './Contact.module.scss';
import { submitEnquiry } from '../utils/submitEnquiry';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;

    setSubmitting(true);
    setError('');
    try {
      await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      }, 'New project enquiry');
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setError('We could not send your enquiry. Please try again or email hello@brandpixo.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.left}>
        <span className={styles.tag}>Connect</span>
        <h2 className={styles.title}>Let's Build Something Exceptional</h2>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.label}>General Inquiries</span>
            <a href="mailto:hello@brandpixo.com" className={styles.val}>hello@brandpixo.com</a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>WhatsApp Us</span>
            <a href="https://wa.me/917650837963" target="_blank" rel="noreferrer" className={styles.val}>+91 76508 37963</a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Main Headquarters</span>
            <span className={styles.val}>India</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {!success ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className={styles.input} 
                placeholder=" "
                required 
              />
              <label className={styles.formLabel}>Name</label>
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className={styles.input} 
                placeholder=" "
                required 
              />
              <label className={styles.formLabel}>Email</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleInputChange} 
                className={styles.textarea} 
                placeholder=" "
                required
              />
              <label className={styles.formLabel}>Project Details</label>
            </div>

            <button type="submit" className={`${styles.btnSubmit} hover-target`} disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Sending…' : 'Send Proposal'}
            </button>
            {error && <p className={styles.errorMessage} role="alert">{error}</p>}
          </form>
        ) : (
          <motion.div 
            className={styles.successMessage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiCheckCircle className={styles.successIcon} />
            <h3>Proposal Sent!</h3>
            <p>Thank you for reaching out. A partner strategist will contact you within 24 hours.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
