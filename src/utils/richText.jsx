import React from 'react';
import { Link } from 'react-router-dom';

// Supports natural inline links to both internal BrandPixo pages and trusted external references.
const LINK = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^\s)]+)\)/g;

export function renderRich(text, linkClassName) {
  if (typeof text !== 'string' || !text.includes('](')) return text;
  const parts = [];
  let last = 0;
  let match;
  LINK.lastIndex = 0;
  while ((match = LINK.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const href = match[2];
    parts.push(
      href.startsWith('/')
        ? <Link key={match.index} to={href} className={linkClassName}>{match[1]}</Link>
        : <a key={match.index} href={href} className={linkClassName} target="_blank" rel="noopener noreferrer">{match[1]}</a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

// Plain-text version for metadata and structured data.
export const stripRich = (text) => (typeof text === 'string' ? text.replace(LINK, '$1') : text);
