import {
  ChevronRight,
  ClipboardList,
  Cookie,
  FileText,
  Mail,
  PenLine,
  ShieldCheck,
  Trash2,
  UserX,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Card } from "@/components/ui/card"
import { ENCARREGADO } from "@/features/requests/constants"

interface LinhaHub {
  icon: React.ElementType
  titulo: string
  descricao: string
  to?: string
  cid: string
  finding?: string
}

interface GrupoHub {
  titulo: string
  linhas: LinhaHub[]
}

// Hub reorganizado em grupos claros — solução F07 (CLAUDE.md §6, item 6).
const grupos: GrupoHub[] = [
  {
    titulo: "Seus dados",
    linhas: [
      {
        icon: FileText,
        titulo: "Conhecer relatório de dados",
        descricao: "Peça um relatório com os dados pessoais que temos sobre você.",
        to: "/minha-conta/privacidade/relatorio",
        cid: "central-privacidade.linha.relatorio",
      },
      {
        icon: PenLine,
        titulo: "Corrigir seus dados",
        descricao: "Atualize nome, e-mail, telefone e outros dados da sua conta.",
        cid: "central-privacidade.linha.corrigir",
      },
      {
        icon: Trash2,
        titulo: "Excluir dados específicos",
        descricao: "Apague só o que você escolher, sem cancelar sua conta.",
        to: "/minha-conta/privacidade/excluir-dados",
        cid: "central-privacidade.linha.excluir-dados",
        finding: "F07",
      },
    ],
  },
  {
    titulo: "Preferências",
    linhas: [
      {
        icon: ShieldCheck,
        titulo: "Administrar permissões",
        descricao: "Escolha como usamos seus dados de localização, compras e navegação.",
        cid: "central-privacidade.linha.permissoes",
      },
      {
        icon: Cookie,
        titulo: "Configurar cookies",
        descricao: "Gerencie os cookies usados durante a sua navegação.",
        cid: "central-privacidade.linha.cookies",
      },
    ],
  },
  {
    titulo: "Solicitações",
    linhas: [
      {
        icon: ClipboardList,
        titulo: "Minhas solicitações",
        descricao: "Acompanhe o status dos pedidos que você já fez sobre seus dados.",
        to: "/minha-conta/privacidade/solicitacoes",
        cid: "central-privacidade.linha.solicitacoes",
        finding: "F06",
      },
    ],
  },
  {
    titulo: "Conta",
    linhas: [
      {
        icon: UserX,
        titulo: "Cancelar conta",
        descricao: "Inicie uma solicitação para cancelar sua conta e remover seus dados pessoais.",
        cid: "central-privacidade.linha.cancelar-conta",
      },
    ],
  },
]

export function CentralPrivacidade() {
  return (
    <div data-cid="central-privacidade.root" className="flex flex-col gap-6">
      <div>
        <Breadcrumb items={[{ label: "Meu perfil", to: "/minha-conta" }, { label: "Privacidade" }]} />
        <h1 className="text-[24px] font-semibold text-ml-text">Gerencie a privacidade da sua conta</h1>
      </div>

      {grupos.map((grupo) => (
        <div key={grupo.titulo} data-cid={`central-privacidade.grupo.${grupo.titulo}`}>
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-ml-text-secondary">
            {grupo.titulo}
          </p>
          <Card className="divide-y divide-ml-border">
            {grupo.linhas.map((linha) => {
              const Icon = linha.icon
              const conteudo = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ml-blue-light text-ml-blue">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] text-ml-text">{linha.titulo}</span>
                    <span className="block text-[14px] text-ml-text-secondary">{linha.descricao}</span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
                </>
              )

              return linha.to ? (
                <Link
                  key={linha.cid}
                  to={linha.to}
                  data-cid={linha.cid}
                  data-finding={linha.finding}
                  className="flex items-center gap-4 p-4 hover:bg-ml-bg/60"
                >
                  {conteudo}
                </Link>
              ) : (
                <OutOfScopeLink
                  key={linha.cid}
                  data-cid={linha.cid}
                  className="flex items-center gap-4 p-4 hover:bg-ml-bg/60"
                >
                  {conteudo}
                </OutOfScopeLink>
              )
            })}
          </Card>
        </div>
      ))}

      <div className="flex flex-col gap-1 border-t border-ml-border pt-4 text-[13px] text-ml-text-secondary">
        <p className="flex items-center gap-1.5">
          <Mail className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Fale com o {ENCARREGADO.nome}:{" "}
          <a href={`mailto:${ENCARREGADO.email}`} className="text-ml-blue hover:underline">
            {ENCARREGADO.email}
          </a>
        </p>
        <p>
          Saiba mais sobre{" "}
          <Link to="/privacidade" className="text-ml-blue hover:underline">
            como cuidamos da sua privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
