import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/ui/components/Button/Button';
import {
  Menu,
  MenuHeader,
  MenuItem,
  MenuPopover,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from './Menu';

const meta = {
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button>Actions</Button>
      <MenuPopover>
        <Menu {...args}>
          <MenuItem onAction={() => alert('open')}>Open</MenuItem>
          <MenuItem onAction={() => alert('rename')}>Rename</MenuItem>
          <MenuItem onAction={() => alert('duplicate')}>Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem onAction={() => alert('delete')}>Delete</MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};

export const WithSections: Story = {
  render: (args) => (
    <MenuTrigger>
      <Button>Options</Button>
      <MenuPopover>
        <Menu {...args}>
          <MenuSection>
            <MenuHeader>Actions</MenuHeader>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Duplicate</MenuItem>
          </MenuSection>
          <MenuSeparator />
          <MenuSection>
            <MenuHeader>Danger Zone</MenuHeader>
            <MenuItem className='text-destructive hover:bg-destructive hover:text-white'>
              Delete
            </MenuItem>
          </MenuSection>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  ),
};
