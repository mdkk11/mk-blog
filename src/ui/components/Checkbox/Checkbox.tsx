import {
  composeRenderProps,
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';
import { cva, focusRing } from '@/ui/libs/cva';

const checkboxStyles = cva({
  base: 'group flex items-center gap-3 cursor-pointer text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
});

const boxStyles = cva({
  base: [
    'w-5 h-5 flex items-center justify-center',
    'border-2 border-black bg-white',
    'transition-all duration-200',
  ],
  variants: {
    isSelected: {
      true: 'bg-black border-black',
      false: '',
    },
    isIndeterminate: {
      true: 'bg-black border-black',
      false: '',
    },
    isInvalid: {
      true: 'border-destructive',
    },
  },
});

const iconStyles = cva({
  base: 'text-white w-3.5 h-3.5',
});

export interface CheckboxProps extends RACCheckboxProps {
  className?: string; // wrapper class
}

const Checkbox = ({ className, children, ...props }: CheckboxProps) => {
  return (
    <RACCheckbox
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {(renderProps) => (
        <>
          <div
            className={boxStyles({
              ...renderProps,
              className: focusRing(renderProps),
            })}
          >
            {renderProps.isIndeterminate ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={iconStyles()}
                aria-hidden='true'
              >
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
            ) : renderProps.isSelected ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={iconStyles()}
                aria-hidden='true'
              >
                <polyline points='20 6 9 17 4 12' />
              </svg>
            ) : null}
          </div>
          {children}
        </>
      )}
    </RACCheckbox>
  );
};

export { Checkbox };
