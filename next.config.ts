import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Let next-intl auto-detect src/i18n/request.ts as recommended
const withNextIntl = createNextIntlPlugin();

const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '/anaarezo.github.io';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
// User site (anaarezo.github.io) deploys to root; project sites deploy to /repo-name/
const isUserSite = repoName === 'anaarezo.github.io';
const computedBasePath = (isGitHubPages && !isUserSite) ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  // output: 'export',
   output: 'standalone',
  trailingSlash: true,
  basePath: computedBasePath,
  assetPrefix: computedBasePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: computedBasePath
  }
};

export default withNextIntl(nextConfig);
