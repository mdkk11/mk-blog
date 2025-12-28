/**
 * StoryPlayer コンポーネントのストーリー
 *
 * ストーリー再生プレーヤー（モーダル/インライン表示）
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { defaultOptions, type StorySet } from '../types';
import { StoryPlayer } from './StoryPlayer';

const meta = {
  component: StoryPlayer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoryPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ
const mockStorySet: StorySet = {
  id: 'set-1',
  title: 'Daily Updates',
  stories: [
    {
      id: 's1',
      type: 'markdown',
      content: '# Hello Storybook\n\nWelcome to StoryPlayer component.',
      backgroundColor:
        'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
      duration: 5000,
    },
    {
      id: 's2',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
      duration: 5000,
    },
    {
      id: 's3',
      type: 'markdown',
      content: '# The End\n\nThanks for watching!',
      backgroundColor: '#333',
      duration: 5000,
    },
  ],
};

const mockStorySets = [mockStorySet];

/**
 * デフォルト（フルスクリーンモード）
 */
export const Fullscreen: Story = {
  args: {
    storySet: mockStorySet,
    storySets: mockStorySets,
    setIndex: 0,
    options: {
      ...defaultOptions,
      autoPlay: false, // 自動再生はオフにしておく
    },
    onClose: fn(),
    onNavigateSet: fn(),
  },
};

/**
 * インライン表示モード
 */
export const Inline: Story = {
  args: {
    storySet: mockStorySet,
    storySets: mockStorySets,
    setIndex: 0,
    options: {
      ...defaultOptions,
      displayMode: 'inline',
      autoPlay: false,
    },
    onClose: fn(),
    onNavigateSet: fn(),
  },
  decorators: [
    (Story) => (
      <div className='p-8 flex justify-center bg-gray-100 h-screen items-center'>
        <div className='w-[375px] h-[667px] relative shadow-xl rounded-lg overflow-hidden'>
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * 自動再生オン
 */
export const AutoPlay: Story = {
  args: {
    storySet: mockStorySet,
    storySets: mockStorySets,
    setIndex: 0,
    options: {
      ...defaultOptions,
      autoPlay: true,
    },
    onClose: fn(),
    onNavigateSet: fn(),
  },
};
