export type ClassValue =
  | string
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | undefined>;

export const cn = (...values: ClassValue[]): string => {
  const classes: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (typeof value === 'string') {
      classes.push(value);
    } else if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) classes.push(nested);
    } else {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) classes.push(key);
      }
    }
  }

  return classes.join(' ');
};