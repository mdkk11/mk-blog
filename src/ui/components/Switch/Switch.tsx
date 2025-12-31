import {
  composeRenderProps,
  Switch as RACSwitch,
  type SwitchProps as RACSwitchProps,
} from 'react-aria-components';
import { cva, focusRing } from '@/ui/libs/cva';

const switchStyles = cva({
  base: 'group flex items-center gap-3 cursor-pointer text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
});

const trackStyles = cva({
  base: [
    'w-12 h-7 px-0.5 flex items-center',
    'border-2 border-black bg-white',
    'rounded-full transition-colors duration-200',
  ],
  variants: {
    isSelected: {
      true: 'bg-black',
      false: 'bg-white',
    },
  },
});

const thumbStyles = cva({
  base: [
    'w-5 h-5 rounded-full border-2 border-black shadow-sm',
    'transition-all duration-200 ease-in-out',
    'transform',
  ],
  variants: {
    isSelected: {
      true: 'translate-x-5 bg-white border-white',
      false: 'translate-x-0 bg-black border-black',
    },
  },
});

export interface SwitchProps extends RACSwitchProps {
  className?: string;
}

const Switch = ({ children, className, ...props }: SwitchProps) => {
  return (
    <RACSwitch
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        switchStyles({ ...renderProps, className }),
      )}
    >
      {(renderProps) => (
        <>
          <div
            className={trackStyles({
              ...renderProps,
              className: focusRing(renderProps),
            })}
          >
            <span className={thumbStyles(renderProps)} />
          </div>
          {children}
        </>
      )}
    </RACSwitch>
  );
};

export { Switch };
