import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Favorite Pet',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value='cat'>Cat</Radio>
      <Radio value='dog'>Dog</Radio>
      <Radio value='dragon'>Dragon</Radio>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  args: {
    description: 'Select the pet you like the most.',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value='cat'>Cat</Radio>
      <Radio value='dog'>Dog</Radio>
      <Radio value='dragon'>Dragon</Radio>
    </RadioGroup>
  ),
};

export const WithError: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'You must select a pet.',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value='cat'>Cat</Radio>
      <Radio value='dog'>Dog</Radio>
      <Radio value='dragon'>Dragon</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value='cat'>Cat</Radio>
      <Radio value='dog' isDisabled={false}>
        Dog (Enabled but group disabled)
      </Radio>
      <Radio value='dragon'>Dragon</Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} className='flex flex-row gap-6'>
      <Radio value='s'>Small</Radio>
      <Radio value='m'>Medium</Radio>
      <Radio value='l'>Large</Radio>
    </RadioGroup>
  ),
};
