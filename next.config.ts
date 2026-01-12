import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '/anaarezo.github.io';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
// User site (anaarezo.github.io) deploys to root; project sites deploy to /repo-name/
const isUserSite = repoName === 'anaarezo.github.io';
const computedBasePath = (isGitHubPages && !isUserSite) ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: computedBasePath,
  assetPrefix: computedBasePath,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: computedBasePath
  }
};

export default withNextIntl(nextConfig);
