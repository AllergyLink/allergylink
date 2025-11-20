'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { initializeRecaptcha, sendPhoneVerificationCode, verifyPhoneCode } from '@/lib/firebase/auth';
import { migrateLocalStorageToFirestore, needsMigration } from '@/lib/firebase/migration';
import type { ConfirmationResult } from 'firebase/auth';

export default function SignUp() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize reCAPTCHA
    const verifier = initializeRecaptcha('recaptcha-container');
    return () => {
      if (verifier) {
        verifier.clear();
      }
    };
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phone) {
        setError('Please enter a phone number');
        setLoading(false);
        return;
      }

      // Format phone number (add + if not present)
      const formattedPhone = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;
      
      const confirmation = await sendPhoneVerificationCode(formattedPhone);
      setConfirmationResult(confirmation);
      setCodeSent(true);
    } catch (err: any) {
      console.error('Error sending code:', err);
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!confirmationResult) {
        setError('Please request a new code');
        setLoading(false);
        return;
      }

      const user = await verifyPhoneCode(confirmationResult, code);
      
      // Migrate localStorage data if needed
      if (needsMigration() && user) {
        await migrateLocalStorageToFirestore(user.uid);
      }
      
      // Redirect to create profile for new users
      router.push('/create');
    } catch (err: any) {
      console.error('Error verifying code:', err);
      setError(err.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
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

          {/* reCAPTCHA container (hidden) */}
          <div id="recaptcha-container" style={{ display: 'none' }}></div>

          {error && (
            <div style={{
              padding: '12px',
              background: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              color: '#B91C1C',
              marginBottom: '16px',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          {!codeSent ? (
            <form onSubmit={handleSendCode}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 555-1212"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={loading}
                style={{ marginBottom: '24px' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send one-time code'}
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
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
                disabled={loading}
                style={{ marginBottom: '24px', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5em' }}
              />
              <button 
                type="submit" 
                className="btn btn-primary btn-full" 
                style={{ marginBottom: '16px' }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCodeSent(false);
                  setCode('');
                  setConfirmationResult(null);
                  setError('');
                }}
                className="btn btn-ghost btn-full btn-sm"
                disabled={loading}
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
