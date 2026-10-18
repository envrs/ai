import type { NextConfig } from 'next';

/**
 * Applies the MDX loader and TypeScript path aliases so `.source/*` imports
 * resolve during both `next dev` and `next build`.
 */
export const createGeistdocs = () => (config: NextConfig): NextConfig => ({
  ...config,
  experimental: {
    ...config.experimental,
    mdxRs: false,
    optimizePackageImports: [
      ...(config.experimental?.optimizePackageImports ?? []),
      'fumadocs-core',
      'fumadocs-ui',
    ],
  },
  turbopack: {
    ...config.turbopack,
    resolveAlias: {
      ...config.turbopack?.resolveAlias,
      '@/.source': './.source',
    },
  },
});