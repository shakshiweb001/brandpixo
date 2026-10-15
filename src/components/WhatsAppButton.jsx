import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppButton.module.scss';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hello BrandPixo! I would like to discuss a project.');

  return (
    <a
      className={`${styles.button} hover-target`}
      href={`https://wa.me/917650837963?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with BrandPixo on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
