import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">404</h1>
          <h2 className="text-xl font-medium text-slate-900">Page Not Found</h2>
          <p className="text-slate-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block rounded-full bg-[var(--al-primary)] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1244af]"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

