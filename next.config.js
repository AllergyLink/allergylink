// Check if we're building for GitHub Pages (static export)
const isStaticExport = process.env.GITHUB_PAGES === 'true' || process.env.OUTPUT === 'export';

// Base path for GitHub Pages (set if your repo is not at username.github.io)
// Example: if repo is username.github.io/repo-name, set basePath: '/repo-name'
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Required for GitHub Pages
  output: isStaticExport ? 'export' : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true, // Required for static export
  },
};

// Only apply PWA for non-static exports (PWA doesn't work well with static export)
if (!isStaticExport) {
  const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest\.json$/],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.allergylink\.net\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24, // 24 hours
          },
          networkTimeoutSeconds: 10,
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|woff|woff2|ttf|otf)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
    ],
  });
  module.exports = withPWA(nextConfig);
} else {
  module.exports = nextConfig;
}
