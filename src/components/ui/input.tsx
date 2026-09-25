import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-[2px] border border-ml-border bg-ml-surface px-4 text-[16px] text-ml-text shadow-[0_1px_2px_rgba(0,0,0,0.2)] outline-none placeholder:text-ml-text-secondary focus-visible:border-ml-blue disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-ml-red",
        className
      )}
      {...props}
    />
  )
}

export { Input }
