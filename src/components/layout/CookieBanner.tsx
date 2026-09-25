import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

const STORAGE_KEY = "lgpd-proto:cookie-banner-dismissed"

export function CookieBanner() {
  const [visible, setVisible] = React.useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY)
    } catch {
      return true
    }
  })

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // segue sem persistir — banner pode reaparecer na próxima visita nesta sessão
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      data-cid="cookie-banner.root"
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ml-border bg-ml-surface"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 px-4 py-4 md:flex-row md:justify-between">
        <p className="text-[14px] text-ml-text">
          Usamos cookies para melhorar sua experiência no Mercado Livre. Consulte mais informações na nossa{" "}
          <a href="/privacidade" className="text-ml-blue hover:underline">
            Central de privacidade
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-[33px] rounded-[5px]"
            onClick={() => {
              toast("Esta área não faz parte do protótipo.")
              dismiss()
            }}
          >
            Configurar cookies
          </Button>
          <Button type="button" variant="secondary" size="sm" className="h-[33px] rounded-[5px]" onClick={dismiss}>
            Aceitar cookies
          </Button>
        </div>
      </div>
    </div>
  )
}
