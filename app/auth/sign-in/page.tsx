'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import Footer from '@/components/Footer';
import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/auth';
import { listProfiles } from '@/lib/storage';

export default function SignIn() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setError('');
    const err = await sendPhoneOtp(phone);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      setCodeSent(true);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const err = await verifyPhoneOtp(phone, code);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    // Check if user already has profiles → send to dashboard, otherwise onboarding
    const profiles = await listProfiles();
    router.push(profiles.length > 0 ? '/dashboard' : '/onboarding');
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <UnifiedNavigation />

      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
        <div className="card" style={{ maxWidth: '440px', width: '100%' }}>
          <h1>Access your AllergyLink</h1>
          <p className="text-muted" style={{ marginBottom: '32px' }}>
            Enter your phone number to receive a one-time code
          </p>

          {error && (
            <div style={{ marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

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
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending…' : 'Send one-time code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <label htmlFor="code">Enter 6-digit code</label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
                style={{ marginBottom: '24px', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em' }}
              />
              <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginBottom: '16px' }}>
                {loading ? 'Verifying…' : 'Verify & Continue'}
              </button>
              <button
                type="button"
                onClick={() => { setCodeSent(false); setError(''); }}
                className="btn btn-ghost btn-full btn-sm"
              >
                Change phone number
              </button>
            </form>
          )}

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
            <p className="text-muted" style={{ marginBottom: '8px', fontSize: '0.875rem' }}>
              Don't have an account?
            </p>
            <Link href="/auth/sign-up" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
