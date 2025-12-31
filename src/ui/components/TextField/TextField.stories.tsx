import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from './TextField';

const meta = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'This will be displayed on your public profile.',
  },
};

export const WithError: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Please enter a valid username.',
    value: '!@#$',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: 'johndoe',
  },
};

export const BrutalistForm: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-80 p-6 border-2 border-black shadow-brutal-lg'>
      <h3 className='font-heading text-xl font-bold uppercase'>Login</h3>
      <TextField label='Email' type='email' placeholder='hello@example.com' />
      <TextField label='Password' type='password' />
      <div className='flex justify-end pt-2'>
        <button
          type='submit'
          className='bg-black text-white px-6 py-2 font-mono uppercase text-sm hover:bg-primary transition-colors'
        >
          Submit
        </button>
      </div>
    </div>
  ),
};
