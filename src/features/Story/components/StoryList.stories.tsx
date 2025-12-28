/**
 * StoryList コンポーネントのストーリー
 *
 * ストーリーセットの一覧グリッド
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { StorySet } from '../types';
import { StoryList } from './StoryList';

const meta = {
  component: StoryList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ生成
const createMockStorySets = (count: number): StorySet[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `set-${i}`,
    title: `Story Set ${i + 1}`,
    thumbnail:
      i % 2 === 0
        ? 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba'
        : undefined,
    stories: [
      {
        id: `s-${i}-1`,
        type: i % 2 === 0 ? 'image' : 'markdown',
        content:
          i % 2 === 0
            ? 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba'
            : `# Story ${i + 1}\n\nThis is a sample story content.`,
        backgroundColor:
          i % 2 !== 0 ? ['#FF9A9E', '#a18cd1', '#fad0c4'][i % 3] : undefined,
        duration: 5000,
      },
    ],
  }));
};

const mockSets = createMockStorySets(8);

/**
 * デフォルト（4カラムグリッド）
 */
export const Default: Story = {
  args: {
    storySets: mockSets,
  },
};

/**
 * インライン表示モード（アイテム選択時にその場で展開）
 */
export const InlineMode: Story = {
  args: {
    storySets: mockSets.slice(0, 4),
    options: {
      displayMode: 'inline',
    },
    className: 'max-w-4xl mx-auto',
  },
  decorators: [
    (Story) => (
      <div className='bg-gray-50 p-8 min-h-screen'>
        <div className='mb-8 text-center text-gray-500'>
          クリックしてインライン展開を確認できます
        </div>
        <Story />
      </div>
    ),
  ],
};

/**
 * 少ないアイテム数
 */
export const FewItems: Story = {
  args: {
    storySets: mockSets.slice(0, 2),
  },
};
