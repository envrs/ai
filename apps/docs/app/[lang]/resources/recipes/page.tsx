import type { Metadata } from 'next';
import { socialCard } from '@/lib/og';
import { RecipesLanding } from '@/components/recipes/recipes-landing';

export const metadata: Metadata = {
  alternates: { canonical: '/resources/recipes' },
  title: 'ai-toolkit Recipes',
  description:
    'Open-source recipes, guides, and examples for building with the ai-toolkit.',
  ...socialCard(
    'ai-toolkit Recipes',
    'Open-source recipes, guides, and examples for building with the ai-toolkit.',
  ),
};

const Page = () => <RecipesLanding version="v7" versionPrefix="" />;

export default Page;
