import { AlertTriangle, Check, Clock, Copy, Download, Mail, ShieldAlert } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ANPD_URL, ENCARREGADO, TIPO_LABEL } from "@/features/requests/constants"
import { useRequestsStore } from "@/features/requests/store"
import { StatusBadge } from "@/features/requests/StatusBadge"
import { Timeline } from "@/features/requests/Timeline"

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
}

export function SolicitacaoDetalhe() {
  const { protocolo } = useParams<{ protocolo: string }>()
  const request = useRequestsStore((s) => s.requests.find((r) => r.protocolo === protocolo))

  if (!request) {
    return (
      <div className="flex flex-col gap-4">
        <Breadcrumb
          items={[
            { label: "Meu perfil", to: "/minha-conta" },
            { label: "Privacidade", to: "/minha-conta/privacidade" },
            { label: "Minhas solicitações", to: "/minha-conta/privacidade/solicitacoes" },
            { label: protocolo ?? "" },
          ]}
        />
        <Card className="p-6">
          <p className="text-[15px] text-ml-text">Não encontramos essa solicitação.</p>
          <p className="mt-1 text-[14px] text-ml-text-secondary">
            Ela pode ter sido limpa pelo botão "Reiniciar demonstração", ou o protocolo está incorreto.
          </p>
          <Button asChild size="sm" variant="secondary" className="mt-3">
            <Link to="/minha-conta/privacidade/solicitacoes">Ver minhas solicitações</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const proximoPasso: Record<typeof request.status, string> = {
    recebida: "Recebemos o seu pedido e vamos confirmar sua identidade em breve.",
    em_verificacao: "Estamos confirmando a sua identidade.",
    em_analise: "Sua solicitação está em análise. Avisaremos aqui e por e-mail quando houver novidade.",
    informacoes_adicionais: "Precisamos que você envie as informações pedidas abaixo para continuarmos a análise.",
    concluida: "Solicitação concluída — veja o resultado abaixo.",
    indeferida: "Veja o motivo abaixo e o que você pode fazer a seguir.",
    prazo_excedido: "Pedimos desculpas pelo atraso — veja a nova previsão abaixo.",
  }

  return (
    <div data-cid="solicitacao-detalhe.root" data-finding="F06" className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Minhas solicitações", to: "/minha-conta/privacidade/solicitacoes" },
          { label: request.protocolo },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-semibold text-ml-text">{TIPO_LABEL[request.tipo]}</h1>
          <div className="mt-1 flex items-center gap-2 text-[14px] text-ml-text-secondary">
            <span>Protocolo</span>
            <code className="rounded bg-ml-bg px-2 py-0.5 font-mono text-[13px] text-ml-text">
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
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <Card>
        <CardContent className="p-4 text-[14px] text-ml-text">
          <p className="font-semibold">Próximo passo</p>
          <p className="mt-1 text-ml-text-secondary">{proximoPasso[request.status]}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px] sm:grid-cols-4">
            <div>
              <dt className="text-ml-text-secondary">Direito exercido</dt>
              <dd className="mt-0.5">{request.artigo}</dd>
            </div>
            <div>
              <dt className="text-ml-text-secondary">Aberta em</dt>
              <dd className="mt-0.5">{formatarData(request.criadoEm)}</dd>
            </div>
            <div>
              <dt className="text-ml-text-secondary">Prazo estimado</dt>
              <dd className="mt-0.5">{formatarData(request.prazoEstimado)}</dd>
            </div>
            <div>
              <dt className="text-ml-text-secondary">Prazo legal máximo</dt>
              <dd className="mt-0.5">{formatarData(request.prazoLegalMaximo)} (art. 19, II da LGPD)</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="mb-4 text-[15px] font-semibold text-ml-text">Acompanhamento</p>
          <Timeline status={request.status} />
        </CardContent>
      </Card>

      {request.status === "informacoes_adicionais" && (
        <Card className="border-l-4 border-l-ml-orange">
          <CardContent className="flex gap-3 p-4">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-ml-orange" strokeWidth={1.5} aria-hidden="true" />
            <div className="text-[14px] text-ml-text">
              <p className="font-semibold">Faltam algumas informações</p>
              <p className="mt-1 text-ml-text-secondary">
                Para confirmar que é você, precisamos que envie uma foto legível do seu documento de identificação
                (RG ou CNH). O prazo desta solicitação fica pausado até recebermos o documento.
              </p>
              <Button type="button" size="sm" variant="secondary" className="mt-3">
                Enviar documento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {request.status === "indeferida" && (
        <Card className="border-l-4 border-l-ml-red">
          <CardContent className="flex gap-3 p-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-ml-red" strokeWidth={1.5} aria-hidden="true" />
            <div className="text-[14px] text-ml-text">
              <p className="font-semibold">Solicitação indeferida</p>
              <p className="mt-1 text-ml-text-secondary">
                Não conseguimos confirmar sua identidade com os dados enviados, por isso não podemos atender a este
                pedido agora (art. 18, §4º da LGPD). Você pode abrir uma nova solicitação com um documento válido,
                ou falar com o nosso encarregado de dados.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a href={`mailto:${ENCARREGADO.email}`}>Falar com {ENCARREGADO.nome}</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={ANPD_URL} target="_blank" rel="noreferrer">
                    Peticionar à ANPD
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {request.status === "prazo_excedido" && (
        <Card className="border-l-4 border-l-ml-red">
          <CardContent className="flex gap-3 p-4">
            <Clock className="mt-0.5 size-5 shrink-0 text-ml-red" strokeWidth={1.5} aria-hidden="true" />
            <div className="text-[14px] text-ml-text">
              <p className="font-semibold">Este pedido passou do prazo prometido</p>
              <p className="mt-1 text-ml-text-secondary">
                Pedimos desculpas pelo atraso. Nossa nova previsão é concluir em até 5 dias úteis. Se preferir, você
                pode escalar o pedido para o nosso encarregado de dados ou peticionar à ANPD (art. 18, §1º).
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a href={`mailto:${ENCARREGADO.email}`}>Escalar para {ENCARREGADO.nome}</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={ANPD_URL} target="_blank" rel="noreferrer">
                    Peticionar à ANPD
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {request.status === "concluida" && request.tipo === "relatorio" && (
        <Card className="border-l-4 border-l-ml-green">
          <CardContent className="flex gap-3 p-4">
            <Check className="mt-0.5 size-5 shrink-0 text-ml-green" strokeWidth={1.5} aria-hidden="true" />
            <div className="text-[14px] text-ml-text">
              <p className="font-semibold">Seu relatório está pronto</p>
              <p className="mt-1 text-ml-text-secondary">
                Disponível para download nos próximos 7 dias, nos formatos abaixo.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["JSON", "CSV", "PDF"].map((formato) => (
                  <Button key={formato} type="button" size="sm" variant="secondary">
                    <Download className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    Baixar .{formato.toLowerCase()}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {request.status === "concluida" && request.tipo === "exclusao" && (
        <Card className="border-l-4 border-l-ml-green">
          <CardContent className="flex gap-3 p-4">
            <Check className="mt-0.5 size-5 shrink-0 text-ml-green" strokeWidth={1.5} aria-hidden="true" />
            <div className="text-[14px] text-ml-text">
              <p className="font-semibold">Os dados selecionados foram excluídos</p>
              <p className="mt-1 text-ml-text-secondary">
                Notas fiscais, registros de pagamento e dados usados para prevenção a fraude continuam guardados
                pelo prazo exigido por lei (art. 16 da LGPD) e não foram afetados por esta exclusão.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Button asChild size="sm" variant="outline" className="self-start">
        <Link to={`/email/${request.protocolo}`}>
          <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Ver e-mail de confirmação
        </Link>
      </Button>
    </div>
  )
}
