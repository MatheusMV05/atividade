import { Navigate, useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CATEGORIAS_EXCLUSAO, RETIDO_POR_LEI } from "@/features/exclusao/categorias"
import { useExclusaoWizard } from "@/features/exclusao/store"

export function ExcluirDadosRevisar() {
  const navigate = useNavigate()
  const categorias = useExclusaoWizard((s) => s.categorias)

  if (categorias.length === 0) {
    return <Navigate to="/minha-conta/privacidade/excluir-dados" replace />
  }

  const selecionadas = CATEGORIAS_EXCLUSAO.filter((c) => categorias.includes(c.id))

  return (
    <div data-cid="excluir-dados.revisar.root" data-finding="F07" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Excluir dados específicos" },
        ]}
      />
      <div>
        <p className="text-[13px] font-semibold text-ml-blue">Etapa 2 de 3</p>
        <h1 className="text-[24px] font-semibold text-ml-text">Revise antes de continuar</h1>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Você escolheu excluir {selecionadas.length} categoria{selecionadas.length === 1 ? "" : "s"} de dados.
        </p>
      </div>

      <Card className="divide-y divide-ml-border">
        {selecionadas.map((cat) => (
          <div key={cat.id} className="p-4">
            <p className="text-[15px] font-semibold text-ml-text">{cat.titulo}</p>
            <p className="mt-0.5 text-[13px] text-ml-text-secondary">{cat.impacto}</p>
          </div>
        ))}
      </Card>

      <Card className="border-l-4 border-l-ml-orange">
        <CardContent className="p-4">
          <p className="text-[15px] font-semibold text-ml-text">O que continua guardado por exigência legal</p>
          <p className="mt-1 text-[13px] text-ml-text-secondary">
            Mesmo excluindo essas categorias, alguns dados continuam guardados pelo tempo exigido por lei (art. 16
            da LGPD):
          </p>
          <ul className="mt-2 list-disc pl-5 text-[13px] text-ml-text-secondary">
            {RETIDO_POR_LEI.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button type="button" onClick={() => navigate("/minha-conta/privacidade/excluir-dados/verificar")}>
          Confirmar e continuar
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade/excluir-dados")}>
          Voltar
        </Button>
      </div>
    </div>
  )
}
