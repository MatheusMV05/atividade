import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ExclusaoWizardState {
  categorias: string[]
  toggleCategoria: (id: string, checked: boolean) => void
  reset: () => void
}

export const useExclusaoWizard = create<ExclusaoWizardState>()(
  persist(
    (set) => ({
      categorias: [],
      toggleCategoria: (id, checked) =>
        set((s) => ({
          categorias: checked ? [...new Set([...s.categorias, id])] : s.categorias.filter((c) => c !== id),
        })),
      reset: () => set({ categorias: [] }),
    }),
    {
      name: "lgpd-proto:exclusao-wizard",
      // sessionStorage: a seleção sobrevive a um reload da página (ex.: sessão
      // expirada durante a verificação), mas não fica presa entre visitas
      // diferentes ao fluxo.
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
