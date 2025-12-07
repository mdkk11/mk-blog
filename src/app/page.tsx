'use client';

import { mockArticles } from '@/data/mockArticles';
import { ArticleCardGrid } from '@/features/Article/components/ArticleCardGrid';
import { HeroSection } from '@/features/HeroSection';
import { Button } from '@/ui/components/Button';
import { SectionHeader } from '@/ui/components/SectionHeader';

export default function Home() {
  return (
    <main className='max-w-6xl mx-auto px-4 py-6 flex flex-col gap-16'>
      <HeroSection
        title='Welcome to My Blog'
        description='I write about technology, design, and my daily life.'
      />

      {/* 3D Shadow Playground */}
      <section className='container mx-auto py-12 space-y-8'>
        <SectionHeader title='3D SHADOW TEST' />
        <div className='flex flex-wrap gap-8 p-8 bg-gray-100 dark:bg-zinc-900 border-2 border-dashed border-gray-300'>
          {/* 右下 (Standard) */}
          <Button variant='tertiary' shadow='md'>
            右下 (Right Bottom)
          </Button>

          {/* 左下 (Left Bottom) */}
          <Button variant='tertiary' shadow='left'>
            左下 (Left Bottom)
          </Button>

          {/* 強い立体感 (Deep) */}
          <Button variant='primary' shadow='lg'>
            Deep Shadow
          </Button>

          {/* 白い影 (Dark Mode用) */}
          <Button variant='secondary' shadow='white'>
            White Shadow
          </Button>
        </div>
      </section>

      <section className='space-y-8'>
        <SectionHeader title='LATEST_ARTICLES' />
        <ArticleCardGrid articles={mockArticles} columns={3} maxItems={6} />
      </section>
    </main>
  );
}
