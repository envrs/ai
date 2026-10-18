'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import type { GeistdocsConfig } from './config';
import { cn } from './utils';

type GeistdocsContextValue = {
  config: GeistdocsConfig | undefined;
  lang: string;
  version: string;
};

const GeistdocsContext = createContext<GeistdocsContextValue | null>(null);

export const useGeistdocs = () => useContext(GeistdocsContext);

type GeistdocsProviderProps = {
  children: ReactNode;
  config?: GeistdocsConfig;
  lang: string;
  /** Version tag forwarded to the search index (owned by the caller). */
  search?: { options?: { tag?: string } };
  version?: string;
};

/**
 * Provides site config plus the active version. The version is derived from
 * the first URL segment so `v5`/`v6` prefixes scope search and version
 * switching without every route having to pass it down.
 */
export const GeistdocsProvider = ({
  children,
  config,
  lang,
  search,
  version: explicitVersion,
}: GeistdocsProviderProps) => {
  const pathname = usePathname();
  const segment = pathname?.split('/').filter(Boolean)[0];
  const derivedVersion = segment === 'v5' || segment === 'v6' ? segment : 'v7';
  const version = explicitVersion ?? search?.options?.tag ?? derivedVersion;

  return (
    <GeistdocsContext.Provider value={{ config, lang, version }}>
      {children}
    </GeistdocsContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/* Navbar / Footer                                                            */
/* -------------------------------------------------------------------------- */

const NavbarLinks = ({ nav }: { nav?: GeistdocsConfig['nav'] }) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {nav?.map(item =>
        'items' in item ? (
          <div className="group relative" key={item.label}>
            <span className="px-3 py-2 text-label-14 text-gray-900">
              {item.label}
            </span>
            <div className="invisible absolute top-full left-0 z-50 min-w-48 rounded-md border border-gray-alpha-400 bg-background-100 p-1 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100">
              {item.items.map(sub => (
                <Link
                  className="block rounded-md px-3 py-2 text-label-13 text-gray-1000 hover:bg-gray-100"
                  href={sub.href}
                  key={sub.href}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            className={cn(
              'rounded-md px-3 py-2 text-label-14 transition-colors hover:bg-gray-100',
              pathname === item.href
                ? 'text-gray-1000'
                : 'text-gray-900',
            )}
            href={item.href}
            key={item.href}
            {...(item.href.startsWith('http')
              ? { rel: 'noopener noreferrer', target: '_blank' }
              : { prefetch: true })}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
};

export const Navbar = ({ config }: { config?: GeistdocsConfig }) => (
  <header className="sticky top-0 z-40 border-b border-gray-alpha-400 bg-background-100/90 backdrop-blur">
    <div className="mx-auto flex h-14 max-w-[1448px] items-center gap-4 px-4">
      <Link className="flex items-center gap-2 font-medium" href="/">
        {config?.logo}
      </Link>
      <NavbarLinks nav={config?.nav} />
    </div>
  </header>
);

export const Footer = () => (
  <footer className="border-t border-gray-alpha-400 py-10">
    <div className="mx-auto max-w-[1448px] px-4 text-label-13 text-gray-900">
      Built with the AI Toolkit.
    </div>
  </footer>
);

/* -------------------------------------------------------------------------- */
/* Docs layout                                                                */
/* -------------------------------------------------------------------------- */

export type DocsTreeNode = {
  name?: string;
  title?: string;
  url?: string;
  children?: DocsTreeNode[];
};

const DocsSidebar = ({
  sidebarTop,
  tree,
}: {
  sidebarTop?: ReactNode;
  tree?: DocsTreeNode[];
}) => {
  const renderNodes = (nodes: DocsTreeNode[] = []) =>
    nodes.map(node => (
      <li key={node.url ?? node.name ?? node.title}>
        {node.url ? (
          <Link
            className="block rounded-md px-2 py-1 text-label-13 text-gray-900 hover:bg-gray-100 hover:text-gray-1000"
            href={node.url}
          >
            {node.title ?? node.name}
          </Link>
        ) : (
          <span className="block px-2 py-1 text-label-13 font-medium text-gray-1000">
            {node.title ?? node.name}
          </span>
        )}
        {node.children?.length ? (
          <ul className="ml-3 flex flex-col gap-0.5 border-l border-gray-alpha-400 pl-2">
            {renderNodes(node.children)}
          </ul>
        ) : null}
      </li>
    ));

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      {sidebarTop}
      <ul className="flex flex-col gap-0.5">{renderNodes(tree)}</ul>
    </aside>
  );
};

/**
 * Two-column docs shell: sidebar navigation beside the page content. The
 * table of contents is rendered inline after the content because there is no
 * floating container to anchor it to.
 */
export const GeistdocsDocsLayout = ({
  children,
  config,
  containerProps,
  sidebar,
  sidebarTop,
  toc,
  tree,
}: {
  children: ReactNode;
  config?: GeistdocsConfig;
  containerProps?: ComponentProps<'div'>;
  sidebar?: ReactNode;
  sidebarTop?: ReactNode;
  toc?: ReactNode;
  tree?: DocsTreeNode[];
}) => (
  <div
    className={cn('mx-auto flex w-full gap-10 px-4 py-10', containerProps?.className)}
  >
    {sidebar ?? <DocsSidebar sidebarTop={sidebarTop} tree={tree} />}
    <main className="min-w-0 flex-1">
      {children}
      {toc ? <div className="mt-12">{toc}</div> : null}
    </main>
  </div>
);