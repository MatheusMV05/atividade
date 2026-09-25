import * as React from "react"
import { AlertCircle, MessageCircle, Phone, ShieldOff, Smartphone, Trash2, UserX } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { mockUser } from "@/content/mockUser"
import { Comprovante } from "@/features/requests/Comprovante"
import { useRequestsStore } from "@/features/requests/store"
import { cn } from "@/lib/utils"
import { useFocusOnChange } from "@/lib/useFocusOnChange"

const RESEND_SECONDS = 60
const CODIGO_VALIDO = "123456"

type Canal = "sms" | "whatsapp" | "ligacao"
const LABEL_CANAL: Record<Canal, string> = { sms: "SMS", whatsapp: "WhatsApp", ligacao: "ligação telefônica" }

type Etapa = "identidade" | "motivo" | "consequencias" | "enviado"

const MOTIVOS = [
  "Não uso mais o Mercado Livre",
  "Tenho preocupações com privacidade e proteção de dados",
  "Criei a conta por engano",
  "Tive um problema com um vendedor ou comprador",
  "Outro motivo",
]

export function CancelarConta() {
  const navigate = useNavigate()
  const createRequest = useRequestsStore((s) => s.createRequest)
  const [etapa, setEtapa] = React.useState<Etapa>("identidade")
  const [motivo, setMotivo] = React.useState("")
  const [motivoErro, setMotivoErro] = React.useState<string | undefined>()
  const [detalhes, setDetalhes] = React.useState("")
  const [protocolo, setProtocolo] = React.useState<string>()
  const headingRef = useFocusOnChange(etapa)

  function handleIdentidadeConfirmada() {
    setEtapa("motivo")
  }

  function handleMotivoContinuar(e: React.FormEvent) {
    e.preventDefault()
    if (!motivo) {
      setMotivoErro("Selecione um motivo.")
      return
    }
    setMotivoErro(undefined)
    setEtapa("consequencias")
  }

  function handleConfirmarCancelamento() {
    const request = createRequest("cancelamento", { motivo, detalhes: detalhes.trim() || undefined })
    setProtocolo(request.protocolo)
    setEtapa("enviado")
  }

  return (
    <div data-cid="cancelar-conta.root" className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Meu perfil", to: "/minha-conta" },
          { label: "Privacidade", to: "/minha-conta/privacidade" },
          { label: "Cancelar conta" },
        ]}
      />

      {etapa === "identidade" && (
        <IdentidadeStep headingRef={headingRef} onVerified={handleIdentidadeConfirmada} onCancel={() => navigate("/minha-conta/privacidade")} />
      )}

      {etapa === "motivo" && (
        <div className="flex flex-col gap-4">
          <h1 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold text-ml-text outline-none">
            Explique o motivo do cancelamento
          </h1>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleMotivoContinuar} className="flex flex-col gap-4" noValidate>
                <div>
                  <Label htmlFor="cancelar-motivo">Motivo</Label>
                  <select
                    id="cancelar-motivo"
                    value={motivo}
                    onChange={(e) => {
                      setMotivo(e.target.value)
                      if (e.target.value) setMotivoErro(undefined)
                    }}
                    onBlur={() => setMotivoErro(motivo ? undefined : "Selecione um motivo.")}
                    aria-invalid={Boolean(motivoErro)}
                    aria-describedby={motivoErro ? "cancelar-motivo-erro" : undefined}
                    className="mt-1 flex h-12 w-full rounded-[2px] border border-ml-border bg-ml-surface px-4 text-[16px] text-ml-text shadow-[0_1px_2px_rgba(0,0,0,0.2)] outline-none focus-visible:border-ml-blue aria-invalid:border-ml-red"
                  >
                    <option value="">Selecione um motivo</option>
                    {MOTIVOS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  {motivoErro && (
                    <p id="cancelar-motivo-erro" role="alert" className="mt-1 flex items-center gap-1.5 text-[13px] text-ml-red">
                      <AlertCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      {motivoErro}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cancelar-detalhes">Conte-nos um pouco mais (opcional)</Label>
                  <textarea
                    id="cancelar-detalhes"
                    value={detalhes}
                    onChange={(e) => setDetalhes(e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="mt-1 flex w-full rounded-[2px] border border-ml-border bg-ml-surface px-4 py-3 text-[16px] text-ml-text shadow-[0_1px_2px_rgba(0,0,0,0.2)] outline-none focus-visible:border-ml-blue"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Continuar</Button>
                  <Button type="button" variant="outline" onClick={() => setEtapa("identidade")}>
                    Voltar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {etapa === "consequencias" && (
        <div className="flex flex-col gap-4">
          <h1 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold text-ml-text outline-none">
            O que acontece se você cancelar sua conta?
          </h1>
          <Card>
            <CardContent className="flex flex-col gap-4 p-6">
              <ul className="flex flex-col gap-4">
                <li className="flex gap-3">
                  <UserX className="mt-0.5 size-5 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-[14px] text-ml-text">
                    Você perde o acesso a compras, mensagens, favoritos e todo o histórico da sua conta.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Trash2 className="mt-0.5 size-5 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-[14px] text-ml-text">
                    Seus dados pessoais são removidos, exceto o que precisamos manter por obrigação legal — como
                    notas fiscais e registros de transações (art. 16 da LGPD).
                  </span>
                </li>
                <li className="flex gap-3">
                  <ShieldOff className="mt-0.5 size-5 shrink-0 text-ml-blue" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-[14px] text-ml-text">
                    Essa ação não pode ser desfeita depois de confirmada.
                  </span>
                </li>
              </ul>

              {/* Botões com o mesmo peso visual — sem confirmshaming (item 4 · Conforme, CLAUDE.md §6) */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="destructive" onClick={handleConfirmarCancelamento}>
                  Cancelar conta
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/minha-conta/privacidade")}>
                  Manter minha conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {etapa === "enviado" && (
        <Comprovante
          protocolo={protocolo}
          titulo="Você solicitou o cancelamento"
          mensagem="Enviaremos para você um e-mail com a confirmação."
        />
      )}
    </div>
  )
}

function IdentidadeStep({
  headingRef,
  onVerified,
  onCancel,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>
  onVerified: () => void
  onCancel: () => void
}) {
  const [canal, setCanal] = React.useState<Canal>("sms")
  const [enviado, setEnviado] = React.useState(false)
  const [sentAt, setSentAt] = React.useState<number | null>(null)
  const [now, setNow] = React.useState(() => Date.now())
  const [codigo, setCodigo] = React.useState("")
  const [erro, setErro] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!enviado) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [enviado])

  const segundosDesdeEnvio = sentAt ? Math.floor((now - sentAt) / 1000) : 0
  const podeReenviar = segundosDesdeEnvio >= RESEND_SECONDS

  function enviarCodigo() {
    setEnviado(true)
    setSentAt(Date.now())
    setNow(Date.now())
    setCodigo("")
    setErro(null)
  }

  function confirmarCodigo(e: React.FormEvent) {
    e.preventDefault()
    if (codigo === CODIGO_VALIDO) {
      onVerified()
      return
    }
    setCodigo("")
    setErro("Código incorreto. Confira o código e tente de novo.")
  }

  if (!enviado) {
    return (
      <div className="flex flex-col gap-4">
        <h1 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold text-ml-text outline-none">
          Valide que esta é a sua conta
        </h1>
        <p data-cid="cancelar-conta.link-exclusao-especifica" data-finding="F07" className="text-[13px] text-ml-text-secondary">
          Quer apagar só alguns dados?{" "}
          <Link to="/minha-conta/privacidade/excluir-dados" className="text-ml-blue hover:underline">
            Excluir dados específicos
          </Link>
          .
        </p>
        <Card>
          <CardContent className="flex flex-col gap-4 p-6">
            <p className="text-[14px] text-ml-text-secondary">Escolha como quer receber o código de validação.</p>
            <div className="flex flex-col gap-2">
              <CanalOption icon={Smartphone} label={`SMS (No celular terminado em ${mockUser.celularMascarado.slice(-4)})`} selected={canal === "sms"} onClick={() => setCanal("sms")} />
              <CanalOption icon={MessageCircle} label={`WhatsApp (No celular terminado em ${mockUser.celularMascarado.slice(-4)})`} selected={canal === "whatsapp"} onClick={() => setCanal("whatsapp")} />
              <CanalOption icon={Phone} label={`Ligação telefônica (No celular terminado em ${mockUser.celularMascarado.slice(-4)})`} selected={canal === "ligacao"} onClick={() => setCanal("ligacao")} />
            </div>
            <OutOfScopeLink className="self-start text-[13px] text-ml-blue hover:underline">
              Verificar de outra forma
            </OutOfScopeLink>
            <div className="flex gap-2">
              <Button type="button" onClick={enviarCodigo}>
                Enviar código
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 ref={headingRef} tabIndex={-1} className="text-[24px] font-semibold text-ml-text outline-none">
        Digite o código que enviamos
      </h1>
      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="text-[14px] text-ml-text-secondary">Enviamos um código de 6 dígitos por {LABEL_CANAL[canal]}.</p>
          <p className="text-[12px] italic text-ml-text-secondary">
            Ambiente de demonstração: nenhum código é enviado de verdade — use <strong>123456</strong>.
          </p>
          <form onSubmit={confirmarCodigo} className="flex flex-col gap-3">
            <div>
              <Label htmlFor="cancelar-codigo">Código de 6 dígitos</Label>
              <input
                id="cancelar-codigo"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                aria-invalid={Boolean(erro)}
                aria-describedby={erro ? "cancelar-codigo-erro" : undefined}
                className="mt-1 flex h-12 max-w-[200px] rounded-[2px] border border-ml-border bg-ml-surface px-4 text-[16px] tracking-[0.3em] text-ml-text shadow-[0_1px_2px_rgba(0,0,0,0.2)] outline-none focus-visible:border-ml-blue aria-invalid:border-ml-red"
              />
            </div>
            {erro && (
              <p id="cancelar-codigo-erro" role="alert" className="flex items-center gap-1.5 text-[13px] text-ml-red">
                <AlertCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {erro}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit" disabled={codigo.length !== 6}>
                Confirmar
              </Button>
              <Button type="button" variant="secondary" onClick={enviarCodigo} disabled={!podeReenviar}>
                {podeReenviar ? "Reenviar código" : `Reenviar em ${RESEND_SECONDS - segundosDesdeEnvio}s`}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function CanalOption({
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ElementType
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-center gap-3 rounded-[6px] border p-3 text-left text-[14px]",
        selected ? "border-ml-blue bg-ml-blue-light text-ml-blue" : "border-ml-border text-ml-text hover:bg-ml-bg/60"
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      {label}
    </button>
  )
}
