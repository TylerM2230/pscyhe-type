# GitHub Pages Deployment Guide

## Setup Steps

### 1. Push to GitHub

If you haven't already, push this repository to GitHub:

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions** (not "Deploy from a branch")
4. Click **Save**

That's it! The workflow will automatically trigger.

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)

### 4. Access Your Site

Once deployed, your site will be available at:
```
https://YOUR_USERNAME.github.io/typing-jung/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## How It Works

### Workflow File
**Location:** `.github/workflows/deploy.yml`

**What it does:**
1. Triggers on every push to `main` branch
2. Checks out your code
3. Installs Node.js 18 with npm caching
4. Installs dependencies with `npm ci`
5. Builds the app with `GITHUB_PAGES=true npm run build`
6. Uploads the `dist` folder to GitHub Pages
7. Deploys to your GitHub Pages site

### Vite Configuration
**Location:** `typing-jung-app/vite.config.ts`

The base path is set conditionally:
- **GitHub Pages:** `/typing-jung/` (subdirectory)
- **Local dev:** `/` (root)

This ensures assets load correctly when deployed to `username.github.io/typing-jung/`

---

## Manual Deployment (Alternative)

If you prefer manual control, you can use `gh-pages` package:

```bash
cd typing-jung-app

# Install gh-pages
npm install -D gh-pages

# Add deploy script to package.json
npm pkg set scripts.deploy="GITHUB_PAGES=true npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Then enable GitHub Pages from the `gh-pages` branch in Settings → Pages.

---

## Local Testing

To test the production build locally with the correct base path:

```bash
cd typing-jung-app
GITHUB_PAGES=true npm run build
npm run preview
```

Visit `http://localhost:4173/typing-jung/`

---

## Troubleshooting

### Assets Not Loading (404s)

**Symptom:** Site loads but CSS/JS files return 404

**Cause:** Base path misconfiguration

**Fix:**
1. Check that `vite.config.ts` has `base: '/typing-jung/'`
2. Verify the workflow sets `GITHUB_PAGES=true`
3. Rebuild and redeploy

### Workflow Fails

**Check:**
1. **Permissions:** Settings → Actions → General → Workflow permissions
   - Enable "Read and write permissions"
2. **Pages enabled:** Settings → Pages → Source set to "GitHub Actions"
3. **Build logs:** Actions tab → click failed workflow → view logs

### Custom Domain

To use a custom domain (e.g., `typing.yourdomain.com`):

1. Add a `CNAME` file to `typing-jung-app/public/CNAME`:
   ```
   typing.yourdomain.com
   ```
2. Update `vite.config.ts`:
   ```typescript
   base: process.env.GITHUB_PAGES ? '/' : '/',
   ```
3. Configure DNS at your domain provider:
   - Type: `CNAME`
   - Name: `typing`
   - Value: `YOUR_USERNAME.github.io`

---

## Deployment Checklist

- [x] `.github/workflows/deploy.yml` created
- [x] `vite.config.ts` configured with base path
- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled (Source: GitHub Actions)
- [ ] Workflow completed successfully
- [ ] Site accessible at `https://YOUR_USERNAME.github.io/typing-jung/`

---

## Cost & Performance

**Cost:** $0 (free for public repos)

**Performance:**
- Served from GitHub's CDN
- Cached at edge locations globally
- HTTPS enabled by default
- Build time: ~2-3 minutes
- Deploy time: ~30 seconds

**Limitations:**
- 1GB storage limit (this app uses ~1.6MB)
- 100GB bandwidth/month (soft limit)
- Public repos only (for free tier)

---

## Next Steps After Deployment

1. **Share the URL** with users
2. **Monitor Actions** tab for deployment status
3. **Update README** with live demo link
4. **Consider optimizations:**
   - Code-split the 3,000 quotes to reduce bundle size
   - Add analytics to track usage
   - Set up error monitoring (e.g., Sentry)

---

## Update Process

To update the site after deployment:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy within 2-3 minutes.

---

**Last Updated:** 2026-01-05
