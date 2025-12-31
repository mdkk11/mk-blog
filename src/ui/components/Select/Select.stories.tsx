import type { Meta } from '@storybook/nextjs-vite';
import { Select, SelectItem } from './Select';

const meta = {
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Category',
  },
} satisfies Meta<typeof Select>;

export default meta;

export const Default = {
  args: {},
  // biome-ignore lint/suspicious/noExplicitAny: Storybook args typing is complex with generics
  render: (args: any) => (
    <Select {...args}>
      <SelectItem>Design</SelectItem>
      <SelectItem>Engineering</SelectItem>
      <SelectItem>Product</SelectItem>
      <SelectItem>Marketing</SelectItem>
    </Select>
  ),
};

export const WithItemsData = {
  args: {},
  // biome-ignore lint/suspicious/noExplicitAny: Storybook args typing is complex with generics
  render: (args: any) => (
    <Select
      {...args}
      items={[
        { id: 1, name: 'Design' },
        { id: 2, name: 'Engineering' },
        { id: 3, name: 'Product' },
      ]}
    >
      {(item: { id: number; name: string }) => (
        <SelectItem id={item.id}>{item.name}</SelectItem>
      )}
    </Select>
  ),
};

export const Disabled = {
  args: {
    isDisabled: true,
    placeholder: 'Select a category (Disabled)',
  },
  // biome-ignore lint/suspicious/noExplicitAny: Storybook args typing is complex with generics
  render: (args: any) => (
    <Select {...args}>
      <SelectItem>Design</SelectItem>
      <SelectItem>Engineering</SelectItem>
    </Select>
  ),
};

export const Invalid = {
  args: {
    isInvalid: true,
    errorMessage: 'Please select a valid category.',
  },
  // biome-ignore lint/suspicious/noExplicitAny: Storybook args typing is complex with generics
  render: (args: any) => (
    <Select {...args}>
      <SelectItem>Design</SelectItem>
      <SelectItem>Engineering</SelectItem>
    </Select>
  ),
};
