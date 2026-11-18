import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { industries, industryList } from '../data/industriesData';
import { servicesData } from '../data/servicesData';
import { getProject, cardImage } from '../data/projectsData';
import NotFoundPage from './NotFoundPage';
import styles from './IndustryPage.module.scss';

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } } };

export default function IndustryPage() {
  const { slug } = useParams();
  const industry = industries[slug];
  if (!industry) return <NotFoundPage />;

  const projects = industry.projectSlugs.map(getProject).filter(Boolean);
  const services = industry.serviceIds.map((id) => [id, servicesData[id]]).filter(([, service]) => service);
  const others = industryList.filter((item) => item.slug !== slug);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><span>Industries</span><span>/</span><strong>{industry.name}</strong></div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className={styles.eyebrow}>Industries we work with</span>
          <h1>{industry.heading}</h1>
          <p>{industry.intro}</p>
          <Link to="/contact" className={styles.primary}>Discuss your project <FiArrowUpRight /></Link>
        </motion.div>
      </section>

      <section className={styles.points}>
        <h2>What we focus on for {industry.name.toLowerCase()} brands</h2>
        <div>
          {industry.points.map(([title, copy]) => (
            <article key={title}><FiCheck aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className={styles.work}>
          <h2>Related {industry.name.toLowerCase()} projects</h2>
          <div>
            {projects.map((project) => (
              <Link key={project.slug} to={`/work/${project.slug}`}>
                <img src={cardImage(project)} alt={project.alt} width="1000" height="1250" loading="lazy" decoding="async" />
                <span>{project.category}</span><strong>{project.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.services}>
        <h2>Services that fit {industry.name.toLowerCase()}</h2>
        <div>{services.map(([id, service]) => <Link key={id} to={`/services/${id}`}>{service.title} <FiArrowUpRight /></Link>)}</div>
      </section>

      <section className={styles.more}>
        <span>Other industries</span>
        <div>{others.map((item) => <Link key={item.slug} to={`/industries/${item.slug}`}>{item.name}</Link>)}</div>
      </section>
    </main>
  );
}
