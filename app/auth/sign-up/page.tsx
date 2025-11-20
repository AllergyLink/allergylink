'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SignUp() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      setCodeSent(true);
      alert('Demo: Code sent! Use 123456 to verify.');
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '123456') {
      window.location.href = '/create';
    } else {
      alert('Incorrect code. Demo code is 123456');
    }
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
        <div className="card" style={{ maxWidth: '440px', width: '100%' }}>
          <h1>Create Account</h1>
          <p className="text-muted" style={{ marginBottom: '32px' }}>
            No username or password required. No credit card needed. Just enter your phone number to create an account.
          </p>

          {!codeSent ? (
            <form onSubmit={handleSendCode}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="(555) 555-1212"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ marginBottom: '24px' }}
              />
              <button type="submit" className="btn btn-primary btn-full">
                Send one-time code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <label htmlFor="code">Enter 6-digit code</label>
              <input
                id="code"
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
                style={{ marginBottom: '24px', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em' }}
              />
              <button type="submit" className="btn btn-primary btn-full" style={{ marginBottom: '16px' }}>
                Verify & Continue
              </button>
              <button
                type="button"
                onClick={() => setCodeSent(false)}
                className="btn btn-ghost btn-full btn-sm"
              >
                Change phone number
              </button>
            </form>
          )}

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
            <p className="text-muted" style={{ marginBottom: '8px', fontSize: '0.875rem' }}>
              Already have an account?
            </p>
            <Link href="/auth/sign-in" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
