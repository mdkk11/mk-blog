/**
 * MarkdownRenderer コンポーネントのストーリー
 *
 * 簡易的なMarkdownレンダリングの確認
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MarkdownRenderer } from './MarkdownRenderer';

const meta = {
  component: MarkdownRenderer,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='max-w-md w-full bg-gray-900 rounded-lg overflow-hidden'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MarkdownRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的な見出しとテキスト
 */
export const Basic: Story = {
  args: {
    content: `# Heading 1
## Heading 2
### Heading 3

This is a regular paragraph text.
Multiple lines are supported.

Line breaks are handled automatically.
`,
  },
};

/**
 * 強調とリスト
 */
export const RichText: Story = {
  args: {
    content: `# Features

We support:
- **Bold text** for emphasis
- *Italic text* for nuance
- List items for organization

Combined: **Bold** and *Italic* inside text.
`,
  },
};

/**
 * 長文テキスト
 */
export const LongContent: Story = {
  args: {
    content: `# Storytelling

Since the dawn of time, humans have told stories.
Stories help us connect, understand, and inspire each other.

## Why Markdown?

Markdown is a lightweight markup language that allows you to write using an easy-to-read, easy-to-write plain text format.

### Benefits

- Simple syntax
- Platform independent
- Readable as raw text

Start writing your story today!
`,
  },
};
