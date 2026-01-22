# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages using static export.

## Setup Instructions

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 1a. Configure Actions Permissions (REQUIRED)

**IMPORTANT:** This must be set correctly or deployments will fail with a 401 error.

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"** (if shown)
5. Click **Save**

### 1b. Configure Environment (REQUIRED)

**IMPORTANT:** The `github-pages` environment must be configured to allow deployments.

1. Go to **Settings** → **Environments**
2. Click on **"github-pages"** (or create it if it doesn't exist)
3. Under **"Deployment protection rules"**:
   - Make sure **"Allow administrators to bypass configured protection rules"** is **checked**
   - If you have **"Required reviewers"** enabled, either remove them or approve deployments manually
4. Under **"Deployment branches and tags"**:
   - Make sure your `main` branch is allowed
5. Click **Save protection rules**

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

## Troubleshooting

### Error: "Failed to create deployment (status: 401)"

This error means the workflow doesn't have permission to deploy. Fix it by:

1. **Check Actions Permissions:**
   - Go to **Settings** → **Actions** → **General**
   - Ensure **"Read and write permissions"** is selected
   - Save if you made changes

2. **Check Environment Approval:**
   - Go to **Settings** → **Environments** → **github-pages**
   - Look for any **pending deployments** that need approval
   - Click **"Review deployments"** and approve them
   - Make sure **"Allow administrators to bypass configured protection rules"** is checked

3. **Re-run the workflow:**
   - Go to **Actions** tab
   - Click on the failed workflow run
   - Click **"Re-run all jobs"**

### Build succeeds but deploy fails

If the build job completes but deploy fails with authentication errors:

- The workflow permissions are configured correctly in `.github/workflows/deploy.yml`
- The issue is almost always in repository settings (Actions permissions or Environment approval)
- Check both settings sections above

### First-time deployment

On the first deployment, you may need to:
1. Manually approve the environment deployment (see step 1b above)
2. After the first successful deployment, future deployments should work automatically

## Notes

- PWA features are **disabled** for GitHub Pages builds (static export doesn't support service workers)
- Images are unoptimized for static export compatibility
- All routes use trailing slashes (`/page/` instead of `/page`) for GitHub Pages compatibility
- The workflow includes explicit permissions for both `build` and `deploy` jobs to prevent authentication issues
