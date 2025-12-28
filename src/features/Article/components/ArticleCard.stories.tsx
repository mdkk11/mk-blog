/**
 * ArticleCard コンポーネントのストーリー
 *
 * 記事カードの様々なバリエーション
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArticleCard } from '@/features/Article/components/ArticleCard';

const meta = {
  component: ArticleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle = {
  category: 'TECHNOLOGY',
  date: '2024.01.15',
  title: 'Next.js 15で変わるWebフロントエンド開発の未来',
  author: {
    name: 'JOHN_DOE',
    avatar: '/avatar.jpg',
  },
};

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    ...mockArticle,
    href: '#',
  },
};

/**
 * バリエーション一覧
 */
export const AllVariants: Story = {
  args: mockArticle,
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-4xl'>
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Default</h3>
        <ArticleCard {...mockArticle} href='#' variant='default' />
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Simple</h3>
        <ArticleCard {...mockArticle} href='#' variant='simple' />
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Compact</h3>
        <ArticleCard {...mockArticle} href='#' variant='compact' />
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Inverted</h3>
        <ArticleCard {...mockArticle} href='#' variant='inverted' />
      </section>
    </div>
  ),
};
