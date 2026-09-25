import { ChevronDown, User as UserIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockUser } from "@/content/mockUser"

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-cid="header.user-dropdown.trigger"
        className="flex items-center gap-1 rounded-[4px] px-2 py-1 text-[13px] text-ml-text hover:bg-black/5"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-white">
          <UserIcon className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
        {mockUser.primeiroNome}
        <ChevronDown className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent data-cid="header.user-dropdown.content" className="min-w-72">
        <Link
          to="/minha-conta"
          data-cid="header.user-dropdown.user-block"
          className="flex items-center gap-3 rounded-[4px] px-3 py-2 hover:bg-black/5"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-ml-blue-light text-ml-blue">
            <UserIcon className="size-5" strokeWidth={1.5} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold text-ml-text">{mockUser.nome}</span>
            <span className="block truncate text-[13px] text-ml-text-secondary">{mockUser.email}</span>
          </span>
        </Link>

        <DropdownMenuItem asChild>
          <OutOfScopeLink>Adicionar conta</OutOfScopeLink>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <OutOfScopeLink className="font-semibold text-ml-pink-meli">
            meli+ Assine com até 65% OFF &gt;
          </OutOfScopeLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {["Compras", "Histórico", "Perguntas", "Opiniões"].map((label) => (
          <DropdownMenuItem key={label} asChild>
            <OutOfScopeLink>{label}</OutOfScopeLink>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {["Empréstimos", "Assinaturas"].map((label) => (
          <DropdownMenuItem key={label} asChild>
            <OutOfScopeLink>{label}</OutOfScopeLink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <OutOfScopeLink className="flex w-full items-center justify-between">
            Mercado Play
            <span className="rounded-full bg-ml-green/10 px-2 py-0.5 text-[11px] font-semibold text-ml-green">
              GRÁTIS
            </span>
          </OutOfScopeLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <OutOfScopeLink>Vender</OutOfScopeLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <OutOfScopeLink className="flex w-full items-center justify-between">
            Ir para Central de vendedores
            <span className="rounded-full bg-ml-blue-light px-2 py-0.5 text-[11px] font-semibold text-ml-blue">
              NOVO
            </span>
          </OutOfScopeLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <OutOfScopeLink mensagem="Este protótipo não implementa autenticação real.">Sair</OutOfScopeLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
