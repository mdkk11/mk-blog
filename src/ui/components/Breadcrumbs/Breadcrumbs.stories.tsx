import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb, BreadcrumbLink, Breadcrumbs } from './Breadcrumbs';

const meta = {
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink>Breadcrumbs</BreadcrumbLink>
      </Breadcrumb>
    </Breadcrumbs>
  ),
};

export const ManyItems: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink href='/products'>Products</BreadcrumbLink>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink href='/products/electronics'>
          Electronics
        </BreadcrumbLink>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink href='/products/electronics/laptops'>
          Laptops
        </BreadcrumbLink>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbLink>MacBook Pro</BreadcrumbLink>
      </Breadcrumb>
    </Breadcrumbs>
  ),
};
