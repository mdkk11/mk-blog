/**
 * ArticleCardGrid コンポーネントのストーリー
 *
 * 記事カードをグリッドレイアウトで表示するコンポーネント
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ArticleCardProps } from './ArticleCard';
import { ArticleCardGrid } from './ArticleCardGrid';

const meta = {
  component: ArticleCardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ生成ヘルパー
const createMockArticles = (count: number): ArticleCardProps[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `article-${i + 1}`,
    category: ['TECHNOLOGY', 'DESIGN', 'LIFE'][i % 3], // 修正: 配列から正しく取得
    date: `2024.01.${String(i + 1).padStart(2, '0')}`,
    title:
      [
        'Next.js 15で変わるWebフロントエンド開発の未来',
        'UIデザインにおけるマイクロインタラクションの重要性',
        'リモートワークでの生産性を高める5つの習慣',
        'Tailwind CSSを使った効率的なスタイリング手法',
        'React Server Componentsの実践的な活用事例',
        'アクセシビリティを意識したWebサイト構築のポイント',
      ][i % 6] ?? 'Sample Article Title',
    author: {
      name: ['JOHN_DOE', 'JANE_SMITH', 'ALEX_LEE'][i % 3] ?? 'AUTHOR',
      avatar: '/avatar.jpg',
    },
    variant: 'default',
    href: '#',
  }));
};

const defaultArticles = createMockArticles(6);

/**
 * デフォルト状態（3カラム、mdギャップ）
 */
export const Default: Story = {
  args: {
    articles: defaultArticles,
    columns: 3,
    gap: 'md',
  },
};

/**
 * カラム数変更
 */
export const TwoColumns: Story = {
  args: {
    articles: defaultArticles.slice(0, 4),
    columns: 2,
    gap: 'md',
  },
};

export const FourColumns: Story = {
  args: {
    articles: createMockArticles(8),
    columns: 4,
    gap: 'sm',
  },
};

/**
 * ギャップサイズ変更
 */
export const LargeGap: Story = {
  args: {
    articles: defaultArticles.slice(0, 3),
    columns: 3,
    gap: 'xl',
  },
};

/**
 * カードバリアントの一括指定
 */
export const SimpleCards: Story = {
  args: {
    articles: defaultArticles,
    columns: 3,
    cardVariant: 'simple',
  },
};

export const CompactCards: Story = {
  args: {
    articles: defaultArticles,
    columns: 3,
    cardVariant: 'compact',
    gap: 'sm',
  },
};

/**
 * 最大表示数制限（maxItems）
 */
export const LimitedItems: Story = {
  args: {
    articles: createMockArticles(10),
    maxItems: 3,
    columns: 3,
  },
};
