import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

// Toggle no estilo ML (§3 do CLAUDE.md): azul com um check branco dentro do
// thumb quando ativo — não é o switch "cru" do shadcn.
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ml-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-ml-blue data-[state=unchecked]:bg-black/20",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "group pointer-events-none flex size-5 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      >
        <Check
          className="size-3 text-ml-blue opacity-0 transition-opacity group-data-[state=checked]:opacity-100"
          strokeWidth={3}
          aria-hidden="true"
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
