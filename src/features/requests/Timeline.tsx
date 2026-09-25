import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

import type { RequestStatus } from "./types"

const PASSOS: { status: RequestStatus; label: string }[] = [
  { status: "recebida", label: "Recebida" },
  { status: "em_verificacao", label: "Identidade confirmada" },
  { status: "em_analise", label: "Em análise" },
  { status: "concluida", label: "Concluída" },
]

// Estados de exceção acontecem "durante" a etapa de análise — a linha do tempo
// avança até lá e o desvio é explicado num bloco separado, não como 5º passo.
const INDICE_ATUAL: Record<RequestStatus, number> = {
  recebida: 0,
  em_verificacao: 1,
  em_analise: 2,
  informacoes_adicionais: 2,
  indeferida: 2,
  prazo_excedido: 2,
  concluida: 3,
}

export function Timeline({ status }: { status: RequestStatus }) {
  const atual = INDICE_ATUAL[status]
  const desviou = status === "informacoes_adicionais" || status === "indeferida" || status === "prazo_excedido"

  return (
    <ol aria-label="Linha do tempo da solicitação" className="flex flex-col gap-0">
      {PASSOS.map((passo, i) => {
        const feito = i < atual || (i === 3 && status === "concluida")
        const ativo = i === atual
        return (
          <li key={passo.status} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold",
                  feito && "border-ml-green bg-ml-green text-white",
                  !feito && ativo && !desviou && "border-ml-blue bg-ml-blue text-white",
                  !feito && ativo && desviou && "border-ml-orange bg-ml-orange text-white",
                  !feito && !ativo && "border-ml-border bg-ml-surface text-ml-text-secondary"
                )}
               aria-hidden="true"
              >
                {feito ? <Check className="size-3.5" strokeWidth={2} aria-hidden="true" /> : i + 1}
              </span>
              {i < PASSOS.length - 1 && (
                <span className={cn("h-8 w-0.5", feito ? "bg-ml-green" : "bg-ml-border")} aria-hidden="true" />
              )}
            </div>
            <p
              className={cn(
                "pb-8 pt-0.5 text-[14px]",
                feito && "text-ml-text",
                ativo && !feito && "font-semibold text-ml-text",
                !ativo && !feito && "text-ml-text-secondary"
              )}
            >
              {passo.label}
              {ativo && desviou && (
                <span className="ml-2 text-[12px] font-normal text-ml-orange">— ver detalhes abaixo</span>
              )}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
