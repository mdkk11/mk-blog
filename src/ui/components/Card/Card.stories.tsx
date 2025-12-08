/**
 * Card コンポーネントのストーリー
 *
 * Cardとその子コンポーネント群の組み合わせを表示
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/ui/components/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/Card/Card';

const meta = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態（シャドウ付き）
 */
export const Default: Story = {
  render: () => (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>CARD TITLE</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          カードのコンテンツエリアです。テキストやその他の要素を配置できます。
        </p>
      </CardContent>
      <CardFooter>
        <Button variant='tertiary' shadow='right-sm' interactive='press'>
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * シャドウバリエーション
 */
export const ShadowVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-8'>
      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Shadow: Default</h3>
        <Card shadow='default' className='w-[300px] p-4'>
          <p>デフォルトのブルータリストシャドウ</p>
        </Card>
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>
          Shadow: Primary Outline
        </h3>
        <Card shadow='primaryOutline' className='w-[300px] p-4'>
          <p>プライマリカラーのアウトラインシャドウ</p>
        </Card>
      </section>

      <section>
        <h3 className='text-lg font-bold mb-4 font-mono'>Shadow: None</h3>
        <Card shadow='none' className='w-[300px] p-4'>
          <p>シャドウなし</p>
        </Card>
      </section>
    </div>
  ),
};
