/**
 * HeroSection コンポーネントのストーリー
 *
 * ページ上部のヒーローセクション
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroSection } from '@/features/HeroSection/HeroSection';
import { Button } from '@/ui/components/Button/Button';
import { Link } from '@/ui/components/Link/Link';

const meta = {
  component: HeroSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    title: 'CREATIVE_DEVELOPER',
    description:
      'フロントエンドエンジニアとして活動しています。React、Next.js、TypeScriptを使った開発が得意です。',
  },
};

/**
 * CTAボタン付き
 */
export const WithCTA: Story = {
  args: {
    title: 'WELCOME_TO_MY_BLOG',
    description:
      'テクノロジー、デザイン、プログラミングについて発信しています。',
  },
  render: (args) => (
    <HeroSection {...args}>
      <div className='flex gap-4'>
        <Link
          href='#'
          variant='tertiary'
          size='lg'
          shadow='right-lg'
          interactive='press'
        >
          記事を読む
        </Link>
        <Button variant='ghost' size='lg'>
          About Me
        </Button>
      </div>
    </HeroSection>
  ),
};
