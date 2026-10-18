'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/ds/utils';

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(
  null,
);

const useDropdownMenu = (component: string) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(`${component} must be used inside <DropdownMenu>.`);
  }
  return context;
};

export const DropdownMenu = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className={cn('relative inline-block text-left', className)}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({
  children,
  className,
  ...props
}: ComponentProps<'button'>) => {
  const { open, setOpen } = useDropdownMenu('DropdownMenuTrigger');

  return (
    <button
      aria-expanded={open}
      className={cn(
        'inline-flex h-10 w-full items-center justify-between gap-2 rounded-md border border-gray-alpha-400 bg-background-100 px-3 text-label-14 text-gray-1000',
        className,
      )}
      onClick={() => setOpen(!open)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useDropdownMenu('DropdownMenuContent');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      className={cn(
        'absolute top-full left-0 z-50 mt-1 max-h-[min(var(--radix-dropdown-menu-content-available-height),320px)] w-[280px] overflow-y-auto rounded-lg border border-gray-alpha-400 bg-background-100 p-1 shadow-lg',
        className,
      )}
      ref={ref}
      role="menu"
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  className,
  onSelect,
  ...props
}: ComponentProps<'div'> & { onSelect?: () => void }) => {
  const { setOpen } = useDropdownMenu('DropdownMenuItem');

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center rounded-md px-2 py-1.5 text-label-13 text-gray-1000 hover:bg-gray-100',
        className,
      )}
      onClick={() => {
        onSelect?.();
        setOpen(false);
      }}
      role="menuitem"
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('px-2 pt-2 pb-1 text-label-12 text-gray-900', className)}
    {...props}
  >
    {children}
  </div>
);