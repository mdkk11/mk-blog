/**
 * StoryProgressBar コンポーネントのストーリー
 *
 * ストーリーの進捗を表示するプログレスバー
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { StoryProgressBar } from '@/features/Story/components/StoryProgressBar';

const meta = {
  component: StoryProgressBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='relative w-80 h-20 bg-gray-800 rounded-lg'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StoryProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態（3つ中1つ目、50%進行）
 */
export const Default: Story = {
  args: {
    count: 3,
    currentIndex: 0,
    progress: 50,
    onJump: fn(),
  },
};

/**
 * 進行状態のバリエーション
 */
export const ProgressVariations: Story = {
  args: {
    count: 5,
    currentIndex: 2,
    progress: 75,
    onJump: fn(),
  },
  render: () => (
    <div className='flex flex-col gap-8 w-80'>
      <div className='relative h-12 bg-gray-800 rounded-lg'>
        <StoryProgressBar
          count={5}
          currentIndex={0}
          progress={0}
          onJump={fn()}
        />
        <span className='absolute bottom-1 left-2 text-white text-xs font-mono'>
          開始時
        </span>
      </div>

      <div className='relative h-12 bg-gray-800 rounded-lg'>
        <StoryProgressBar
          count={5}
          currentIndex={2}
          progress={50}
          onJump={fn()}
        />
        <span className='absolute bottom-1 left-2 text-white text-xs font-mono'>
          中間（3/5、50%）
        </span>
      </div>

      <div className='relative h-12 bg-gray-800 rounded-lg'>
        <StoryProgressBar
          count={5}
          currentIndex={4}
          progress={100}
          onJump={fn()}
        />
        <span className='absolute bottom-1 left-2 text-white text-xs font-mono'>
          完了
        </span>
      </div>
    </div>
  ),
};
