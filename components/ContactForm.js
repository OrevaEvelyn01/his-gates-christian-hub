'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.website.value) return; // spam trap: real people never fill this
    setStatus('sending');
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Your name</label>
      <input id="name" name="name" required />

      <label htmlFor="email">Your email</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required />

      <input className="hidden-field" name="website" tabIndex={-1} autoComplete="off" />

      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>

      {status === 'sent' && <p className="notice">Thank you. Your message has been sent.</p>}
      {status === 'error' && (
        <p className="notice">Sorry, something went wrong. Please try again or use the contact details above.</p>
      )}
    </form>
  );
}