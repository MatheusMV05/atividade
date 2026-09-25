import { CheckCircle2, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { conformeItems, findings } from "@/content/findings"

export function SobreOPrototipo() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-10">
      <h1 className="text-[24px] font-semibold text-ml-text">Sobre este protótipo</h1>
      <p className="mt-2 text-[15px] text-ml-text-secondary">
        Trabalho de IHC + Direito (CESAR School). Redesenha o canal de exercício de direitos do titular (LGPD, art.
        18) no Mercado Livre a partir de um diagnóstico próprio — checklist de 10 itens organizado em quatro eixos:
        existência e acesso, heurísticas de Nielsen, dark patterns e base legal/LGPD.
      </p>
      <p className="mt-2 text-[13px] text-ml-text-secondary">
        Placar do diagnóstico: <strong>6 Conforme</strong> · <strong>4 Parcialmente Conforme</strong> ·{" "}
        <strong>0 Não Conforme</strong>. Coleta em 25/09/2026. Regra do redesenho: só os itens que não estavam
        Conforme foram redesenhados — o resto foi reproduzido fiel ao site atual, para o fluxo ficar navegável do
        começo ao fim.
      </p>

      <section aria-labelledby="achados" className="mt-10">
        <h2 id="achados" className="text-[20px] font-semibold text-ml-text">
          Achados → soluções
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {findings.map((f) => (
            <Card key={f.id} data-cid={`sobre.achado.${f.id}`}>
              <CardContent className="flex flex-col gap-2 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="orange">{f.id}</Badge>
                  <span className="text-[15px] font-semibold text-ml-text">
                    Item {f.item} · {f.titulo}
                  </span>
                  <Badge variant="neutral">{f.avaliacao}</Badge>
                </div>
                <p className="text-[13px] text-ml-text-secondary">
                  {f.eixo} · {f.artigos.join(" · ")}
                </p>
                <p className="text-[14px] text-ml-text">
                  <strong>Problema: </strong>
                  {f.problema}
                </p>
                <p className="text-[14px] text-ml-text">
                  <strong>Solução: </strong>
                  {f.solucao}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {f.telas
                    .filter((t) => t.startsWith("/"))
                    .map((t) => (
                      <Link
                        key={t}
                        to={t}
                        className="inline-flex items-center gap-1 rounded-full bg-ml-blue-light px-3 py-1 text-[12px] font-semibold text-ml-blue hover:underline"
                      >
                        {t}
                      </Link>
                    ))}
                  {f.telas
                    .filter((t) => !t.startsWith("/"))
                    .map((t) => (
                      <span key={t} className="text-[12px] text-ml-text-secondary">
                        {t}
                      </span>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="preservados" className="mt-10">
        <h2 id="preservados" className="text-[20px] font-semibold text-ml-text">
          Itens preservados (Conforme)
        </h2>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Não foram redesenhados — o comportamento atual do Mercado Livre já atendia ao critério avaliado.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {conformeItems.map((c) => (
            <Card key={c.item}>
              <CardContent className="flex gap-3 p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ml-green" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-[14px] font-semibold text-ml-text">
                    Item {c.item} · {c.titulo}
                  </p>
                  <p className="text-[13px] text-ml-text-secondary">{c.mantido}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="acessibilidade" className="mt-10">
        <h2 id="acessibilidade" className="text-[20px] font-semibold text-ml-text">
          Acessibilidade (F09)
        </h2>
        <Card className="mt-4">
          <CardContent className="flex flex-col gap-2 p-5 text-[14px] text-ml-text">
            <p>
              Todo controle só de ícone tem <code>aria-label</code>; imagens têm <code>alt</code>; navegação
              completa por teclado com skip link e foco movido para o título a cada troca de etapa; erros de
              formulário ligados ao campo com <code>aria-describedby</code>/<code>aria-invalid</code>; comprovantes
              e mudanças de status em <code>aria-live="polite"</code>; zoom permitido até 500%;{" "}
              <code>prefers-reduced-motion</code> respeitado; <code>lang="pt-BR"</code> em todo o site.
            </p>
            <p>
              Os tokens de cor de texto/ícone (azul, verde, laranja, vermelho e cinza secundário) foram escurecidos
              em relação ao tom "puro" medido no site real, para atingir 4.5:1 de contraste (WCAG 2.2 AA) como
              texto sobre fundo branco — fundos tingidos claros continuam com a cor original.
            </p>
            <p>
              Auditoria automatizada com{" "}
              <code>@axe-core/react</code> ativa em modo desenvolvimento (loga violações no console a cada mudança
              relevante de tela) e checagem manual de navegação só por teclado nos dois fluxos principais
              (relatório de dados e exclusão de dados específicos).
            </p>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="stack" className="mt-10">
        <h2 id="stack" className="text-[20px] font-semibold text-ml-text">
          Créditos e stack
        </h2>
        <p className="mt-2 text-[14px] text-ml-text-secondary">
          Vite + React 19 + TypeScript · Tailwind CSS v4 + shadcn/ui adaptado à identidade do Mercado Livre · React
          Router v7 · Zustand · Supabase (Postgres + Realtime, comentários) · lucide-react.
        </p>
        <a
          href="https://www.gov.br/anpd/pt-br/assuntos/noticias/lei-geral-de-protecao-de-dados-pessoais-lgpd"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[13px] text-ml-blue hover:underline"
        >
          <ExternalLink className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Saiba mais sobre a LGPD no site da ANPD
        </a>
      </section>
    </div>
  )
}
