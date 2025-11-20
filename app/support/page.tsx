'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: just show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Support</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Have questions? We're here to help. Fill out the form below or email us directly.
          </p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✓</div>
                <h3 style={{ marginBottom: '8px', color: 'var(--color-success)' }}>Message Sent!</h3>
                <p className="text-muted">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={6}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1.5px solid var(--color-border)',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full" style={{ minHeight: '48px' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="card" style={{ marginTop: '24px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '12px' }}>Or email us directly</h3>
            <p className="text-muted" style={{ marginBottom: '16px' }}>
              <a href="mailto:support@allergylink.com" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
                support@allergylink.com
              </a>
            </p>
            <p className="text-muted" style={{ fontSize: '0.875rem', margin: 0 }}>
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
