import * as React from "react"
import type { VariantProps } from "cva"
import { cva, cx } from "@/ui/libs/cva"

const cardVariants = cva({
    base: "bg-white text-black border-[3px] border-black",
    variants: {
        shadow: {
            default: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            primaryOutline: "relative after:absolute after:top-2 after:-right-2 after:w-full after:h-full after:border-[3px] after:border-primary after:-z-10",
            none: "",
        },
    },
    defaultVariants: {
        shadow: "default",
    },
});

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, shadow, ...props }, ref) => (
        <div
            ref={ref}
            className={cx(cardVariants({ shadow }), className)}
            {...props}
        />
    )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cx("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cx(
            "font-black font-heading text-2xl leading-none tracking-tight uppercase",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cx("text-sm text-muted-foreground font-mono", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cx("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cx("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
