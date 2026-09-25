import { Check, Copy, Mail } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockUser } from "@/content/mockUser"

import { useRequestsStore } from "./store"

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export function Comprovante({
  protocolo,
  titulo,
  mensagem,
}: {
  protocolo: string | undefined
  titulo: string
  mensagem: string
}) {
  const request = useRequestsStore((s) => (protocolo ? s.getByProtocolo(protocolo) : undefined))

  if (!protocolo || !request) {
    return (
      <Card className="p-6">
        <p className="text-[15px] text-ml-text">Não encontramos os dados dessa solicitação.</p>
        <Button asChild size="sm" variant="secondary" className="mt-3">
          <Link to="/minha-conta/privacidade/solicitacoes">Ver minhas solicitações</Link>
        </Button>
      </Card>
    )
  }

  return (
    <div
      data-cid="comprovante.root"
      data-finding="F06"
      className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-[rgba(0,166,80,0.12)] text-ml-green">
        <Check className="size-8" strokeWidth={2} aria-hidden="true" />
      </span>
      <h1 className="text-[24px] font-semibold text-ml-text">{titulo}</h1>
      <p role="status" aria-live="polite" className="text-[15px] text-ml-text-secondary">
        {mensagem}
      </p>

      <Card className="w-full text-left">
        <CardContent className="flex flex-col gap-3 p-6">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ml-text-secondary">Protocolo</span>
            <span className="flex items-center gap-2">
              <code className="rounded bg-ml-bg px-2 py-0.5 font-mono text-[14px] text-ml-text">
                {request.protocolo}
              </code>
              <button
                type="button"
                aria-label="Copiar número do protocolo"
                className="text-ml-blue hover:text-ml-blue-hover"
                onClick={() => navigator.clipboard?.writeText(request.protocolo)}
              >
                <Copy className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ml-text-secondary">Direito exercido</span>
            <span className="text-[13px] text-ml-text">{request.artigo}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ml-text-secondary">Prazo estimado</span>
            <span className="text-[13px] text-ml-text">até {formatarData(request.prazoEstimado)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-ml-text-secondary">Prazo legal máximo</span>
            <span className="text-[13px] text-ml-text">até {formatarData(request.prazoLegalMaximo)}</span>
          </div>
        </CardContent>
      </Card>

      <p className="flex items-center gap-1.5 text-[13px] text-ml-text-secondary">
        <Mail className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        Enviamos este comprovante para {mockUser.email}
      </p>

      <div className="flex gap-2">
        <Button asChild>
          <Link to={`/minha-conta/privacidade/solicitacoes/${request.protocolo}`}>Acompanhar solicitação</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/minha-conta/privacidade">Voltar à Central de Privacidade</Link>
        </Button>
      </div>
    </div>
  )
}
