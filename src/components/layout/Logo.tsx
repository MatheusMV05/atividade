import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * O grupo ainda não colocou o arquivo oficial em public/brand/logo-ml.svg.
 * Enquanto isso, renderiza um bloco neutro "Logo" do mesmo tamanho (CLAUDE.md §3).
 */
export function Logo({ className }: { className?: string }) {
  const [failed, setFailed] = React.useState(false)

  if (failed) {
    return (
      <span
        className={cn(
          "flex h-8 w-28 items-center justify-center rounded-[4px] border border-black/20 bg-white/60 text-[12px] font-semibold text-ml-text",
          className
        )}
      >
        Logo
      </span>
    )
  }

  return (
    <img
      src="/brand/logo-ml.svg"
      alt="Mercado Livre"
      className={cn("h-8 w-28 object-contain", className)}
      onError={() => setFailed(true)}
    />
  )
}
