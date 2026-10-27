import React, { useMemo, useState } from 'react';
import { FiArrowUpRight, FiMessageCircle } from 'react-icons/fi';
import styles from './BlogComments.module.scss';
import { submitEnquiry } from '../utils/submitEnquiry';

export default function BlogComments({ slug }) {
  const storageKey = `brandpixo-comments-${slug}`;
  const [comments, setComments] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [form, setForm] = useState({ name: '', comment: '' });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const countLabel = useMemo(() => `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`, [comments.length]);

  const submitComment = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const comment = form.comment.trim();
    if (name.length < 2 || comment.length < 3) { setMessage('Please add your name and a meaningful comment.'); return; }
    setSubmitting(true);
    setMessage('');
    try {
      await submitEnquiry({ name: name.slice(0, 60), email: 'hello@brandpixo.com', article: slug, message: comment.slice(0, 1000) }, 'New blog comment');
      const next = [{ id: `${Date.now()}-${Math.random()}`, name: name.slice(0, 60), comment: comment.slice(0, 1000), date: new Date().toISOString() }, ...comments];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setComments(next); setForm({ name: '', comment: '' }); setMessage('Thanks - your comment has been sent for review.');
    } catch {
      setMessage('We could not send your comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.comments} aria-labelledby="comments-heading">
      <div className={styles.heading}><div className={styles.icon}><FiMessageCircle /></div><div><span>Join the conversation</span><h2 id="comments-heading">Comments</h2></div><strong>{countLabel}</strong></div>
      <form onSubmit={submitComment}>
        <label>Your name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} maxLength="60" autoComplete="name" required /></label>
        <label>Your comment<textarea value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} maxLength="1000" rows="5" required /></label>
        <div><small>Your comment is sent to BrandPixo for review.</small><button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Post comment'} <FiArrowUpRight /></button></div>
        {message && <p className={styles.message} role="status">{message}</p>}
      </form>
      {comments.length > 0 ? <div className={styles.list}>{comments.map((item) => <article key={item.id}><div>{item.name.slice(0, 1).toUpperCase()}</div><section><header><strong>{item.name}</strong><time dateTime={item.date}>{new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(item.date))}</time></header><p>{item.comment}</p></section></article>)}</div> : <p className={styles.empty}>No comments yet. Start the conversation.</p>}
    </section>
  );
}
