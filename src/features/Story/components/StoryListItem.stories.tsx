/**
 * StoryListItem コンポーネントのストーリー
 *
 * ストーリーセットの一覧表示用アイテム（サムネイル）
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import type { StorySet } from '../types';
import { StoryListItem } from './StoryListItem';

const meta = {
  component: StoryListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-48 h-80'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ
const mockStorySetImage: StorySet = {
  id: 'set-1',
  title: 'Summer Trip',
  thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  stories: [
    {
      id: 's1',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      duration: 5000,
    },
  ],
};

const mockStorySetGradient: StorySet = {
  id: 'set-2',
  title: 'Announcements',
  stories: [
    {
      id: 's2',
      type: 'markdown',
      content: '# Big News!',
      backgroundColor: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)',
      duration: 5000,
    },
  ],
};

const mockStorySetNoThumbnail: StorySet = {
  id: 'set-3',
  title: 'Daily Notes',
  stories: [
    {
      id: 's3',
      type: 'markdown',
      content: '# Note 1',
      backgroundColor: '#4A90E2', // 単色背景
      duration: 5000,
    },
  ],
};

/**
 * 画像サムネイル付き
 */
export const WithImageThumbnail: Story = {
  args: {
    storySet: mockStorySetImage,
    index: 0,
    onSelect: fn(),
  },
};

/**
 * グラデーション背景（サムネイルなし）
 */
export const WithGradientBackground: Story = {
  args: {
    storySet: mockStorySetGradient,
    index: 1,
    onSelect: fn(),
  },
};

/**
 * 単色背景（サムネイルなし）
 */
export const WithSolidBackground: Story = {
  args: {
    storySet: mockStorySetNoThumbnail,
    index: 2,
    onSelect: fn(),
  },
};
