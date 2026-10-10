import type { Metadata } from 'next';
import { LandingPage } from '@/components/home/landing-page';
import { absoluteUrl } from '@/lib/geistdocs/site-url';

const description =
  'A unified TypeScript SDK for building AI apps with modern streaming, fallbacks, and multi-model support—powered by khulnasoft.';
const image = 'https://e742qlubrjnjqpp0.public.blob.khulnasoft-storage.com/og.png';

export const metadata: Metadata = {
  title: { absolute: 'ai-toolkit' },
  description,
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    title: 'ai-toolkit',
    description,
    url: absoluteUrl('/'),
    siteName: 'ai-toolkit',
    type: 'website',
    images: [{ url: image }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai-toolkit',
    description,
    images: [image],
  },
};

export default LandingPage;
