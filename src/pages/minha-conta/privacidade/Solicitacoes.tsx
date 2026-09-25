import { ChevronRight, ClipboardList } from "lucide-react"
import { Link } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Card } from "@/components/ui/card"
import { TIPO_LABEL } from "@/features/requests/constants"
import { useRequestsStore } from "@/features/requests/store"
import { StatusBadge } from "@/features/requests/StatusBadge"

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export function Solicitacoes() {
  const requests = useRequestsStore((s) => s.requests)

  return (
    <div data-cid="solicitacoes.root" data-finding="F06" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Minhas solicitações" },
        ]}
      />
      <h1 className="text-[24px] font-semibold text-ml-text">Minhas solicitações</h1>
      <p className="text-[14px] text-ml-text-secondary">
        Acompanhe aqui todos os pedidos que você já fez sobre os seus dados pessoais — relatório de dados,
        exclusão de dados específicos ou cancelamento de conta.
      </p>

      {requests.length === 0 ? (
        <Card className="flex flex-col items-start gap-3 p-6">
          <ClipboardList className="size-8 text-ml-text-secondary" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-[15px] text-ml-text">Você ainda não fez nenhuma solicitação sobre seus dados.</p>
          <p className="text-[14px] text-ml-text-secondary">
            Peça o{" "}
            <Link to="/minha-conta/privacidade/relatorio" className="text-ml-blue hover:underline">
              relatório de dados
            </Link>{" "}
            ou uma{" "}
            <Link to="/minha-conta/privacidade/excluir-dados" className="text-ml-blue hover:underline">
              exclusão de dados específicos
            </Link>{" "}
            para ver o acompanhamento aqui.
          </p>
        </Card>
      ) : (
        <Card className="divide-y divide-ml-border">
          {requests.map((r) => (
            <Link
              key={r.protocolo}
              to={`/minha-conta/privacidade/solicitacoes/${r.protocolo}`}
              data-cid={`solicitacoes.item.${r.protocolo}`}
              className="flex items-center gap-4 p-4 hover:bg-ml-bg/60"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold text-ml-text">{TIPO_LABEL[r.tipo]}</p>
                <p className="text-[13px] text-ml-text-secondary">
                  Protocolo {r.protocolo} · aberta em {formatarData(r.criadoEm)}
                </p>
              </div>
              <StatusBadge status={r.status} />
              <ChevronRight className="size-5 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
        </Card>
      )}
    </div>
  )
}
