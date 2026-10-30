import React from 'react';
import { Link } from 'react-router-dom';

// Turns "text [label](/path) text" into plain text plus real <Link>s, so articles can link naturally.
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function renderRich(text, linkClassName) {
  if (typeof text !== 'string' || !text.includes('](/')) return text;
  const parts = [];
  let last = 0;
  let match;
  LINK.lastIndex = 0;
  while ((match = LINK.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<Link key={match.index} to={match[2]} className={linkClassName}>{match[1]}</Link>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Plain-text version (markup removed) for places that must not contain links, e.g. structured data.
export const stripRich = (text) => (typeof text === 'string' ? text.replace(LINK, '$1') : text);
