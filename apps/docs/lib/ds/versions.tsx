'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/ds/utils';

export type GeistdocsVersionPaths = {
  fallbackPath: string;
  paths: Record<string, string>;
};

export type GeistdocsRouteSelectItem = {
  id: string;
  label: string;
  description?: string;
  routePrefix?: string;
  paths: Record<string, string>;
  fallbackPath: string;
};

type GeistdocsRouteSelectProps = {
  ariaLabel?: string;
  current: string;
  items: GeistdocsRouteSelectItem[];
  getDescription?: (context: { item: GeistdocsRouteSelectItem }) => string;
  renderIcon?: (context: { item: GeistdocsRouteSelectItem }) => ReactNode;
  getLabel?: (context: { item: GeistdocsRouteSelectItem }) => string;
};

/**
 * Version switcher. The active page path is looked up in each version's
 * `paths` map; versions that never had this page fall back to their
 * `fallbackPath`.
 */
export const GeistdocsRouteSelect = ({
  ariaLabel = 'Select version',
  current,
  getDescription,
  getLabel,
  items,
  renderIcon,
}: GeistdocsRouteSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = items.find(item => item.id === current) ?? items[0];

  const hrefFor = (item: GeistdocsRouteSelectItem) =>
    (pathname && item.paths[pathname]) || item.fallbackPath;

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        className="flex w-full items-center gap-2 rounded-md border border-gray-alpha-400 p-2 text-left transition-colors hover:bg-gray-100"
        onClick={() => setOpen(value => !value)}
        type="button"
      >
        {active && renderIcon ? renderIcon({ item: active }) : null}
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-medium text-gray-1000">
            {active ? (getLabel?.({ item: active }) ?? active.label) : null}
          </span>
          {active && getDescription ? (
            <span className="truncate text-label-12 text-gray-900">
              {getDescription({ item: active })}
            </span>
          ) : null}
        </span>
      </button>

      {open ? (
        <ul
          className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border border-gray-alpha-400 bg-background-100 p-1 shadow-lg"
          role="listbox"
        >
          {items.map(item => (
            <li key={item.id}>
              <button
                aria-selected={item.id === current}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-gray-100',
                  item.id === current && 'bg-gray-100',
                )}
                onClick={() => {
                  setOpen(false);
                  router.push(hrefFor(item));
                }}
                role="option"
                type="button"
              >
                {renderIcon ? renderIcon({ item }) : null}
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-medium text-gray-1000">
                    {getLabel?.({ item }) ?? item.label}
                  </span>
                  {getDescription ? (
                    <span className="truncate text-label-12 text-gray-900">
                      {getDescription({ item })}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};