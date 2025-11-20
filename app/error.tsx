'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">Something went wrong!</h1>
          <p className="text-slate-600">
            We encountered an error. Please try again or contact support if the problem persists.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-full bg-[var(--al-primary)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1244af]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
