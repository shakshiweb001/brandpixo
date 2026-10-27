import React from 'react';
import styles from './LegalPage.module.scss';

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>BrandPixo / Legal</span>
        <h1>Terms &amp; Conditions</h1>
        <p>Terms governing your use of the BrandPixo website. Last updated: 2 August 2026.</p>
      </header>
      <article className={styles.content}>
        <section><h2>Website use</h2><p>You may use this website for lawful purposes and to learn about BrandPixo services. You must not interfere with its operation, attempt unauthorized access or use its content unlawfully.</p></section>
        <section><h2>Service enquiries</h2><p>Website content and initial discussions are informational and do not create a client relationship. Project scope, fees, timelines and deliverables become binding only when confirmed in a separate written agreement.</p></section>
        <section><h2>Intellectual property</h2><p>Unless otherwise stated, BrandPixo owns the website design, copy, graphics and other original content. They may not be copied, distributed or commercially reused without written permission.</p></section>
        <section><h2>Third-party services</h2><p>This website may link to third-party platforms such as WhatsApp, email providers or social networks. Their availability, content and privacy practices are governed by their own terms.</p></section>
        <section><h2>Limitation of liability</h2><p>We aim to keep website information accurate and available, but do not guarantee uninterrupted access or that every item is error-free. To the extent permitted by law, BrandPixo is not liable for indirect loss resulting from website use.</p></section>
        <section><h2>Changes and contact</h2><p>We may update these terms when our website or practices change. Questions can be sent to <a href="mailto:hello@brandpixo.com">hello@brandpixo.com</a>.</p></section>
      </article>
    </main>
  );
}
