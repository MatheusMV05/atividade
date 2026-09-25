import { Cookie, Info } from "lucide-react"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { type CookieId, useCookiesStore } from "@/features/cookies/store"

interface LinhaCookie {
  id: CookieId | "essenciais"
  titulo: string
  descricao: string
  cid: string
  temToggle: boolean
}

const linhas: LinhaCookie[] = [
  {
    id: "essenciais",
    titulo: "Cookies essenciais",
    descricao:
      "São usados para reconhecer você quando acessar, salvar suas preferências de configuração e proteger sua conta. Não podem ser desativados porque são necessários para o funcionamento do nosso site.",
    cid: "cookies.linha.essenciais",
    temToggle: false,
  },
  {
    id: "analiticos",
    titulo: "Cookies analíticos",
    descricao: "Permitem analisar sua navegação no site para podermos melhorar nossos serviços.",
    cid: "cookies.linha.analiticos",
    temToggle: true,
  },
  {
    id: "publicidade",
    titulo: "Cookies de publicidade personalizada",
    descricao: "Eles nos permitem entender suas preferências para mostrar produtos e anúncios patrocinados interessantes para você.",
    cid: "cookies.linha.publicidade",
    temToggle: true,
  },
  {
    id: "desempenho",
    titulo: "Cookies de desempenho",
    descricao: "Eles nos permitem otimizar algumas funções do nosso site.",
    cid: "cookies.linha.desempenho",
    temToggle: true,
  },
  {
    id: "funcionais",
    titulo: "Cookies funcionais",
    descricao: "Eles nos permitem manter o bom funcionamento do nosso site.",
    cid: "cookies.linha.funcionais",
    temToggle: true,
  },
]

export function Cookies() {
  const valores = useCookiesStore((s) => s.valores)
  const setCookie = useCookiesStore((s) => s.setCookie)

  return (
    <div data-cid="cookies.root" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Configurar cookies" },
        ]}
      />
      <h1 className="flex items-center gap-2 text-[24px] font-semibold text-ml-text">
        <Cookie className="size-6 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
        Configurar cookies
      </h1>

      <div
        data-cid="cookies.aviso"
        role="note"
        className="flex items-start gap-2 rounded-[6px] bg-ml-blue-light p-4 text-[14px] text-ml-text"
      >
        <Info className="mt-0.5 size-4 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
        <p>
          Os cookies são uma tecnologia que nos permite conhecer como você usa o nosso site. Com essas informações,
          facilitamos o uso da sua conta e te mostramos publicidade relacionada aos seus interesses.{" "}
          <OutOfScopeLink className="text-ml-blue hover:underline">
            Saiba mais sobre cookies no Mercado Livre.
          </OutOfScopeLink>
        </p>
      </div>

      <Card className="divide-y divide-ml-border">
        {linhas.map((linha) => (
          <div key={linha.cid} data-cid={linha.cid} className="flex items-start gap-4 p-4">
            <span className="min-w-0 flex-1">
              {linha.temToggle ? (
                <Label
                  htmlFor={`cookie-${linha.id}`}
                  className="block cursor-pointer text-[16px] font-normal text-ml-text"
                >
                  {linha.titulo}
                </Label>
              ) : (
                <span className="block text-[16px] text-ml-text">{linha.titulo}</span>
              )}
              <span className="mt-0.5 block text-[14px] text-ml-text-secondary">{linha.descricao}</span>
            </span>
            {linha.temToggle && (
              <Switch
                id={`cookie-${linha.id}`}
                checked={valores[linha.id as CookieId]}
                onCheckedChange={(v) => setCookie(linha.id as CookieId, v)}
                aria-label={linha.titulo}
                className="mt-1 shrink-0"
              />
            )}
          </div>
        ))}
      </Card>
    </div>
  )
}
