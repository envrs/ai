import type { ThemeRegistration } from 'shiki';

/**
 * Shiki theme that maps token colors onto the app's CSS variables so the
 * highlighted code blocks follow the light/dark theme without a second
 * stylesheet. Mirrors the token names used by the `.shiki` markup.
 */
export const geistShikiTheme: ThemeRegistration = {
  name: 'geist',
  type: 'light',
  colors: {
    'var(--ds-code-foreground)': '#111111',
    'var(--ds-code-comment)': '#8f8f8f',
    'var(--ds-code-keyword)': '#a626a4',
    'var(--ds-code-string)': '#50a14f',
    'var(--ds-code-number)': '#986801',
    'var(--ds-code-function)': '#4078f2',
    'var(--ds-code-type)': '#c18401',
    'var(--ds-code-punctuation)': '#383a42',
    'var(--ds-code-tag)': '#e45649',
  },
};