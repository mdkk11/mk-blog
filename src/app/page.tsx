'use client';

import { mockArticles } from '@/data/mockArticles';
import { ArticleCardGrid } from '@/features/Article/components/ArticleCardGrid';
import { HeroSection } from '@/features/HeroSection';
import { Link } from '@/ui/components/Link';
import { SectionHeader } from '@/ui/components/SectionHeader';

export default function Home() {
  return (
    <main className='max-w-6xl mx-auto px-4 py-6 flex flex-col gap-16'>
      <HeroSection
        title='Welcome to My Blog'
        description='I write about technology, design, and my daily life.'
      >
        <Link href='/articles' className='rotate-2' shadow='md'>
          See all articles
        </Link>
      </HeroSection>
      <section className='space-y-8'>
        <SectionHeader title='LATEST_ARTICLES' />
        <ArticleCardGrid articles={mockArticles} columns={3} maxItems={6} />
      </section>
    </main>
  );
}
