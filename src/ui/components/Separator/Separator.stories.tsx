/**
 * Separator コンポーネントのストーリー
 *
 * 水平・垂直の区切り線
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from '@/ui/components/Separator/Separator';

const meta = {
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 水平（デフォルト）
 */
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    className: 'w-64',
  },
};

/**
 * 垂直
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-16',
  },
};

/**
 * 使用例
 */
export const Examples: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Horizontal</h3>
        <div className='w-64'>
          <p className='mb-2'>上のコンテンツ</p>
          <Separator />
          <p className='mt-2'>下のコンテンツ</p>
        </div>
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Vertical</h3>
        <div className='flex items-center gap-4 h-16'>
          <span>左</span>
          <Separator orientation='vertical' />
          <span>右</span>
        </div>
      </section>
    </div>
  ),
};
