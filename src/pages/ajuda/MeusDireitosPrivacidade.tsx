import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Card } from "@/components/ui/card"

const perguntas = [
  { texto: "Como altero ou corrijo os dados da minha conta?", to: "/minha-conta/perfil" },
  { texto: "Como posso excluir meus dados pessoais?", to: "/ajuda/como-excluir-meus-dados" },
  { texto: "Como posso consultar e baixar meus dados pessoais?", to: "/minha-conta/privacidade/relatorio" },
  { texto: "O que são as decisões automatizadas e como afetam minha conta?" },
  { texto: "Como configuro as comunicações que recebo?" },
  { texto: "Quero saber com quem compartilham meus dados" },
  { texto: "Se eu não me cadastrei, o Mercado Livre salva meus dados pessoais?" },
  { texto: "O que são os cookies e como funcionam?", to: "/minha-conta/privacidade/cookies" },
  { texto: "Quais são meus direitos de privacidade?", to: "/privacidade" },
]

export function MeusDireitosPrivacidade() {
  return (
    <div data-cid="ajuda.meus-direitos.root" className="mx-auto max-w-[800px] px-4 py-8">
      <h1 className="text-[24px] font-semibold text-ml-text">Meus direitos de privacidade</h1>
      <p className="mt-2 text-[14px] text-ml-text-secondary">
        Artigos de ajuda sobre como exercer seus direitos previstos na LGPD no Mercado Livre.
      </p>

      <Card className="mt-4 divide-y divide-ml-border">
        {perguntas.map((p) =>
          p.to ? (
            <Link
              key={p.texto}
              to={p.to}
              data-cid={`ajuda.meus-direitos.item.${p.texto}`}
              className="flex items-center justify-between gap-3 p-4 hover:bg-ml-bg/60"
            >
              <span className="text-[15px] text-ml-blue">{p.texto}</span>
              <ChevronRight className="size-4 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ) : (
            <OutOfScopeLink key={p.texto} className="flex items-center justify-between gap-3 p-4 hover:bg-ml-bg/60">
              <span className="text-[15px] text-ml-text">{p.texto}</span>
              <ChevronRight className="size-4 shrink-0 text-ml-text-secondary" strokeWidth={1.5} aria-hidden="true" />
            </OutOfScopeLink>
          )
        )}
      </Card>
    </div>
  )
}
