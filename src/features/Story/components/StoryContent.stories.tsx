/**
 * StoryContent コンポーネントのストーリー
 *
 * ストーリーのコンテンツ（画像またはMarkdown）を表示
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { Story as StoryType } from '../types';
import { StoryContent } from './StoryContent';

const meta = {
  component: StoryContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[375px] h-[667px] bg-black relative overflow-hidden'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StoryContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータ
const imageStory: StoryType = {
  id: 'story-1',
  type: 'image',
  content: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', // サンプル画像URL
  duration: 5000,
  createdAt: new Date(),
};

const markdownStory: StoryType = {
  id: 'story-2',
  type: 'markdown',
  content: `
# Hello World

This is a **markdown** story.

- Point 1
- Point 2
- Point 3

Enjoy!
  `,
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  duration: 8000,
  createdAt: new Date(),
};

const simpleTextStory: StoryType = {
  id: 'story-3',
  type: 'markdown',
  content: '# Just simple text',
  backgroundColor: '#ff0080',
  duration: 3000,
  createdAt: new Date(),
};

/**
 * 画像コンテンツ
 */
export const ImageContent: Story = {
  args: {
    story: imageStory,
  },
};

/**
 * Markdownコンテンツ（グラデーション背景）
 */
export const MarkdownContent: Story = {
  args: {
    story: markdownStory,
  },
};

/**
 * シンプルテキスト（単色背景）
 */
export const SimpleTextContent: Story = {
  args: {
    story: simpleTextStory,
  },
};
