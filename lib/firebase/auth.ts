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
    const errorMsg = 'Firebase Auth not initialized. Please check your environment variables.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const appVerifier = verifier || (window as any).recaptchaVerifier;
    if (!appVerifier) {
      throw new Error('reCAPTCHA verifier not initialized. Please refresh the page and try again.');
    }

    console.log('Sending verification code to:', phoneNumber);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    console.log('Verification code sent successfully');
    return confirmationResult;
  } catch (error: any) {
    console.error('Error sending verification code:', error);
    
    // Provide more helpful error messages
    if (error.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid phone number format. Please use format: +1234567890');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many requests. Please try again later.');
    } else if (error.code === 'auth/captcha-check-failed') {
      throw new Error('reCAPTCHA verification failed. Please refresh and try again.');
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to send verification code. Please check your phone number and try again.');
    }
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
    console.log('Verifying code...');
    const result = await confirmationResult.confirm(code);
    console.log('Code verified successfully, user:', result.user.uid);
    return result.user;
  } catch (error: any) {
    console.error('Error verifying code:', error);
    
    // Provide more helpful error messages
    if (error.code === 'auth/invalid-verification-code') {
      throw new Error('Invalid verification code. Please check the code and try again.');
    } else if (error.code === 'auth/code-expired') {
      throw new Error('Verification code has expired. Please request a new code.');
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to verify code. Please try again.');
    }
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
