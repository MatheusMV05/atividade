import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CookieId = "analiticos" | "publicidade" | "desempenho" | "funcionais"

interface CookiesState {
  valores: Record<CookieId, boolean>
  setCookie: (id: CookieId, ativo: boolean) => void
}

export const useCookiesStore = create<CookiesState>()(
  persist(
    (set) => ({
      valores: { analiticos: true, publicidade: true, desempenho: true, funcionais: true },
      setCookie: (id, ativo) => set((s) => ({ valores: { ...s.valores, [id]: ativo } })),
    }),
    { name: "lgpd-proto:cookies" }
  )
)
