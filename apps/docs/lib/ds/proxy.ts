import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type TrackMarkdownRequestEvent = {
  path: string;
  referer?: string;
  userAgent?: string;
};

export type MarkdownRouteTracker = (
  event: TrackMarkdownRequestEvent,
) => void | Promise<void>;

type MarkdownRoute = {
  from: string;
  to: string;
};

type CreateProxyOptions = {
  config?: unknown;
  trackMarkdownRequest?: MarkdownRouteTracker;
  markdownRoutes?: MarkdownRoute[];
};

const toRegExp = (pattern: string) => {
  const source = pattern
    .split('*')
    .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('(.*)');

  return new RegExp(`^${source}$`);
};

const buildMatcher = (routes: MarkdownRoute[]) =>
  routes.map(route => ({ from: toRegExp(route.from), to: route.to }));

/**
 * Serves Markdown for documentation URLs by rewriting them onto the `*.mdx`
 * route handlers, so `/docs/foo` and `/docs/foo.md` return the same content
 * and agents get readable Markdown without a separate crawler.
 */
export const createProxy = ({
  markdownRoutes = [],
  trackMarkdownRequest,
}: CreateProxyOptions = {}) => {
  const routes = buildMatcher(markdownRoutes);

  return (request: NextRequest, _event: NextFetchEvent): NextResponse => {
    const { pathname } = request.nextUrl;

    if (pathname.endsWith('.md')) {
      return NextResponse.next();
    }

    for (const route of routes) {
      const match = route.from.exec(pathname);
      if (!match) continue;

      void trackMarkdownRequest?.({ path: pathname });

      const url = request.nextUrl.clone();
      url.pathname = route.to.replace('*', match[1] ?? '');

      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  };
};

export type { MarkdownRoute };