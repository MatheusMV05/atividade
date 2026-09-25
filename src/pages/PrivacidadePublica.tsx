import * as React from "react"
import { FileText, Fingerprint, HelpCircle, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const atalhos = [
  { label: "Gerenciar seus dados pessoais", to: "/minha-conta/privacidade" },
  { label: "Configurar suas preferências" },
  { label: "Saiba como processamos seus dados", to: "#processamento" },
  { label: "Consultar perguntas e acessos frequentes", to: "/ajuda/meus-direitos-de-privacidade" },
]

const faq = [
  {
    pergunta: "Como excluo meus dados pessoais?",
    resposta:
      "Você pode excluir dados específicos (como histórico de buscas, favoritos ou opiniões) sem cancelar sua conta, ou cancelar a conta para remover todos os seus dados pessoais.",
    to: "/ajuda/como-excluir-meus-dados",
  },
  {
    pergunta: "Como posso exercer meus direitos se eu não tiver uma conta?",
    resposta:
      "Mesmo sem conta, você pode entrar em contato com o nosso encarregado de proteção de dados para solicitar acesso, correção ou eliminação de dados que tratamos sobre você.",
  },
]

export function PrivacidadePublica() {
  const [aba, setAba] = React.useState<"dados" | "direitos">("dados")

  return (
    <div data-cid="privacidade-publica.root" className="mx-auto max-w-[900px] px-4 py-8">
      <h1 className="text-[24px] font-semibold text-ml-text">Centro de privacidade Mercado Livre</h1>
      <p className="mt-2 text-[16px] text-ml-text-secondary">
        Saiba como usamos e protegemos seus dados pessoais e conheça os seus direitos como titular, previstos na
        Lei Geral de Proteção de Dados (LGPD).
      </p>

      <div role="tablist" aria-label="Seções do Centro de privacidade" className="mt-6 flex gap-1 border-b border-ml-border">
        <button
          type="button"
          role="tab"
          aria-selected={aba === "dados"}
          onClick={() => setAba("dados")}
          className={cn(
            "border-b-2 px-4 py-2 text-[14px] font-semibold",
            aba === "dados" ? "border-ml-blue text-ml-blue" : "border-transparent text-ml-text-secondary"
          )}
        >
          Administre o uso dos seus dados
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={aba === "direitos"}
          onClick={() => setAba("direitos")}
          className={cn(
            "border-b-2 px-4 py-2 text-[14px] font-semibold",
            aba === "direitos" ? "border-ml-blue text-ml-blue" : "border-transparent text-ml-text-secondary"
          )}
        >
          Conheça seus direitos
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {atalhos.map((a) =>
          a.to ? (
            <Link
              key={a.label}
              to={a.to}
              data-cid={`privacidade-publica.atalho.${a.label}`}
              className="rounded-[6px] border border-ml-border bg-ml-surface p-3 text-[14px] font-semibold text-ml-blue hover:bg-ml-bg/60"
            >
              {a.label}
            </Link>
          ) : (
            <OutOfScopeLink
              key={a.label}
              data-cid={`privacidade-publica.atalho.${a.label}`}
              className="rounded-[6px] border border-ml-border bg-ml-surface p-3 text-[14px] font-semibold text-ml-blue hover:bg-ml-bg/60"
            >
              {a.label}
            </OutOfScopeLink>
          )
        )}
      </div>

      {aba === "dados" ? (
        <div className="mt-8 flex flex-col gap-6">
          <section data-cid="privacidade-publica.secao.gerencie" aria-labelledby="s-gerencie">
            <h2 id="s-gerencie" className="text-[18px] font-semibold text-ml-text">
              Gerencie seus dados pessoais
            </h2>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Você pode acessar, consultar, atualizar e corrigir seus dados pessoais a qualquer momento pela Central
              de privacidade da sua conta.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-2">
              <Link to="/minha-conta/privacidade">Gerenciar privacidade</Link>
            </Button>
          </section>

          <section aria-labelledby="s-preferencias">
            <h2 id="s-preferencias" className="text-[18px] font-semibold text-ml-text">
              Configure suas preferências
            </h2>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Escolha quais dados de localização, compras e navegação podem ser usados para personalizar sua
              experiência e anúncios.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-2">
              <OutOfScopeLink>Configurar suas preferências</OutOfScopeLink>
            </Button>
          </section>

          <section aria-labelledby="s-cookies">
            <h2 id="s-cookies" className="text-[18px] font-semibold text-ml-text">
              Como usamos os cookies
            </h2>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Usamos cookies essenciais, analíticos, de publicidade personalizada e de desempenho. Você pode
              gerenciar cada categoria separadamente.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-2">
              <OutOfScopeLink>Configurar cookies</OutOfScopeLink>
            </Button>
          </section>

          <section id="processamento" aria-labelledby="s-processamos">
            <h2 id="s-processamos" className="text-[18px] font-semibold text-ml-text">
              Como processamos seus dados
            </h2>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Tratamos seus dados para viabilizar compras, prevenir fraudes, cumprir obrigações legais e, quando
              autorizado, personalizar ofertas e conteúdo.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-2">
              <OutOfScopeLink>Gerenciar seus dados</OutOfScopeLink>
            </Button>
          </section>

          <section aria-labelledby="s-biometria">
            <h2 id="s-biometria" className="flex items-center gap-2 text-[18px] font-semibold text-ml-text">
              <Fingerprint className="size-5" strokeWidth={1.5} aria-hidden="true" />O que são e para que usamos os
              dados biométricos
            </h2>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Usamos reconhecimento facial apenas para confirmar sua identidade em solicitações de maior risco (como
              relatórios com dados financeiros), nunca como única forma de verificação disponível.
            </p>
          </section>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <section aria-labelledby="s-artigo18">
            <h2 id="s-artigo18" className="flex items-center gap-2 text-[18px] font-semibold text-ml-text">
              <ShieldCheck className="size-5" strokeWidth={1.5} aria-hidden="true" />
              Seus direitos como titular (art. 18 da LGPD)
            </h2>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Confirmação da existência de tratamento, acesso aos dados, correção, anonimização ou eliminação de
              dados desnecessários, portabilidade, eliminação de dados tratados com consentimento, informação sobre
              compartilhamento e revogação do consentimento — sempre gratuitos (art. 18, §5º).
            </p>
          </section>

          <section aria-labelledby="s-faq">
            <h2 id="s-faq" className="flex items-center gap-2 text-[18px] font-semibold text-ml-text">
              <HelpCircle className="size-5" strokeWidth={1.5} aria-hidden="true" />
              Perguntas frequentes
            </h2>
            <div className="mt-2 flex flex-col gap-3">
              {faq.map((f) => (
                <Card key={f.pergunta} data-cid={`privacidade-publica.faq.${f.pergunta}`}>
                  <CardContent className="p-4">
                    <p className="text-[15px] font-semibold text-ml-text">{f.pergunta}</p>
                    <p className="mt-1 text-[14px] text-ml-text-secondary">{f.resposta}</p>
                    {f.to && (
                      <Link to={f.to} className="mt-2 inline-flex items-center gap-1 text-[13px] text-ml-blue hover:underline">
                        <FileText className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                        Ler artigo completo
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
