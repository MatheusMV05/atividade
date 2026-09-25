import type { RequestKind, RequestStatus } from "./types"

export const TIPO_LABEL: Record<RequestKind, string> = {
  relatorio: "Relatório de dados",
  exclusao: "Exclusão de dados específicos",
  cancelamento: "Cancelamento de conta",
}

export const TIPO_ARTIGO: Record<RequestKind, string> = {
  relatorio: "Art. 18, II e V da LGPD (confirmação de acesso e portabilidade)",
  exclusao: "Art. 18, VI da LGPD (eliminação de dados tratados com consentimento)",
  cancelamento: "Art. 18, VI da LGPD (eliminação total de dados — cancelamento de conta)",
}

// Prazo estimado que o Mercado Livre comunica hoje para cada fluxo (diagnóstico, item 6/8).
// O prazo legal máximo (15 dias) vem do art. 19, II da LGPD.
export const PRAZO_ESTIMADO_DIAS: Record<RequestKind, number> = {
  relatorio: 2,
  exclusao: 10,
  cancelamento: 2,
}

export const PRAZO_LEGAL_DIAS = 15

export const STATUS_LABEL: Record<RequestStatus, string> = {
  recebida: "Recebida",
  em_verificacao: "Identidade em verificação",
  em_analise: "Em análise",
  informacoes_adicionais: "Aguardando informações adicionais",
  concluida: "Concluída",
  indeferida: "Indeferida",
  prazo_excedido: "Prazo excedido",
}

export const STATUS_BADGE_VARIANT: Record<RequestStatus, "blue" | "green" | "orange" | "red" | "neutral"> = {
  recebida: "blue",
  em_verificacao: "blue",
  em_analise: "blue",
  informacoes_adicionais: "orange",
  concluida: "green",
  indeferida: "red",
  prazo_excedido: "red",
}

export const ENCARREGADO = {
  nome: "Encarregado de Proteção de Dados (DPO) — Mercado Livre",
  email: "encarregado-lgpd@mercadolivre.com.br",
}

export const ANPD_URL = "https://www.gov.br/anpd"
