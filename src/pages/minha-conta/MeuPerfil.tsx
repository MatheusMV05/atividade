import * as React from "react"
import { AlertTriangle, Banknote, CreditCard, MapPin, MessageCircleMore, Shield, User, Users, X } from "lucide-react"
import { Link } from "react-router-dom"

import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockUser } from "@/content/mockUser"

interface ProfileCardDef {
  icon: React.ElementType
  title: string
  description: string
  alerta?: boolean
  to?: string
  cid: string
}

const cards: ProfileCardDef[] = [
  { icon: User, title: "Informações do seu perfil", description: "Dados pessoais e da conta.", alerta: true, cid: "meu-perfil.card.informacoes" },
  { icon: Shield, title: "Segurança", description: "Você tem configurações pendentes.", alerta: true, cid: "meu-perfil.card.seguranca" },
  { icon: Users, title: "Colaboradores", description: "Pessoas que operam com a sua conta.", cid: "meu-perfil.card.colaboradores" },
  { icon: Banknote, title: "Meli+", description: "Assinatura com benefícios em frete, compras e entretenimento.", cid: "meu-perfil.card.meli-mais" },
  { icon: CreditCard, title: "Cartões", description: "Cartões salvos na sua conta.", cid: "meu-perfil.card.cartoes" },
  { icon: MapPin, title: "Endereços", description: "Endereços salvos na sua conta.", cid: "meu-perfil.card.enderecos" },
  { icon: Shield, title: "Privacidade", description: "Preferências e controle do uso dos seus dados.", to: "/minha-conta/privacidade", cid: "meu-perfil.card.privacidade" },
  { icon: MessageCircleMore, title: "Comunicações", description: "Escolha que tipo de informação você quer receber.", cid: "meu-perfil.card.comunicacoes" },
]

export function MeuPerfil() {
  const [avisoVisivel, setAvisoVisivel] = React.useState(true)

  return (
    <div data-cid="meu-perfil.root" className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-full bg-ml-blue-light text-ml-blue">
          <User className="size-8" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-[24px] font-semibold text-ml-text">{mockUser.nome}</h1>
          <p className="text-[14px] text-ml-text-secondary">{mockUser.email}</p>
        </div>
      </div>

      {avisoVisivel && (
        <div
          data-cid="meu-perfil.alerta-email"
          role="alert"
          className="flex items-center justify-between gap-3 rounded-[6px] border border-ml-orange bg-[rgba(255,119,51,0.08)] p-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 shrink-0 text-ml-orange" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-[14px] text-ml-text">Valide seu e-mail e mantenha sua conta segura</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <OutOfScopeLink>
              <Button type="button" variant="secondary" size="sm">
                Validar
              </Button>
            </OutOfScopeLink>
            <button
              type="button"
              aria-label="Dispensar aviso"
              className="text-ml-text-secondary hover:text-ml-text"
              onClick={() => setAvisoVisivel(false)}
            >
              <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          const content = (
            <Card className="flex h-full flex-col gap-2 p-4 hover:shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
              <span className="flex size-9 items-center justify-center rounded-full bg-ml-blue-light text-ml-blue">
                <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <p className="flex items-center gap-1 text-[16px] text-ml-text">
                {card.title}
                {card.alerta && <span className="text-ml-orange">!</span>}
              </p>
              <p className="text-[14px] text-ml-text-secondary">{card.description}</p>
            </Card>
          )

          return card.to ? (
            <Link key={card.cid} to={card.to} data-cid={card.cid}>
              {content}
            </Link>
          ) : (
            <OutOfScopeLink key={card.cid} data-cid={card.cid}>
              {content}
            </OutOfScopeLink>
          )
        })}
      </div>
    </div>
  )
}
