import {
  composeRenderProps,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  Heading as RACHeading,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components';
import { cva } from '@/ui/libs/cva';

const overlayStyles = cva({
  base: [
    'fixed inset-0 z-50 overflow-y-auto',
    'bg-black/40 backdrop-blur-sm',
    'flex min-h-full items-center justify-center p-4 text-center',
    'transition-opacity duration-300',
    'data-[entering]:opacity-0 data-[exiting]:opacity-0',
  ],
});

const modalStyles = cva({
  base: [
    'w-full max-w-md overflow-hidden',
    'bg-white text-left align-middle',
    'border-2 border-black shadow-brutal-lg',
    'p-6',
    'transition-all duration-300',
    'data-[entering]:scale-95 data-[entering]:opacity-0',
    'data-[exiting]:scale-95 data-[exiting]:opacity-0',
  ],
});

const dialogStyles = cva({
  base: 'outline-none relative',
});

const headingStyles = cva({
  base: 'text-lg font-heading font-bold uppercase mb-4',
});

export const DialogTrigger = RACDialogTrigger;

export interface ModalProps extends RACModalOverlayProps {
  children: React.ReactNode;
}

export const Modal = ({ children, className, ...props }: ModalProps) => {
  return (
    <RACModalOverlay
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        overlayStyles({ ...renderProps, className }),
      )}
    >
      <RACModal
        className={composeRenderProps(className, (_className, renderProps) =>
          modalStyles({ ...renderProps, className: '' }),
        )}
      >
        {children}
      </RACModal>
    </RACModalOverlay>
  );
};

export const Dialog = ({ className, ...props }: RACDialogProps) => {
  return <RACDialog {...props} className={dialogStyles({ className })} />;
};

export const DialogHeading = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <RACHeading
      slot='title'
      {...props}
      className={headingStyles({ className })}
    />
  );
};
