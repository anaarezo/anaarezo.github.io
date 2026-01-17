import type { NextConfig } from 'next';

const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? 'anaarezo.github.io';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repoName === 'anaarezo.github.io';

const computedBasePath =
  isGitHubPages && !isUserSite ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: computedBasePath,
  assetPrefix: computedBasePath,
  images: { unoptimized: true },
  reactStrictMode: true
};

export default nextConfig;
