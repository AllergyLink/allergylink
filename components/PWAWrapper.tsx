'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PWA components only on client side
const PWAInstallPrompt = dynamic(() => import('@/components/PWAInstallPrompt'), { ssr: false });
const ServiceWorkerUpdate = dynamic(() => import('@/components/ServiceWorkerUpdate'), { ssr: false });

export default function PWAWrapper() {
  const [isStaticExport, setIsStaticExport] = useState(true);

  useEffect(() => {
    // Check if we're in static export mode
    // In static export, service workers won't be available
    setIsStaticExport(typeof window !== 'undefined' && !('serviceWorker' in navigator));
  }, []);

  // Don't render PWA components in static export
  if (isStaticExport) {
    return null;
  }

  return (
    <>
      <PWAInstallPrompt />
      <ServiceWorkerUpdate />
    </>
  );
}
