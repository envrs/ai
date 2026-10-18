import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { MobileDocsBar } from './mobile-docs-bar';
import type { GeistdocsConfig } from './config';
import type { VersionedSourceEntry } from './source';
import { getRootLang } from '@/lib/geistdocs/root-params';
import { absoluteUrl } from '@/lib/geistdocs/site-url';

type TocItem = {
  title: string;
  url: string;
  children?: TocItem[];
};

type DocsPageOptions = {
  config?: GeistdocsConfig;
  source: VersionedSourceEntry;
  mdx?: (context: { link: MDXComponents['a'] }) => MDXComponents;
  metadata?: (context: { metadata: Metadata; page: PageInfo }) => Metadata;
  openGraph?: { images?: boolean };
  renderTop?: (context: { data: PageData }) => ReactNode;
  tableOfContent?: { footer?: ReactNode; enabled?: boolean };
  tableOfContentPopover?: { enabled?: boolean };
};

type PageData = {
  title?: string;
  description?: string;
  toc: TocItem[];
  body: (props: { components: MDXComponents }) => ReactNode;
};

type PageInfo = {
  title: string;
  description?: string;
  url: string;
  slugs: string[];
};

const resolvePageData = (
  source: VersionedSourceEntry,
  slugs: string[] | undefined,
  lang: string,
) => {
  const page = source.loader.getPage(slugs, lang);
  if (!page) notFound();

  return page as unknown as {
    url: string;
    slugs: string[];
    data: {
      title?: string;
      description?: string;
      toc: TocItem[];
      body: PageData['body'];
    };
  };
};

/**
 * Builds the `generateMetadata` / `generateStaticParams` / `Page` trio for a
 * docs route from a single versioned source. Each route file stays a thin
 * declaration of which source and options it uses.
 */
export const createDocsPage = ({
  mdx,
  metadata,
  renderTop,
  source,
  tableOfContent,
}: DocsPageOptions) => {
  const generateMetadata = async (
    props: { params: Promise<{ slug?: string[] }> },
  ): Promise<Metadata> => {
    const lang = await getRootLang();
    const { slug } = await props.params;
    const page = resolvePageData(source, slug, lang);

    const base: Metadata = {
      title: page.data.title,
      description: page.data.description,
      alternates: { canonical: page.url },
    };

    return metadata ? metadata({ metadata: base, page: page as PageInfo }) : base;
  };

  const generateStaticParams = async () => {
    const lang = await getRootLang();

    return source.loader
      .getPages(lang)
      .map(page => ({ slug: page.slugs }));
  };

  const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
    const lang = await getRootLang();
    const { slug } = await props.params;
    const page = resolvePageData(source, slug, lang);
    const components = mdx?.({ link: Link as MDXComponents['a'] });
    const Body = page.data.body;

    return (
      <article className="max-w-3xl">
        {renderTop?.({ data: page.data as PageData })}
        <h1 className="mb-2 text-heading-32 font-semibold text-gray-1000">
          {page.data.title}
        </h1>
        {page.data.description ? (
          <p className="mb-8 text-label-16 text-gray-900">
            {page.data.description}
          </p>
        ) : null}

        <div className="[&>h2]:mt-10 [&>h2]:mb-3 [&>h3]:mt-8 [&>h3]:mb-2 [&>p]:leading-7">
          <Body components={components ?? {}} />
        </div>

        {tableOfContent?.footer ? (
          <footer className="mt-16 border-t border-gray-alpha-400 pt-8">
            {tableOfContent.footer}
          </footer>
        ) : null}
      </article>
    );
  };

  return { generateMetadata, generateStaticParams, Page };
};

/** Absolute URL helper re-exported so routes can build canonical links. */
export { absoluteUrl };