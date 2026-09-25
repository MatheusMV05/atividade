import { Bell, Heart, MapPin, Search, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { mockUser } from "@/content/mockUser"

import { Logo } from "./Logo"
import { UserDropdown } from "./UserDropdown"

const categorias = ["Ofertas", "Cupons", "Supermercado", "Moda"]

export function Header() {
  return (
    <header data-cid="header.root" className="bg-ml-yellow">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-2 md:h-[100px] md:justify-center">
        {/* Linha 1: logo, busca, meli+ */}
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Ir para a página inicial do Mercado Livre" data-cid="header.logo">
            <Logo />
          </Link>

          <form
            role="search"
            className="flex h-10 flex-1 items-center rounded-[2px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="busca-header" className="sr-only">
              Buscar produtos, marcas e muito mais…
            </label>
            <input
              id="busca-header"
              type="search"
              placeholder="Buscar produtos, marcas e muito mais…"
              className="h-full flex-1 rounded-l-[2px] px-4 text-[14px] text-ml-text outline-none placeholder:text-ml-text-secondary"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="flex h-full w-12 items-center justify-center text-ml-text-secondary hover:text-ml-text"
            >
              <Search className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </form>

          <OutOfScopeLink className="hidden shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-ml-pink-meli md:flex">
            meli+ <span className="font-normal text-ml-text">Por apenas R$ 74,90/mês</span>
          </OutOfScopeLink>
        </div>

        {/* Linha 2: navegação — o grupo de categorias rola horizontalmente, mas o
            usuário/ícones ficam sempre visíveis (não dependem de scroll no mobile) */}
        <nav aria-label="Navegação principal" className="flex items-center gap-3 text-[13px] text-ml-text">
          <div className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto">
            <OutOfScopeLink className="flex shrink-0 items-center gap-1">
              <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
              Enviar para {mockUser.cidade}
            </OutOfScopeLink>
            <OutOfScopeLink className="shrink-0">Categorias ⌄</OutOfScopeLink>
            {categorias.map((c) => (
              <OutOfScopeLink key={c} className="shrink-0">
                {c}
              </OutOfScopeLink>
            ))}
            <OutOfScopeLink className="shrink-0">Vender</OutOfScopeLink>
            <OutOfScopeLink className="hidden shrink-0 sm:inline">Contato</OutOfScopeLink>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <UserDropdown />
            <OutOfScopeLink aria-label="Compras" className="hidden items-center sm:flex">
              Compras
            </OutOfScopeLink>
            <OutOfScopeLink aria-label="Favoritos" className="hidden items-center gap-1 sm:flex">
              <Heart className="size-4" strokeWidth={1.5} aria-hidden="true" />
              Favoritos ⌄
            </OutOfScopeLink>
            <OutOfScopeLink aria-label="Notificações" mensagem="Esta área não faz parte do protótipo.">
              <Bell className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </OutOfScopeLink>
            <OutOfScopeLink aria-label="Carrinho de compras">
              <ShoppingCart className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </OutOfScopeLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
