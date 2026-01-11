# GitHub Pages Deployment Guide

## 🎯 Your Setup

- **Site URL**: https://anaarezo.github.io (root user site)
- **Repository**: anaarezo/anaarezo.github.io
- **Build Output**: `out/` directory (Next.js static export)

## ✅ Implementation Complete

### What was configured:

1. **✓ Next.js Static Export** ([next.config.ts](next.config.ts))

   - `output: 'export'` for GitHub Pages compatibility
   - Smart basePath detection: empty for user site (`anaarezo.github.io`), `/repo-name/` for project sites
   - `trailingSlash: true` for proper GitHub Pages routing
   - `images.unoptimized` (required for static export)

2. **✓ GitHub Actions Workflow** (composite action pattern)

   - Created [.github/workflows/setup-node/action.yml](.github/workflows/setup-node/action.yml) - reusable Node setup with dependency caching
   - Updated [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) - two-stage build & deploy
   - Triggers on push to `main` or `master` branches

3. **✓ i18n Static Export**
   - All locale routes (`/en/`, `/pt/`, `/es/`) pre-rendered via `generateStaticParams()`
   - Client-side GitHub API fetch for projects (bypasses build-time fetch limits)

## 🚀 Deployment Steps

### Initial Setup (one-time)

1. **Copy your project to the GitHub Pages repo**:

   ```bash
   # Navigate to your cloned anaarezo.github.io repo
   cd /Users/anaarezo/Documents/Repositories/React/anaarezo.github.io

   # Copy all files from portefeuille (excluding .git)
   rsync -av --exclude='.git' --exclude='node_modules' --exclude='out' \
     /Users/anaarezo/Documents/Repositories/React/portefeuille/ .
   ```

2. **Enable GitHub Pages in repository settings**:
   - Go to: https://github.com/anaarezo/anaarezo.github.io/settings/pages
   - Source: **GitHub Actions** (not "Deploy from a branch")
   - This allows the workflow to publish automatically

### Every Deploy

Just commit and push to `main` (or `master`):

```bash
cd /Users/anaarezo/Documents/Repositories/React/anaarezo.github.io

git add .
git commit -m "Update portfolio"
git push origin main
```

The GitHub Action will automatically:

1. ✓ Install dependencies (with caching for speed)
2. ✓ Build your Next.js app (`npx next build`)
3. ✓ Upload the `out/` directory
4. ✓ Deploy to https://anaarezo.github.io

## 📊 Monitoring Deployments

1. Go to: https://github.com/anaarezo/anaarezo.github.io/actions
2. Click on the latest "publish-to-github-pages" workflow
3. You'll see:
   - **build** stage (compiles your app)
   - **deploy** stage (publishes to GitHub Pages)
   - The deployment URL will appear in the deploy stage

Typical deployment time: **2-3 minutes**

## 🔍 Troubleshooting

### If images/styles are missing:

- Verify your `basePath` is correct in [next.config.ts](next.config.ts)
- For user site (`anaarezo.github.io`): basePath should be `''` (empty)
- For project site: basePath should be `'/repo-name/'`

### If builds fail:

- Check the Actions tab for error messages
- Ensure `package-lock.json` is committed (needed for `npm ci`)
- Verify Node.js version compatibility (currently set to Node 20)

### If routes don't work:

- Ensure `.nojekyll` file exists in `out/` directory (already configured)
- Check that `trailingSlash: true` is enabled in next.config.ts (already set)

## 📝 Local Testing

Test your build locally before pushing:

```bash
cd /Users/anaarezo/Documents/Repositories/React/portefeuille
npm run build

# The out/ directory contains your static site
# You can preview it with any static server, e.g.:
npx serve out
```

## 🌐 Multi-Language Support

Your portfolio is available in:

- English: https://anaarezo.github.io/en/
- Portuguese: https://anaarezo.github.io/pt/
- Spanish: https://anaarezo.github.io/es/

The root URL (https://anaarezo.github.io/) automatically redirects to `/en/`.

## 🎨 What's Included

- ✅ Home page with profile and bio
- ✅ About page with skills showcase
- ✅ Projects page (fetches from GitHub API)
- ✅ Books page
- ✅ Contact form
- ✅ Dark/Light/System theme toggle
- ✅ Language switcher (EN/PT/ES)
- ✅ Social links (GitHub, LinkedIn, Twitter, CodePen)
- ✅ Responsive design
- ✅ SEO-friendly metadata

## 📚 Resources

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**Ready to deploy?** Just copy your files to the `anaarezo.github.io` repo and push! 🚀
