import {
  composeRenderProps,
  FieldError,
  Label,
  ListBox,
  Popover,
  Button as RACButton,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps as RACListBoxItemProps,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import { cva, focusRing } from '@/ui/libs/cva';

const selectStyles = cva({
  base: 'flex flex-col gap-1.5 w-full max-w-sm',
});

const labelStyles = cva({
  base: 'text-sm font-mono font-bold uppercase tracking-tight',
});

const triggerStyles = cva({
  base: [
    'flex items-center justify-between w-full px-4 py-2',
    'bg-white text-black text-left',
    'border-2 border-black',
    'font-sans text-base',
    'min-h-[44px]',
    'transition-colors',
    'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    isPressed: {
      true: 'bg-gray-100',
    },
    isOpen: {
      true: 'bg-gray-100',
    },
    isInvalid: {
      true: 'border-destructive',
    },
  },
});

const popoverStyles = cva({
  base: [
    'min-w-[--trigger-width] bg-white',
    'border-2 border-black',
    'shadow-brutal-md',
    'placement-bottom:mt-2 placement-top:mb-2',
    'z-50',
  ],
});

const listBoxStyles = cva({
  base: 'p-1 max-h-[300px] overflow-auto outline-none flex flex-col gap-0.5',
});

const itemStyles = cva({
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
    isSelected: {
      true: 'font-bold pl-2', // Add marker or style for selected
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
});

const descriptionStyles = cva({
  base: 'text-xs text-gray-500 font-mono',
});

const fieldErrorStyles = cva({
  base: 'text-xs text-destructive font-bold font-mono',
});

export interface SelectProps<T extends object>
  extends Omit<RACSelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <RACSelect
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        selectStyles({ ...renderProps, className }),
      )}
    >
      {() => (
        <>
          {label && <Label className={labelStyles()}>{label}</Label>}
          <RACButton
            className={(renderProps) =>
              triggerStyles({
                ...renderProps,
                className: focusRing(renderProps),
              })
            }
          >
            <SelectValue className='flex-1 truncate placeholder:text-gray-400' />
            <span aria-hidden='true' className='ml-2 text-xs'>
              ▼
            </span>
          </RACButton>
          {description && (
            <Text slot='description' className={descriptionStyles()}>
              {description}
            </Text>
          )}
          <FieldError className={fieldErrorStyles()}>{errorMessage}</FieldError>
          <Popover className={popoverStyles()}>
            <ListBox items={items} className={listBoxStyles()}>
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </RACSelect>
  );
}

export function SelectItem(props: RACListBoxItemProps) {
  return (
    <RACListBoxItem
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        itemStyles({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className='flex-1 truncate'>{children}</span>
          {isSelected && <span>✓</span>}
        </>
      ))}
    </RACListBoxItem>
  );
}
