'use client';

import { useState, useEffect } from 'react';

export default function ServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      return;
    }

    let registration: ServiceWorkerRegistration | null = null;

    // Listen for service worker updates
    const checkForUpdates = async () => {
      try {
        registration = await navigator.serviceWorker.ready;
        
        // Check for updates periodically
        registration.addEventListener('updatefound', () => {
          const newWorker = registration?.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              setUpdateAvailable(true);
            }
          });
        });

        // Check for updates every hour
        setInterval(() => {
          registration?.update();
        }, 60 * 60 * 1000);

        // Initial update check
        await registration.update();
      } catch (error) {
        console.log('Service worker update check failed:', error);
      }
    };

    // Listen for controller change (service worker activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // Reload page when new service worker takes control
      window.location.reload();
    });

    checkForUpdates();
  }, []);

  const handleUpdate = async () => {
    if (!('serviceWorker' in navigator)) return;

    setIsUpdating(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Wait for the new service worker to be ready
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Failed to update service worker:', error);
      setIsUpdating(false);
    }
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '90%',
        width: '400px',
        background: 'var(--color-card, white)',
        border: '1px solid var(--color-border, #e5e7eb)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>
          New version available
        </p>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted, #6b7280)' }}>
          Update to get the latest features
        </p>
      </div>
      
      <button
        onClick={handleUpdate}
        disabled={isUpdating}
        className="btn btn-primary btn-sm"
        style={{ whiteSpace: 'nowrap' }}
      >
        {isUpdating ? 'Updating...' : 'Update'}
      </button>
      
      <button
        onClick={() => setUpdateAvailable(false)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.25rem',
          color: 'var(--color-text-muted, #6b7280)',
          cursor: 'pointer',
          padding: '0',
          lineHeight: 1,
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
