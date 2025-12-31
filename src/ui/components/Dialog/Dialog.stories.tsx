import type { Meta } from '@storybook/nextjs-vite';
import { Button } from '@/ui/components/Button/Button';
import { TextField } from '@/ui/components/TextField';
import { Dialog, DialogHeading, DialogTrigger, Modal } from './Dialog';

const meta = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDismissable: { control: 'boolean' },
    isKeyboardDismissDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;

export const Default = {
  args: {},
  // biome-ignore lint/suspicious/noExplicitAny: Storybook args typing is complex
  render: (args: any) => (
    <DialogTrigger>
      <Button>Open Dialog</Button>
      <Modal {...args} isDismissable>
        <Dialog>
          {({ close }) => (
            <div className='flex flex-col gap-4'>
              <DialogHeading>Edit Profile</DialogHeading>
              <TextField label='Name' autoFocus defaultValue='John Doe' />
              <TextField label='Email' defaultValue='john@example.com' />
              <div className='flex justify-end gap-2 mt-4'>
                <Button variant='secondary' onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Save</Button>
              </div>
            </div>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
};

export const Alert = {
  args: {},
  // biome-ignore lint/suspicious/noExplicitAny: Storybook args typing is complex
  render: (args: any) => (
    <DialogTrigger>
      <Button variant='secondary'>Delete Account</Button>
      <Modal {...args} isDismissable>
        <Dialog role='alertdialog'>
          {({ close }) => (
            <div className='flex flex-col gap-4'>
              <DialogHeading className='text-destructive'>
                Danger Zone
              </DialogHeading>
              <p className='font-mono text-sm'>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className='flex justify-end gap-2 mt-4'>
                <Button variant='ghost' onPress={close}>
                  Cancel
                </Button>
                <Button
                  className='bg-destructive border-destructive text-white hover:bg-red-600'
                  onPress={close}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
};
