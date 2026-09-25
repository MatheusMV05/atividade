import { FlaskConical, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { STATUS_LABEL, TIPO_LABEL } from "./constants"
import { useRequestsStore } from "./store"
import { StatusBadge } from "./StatusBadge"
import type { RequestStatus } from "./types"

const TODOS_STATUS: RequestStatus[] = [
  "recebida",
  "em_verificacao",
  "em_analise",
  "informacoes_adicionais",
  "concluida",
  "indeferida",
  "prazo_excedido",
]

export function ScenarioPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const requests = useRequestsStore((s) => s.requests)
  const createRequest = useRequestsStore((s) => s.createRequest)
  const setStatus = useRequestsStore((s) => s.setStatus)
  const reset = useRequestsStore((s) => s.reset)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent data-comments-ui side="left" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FlaskConical className="size-5" strokeWidth={1.5} aria-hidden="true" />
            Cenários de demonstração
          </SheetTitle>
          <SheetDescription>
            Ferramenta de apoio à apresentação — não faz parte da interface do site. Força o status de um
            protocolo para mostrar cada estado da solicitação sem esperar prazos reais.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold text-ml-text-secondary">Criar solicitação de exemplo</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => createRequest("relatorio")}>
                + Relatório de dados
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => createRequest("exclusao")}>
                + Exclusão de dados
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold text-ml-text-secondary">Solicitações ({requests.length})</p>
            {requests.length === 0 && (
              <p className="text-[13px] text-ml-text-secondary">Nenhuma solicitação criada ainda.</p>
            )}
            {requests.map((r) => (
              <div key={r.protocolo} className="rounded-[6px] border border-ml-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={`/minha-conta/privacidade/solicitacoes/${r.protocolo}`}
                    className="text-[13px] font-semibold text-ml-blue hover:underline"
                  >
                    {r.protocolo}
                  </Link>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-0.5 text-[12px] text-ml-text-secondary">{TIPO_LABEL[r.tipo]}</p>
                <label className="mt-2 block text-[12px] text-ml-text-secondary">
                  Forçar status
                  <select
                    className="mt-1 block w-full rounded-[4px] border border-ml-border bg-ml-surface px-2 py-1.5 text-[13px] text-ml-text"
                    value={r.status}
                    onChange={(e) => setStatus(r.protocolo, e.target.value as RequestStatus)}
                  >
                    {TODOS_STATUS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>

          {requests.length > 0 && (
            <Button type="button" variant="outline" size="sm" onClick={reset} className="self-start">
              <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden="true" />
              Reiniciar demonstração
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
