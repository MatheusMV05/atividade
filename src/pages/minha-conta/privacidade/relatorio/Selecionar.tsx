import * as React from "react"
import { Clock, FileCheck2, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CATEGORIAS_RELATORIO } from "@/features/relatorio/categorias"
import { useRelatorioWizard } from "@/features/relatorio/store"
import { useFocusOnChange } from "@/lib/useFocusOnChange"

export function RelatorioSelecionar() {
  const navigate = useNavigate()
  const [fase, setFase] = React.useState<"intro" | "selecionar">("intro")
  const dados = useRelatorioWizard((s) => s.dados)
  const toggleDado = useRelatorioWizard((s) => s.toggleDado)
  const headingRef = useFocusOnChange(fase)

  if (fase === "intro") {
    return (
      <div data-cid="relatorio.intro.root" data-finding="F08" className="flex flex-col gap-4">
        <Breadcrumb
          items={[
            { label: "Meu perfil", to: "/minha-conta" },
            { label: "Privacidade", to: "/minha-conta/privacidade" },
            { label: "Conhecer relatório de dados" },
          ]}
        />
        <h1 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold text-ml-text outline-none">
          Do que você vai precisar
        </h1>
        <Card>
          <CardContent className="flex flex-col gap-4 p-6">
            <p className="flex items-center gap-2 text-[14px] text-ml-text-secondary">
              <Clock className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Leva cerca de 2 a 3 minutos.
            </p>
            <ul className="flex flex-col gap-3 text-[14px] text-ml-text">
              <li className="flex gap-2">
                <FileCheck2 className="mt-0.5 size-4 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
                Você escolhe quais dados quer receber no relatório.
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
                Confirmamos sua identidade com um código enviado por SMS, WhatsApp ou e-mail.
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ml-orange" strokeWidth={1.5} aria-hidden="true" />
                Se você incluir dados de pagamento do Mercado Pago, também pedimos uma foto do seu documento e uma
                selfie, por segurança.
              </li>
            </ul>
            <div className="flex gap-2">
              <Button type="button" onClick={() => setFase("selecionar")}>
                Começar
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade")}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div data-cid="relatorio.selecionar.root" data-finding="F08" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Conhecer relatório de dados" },
        ]}
      />
      <div>
        <p className="text-[13px] font-semibold text-ml-blue">Etapa 1 de 2</p>
        <h1 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold text-ml-text outline-none">
          Escolha os dados do seu relatório
        </h1>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Marque o que você quer receber. Você confirma sua identidade só depois de escolher.
        </p>
      </div>

      <Card className="divide-y divide-ml-border">
        {CATEGORIAS_RELATORIO.map((cat) => {
          const checked = dados.includes(cat.id)
          return (
            <label
              key={cat.id}
              data-cid={`relatorio.categoria.${cat.id}`}
              className="flex cursor-pointer items-start gap-3 p-4 hover:bg-ml-bg/40"
            >
              <Checkbox
                checked={checked}
                onCheckedChange={(v) => toggleDado(cat.id, v === true)}
                className="mt-0.5"
                aria-labelledby={`dado-${cat.id}-titulo`}
              />
              <span>
                <Label id={`dado-${cat.id}-titulo`} className="cursor-pointer text-[15px] font-semibold text-ml-text">
                  {cat.titulo}
                  {cat.sensivel && (
                    <span className="ml-2 rounded-full bg-[rgba(255,119,51,0.12)] px-2 py-0.5 text-[11px] font-semibold text-ml-orange">
                      Exige verificação reforçada
                    </span>
                  )}
                </Label>
                <span className="mt-0.5 block text-[13px] text-ml-text-secondary">{cat.descricao}</span>
              </span>
            </label>
          )
        })}
      </Card>

      <div className="flex gap-2">
        <Button
          type="button"
          disabled={dados.length === 0}
          onClick={() => navigate("/minha-conta/privacidade/relatorio/verificar")}
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
