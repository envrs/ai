import type { Metadata } from 'next';
import { RecipesLanding } from '@/components/recipes/recipes-landing';

export const metadata: Metadata = {
  title: 'ai-toolkit Recipes',
  description:
    'Open-source recipes, guides, and examples for building with the ai-toolkit.',
  robots: {
    index: false,
    follow: true,
  },
};

const Page = () => <RecipesLanding version="v5" versionPrefix="/v5" />;

export default Page;
