import React from 'react';
import { Link } from 'react-router-dom';
import ProjectGallery from '../components/ProjectGallery';
import Contact from '../components/Contact';
import styles from './WorkPage.module.scss';

const categories = [
  ['websites', 'Websites', 'Brand, service and editorial experiences'],
  ['ecommerce', 'Ecommerce', 'Shopping experiences built to convert'],
  ['apps', 'App Design', 'Mobile products with clarity and purpose']
];

export default function WorkPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Work</strong></div>
      <span>Selected digital experiences</span>
      <h1>Work that moves<br /><mark>business forward.</mark></h1>
      <div><p>Explore our website, ecommerce and app design work. Each project is shaped around a different audience, industry and ambition.</p><strong>16 case studies</strong></div>
    </section>
    <section className={styles.categorySection}>
      <div className={styles.categoryIntro}><span>Browse by capability</span><h2>Different work.<br />Different outcomes.</h2></div>
      <div className={styles.categoryGrid}>{categories.map(([slug, title, description]) => <Link to={`/work/${slug}`} key={slug}><span>{title}</span><p>{description}</p><b>Explore <i>↗</i></b></Link>)}</div>
    </section>
    <section className={`dark-section ${styles.gallery}`}>
      <div className={styles.galleryHeading}><span>All work</span><p>16 selected projects across digital experiences, commerce and product design.</p></div>
      <ProjectGallery />
    </section>
    <Contact />
  </main>;
}