import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from './Switch';

const meta = {
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Airplane Mode',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
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
