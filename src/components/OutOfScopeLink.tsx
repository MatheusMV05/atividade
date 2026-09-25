import * as React from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

/**
 * Links visíveis fora do escopo de privacidade (§1, requisito 7 do enunciado):
 * ficam clicáveis, mas mostram um toast discreto em vez de navegar.
 */
function OutOfScopeLink({
  className,
  children,
  mensagem = "Esta área não faz parte do protótipo.",
  ...props
}: React.ComponentProps<"a"> & { mensagem?: string }) {
  return (
    <a
      href="#"
      className={cn(className)}
      onClick={(e) => {
        e.preventDefault()
        toast(mensagem)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export { OutOfScopeLink }
