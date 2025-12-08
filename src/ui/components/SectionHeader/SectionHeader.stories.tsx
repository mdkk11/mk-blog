/**
 * SectionHeader コンポーネントのストーリー
 *
 * セクションタイトル用のヘッダーコンポーネント
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeader } from '@/ui/components/SectionHeader/SectionHeader';

const meta = {
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    title: 'SECTION_HEADER',
  },
};

/**
 * 様々なタイトル例
 */
export const Examples: Story = {
  args: {
    title: 'EXAMPLE',
  },
  render: () => (
    <div className='flex flex-col gap-8 w-full max-w-2xl'>
      <SectionHeader title='LATEST_ARTICLES' />
      <SectionHeader title='FEATURED' />
      <SectionHeader title='ABOUT_ME' />
      <SectionHeader title='日本語タイトル' />
    </div>
  ),
};
