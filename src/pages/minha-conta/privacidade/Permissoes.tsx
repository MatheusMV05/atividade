import { Info, MapPin, ShieldCheck } from "lucide-react"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { type PermissionId, usePermissionsStore } from "@/features/permissions/store"

function formatarData(iso: string) {
  const d = new Date(iso)
  d.setDate(d.getDate() + 5)
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
}

function StatusProcessamento({ id }: { id: PermissionId }) {
  const alteradoEm = usePermissionsStore((s) => s.alteradoEm[id])
  if (!alteradoEm) return null

  return (
    <span
      data-finding="F06"
      className="mt-1 inline-block text-[12px] font-semibold text-ml-orange"
    >
      Em processamento · efetiva até {formatarData(alteradoEm)}
    </span>
  )
}

interface LinhaSemToggle {
  icon: React.ElementType
  titulo: string
  descricao: string
  cid: string
}

const linhasFixas: LinhaSemToggle[] = [
  {
    icon: ShieldCheck,
    titulo: "Dados de localização essenciais para sua segurança",
    descricao:
      "Mantemos essa permissão ativa porque usamos alguns dados da sua localização para proteger sua conta e evitar casos de fraude.",
    cid: "permissoes.linha.localizacao-seguranca",
  },
  {
    icon: MapPin,
    titulo: "Permissão de localização",
    descricao:
      "Mantenha a permissão de localização ativa nas configurações do seu dispositivo para acessar produtos, serviços, descontos e benefícios disponíveis na sua região.",
    cid: "permissoes.linha.localizacao-dispositivo",
  },
]

interface LinhaToggle {
  id: PermissionId
  titulo: string
  descricao: string
  cid: string
}

const linhasToggle: LinhaToggle[] = [
  {
    id: "recomendacoes",
    titulo: "Informações sobre suas últimas compras, buscas e favoritos",
    descricao: "Mantenha a permissão ativa para saber recomendações úteis sobre outros produtos ao usar sua conta.",
    cid: "permissoes.linha.recomendacoes",
  },
  {
    id: "publicidade",
    titulo: "Publicidade e conteúdo personalizado",
    descricao:
      "Usamos sua atividade para mostrar anúncios e conteúdos que interessem a você, tanto no Mercado Pago, Mercado Livre e outros sites.",
    cid: "permissoes.linha.publicidade",
  },
]

export function Permissoes() {
  const valores = usePermissionsStore((s) => s.valores)
  const setPermissao = usePermissionsStore((s) => s.setPermissao)

  return (
    <div data-cid="permissoes.root" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Configurar permissões de privacidade" },
        ]}
      />
      <h1 className="text-[24px] font-semibold text-ml-text">Gerenciar permissões de privacidade</h1>

      <div
        data-cid="permissoes.aviso"
        role="note"
        className="flex items-start gap-2 rounded-[6px] bg-ml-blue-light p-4 text-[14px] text-ml-text"
      >
        <Info className="mt-0.5 size-4 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
        <p>
          Essas alterações podem levar até 5 dias para serem efetuadas.{" "}
          <OutOfScopeLink className="text-ml-blue hover:underline">
            Saiba mais em nossa Declaração de privacidade.
          </OutOfScopeLink>
        </p>
      </div>

      <Card className="divide-y divide-ml-border">
        {linhasFixas.map((linha) => {
          const Icon = linha.icon
          return (
            <div key={linha.cid} data-cid={linha.cid} className="flex items-start gap-4 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ml-blue-light text-ml-blue">
                <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[16px] text-ml-text">{linha.titulo}</span>
                <span className="mt-0.5 block text-[14px] text-ml-text-secondary">{linha.descricao}</span>
              </span>
            </div>
          )
        })}

        {linhasToggle.map((linha) => (
          <div key={linha.cid} data-cid={linha.cid} className="flex items-start gap-4 p-4">
            <span className="min-w-0 flex-1">
              <Label htmlFor={`toggle-${linha.id}`} className="block cursor-pointer text-[16px] font-normal text-ml-text">
                {linha.titulo}
              </Label>
              <span className="mt-0.5 block text-[14px] text-ml-text-secondary">{linha.descricao}</span>
              <StatusProcessamento id={linha.id} />
            </span>
            <Switch
              id={`toggle-${linha.id}`}
              checked={valores[linha.id]}
              onCheckedChange={(v) => setPermissao(linha.id, v)}
              aria-label={linha.titulo}
              className="mt-1 shrink-0"
            />
          </div>
        ))}
      </Card>

      <Card>
        <CardContent className="p-4 text-[13px] text-ml-text-secondary">
          As alterações são salvas automaticamente — não é preciso clicar em nenhum botão para confirmar.
        </CardContent>
      </Card>
    </div>
  )
}
