/**
 * Typography コンポーネントのストーリー
 *
 * テキストスタイルのバリエーション一覧
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography } from '@/ui/components/Typography/Typography';

const meta = {
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態（paragraph）
 */
export const Default: Story = {
  args: {
    children: 'これはデフォルトのパラグラフテキストです。',
  },
};

/**
 * 全バリアント一覧
 */
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-6 max-w-2xl'>
      <section>
        <Typography variant='muted' className='mb-2'>
          variant="h1"
        </Typography>
        <Typography variant='h1'>Heading Level 1</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="h2"
        </Typography>
        <Typography variant='h2'>Heading Level 2</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="h3"
        </Typography>
        <Typography variant='h3'>Heading Level 3</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="h4"
        </Typography>
        <Typography variant='h4'>Heading Level 4</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="p"
        </Typography>
        <Typography variant='p'>
          This is a paragraph. It contains regular body text that flows
          naturally across multiple lines when the content is long enough.
        </Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="lead"
        </Typography>
        <Typography variant='lead'>
          This is lead text, typically used for introductory paragraphs.
        </Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="large"
        </Typography>
        <Typography variant='large'>Large text for emphasis</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="small"
        </Typography>
        <Typography variant='small'>Small text for fine print</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="muted"
        </Typography>
        <Typography variant='muted'>Muted text for secondary info</Typography>
      </section>

      <section>
        <Typography variant='muted' className='mb-2'>
          variant="mono"
        </Typography>
        <Typography variant='mono'>Monospace text for code</Typography>
      </section>
    </div>
  ),
};
