export type RequestKind = "relatorio" | "exclusao"

export type RequestStatus =
  | "recebida"
  | "em_verificacao"
  | "em_analise"
  | "informacoes_adicionais"
  | "concluida"
  | "indeferida"
  | "prazo_excedido"

export interface TimelineEntry {
  status: RequestStatus
  data: string
  nota?: string
}

export interface PrivacyRequest {
  protocolo: string
  tipo: RequestKind
  artigo: string
  criadoEm: string
  status: RequestStatus
  prazoEstimado: string
  prazoLegalMaximo: string
  historico: TimelineEntry[]
  detalhe?: Record<string, unknown>
}
