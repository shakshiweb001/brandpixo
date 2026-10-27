import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { projects, getProjectsByType, cardImage } from '../data/projectsData';
import styles from './ProjectGallery.module.scss';

export default function ProjectGallery({ limit, type }) {
  const categoryProjects = type ? getProjectsByType(type) : projects;
  const visibleProjects = limit ? categoryProjects.slice(0, limit) : categoryProjects;
  return <div className={styles.grid}>
    {visibleProjects.map((project, index) => (
      <article className={`${styles.card} ${(project.type || 'websites') === 'app' ? styles.appCard : ''}`} key={project.slug}>
        <Link className={styles.preview} to={`/work/${project.slug}`} aria-label={`View the ${project.title} case study`}>
          <img src={cardImage(project)} alt={project.alt} width="1000" height="1250" loading="lazy" decoding="async" />
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div><strong>View case study</strong><small>Explore the project</small></div>
        </Link>
        <div className={styles.meta}><div><span>{project.category}</span><h3>{project.title}</h3></div><Link to={`/work/${project.slug}`} aria-label={`View the ${project.title} case study`}><FiArrowUpRight /></Link></div>
      </article>
    ))}
  </div>;
}