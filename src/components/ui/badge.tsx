import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold",
  {
    variants: {
      variant: {
        blue: "bg-ml-blue-light text-ml-blue",
        green: "bg-[rgba(0,166,80,0.12)] text-ml-green",
        orange: "bg-[rgba(255,119,51,0.12)] text-ml-orange",
        red: "bg-[rgba(242,61,79,0.12)] text-ml-red",
        neutral: "bg-black/5 text-ml-text-secondary",
      },
    },
    defaultVariants: { variant: "blue" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
