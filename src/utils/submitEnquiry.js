import { trackEvent } from './analytics';

const ENDPOINT = 'https://api.web3forms.com/submit';

export async function submitEnquiry(fields, formName = 'Website enquiry') {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) throw new Error('Email delivery is not configured.');

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `${formName} from ${fields.name || 'a website visitor'}`,
      from_name: 'BrandPixo Website',
      replyto: fields.email,
      recipient: 'hello@brandpixo.com',
      ...fields,
    }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Email delivery failed.');
  }

  // Blog comments are not sales leads, so report them under their own event.
  const isComment = /comment/i.test(formName);
  trackEvent(isComment ? 'blog_comment' : 'generate_lead', {
    form_name: formName,
    service: fields.service || undefined,
    page_path: window.location.pathname,
  });

  return result;
}
