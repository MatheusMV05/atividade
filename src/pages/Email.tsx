import { Link, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { mockUser } from "@/content/mockUser"
import { TIPO_LABEL } from "@/features/requests/constants"
import { useRequestsStore } from "@/features/requests/store"

function formatarDataHora(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

export function Email() {
  const { protocolo } = useParams<{ protocolo: string }>()
  const request = useRequestsStore((s) => s.requests.find((r) => r.protocolo === protocolo))

  return (
    <div className="mx-auto max-w-[640px] px-4 py-10">
      <p className="mb-4 text-[13px] text-ml-text-secondary">
        Simulação da caixa de entrada de <strong>{mockUser.emailCompleto}</strong> — este e-mail não foi enviado de
        verdade, é só uma demonstração de como o comprovante chega por e-mail (F06).
      </p>

      <div data-cid="email-mock.root" data-finding="F06" className="rounded-[6px] border border-ml-border bg-ml-surface">
        <div className="border-b border-ml-border p-4">
          <p className="text-[13px] text-ml-text-secondary">De: Mercado Livre &lt;naoresponda@mercadolivre.com.br&gt;</p>
          <p className="text-[13px] text-ml-text-secondary">Para: {mockUser.emailCompleto}</p>
          {request && (
            <p className="text-[13px] text-ml-text-secondary">Enviado em: {formatarDataHora(request.criadoEm)}</p>
          )}
          <p className="mt-2 text-[16px] font-semibold text-ml-text">
            {request ? `Recebemos sua solicitação — protocolo ${request.protocolo}` : "Confirmação da sua solicitação"}
          </p>
        </div>

        <div className="p-4 text-[14px] leading-relaxed text-ml-text">
          <p>Olá, {mockUser.primeiroNome}!</p>

          {request ? (
            <>
              <p className="mt-3">
                Recebemos a sua solicitação de <strong>{TIPO_LABEL[request.tipo]}</strong>, baseada no{" "}
                {request.artigo}. O número de protocolo é <strong>{request.protocolo}</strong> — guarde-o para
                acompanhar o andamento.
              </p>
              <p className="mt-3">Você pode acompanhar o status a qualquer momento clicando no botão abaixo.</p>
              <Button asChild size="sm" className="mt-4">
                <Link to={`/minha-conta/privacidade/solicitacoes/${request.protocolo}`}>
                  Acompanhar solicitação
                </Link>
              </Button>
            </>
          ) : (
            <p className="mt-3 text-ml-text-secondary">
              Não encontramos os dados desta solicitação — ela pode ter sido limpa pelo botão "Reiniciar
              demonstração".
            </p>
          )}

          <p className="mt-6 text-[12px] text-ml-text-secondary">
            Este e-mail foi enviado automaticamente, não é necessário respondê-lo. Se você não fez esta solicitação,
            fale com a gente pela Central de Ajuda.
          </p>
        </div>
      </div>
    </div>
  )
}
