import { createSearchAPI } from 'fumadocs-core/search/server';
import type { GeistdocsConfig } from '../config';
import type { VersionedSourceEntry } from '../source';

type StructuredPage = {
  url: string;
  data: {
    title?: string;
    description?: string;
    structuredData?: { contents?: { heading?: string; content?: string }[] };
  };
};

const titleCase = (segment: string) =>
  segment
    .split('-')
    .map(word => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');

const breadcrumbsFor = (url: string) =>
  url
    .split('/')
    .filter(Boolean)
    .slice(0, -1)
    .map(titleCase);

/**
 * `/api/search`: JSON search over the given sources, built with fumadocs'
 * simple Orama index. Every source is flattened into one index so a query
 * returns matches from docs, providers, and cookbook in one response.
 */
export const createSearchRoute = ({
  config,
  sources,
}: {
  config?: GeistdocsConfig;
  sources: VersionedSourceEntry[];
}) => {
  void config;

  const indexes = sources.flatMap(source =>
    (source.loader.getPages() as unknown as StructuredPage[]).map(page => ({
      breadcrumbs: breadcrumbsFor(page.url),
      content:
        page.data.structuredData?.contents
          ?.map(section => `${section.heading ?? ''}\n${section.content ?? ''}`)
          .join('\n') ?? '',
      description: page.data.description,
      title: page.data.title ?? titleCase(page.url),
      url: page.url,
    })),
  );

  const api = createSearchAPI('simple', { indexes });

  return (request: Request) => api.GET(request);
};