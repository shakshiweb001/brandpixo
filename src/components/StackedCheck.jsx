import React from 'react';
import { FiCheck } from 'react-icons/fi';
import styles from './StackedCheck.module.scss';

// Layered check icon used for feature and benefit lists across the site.
export default function StackedCheck({ className = '' }) {
  return (
    <span className={`${styles.stackedIcon} ${className}`} aria-hidden="true">
      <i />
      <i />
      <FiCheck className={styles.icon} />
    </span>
  );
}
