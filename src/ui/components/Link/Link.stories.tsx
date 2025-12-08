/**
 * Link コンポーネントのストーリー
 *
 * Button と同じバリエーションを持つリンクコンポーネント
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link } from '@/ui/components/Link/Link';

const meta = {
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    href: '#',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    children: 'リンク',
  },
};

/**
 * 全バリアント一覧
 */
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      {/* Variants */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Variants</h3>
        <div className='flex flex-wrap gap-4'>
          <Link href='#' variant='primary'>
            Primary
          </Link>
          <Link href='#' variant='secondary'>
            Secondary
          </Link>
          <Link href='#' variant='tertiary'>
            Tertiary
          </Link>
          <Link href='#' variant='ghost'>
            Ghost
          </Link>
          <Link href='#' variant='outline'>
            Outline
          </Link>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Sizes</h3>
        <div className='flex flex-wrap items-center gap-4'>
          <Link href='#' size='sm'>
            Small
          </Link>
          <Link href='#' size='md'>
            Medium
          </Link>
          <Link href='#' size='lg'>
            Large
          </Link>
          <Link href='#' size='xl'>
            Extra Large
          </Link>
        </div>
      </section>

      {/* Shadows with Interactive */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>
          Shadow + Interactive: Press
        </h3>
        <div className='flex flex-wrap gap-6'>
          <Link
            href='#'
            variant='tertiary'
            shadow='right-md'
            interactive='press'
          >
            Press MD
          </Link>
          <Link
            href='#'
            variant='tertiary'
            shadow='right-lg'
            interactive='press'
          >
            Press LG
          </Link>
        </div>
      </section>

      {/* Interactive Hover */}
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>
          Shadow + Interactive: Hover
        </h3>
        <div className='flex flex-wrap gap-6'>
          <Link
            href='#'
            variant='tertiary'
            shadow='right-md'
            interactive='hover'
          >
            Hover MD
          </Link>
          <Link
            href='#'
            variant='tertiary'
            shadow='right-lg'
            interactive='hover'
          >
            Hover LG
          </Link>
        </div>
      </section>
    </div>
  ),
};
