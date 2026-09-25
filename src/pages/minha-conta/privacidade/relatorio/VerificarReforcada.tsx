import * as React from "react"
import { Camera, Check, FileUp, HelpCircle } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CATEGORIAS_RELATORIO } from "@/features/relatorio/categorias"
import { useRelatorioWizard } from "@/features/relatorio/store"
import { useRequestsStore } from "@/features/requests/store"

export function RelatorioVerificarReforcada() {
  const navigate = useNavigate()
  const dados = useRelatorioWizard((s) => s.dados)
  const resetWizard = useRelatorioWizard((s) => s.reset)
  const createRequest = useRequestsStore((s) => s.createRequest)

  const [tinhaSelecaoAoEntrar] = React.useState(() => dados.length > 0)
  const [documento, setDocumento] = React.useState<File | null>(null)
  const [selfieCapturada, setSelfieCapturada] = React.useState(false)
  const [porQueAberto, setPorQueAberto] = React.useState(false)

  if (!tinhaSelecaoAoEntrar) {
    return <Navigate to="/minha-conta/privacidade/relatorio" replace />
  }

  const podeEnviar = Boolean(documento) && selfieCapturada

  function handleEnviar(e: React.FormEvent) {
    e.preventDefault()
    if (!podeEnviar) return
    const selecionados = CATEGORIAS_RELATORIO.filter((c) => dados.includes(c.id)).map((c) => c.titulo)
    const request = createRequest("relatorio", { dados: selecionados })
    resetWizard()
    navigate("/minha-conta/privacidade/relatorio/enviado", { state: { protocolo: request.protocolo } })
  }

  return (
    <div data-cid="relatorio.verificar-reforcada.root" data-finding="F08" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Conhecer relatório de dados" },
        ]}
      />
      <div>
        <p className="text-[13px] font-semibold text-ml-blue">Etapa 2 de 2 · Verificação reforçada</p>
        <h1 className="text-[24px] font-semibold text-ml-text">Envie um documento e uma selfie</h1>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-5 p-6">
          <form onSubmit={handleEnviar} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="documento-upload"
                className="flex cursor-pointer flex-col items-center gap-2 rounded-[6px] border-2 border-dashed border-ml-border p-6 text-center hover:border-ml-blue"
              >
                <FileUp className="size-6 text-ml-text-secondary" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[14px] font-semibold text-ml-blue">
                  {documento ? documento.name : "Enviar foto da CNH ou RG"}
                </span>
                <span className="text-[12px] text-ml-text-secondary">JPG, PNG ou PDF</span>
              </label>
              <input
                id="documento-upload"
                type="file"
                accept="image/*,.pdf"
                className="sr-only"
                onChange={(e) => setDocumento(e.target.files?.[0] ?? null)}
              />
            </div>

            <div>
              <Button
                type="button"
                variant={selfieCapturada ? "secondary" : "outline"}
                onClick={() => setSelfieCapturada(true)}
              >
                {selfieCapturada ? <Check className="size-4" strokeWidth={1.5} aria-hidden="true" /> : <Camera className="size-4" strokeWidth={1.5} aria-hidden="true" />}
                {selfieCapturada ? "Selfie registrada" : "Tirar selfie"}
              </Button>
              <p className="mt-1 text-[12px] text-ml-text-secondary">
                Ambiente de demonstração: nenhuma câmera é acionada de verdade.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setPorQueAberto(!porQueAberto)}
                aria-expanded={porQueAberto}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-ml-blue"
              >
                <HelpCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Por que pedimos isso?
              </button>
              {porQueAberto && (
                <p className="mt-2 text-[13px] text-ml-text-secondary">
                  Como o seu pedido inclui dados financeiros do Mercado Pago, usamos documento e biometria facial
                  só para confirmar que é você — reduzindo o risco de fraude. A selfie é comparada com a foto do
                  documento e descartada em até 90 dias; não é usada para nenhuma outra finalidade.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit" disabled={!podeEnviar}>
                Enviar verificação
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade/relatorio")}>
                Voltar
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade")}>
                Cancelar solicitação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="text-[13px] text-ml-text-secondary">
        Prefere não enviar documento e selfie agora?{" "}
        <OutOfScopeLink
          className="text-ml-blue hover:underline"
          mensagem="Este protótipo não implementa o atendimento humano — na prática, essa seria uma alternativa por telefone ou chat com um documento válido."
        >
          Fale com o atendimento
        </OutOfScopeLink>
        .
      </p>
    </div>
  )
}
