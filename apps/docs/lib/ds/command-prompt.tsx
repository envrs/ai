'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from 'react';
import { cn } from '@/lib/ds/utils';

type CommandPromptContextValue = {
  value: string;
  setValue: (value: string) => void;
  registerContent: (value: string, text: string) => () => void;
  contentFor: (value: string) => string | undefined;
};

const CommandPromptContext = createContext<CommandPromptContextValue | null>(
  null,
);

const useCommandPrompt = (component: string) => {
  const context = useContext(CommandPromptContext);
  if (!context) {
    throw new Error(`${component} must be used inside <CommandPromptRoot>.`);
  }
  return context;
};

/**
 * Tabbed command switcher. `CommandPromptTrigger` buttons select a value, only
 * the `CommandPromptContent` with the matching `value` stays mounted, and the
 * copy button reads the visible command from the same registry — so the
 * trigger and the copied text can never drift apart.
 */
export const CommandPromptRoot = ({
  children,
  className,
  defaultValue,
  onValueChange,
  ...props
}: ComponentProps<'div'> & {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) => {
  const [value, setValueState] = useState(defaultValue ?? '');
  const contents = useRef(new Map<string, string>());

  const setValue = useCallback(
    (next: string) => {
      setValueState(next);
      onValueChange?.(next);
    },
    [onValueChange],
  );

  const registerContent = useCallback(
    (key: string, text: string) => {
      contents.current.set(key, text);
      return () => {
        contents.current.delete(key);
      };
    },
    [],
  );

  const contentFor = useCallback(
    (key: string) => contents.current.get(key),
    [],
  );

  return (
    <CommandPromptContext.Provider
      value={{ value, setValue, registerContent, contentFor }}
    >
      <div className={cn('flex flex-col gap-2', className)} {...props}>
        {children}
      </div>
    </CommandPromptContext.Provider>
  );
};

export const CommandPromptList = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn('flex items-center gap-1', className)}
    role="tablist"
    {...props}
  />
);

export const CommandPromptTrigger = ({
  children,
  className,
  value,
  ...props
}: Omit<ComponentProps<'button'>, 'value'> & { value: string }) => {
  const { value: selected, setValue } = useCommandPrompt(
    'CommandPromptTrigger',
  );
  const active = selected === value;

  return (
    <button
      aria-selected={active}
      className={cn(
        'rounded-md px-2 py-1 text-label-13 transition-colors',
        active
          ? 'bg-gray-200 text-gray-1000'
          : 'text-gray-900 hover:text-gray-1000',
        className,
      )}
      onClick={() => setValue(value)}
      role="tab"
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export const CommandPromptTriggerDivider = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    aria-hidden="true"
    className={cn('h-4 w-px bg-gray-alpha-400', className)}
    role="separator"
    {...props}
  />
);

export const CommandPromptSurface = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    className={cn(
      'flex items-center gap-2 rounded-md border border-gray-alpha-400 bg-background-100 px-3 py-2 font-mono text-[13px] text-gray-1000',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const CommandPromptPrefix = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span className={cn('select-none text-gray-700', className)} {...props} />
);

export const CommandPromptViewport = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('min-w-0 flex-1 overflow-x-auto', className)} {...props} />
);

export const CommandPromptContent = ({
  children,
  className,
  value,
  ...props
}: ComponentProps<'div'> & { value: string }) => {
  const { value: selected, registerContent } = useCommandPrompt(
    'CommandPromptContent',
  );
  const text = typeof children === 'string' ? children : undefined;

  useEffect(() => {
    if (text === undefined) return;
    return registerContent(value, text);
  }, [registerContent, text, value]);

  if (selected !== value) return null;

  return (
    <div className={cn('w-fit', className)} role="tabpanel" {...props}>
      {children}
    </div>
  );
};

export const CommandPromptCopy = ({
  className,
  ...props
}: ComponentProps<'button'>) => {
  const { value, contentFor } = useCommandPrompt('CommandPromptCopy');
  const text = contentFor(value);

  return (
    <button
      className={cn(
        'shrink-0 rounded-md p-1 text-gray-900 transition-colors hover:text-gray-1000',
        className,
      )}
      onClick={() => {
        if (!text || typeof navigator === 'undefined') return;
        void navigator.clipboard?.writeText(text);
      }}
      type="button"
      {...props}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="14"
        viewBox="0 0 16 16"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          height="8.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          width="8.5"
          x="5.75"
          y="5.75"
        />
        <path
          d="M10.25 3.75v-1a1.5 1.5 0 0 0-1.5-1.5h-6.5a1.5 1.5 0 0 0-1.5 1.5v6.5a1.5 1.5 0 0 0 1.5 1.5h1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};