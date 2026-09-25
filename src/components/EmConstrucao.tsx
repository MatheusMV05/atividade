import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/**
 * Tela desta etapa ainda não implementada — ordem de implementação do CLAUDE.md §7.
 * Usado só durante o desenvolvimento incremental; some conforme cada passo é concluído.
 */
export function EmConstrucao({ titulo, etapa, voltarPara }: { titulo: string; etapa: string; voltarPara: string }) {
  return (
    <Card data-cid="em-construcao.root">
      <CardContent className="flex flex-col items-start gap-3 p-6">
        <h1 className="text-[24px] font-semibold text-ml-text">{titulo}</h1>
        <p className="text-[14px] text-ml-text-secondary">
          Esta tela ainda será implementada em {etapa} do plano de construção do protótipo.
        </p>
        <Button asChild variant="secondary" size="sm">
          <Link to={voltarPara}>Voltar</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
