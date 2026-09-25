import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[14px] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-ml-blue text-white hover:bg-ml-blue-hover",
        secondary: "bg-ml-blue-light text-ml-blue hover:brightness-95",
        outline: "border border-ml-border bg-transparent text-ml-blue hover:bg-ml-blue-light",
        link: "bg-transparent text-ml-blue underline-offset-2 hover:underline font-normal",
        ghost: "bg-transparent text-ml-text hover:bg-black/5",
        destructive: "bg-ml-red text-white hover:brightness-95",
      },
      size: {
        default: "h-12 px-6 text-[16px]",
        sm: "h-8 px-4 text-[14px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
