'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QR from '@/components/QR';

export default function Share() {
  const [shareMethod, setShareMethod] = useState<'qr' | 'link' | 'text'>('qr');
  const id = 'ALY-12345678';
  const shareUrl = `https://id.allergylink.net/${id}`;

  const handleShare = (method: 'messages' | 'email') => {
    if (method === 'messages') {
      if (navigator.share) {
        navigator.share({
          title: 'My AllergyLink ID',
          text: `Check out my allergy profile: ${shareUrl}`,
          url: shareUrl
        });
      } else {
        window.location.href = `sms:?body=${encodeURIComponent(shareUrl)}`;
      }
    } else {
      window.location.href = `mailto:?subject=My AllergyLink ID&body=${encodeURIComponent(`Check out my allergy profile: ${shareUrl}`)}`;
    }
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>Share Allergy ID</h1>
          <p className="text-muted" style={{ marginBottom: '32px' }}>
            Choose how you want to share. You control who receives updates.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShareMethod('qr')}
              className={shareMethod === 'qr' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            >
              QR Code
            </button>
            <button
              onClick={() => setShareMethod('link')}
              className={shareMethod === 'link' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            >
              Link
            </button>
            <button
              onClick={() => setShareMethod('text')}
              className={shareMethod === 'text' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            >
              Text
            </button>
          </div>

          {shareMethod === 'qr' && (
            <div style={{
              background: 'var(--color-bg)',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center',
              marginBottom: '24px',
              border: '1px solid var(--color-border)'
            }}>
              <QR value={shareUrl} size={200} />
              <p className="text-muted" style={{ marginTop: '16px', marginBottom: 0, fontFamily: 'monospace' }}>
                {id}
              </p>
            </div>
          )}

          {shareMethod === 'link' && (
            <div style={{
              background: 'var(--color-bg)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid var(--color-border)'
            }}>
              <p className="text-muted" style={{ marginBottom: '8px', fontSize: '0.875rem' }}>Share this link:</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  style={{
                    flex: 1,
                    background: 'white',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert('Link copied!');
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {shareMethod === 'text' && (
            <div style={{
              background: 'var(--color-bg)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid var(--color-border)'
            }}>
              <p className="text-muted" style={{ marginBottom: '8px', fontSize: '0.875rem' }}>AllergyLink ID:</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  value={id}
                  readOnly
                  style={{
                    flex: 1,
                    background: 'white',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(id);
                    alert('ID copied!');
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              className="btn btn-primary btn-full"
              onClick={() => handleShare('messages')}
            >
              Share to Messages
            </button>
            <button
              className="btn btn-secondary btn-full"
              onClick={() => handleShare('email')}
            >
              Share to Email
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
