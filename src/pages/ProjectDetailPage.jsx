import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { getProject, projects, cardImage } from '../data/projectsData';
import { servicesData } from '../data/servicesData';
import { projectServices, projectCategory, categoryLabels } from '../data/internalLinks';
import styles from './ProjectDetailPage.module.scss';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <main className={styles.notFound}><h1>Project not found.</h1><Link to="/work">Back to our work</Link></main>;
  const nextProject = projects[(projects.findIndex((item) => item.slug === slug) + 1) % projects.length];
  const category = projectCategory(project);
  const sameCategory = projects.filter((item) => projectCategory(item) === category && item.slug !== slug);
  const start = Math.max(0, projects.filter((item) => projectCategory(item) === category).findIndex((item) => item.slug === slug));
  const moreProjects = [...sameCategory.slice(start), ...sameCategory.slice(0, start)].slice(0, 3);
  const relatedServices = projectServices[category] || [];
  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><Link to="/work">Work</Link><span>/</span><strong>{project.title}</strong></div><div className={styles.heroTitle}><div><span>{project.category}</span><h1>{project.title}</h1></div><p>{project.intro}</p></div><div className={styles.heroMeta}><span>Case study</span><span>{project.year}</span><span>BrandPixo</span></div></section>
    <section className={styles.showcase}><img src={project.image} alt={project.alt} fetchPriority="high" /></section>
    <section className={styles.story}><div className={styles.sideLabel}>Project overview</div><div className={styles.copy}><div><span>The challenge</span><h2>{project.challenge}</h2></div><div><span>Our approach</span><p>{project.solution}</p></div></div></section>
    <section className={styles.details}><div><span>What we shaped</span><ul>{project.services.map((service) => <li key={service}><FiCheck />{service}</li>)}</ul></div><div><span>Built to deliver</span><ul>{project.outcomes.map((outcome) => <li key={outcome}><FiCheck />{outcome}</li>)}</ul></div></section>
    <section className={styles.related}>
      <div>
        <span>Related services</span>
        <div className={styles.relatedChips}>{relatedServices.map((id) => <Link key={id} to={`/services/${id}`}>{servicesData[id].title}</Link>)}</div>
      </div>
      {moreProjects.length > 0 && <div>
        <span>More {categoryLabels[category]} projects</span>
        <div className={styles.relatedProjects}>{moreProjects.map((item) => <Link key={item.slug} to={`/work/${item.slug}`}><img src={cardImage(item)} alt="" width="1000" height="1250" loading="lazy" decoding="async" /><div><small>{item.category}</small><strong>{item.title}</strong></div></Link>)}</div>
        <Link to={`/work/${category}`} className={styles.relatedAll}>See all {categoryLabels[category]} projects <FiArrowUpRight /></Link>
      </div>}
    </section>
    <section className={styles.cta}><span>Have a project in mind?</span><h2>Let’s create a digital experience that <em>earns attention.</em></h2><Link to="/contact">Start a conversation <FiArrowRight /></Link></section>
    <section className={styles.next}><span>Continue exploring</span><Link to={`/work/${nextProject.slug}`}><div><small>Next project</small><h2>{nextProject.title}</h2></div><FiArrowUpRight /></Link></section>
  </main>;
}