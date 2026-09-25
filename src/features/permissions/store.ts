import { create } from "zustand"
import { persist } from "zustand/middleware"

export type PermissionId = "recomendacoes" | "publicidade"

interface PermissionsState {
  valores: Record<PermissionId, boolean>
  alteradoEm: Partial<Record<PermissionId, string>>
  setPermissao: (id: PermissionId, ativo: boolean) => void
}

export const usePermissionsStore = create<PermissionsState>()(
  persist(
    (set) => ({
      valores: { recomendacoes: true, publicidade: true },
      alteradoEm: {},
      setPermissao: (id, ativo) =>
        set((s) => ({
          valores: { ...s.valores, [id]: ativo },
          alteradoEm: { ...s.alteradoEm, [id]: new Date().toISOString() },
        })),
    }),
    { name: "lgpd-proto:permissions" }
  )
)
