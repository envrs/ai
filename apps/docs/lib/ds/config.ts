import type { ReactNode } from 'react';

export type GeistdocsVersionConfig = {
  id: string;
  label: string;
  description?: string;
  routePrefix?: string;
};

export type GeistdocsContentEntry = {
  id: string;
  label: string;
  dir: string;
  route: string;
};

export type GeistdocsNavItem =
  | { label: string; href: string }
  | { label: string; items: { label: string; href: string }[] };

export type GeistdocsConfig = {
  title: string;
  defaultLanguage?: string;
  logo?: ReactNode;
  nav?: GeistdocsNavItem[];
  content?: GeistdocsContentEntry[];
  versions?: { current: string; items: GeistdocsVersionConfig[] };
  translations?: Record<string, { displayName: string }>;
  siteId?: string;
  siteUrl?: string;
  github?: { owner: string; repo: string };
  agent?: {
    product: {
      name: string;
      description: string;
      category: string;
      audience: string[];
      useCases: string[];
    };
  };
  ai?: { enabled: boolean; suggestions?: string[] };
  pageActions?: {
    copyPage?: boolean;
    askAI?: boolean;
    openInChat?: boolean;
    scrollTop?: boolean;
    editSource?: boolean;
  };
};

/**
 * Identity type: the config is passed straight through to the layout, routes,
 * and sitemap builders, so `defineConfig` only exists to keep call sites
 * self-documenting and to give object literals a single checked shape.
 */
export const defineConfig = (config: GeistdocsConfig): GeistdocsConfig => config;