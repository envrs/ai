import '../global.css';
import '@/lib/geistdocs/site-url-warning';
import type { Metadata, Viewport } from 'next';
import { DocsProvider } from '@/components/docs/provider';
import { config } from '@/lib/geistdocs/config';
import { Footer, Navbar } from '@/lib/ds/layout';
import { mono, sans } from '@/lib/geistdocs/fonts';
import { getRootLang } from '@/lib/geistdocs/root-params';
import { isSiteUrlConfigured, siteUrl } from '@/lib/geistdocs/site-url';

export const generateStaticParams = () => [{ lang: 'en' }];

export const metadata: Metadata = {
  metadataBase: isSiteUrlConfigured ? siteUrl : undefined,
  title: {
    default: 'ai-toolkit',
    template: '%s | ai-toolkit',
  },
  description:
    'The TypeScript toolkit for building AI applications and agents.',
  openGraph: {
    siteName: 'ai-toolkit',
    type: 'website',
  },
  // Twitter falls back to the page's og:image; the card type must be set
  // for large cards.
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { color: '#ffffff', media: '(prefers-color-scheme: light)' },
    { color: '#000000', media: '(prefers-color-scheme: dark)' },
  ],
};

const RootLayout = async ({ children }: LayoutProps<'/[lang]'>) => {
  const lang = await getRootLang();

  return (
    <html
      className={`${sans.variable} ${mono.variable} antialiased`}
      lang={lang}
      suppressHydrationWarning
    >
      <head>
        <link href="/llms.txt" rel="llms-txt" />
      </head>
      <body>
        <DocsProvider config={config} lang={lang}>
          <Navbar config={config} />
          {children}
          <Footer />
        </DocsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
