# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages using static export.

## Setup Instructions

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Configure Base Path (if needed)

If your repository is **NOT** at `username.github.io` (i.e., it's at `username.github.io/repo-name`):

1. Update `.github/workflows/deploy.yml` and uncomment/modify the `BASE_PATH` line:
   ```yaml
   BASE_PATH: '/your-repo-name'
   ```

2. Or set it as an environment variable in your GitHub repository settings:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add a new repository variable: `BASE_PATH` = `/your-repo-name`

### 3. Deploy

The GitHub Actions workflow will automatically:
- Build the site for static export
- Deploy to GitHub Pages
- Run on every push to `main` or `master` branch

You can also manually trigger it:
- Go to **Actions** tab
- Select **Deploy to GitHub Pages** workflow
- Click **Run workflow**

## Local Testing

To test the GitHub Pages build locally:

```bash
npm run build:gh-pages
```

The static files will be in the `out/` directory. You can serve them with:

```bash
npx serve out
```

## Build Scripts

- `npm run build` - Regular Next.js build (with PWA)
- `npm run build:gh-pages` - Static export for GitHub Pages (PWA disabled)
- `npm run dev` - Development server

## Notes

- PWA features are **disabled** for GitHub Pages builds (static export doesn't support service workers)
- Images are unoptimized for static export compatibility
- All routes use trailing slashes (`/page/` instead of `/page`) for GitHub Pages compatibility
