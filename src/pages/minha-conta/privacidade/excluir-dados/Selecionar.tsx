import { useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CATEGORIAS_EXCLUSAO } from "@/features/exclusao/categorias"
import { useExclusaoWizard } from "@/features/exclusao/store"

export function ExcluirDadosSelecionar() {
  const navigate = useNavigate()
  const categorias = useExclusaoWizard((s) => s.categorias)
  const toggleCategoria = useExclusaoWizard((s) => s.toggleCategoria)

  return (
    <div data-cid="excluir-dados.selecionar.root" data-finding="F07" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Excluir dados específicos" },
        ]}
      />
      <div>
        <p className="text-[13px] font-semibold text-ml-blue">Etapa 1 de 3</p>
        <h1 className="text-[24px] font-semibold text-ml-text">Escolha o que você quer excluir</h1>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Marque só as categorias que você quer apagar. Nenhuma vem marcada — você decide exatamente o que sai.
          Isso não cancela a sua conta.
        </p>
      </div>

      <Card className="divide-y divide-ml-border">
        {CATEGORIAS_EXCLUSAO.map((cat) => {
          const checked = categorias.includes(cat.id)
          return (
            <label
              key={cat.id}
              data-cid={`excluir-dados.categoria.${cat.id}`}
              className="flex cursor-pointer items-start gap-3 p-4 hover:bg-ml-bg/40"
            >
              <Checkbox
                checked={checked}
                onCheckedChange={(v) => toggleCategoria(cat.id, v === true)}
                className="mt-0.5"
                aria-labelledby={`cat-${cat.id}-titulo`}
              />
              <span>
                <Label id={`cat-${cat.id}-titulo`} className="cursor-pointer text-[15px] font-semibold text-ml-text">
                  {cat.titulo}
                </Label>
                <span className="mt-0.5 block text-[13px] text-ml-text-secondary">{cat.descricao}</span>
                <span className="mt-0.5 block text-[13px] text-ml-text-secondary">
                  Impacto: {cat.impacto}
                </span>
              </span>
            </label>
          )
        })}
      </Card>

      <div className="flex gap-2">
        <Button
          type="button"
          disabled={categorias.length === 0}
          onClick={() => navigate("/minha-conta/privacidade/excluir-dados/revisar")}
        >
          Continuar
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade")}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
