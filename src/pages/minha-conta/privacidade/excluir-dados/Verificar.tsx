import * as React from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { mockUser } from "@/content/mockUser"
import { CATEGORIAS_EXCLUSAO } from "@/features/exclusao/categorias"
import { useExclusaoWizard } from "@/features/exclusao/store"
import { useRequestsStore } from "@/features/requests/store"
import { CodeVerification } from "@/features/verification/CodeVerification"

export function ExcluirDadosVerificar() {
  const navigate = useNavigate()
  const categorias = useExclusaoWizard((s) => s.categorias)
  const resetWizard = useExclusaoWizard((s) => s.reset)
  const createRequest = useRequestsStore((s) => s.createRequest)

  // Capturado só no primeiro render: handleVerified limpa a seleção antes de
  // navegar para o comprovante, e não queremos que esse reset dispare o
  // redirecionamento de guarda enquanto a navegação ainda está em andamento.
  const [tinhaSelecaoAoEntrar] = React.useState(() => categorias.length > 0)

  if (!tinhaSelecaoAoEntrar) {
    return <Navigate to="/minha-conta/privacidade/excluir-dados" replace />
  }

  function handleVerified() {
    const selecionadas = CATEGORIAS_EXCLUSAO.filter((c) => categorias.includes(c.id)).map((c) => c.titulo)
    const request = createRequest("exclusao", { categorias: selecionadas })
    resetWizard()
    navigate("/minha-conta/privacidade/excluir-dados/enviado", { state: { protocolo: request.protocolo } })
  }

  return (
    <div data-cid="excluir-dados.verificar.root" data-finding="F07" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Excluir dados específicos" },
        ]}
      />
      <div>
        <p className="text-[13px] font-semibold text-ml-blue">Etapa 3 de 3</p>
        <h1 className="text-[24px] font-semibold text-ml-text">Confirme que é você</h1>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Como você já está com a sessão aberta, basta confirmar com um código de verificação.
        </p>
      </div>

      <CodeVerification
        celularMascarado={mockUser.celularMascarado}
        emailMascarado={mockUser.email}
        porQuePedimos="Pedimos um código porque a exclusão de dados é uma ação sensível — isso evita que outra pessoa com acesso ao seu computador apague seus dados sem você saber. Não usamos documento nem biometria aqui, porque não há dados financeiros envolvidos nesta solicitação."
        onVerified={handleVerified}
        onCancel={() => navigate("/minha-conta/privacidade")}
      />
    </div>
  )
}
