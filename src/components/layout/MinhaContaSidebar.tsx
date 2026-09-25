import * as React from "react"
import { ChevronDown, Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { cn } from "@/lib/utils"

const itensForaDeEscopo = [
  "Compras",
  "Perguntas",
  "Opiniões",
  "Favoritos",
  "Lojas que sigo",
  "Explorando veículos",
  "Explorando imóveis",
  "Buscas salvas",
  "Empréstimos",
  "Assinaturas",
  "Faturamento",
  "Minhas marcas",
]

export function MinhaContaSidebar() {
  // No mobile o menu vira hambúrguer (fechado por padrão); no desktop fica sempre expandido.
  const [open, setOpen] = React.useState(false)

  return (
    <nav aria-label="Menu da minha conta" data-cid="minha-conta.sidebar" className="w-full shrink-0 md:w-60">
      <div className="rounded-[6px] bg-ml-surface shadow-[0_1px_2px_rgba(0,0,0,0.12)] md:py-2">
        <button
          type="button"
          className="flex w-full items-center justify-between px-6 py-3 text-[13px] font-semibold text-ml-text-secondary md:pointer-events-none md:py-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="minha-conta-sidebar-lista"
        >
          <span className="flex items-center gap-2">
            <Menu className="size-4 md:hidden" strokeWidth={1.5} aria-hidden="true" />≡ Minha conta
          </span>
          <ChevronDown
            className={cn("size-4 transition-transform md:hidden", open && "rotate-180")}
            strokeWidth={1.5}
           aria-hidden="true"
          />
        </button>

        <div id="minha-conta-sidebar-lista" className={cn(!open && "hidden md:block")}>
          <OutOfScopeLink className="flex items-center justify-between px-6 py-2 text-[14px] text-[#333] hover:bg-black/5">
            Central de vendedores
            <span className="rounded-full bg-ml-blue-light px-2 py-0.5 text-[11px] font-semibold text-ml-blue">
              NOVO
            </span>
          </OutOfScopeLink>

          <div className="my-1 h-px bg-ml-border" />

          {itensForaDeEscopo.map((label) => (
            <OutOfScopeLink key={label} className="block px-6 py-2 text-[14px] text-[#333] hover:bg-black/5">
              {label}
            </OutOfScopeLink>
          ))}

          <NavLink
            to="/minha-conta"
            end
            data-cid="minha-conta.sidebar.meu-perfil"
            className={({ isActive }) =>
              cn(
                "block px-6 py-2 text-[14px] text-[#333] hover:bg-black/5",
                isActive && "font-semibold text-ml-blue"
              )
            }
          >
            Meu perfil
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
