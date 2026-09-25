import * as React from "react"
import { ShieldAlert } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockUser } from "@/content/mockUser"
import { CATEGORIAS_RELATORIO } from "@/features/relatorio/categorias"
import { useRelatorioWizard } from "@/features/relatorio/store"
import { useRequestsStore } from "@/features/requests/store"
import { CodeVerification } from "@/features/verification/CodeVerification"

export function RelatorioVerificar() {
  const navigate = useNavigate()
  const dados = useRelatorioWizard((s) => s.dados)
  const resetWizard = useRelatorioWizard((s) => s.reset)
  const createRequest = useRequestsStore((s) => s.createRequest)

  const [tinhaSelecaoAoEntrar] = React.useState(() => dados.length > 0)
  const reforcadaNecessaria = dados.includes("pagamentos")

  if (!tinhaSelecaoAoEntrar) {
    return <Navigate to="/minha-conta/privacidade/relatorio" replace />
  }

  function handleVerified() {
    const selecionados = CATEGORIAS_RELATORIO.filter((c) => dados.includes(c.id)).map((c) => c.titulo)
    const request = createRequest("relatorio", { dados: selecionados })
    resetWizard()
    navigate("/minha-conta/privacidade/relatorio/enviado", { state: { protocolo: request.protocolo } })
  }

  if (reforcadaNecessaria) {
    return (
      <div data-cid="relatorio.verificar.reforcada-intro.root" data-finding="F08" className="flex flex-col gap-4">
        <Breadcrumb
          items={[
            { label: "Meu perfil", to: "/minha-conta" },
            { label: "Privacidade", to: "/minha-conta/privacidade" },
            { label: "Conhecer relatório de dados" },
          ]}
        />
        <div>
          <p className="text-[13px] font-semibold text-ml-blue">Etapa 2 de 2</p>
          <h1 className="text-[24px] font-semibold text-ml-text">Precisamos de uma verificação extra</h1>
        </div>
        <Card className="border-l-4 border-l-ml-orange">
          <CardContent className="flex gap-3 p-6">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-ml-orange" strokeWidth={1.5} aria-hidden="true" />
            <div className="text-[14px] text-ml-text">
              <p>
                Como o seu pedido inclui <strong>dados de pagamento e faturas do Mercado Pago</strong>, pedimos uma
                verificação mais forte do que o código por SMS: uma foto do seu documento e uma selfie.
              </p>
              <p className="mt-2 text-ml-text-secondary">
                Se preferir não enviar esses dados agora, você pode remover a categoria de pagamentos da sua
                seleção e usar só o código de verificação padrão.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Button type="button" onClick={() => navigate("/minha-conta/privacidade/relatorio/verificar/reforcada")}>
            Continuar para verificação reforçada
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade/relatorio")}>
            Voltar e ajustar seleção
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div data-cid="relatorio.verificar.root" data-finding="F08" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Conhecer relatório de dados" },
        ]}
      />
      <div>
        <p className="text-[13px] font-semibold text-ml-blue">Etapa 2 de 2</p>
        <h1 className="text-[24px] font-semibold text-ml-text">Confirme que é você</h1>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Como você já está com a sessão aberta, basta confirmar com um código de verificação.
        </p>
      </div>

      <CodeVerification
        celularMascarado={mockUser.celularMascarado}
        emailMascarado={mockUser.email}
        porQuePedimos="Pedimos um código porque o relatório contém dados pessoais seus. Como esta solicitação não inclui dados financeiros, um código simples já é suficiente para confirmar que é você — não pedimos documento nem biometria."
        onVerified={handleVerified}
        onCancel={() => navigate("/minha-conta/privacidade")}
      />
    </div>
  )
}
