import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface RelatorioWizardState {
  dados: string[]
  toggleDado: (id: string, checked: boolean) => void
  reset: () => void
}

export const useRelatorioWizard = create<RelatorioWizardState>()(
  persist(
    (set) => ({
      dados: [],
      toggleDado: (id, checked) =>
        set((s) => ({
          dados: checked ? [...new Set([...s.dados, id])] : s.dados.filter((d) => d !== id),
        })),
      reset: () => set({ dados: [] }),
    }),
    {
      name: "lgpd-proto:relatorio-wizard",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
