import { create } from "zustand"
import { persist } from "zustand/middleware"

import { PRAZO_ESTIMADO_DIAS, PRAZO_LEGAL_DIAS, TIPO_ARTIGO } from "./constants"
import { generateProtocolo } from "./protocol"
import type { PrivacyRequest, RequestKind, RequestStatus } from "./types"

function addDays(iso: string, days: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

interface RequestsState {
  requests: PrivacyRequest[]
  createRequest: (tipo: RequestKind, detalhe?: Record<string, unknown>) => PrivacyRequest
  setStatus: (protocolo: string, status: RequestStatus, nota?: string) => void
  getByProtocolo: (protocolo: string) => PrivacyRequest | undefined
  reset: () => void
}

export const useRequestsStore = create<RequestsState>()(
  persist(
    (set, get) => ({
      requests: [],

      createRequest: (tipo, detalhe) => {
        const criadoEm = new Date().toISOString()
        const request: PrivacyRequest = {
          protocolo: generateProtocolo(),
          tipo,
          artigo: TIPO_ARTIGO[tipo],
          criadoEm,
          status: "recebida",
          prazoEstimado: addDays(criadoEm, PRAZO_ESTIMADO_DIAS[tipo]),
          prazoLegalMaximo: addDays(criadoEm, PRAZO_LEGAL_DIAS),
          historico: [{ status: "recebida", data: criadoEm }],
          detalhe,
        }
        set((s) => ({ requests: [request, ...s.requests] }))
        return request
      },

      setStatus: (protocolo, status, nota) => {
        set((s) => ({
          requests: s.requests.map((r) =>
            r.protocolo === protocolo
              ? { ...r, status, historico: [...r.historico, { status, data: new Date().toISOString(), nota }] }
              : r
          ),
        }))
      },

      getByProtocolo: (protocolo) => get().requests.find((r) => r.protocolo === protocolo),

      reset: () => set({ requests: [] }),
    }),
    { name: "lgpd-proto:requests" }
  )
)
