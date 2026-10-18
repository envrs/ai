import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import type { GeistdocsConfig } from './config';

/** Shape of a generated `docs` collection entry from `@/.source/server`. */
type GeneratedDocsCollection = {
  docs: unknown[];
  meta: unknown[];
  toFumadocsSource: () => Parameters<typeof loader>[0] extends {
    source: infer S;
  }
    ? S
    : never;
};

export type VersionedSourceEntry = {
  id: string;
  label: string;
  docs: unknown;
  baseUrl: string;
  routePrefix: string;
  loader: ReturnType<typeof loader>;
};

export type VersionedSources = {
  current: string;
  byId: Record<string, VersionedSourceEntry>;
  items: VersionedSourceEntry[];
};

const buildLoader = (docs: unknown, baseUrl: string) => {
  const collection = docs as GeneratedDocsCollection;

  return loader({
    baseUrl,
    source: collection.toFumadocsSource(),
  });
};

/**
 * Bind version entries to their URL prefixes and expose them by id.
 * `baseUrl` already contains the route prefix (`/v6/docs`), so page URLs and
 * the versioned page tree come out fully qualified.
 */
export const createVersionedSources = ({
  config,
  current,
  versions,
}: {
  config: GeistdocsConfig;
  current: string;
  versions: Omit<VersionedSourceEntry, 'loader'>[];
}): VersionedSources => {
  void config;

  const items: VersionedSourceEntry[] = versions.map(version => ({
    ...version,
    loader: buildLoader(version.docs, version.baseUrl),
  }));

  return {
    current,
    byId: Object.fromEntries(items.map(item => [item.id, item])),
    items,
  };
};

/**
 * Prefix-relative path of every page in the given sources, so the version
 * switcher can map the current page onto its counterpart in another version.
 */
export const collectVersionPaths = ({
  lang,
  routePrefix = '',
  sources,
}: {
  lang: string;
  routePrefix?: string;
  sources: VersionedSourceEntry[];
}): Record<string, string> => {
  const paths: Record<string, string> = {};

  for (const source of sources) {
    for (const page of source.loader.getPages(lang)) {
      paths[page.url] = `${routePrefix}${page.url}`;
    }
  }

  return paths;
};