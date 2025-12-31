import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Terms and Conditions',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    children: 'Select all',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    isDisabled: true,
    isSelected: true,
  },
};

export const LongText: Story = {
  args: {
    children: (
      <span className='block max-w-xs text-sm leading-tight text-gray-600'>
        I agree to the <b className='text-black'>Terms of Service</b> and{' '}
        <b className='text-black'>Privacy Policy</b>, and I consent to receive
        marketing communications mainly about brutalist design trends.
      </span>
    ),
  },
};
