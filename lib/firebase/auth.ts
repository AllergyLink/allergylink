import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  User,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

/**
 * Initialize reCAPTCHA verifier for phone authentication
 */
export function initializeRecaptcha(containerId: string = 'recaptcha-container'): RecaptchaVerifier | null {
  if (typeof window === 'undefined' || !auth) {
    return null;
  }

  try {
    // Check if verifier already exists
    const existingVerifier = (window as any).recaptchaVerifier;
    if (existingVerifier) {
      existingVerifier.clear();
    }

    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
      'expired-callback': () => {
        // reCAPTCHA expired
      },
    });

    (window as any).recaptchaVerifier = verifier;
    return verifier;
  } catch (error) {
    console.error('Error initializing reCAPTCHA:', error);
    return null;
  }
}

/**
 * Send phone verification code
 */
export async function sendPhoneVerificationCode(
  phoneNumber: string,
  verifier?: RecaptchaVerifier
): Promise<ConfirmationResult> {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    const appVerifier = verifier || (window as any).recaptchaVerifier;
    if (!appVerifier) {
      throw new Error('reCAPTCHA verifier not initialized');
    }

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
}

/**
 * Verify phone code and sign in
 */
export async function verifyPhoneCode(
  confirmationResult: ConfirmationResult,
  code: string
): Promise<User> {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    const result = await confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  if (!auth) {
    return;
  }
  await firebaseSignOut(auth);
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  if (!auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
