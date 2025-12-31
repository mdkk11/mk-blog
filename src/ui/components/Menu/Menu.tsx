import {
  composeRenderProps,
  Header as RACHeader,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
  type MenuProps as RACMenuProps,
  MenuTrigger as RACMenuTrigger,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
  Section as RACSection,
  type SectionProps as RACSectionProps,
  Separator as RACSeparator,
  type SeparatorProps as RACSeparatorProps,
} from 'react-aria-components';
import { cva } from '@/ui/libs/cva';

const popoverStyles = cva({
  base: [
    'min-w-[150px] bg-white',
    'border-2 border-black',
    'shadow-brutal-md',
    'placement-bottom:mt-2 placement-top:mb-2',
    'z-50',
  ],
});

const menuStyles = cva({
  base: 'p-1 outline-none flex flex-col gap-0.5',
});

const menuItemStyles = cva({
  base: [
    'group flex items-center gap-2 cursor-pointer',
    'px-3 py-2 outline-none',
    'font-mono text-sm',
    'transition-colors',
  ],
  variants: {
    isFocused: {
      true: 'bg-black text-white',
      false: 'text-black',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
});

const separatorStyles = cva({
  base: 'h-px bg-black my-1 mx-1',
});

const headerStyles = cva({
  base: 'text-xs font-bold text-gray-500 px-3 py-1 uppercase tracking-wide',
});

export const MenuTrigger = RACMenuTrigger;

export const MenuPopover = ({ className, ...props }: RACPopoverProps) => {
  return (
    <RACPopover
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        popoverStyles({ ...renderProps, className }),
      )}
    />
  );
};

export function Menu<T extends object>({
  className,
  ...props
}: RACMenuProps<T>) {
  return (
    <RACMenu
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        menuStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function MenuItem(props: RACMenuItemProps) {
  return (
    <RACMenuItem
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        menuItemStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function MenuSeparator({ className, ...props }: RACSeparatorProps) {
  return <RACSeparator {...props} className={separatorStyles({ className })} />;
}

export function MenuHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <RACHeader {...props} className={headerStyles({ className })} />;
}

export function MenuSection<T extends object>({
  className,
  ...props
}: RACSectionProps<T>) {
  return <RACSection {...props} className={className} />;
}
