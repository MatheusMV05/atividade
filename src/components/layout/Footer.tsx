import { Link } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"

const links = [
  "Trabalhe conosco",
  "Termos e condições",
  "Promoções",
  "__privacidade__",
  "__acessibilidade__",
  "Contato",
  "Informações sobre seguros",
  "Programa de Afiliados",
]

export function Footer() {
  return (
    <footer data-cid="footer.root" className="border-t border-ml-border bg-ml-surface">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-[13px] text-ml-text-secondary">
        <nav aria-label="Links institucionais" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((item) => {
            if (item === "__privacidade__") {
              return (
                <Link key={item} to="/privacidade" data-cid="footer.link.privacidade" className="text-ml-blue hover:underline">
                  Como cuidamos da sua privacidade
                </Link>
              )
            }
            if (item === "__acessibilidade__") {
              return (
                <Link
                  key={item}
                  to="/sobre-o-prototipo"
                  data-cid="footer.link.acessibilidade"
                  className="text-ml-blue hover:underline"
                >
                  Acessibilidade
                </Link>
              )
            }
            return (
              <OutOfScopeLink key={item} className="hover:underline">
                {item}
              </OutOfScopeLink>
            )
          })}
        </nav>
        <p>Copyright © 1999-2026. Mercado Livre Brasil Ltda.</p>
        <p>CNPJ 03.007.331/0001-41 · Av. Presidente Juscelino Kubitschek, 2041, São Paulo - SP</p>
      </div>
    </footer>
  )
}
