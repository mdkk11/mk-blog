/**
 * Shared button/link variants for consistent design system
 * Used by both Button and Link components
 */

export const buttonLinkVariants = {
    variant: {
        primary: [
            'bg-primary text-white border-1 border-white',
            'shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
            'hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]',
            'pressed:shadow-none pressed:translate-x-1 pressed:translate-y-1',
            'disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0',
        ],
        // Inverted black button/link
        secondary: [
            'bg-black text-white border-1 border-white',
            'hover:bg-white hover:text-black',
            'pressed:bg-white pressed:text-black',
        ],
        // White button/link with black border
        tertiary: [
            'bg-white text-black border-1 border-black',
            'hover:bg-black hover:text-white',
            'pressed:bg-black pressed:text-white',
        ],
        // Transparent button/link
        ghost: [
            'bg-transparent text-black border-1 border-transparent',
            'hover:bg-black/5',
            'pressed:bg-black/10',
        ],
        // Outlined primary
        outline: [
            'bg-transparent text-primary border-[2px] border-primary',
            'hover:bg-primary hover:text-white',
            'pressed:bg-primary pressed:text-white',
        ],
    },
    size: {
        sm: 'px-3 py-1.5 text-xs font-mono',
        md: 'px-4 py-2 text-sm font-mono',
        lg: 'px-4 py-3 text-xl font-heading',
        xl: 'px-6 py-4 text-2xl font-heading',
    },
    fullWidth: {
        true: 'w-full',
        false: '',
    },
    shadow: {
        none: '',
        sm: 'shadow-[2px_2px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_#000]',
        md: 'shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]',
        lg: 'shadow-[8px_8px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_0_#000]',
        left: 'shadow-[-4px_4px_0_0_#000] active:translate-x-[-2px] active:translate-y-[2px] active:shadow-[-2px_2px_0_0_#000]',
        white: 'shadow-[4px_4px_0_0_#fff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#fff]',
    },
} as const;

export const buttonLinkDefaults = {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    shadow: 'none',
} as const;
