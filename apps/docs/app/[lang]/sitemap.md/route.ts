import { createSitemapMarkdownRoute } from '@/lib/ds/routes-sitemap';
import { config } from '@/lib/geistdocs/config';
import {
  cookbookV7Source,
  providersV7Source,
  v7Source,
} from '@/lib/geistdocs/source';

const sitemapRoute = createSitemapMarkdownRoute({
  config,
  sources: [
    { source: v7Source, title: 'Documentation' },
    { source: providersV7Source, title: 'Providers' },
    { source: cookbookV7Source, title: 'Cookbook' },
  ],
  title: 'ai-toolkit documentation',
});

export const GET = sitemapRoute.GET;
export const generateStaticParams = sitemapRoute.generateStaticParams;
