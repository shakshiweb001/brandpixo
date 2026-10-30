import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProjectGallery from '../components/ProjectGallery';
import { projectTypes } from '../data/projectsData';
import styles from './WorkPage.module.scss';

export default function WorkCategoryPage() {
  // These pages are routed as /work/websites, /work/ecommerce and /work/apps (no :param), so read the last path segment.
  const category = useLocation().pathname.split('/').filter(Boolean).pop();
  const section = projectTypes[category];
  if (!section) return <main className={styles.page}><section className={styles.hero}><h1>Work category not found.</h1><Link to="/work">Back to work</Link></section></main>;
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><Link to="/work">Work</Link><span>/</span><strong>{section.label}</strong></div>
      <span>BrandPixo portfolio</span><h1>{section.label}<br /><mark>that performs.</mark></h1>
      <div><p>{section.description}</p><Link className={styles.allWork} to="/work">View all work</Link></div>
    </section>
    <section className={`dark-section ${styles.gallery}`}><div className={styles.galleryHeading}><span>{section.label}</span><p>{section.description}</p></div><ProjectGallery type={category} /></section>
  </main>;
}