import * as React from "react"
import type { VariantProps } from "cva"
import { cva, cx } from "@/ui/libs/cva"

const separatorVariants = cva({
    base: "shrink-0 bg-border",
    variants: {
        orientation: {
            horizontal: "h-[3px] w-full",
            vertical: "h-full w-[3px]",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
})

export interface SeparatorProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> { }

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    (
        { className, orientation = "horizontal", ...props },
        ref
    ) => (
        <div
            ref={ref}
            role="separator"
            aria-orientation={orientation}
            className={cx(separatorVariants({ orientation }), className)}
            {...props}
        />
    )
)
Separator.displayName = "Separator"

export { Separator }
