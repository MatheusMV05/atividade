import * as React from "react"
import { AlertCircle, HelpCircle, Mail, MessageCircle, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useFocusOnChange } from "@/lib/useFocusOnChange"

const RESEND_SECONDS = 60
const EXPIRE_SECONDS = 180
const MAX_TENTATIVAS = 3
const CODIGO_VALIDO = "123456" // ambiente de demonstração — nenhum SMS é enviado de verdade

type Canal = "sms" | "whatsapp" | "email"

export interface CodeVerificationProps {
  onVerified: () => void
  onCancel: () => void
  celularMascarado: string
  emailMascarado: string
  porQuePedimos: string
}

export function CodeVerification({
  onVerified,
  onCancel,
  celularMascarado,
  emailMascarado,
  porQuePedimos,
}: CodeVerificationProps) {
  const [canal, setCanal] = React.useState<Canal>("sms")
  const [enviado, setEnviado] = React.useState(false)
  const [sentAt, setSentAt] = React.useState<number | null>(null)
  const [now, setNow] = React.useState(() => Date.now())
  const [codigo, setCodigo] = React.useState("")
  const [tentativas, setTentativas] = React.useState(0)
  const [erro, setErro] = React.useState<string | null>(null)
  const [porQueAberto, setPorQueAberto] = React.useState(false)
  const headingRef = useFocusOnChange(enviado)

  React.useEffect(() => {
    if (!enviado) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [enviado])

  const segundosDesdeEnvio = sentAt ? Math.floor((now - sentAt) / 1000) : 0
  const podeReenviar = segundosDesdeEnvio >= RESEND_SECONDS
  const expirado = segundosDesdeEnvio >= EXPIRE_SECONDS
  const bloqueado = tentativas >= MAX_TENTATIVAS

  function enviarCodigo() {
    setEnviado(true)
    setSentAt(Date.now())
    setNow(Date.now())
    setCodigo("")
    setErro(null)
    setTentativas(0)
  }

  function confirmarCodigo(e: React.FormEvent) {
    e.preventDefault()
    if (expirado) {
      setErro("Este código expirou. Peça um novo.")
      return
    }
    if (bloqueado) return

    if (codigo === CODIGO_VALIDO) {
      onVerified()
      return
    }

    const proximaTentativa = tentativas + 1
    setTentativas(proximaTentativa)
    setCodigo("")
    if (proximaTentativa >= MAX_TENTATIVAS) {
      setErro(`Você errou o código ${MAX_TENTATIVAS} vezes. Peça um novo código para tentar de novo.`)
    } else {
      setErro(`Código incorreto. Você ainda tem ${MAX_TENTATIVAS - proximaTentativa} tentativa(s).`)
    }
  }

  if (!enviado) {
    return (
      <Card data-cid="verificacao.escolha-canal">
        <CardContent className="flex flex-col gap-4 p-6">
          <h2 ref={headingRef} tabIndex={-1} className="text-[18px] font-semibold text-ml-text outline-none">Como você quer receber o código?</h2>
          <div className="flex flex-col gap-2">
            <CanalOption
              icon={Smartphone}
              label={`SMS · ${celularMascarado}`}
              selected={canal === "sms"}
              onClick={() => setCanal("sms")}
            />
            <CanalOption
              icon={MessageCircle}
              label={`WhatsApp · ${celularMascarado}`}
              selected={canal === "whatsapp"}
              onClick={() => setCanal("whatsapp")}
            />
            <CanalOption
              icon={Mail}
              label={`E-mail · ${emailMascarado}`}
              selected={canal === "email"}
              onClick={() => setCanal("email")}
            />
          </div>

          <PorQuePedimos aberto={porQueAberto} setAberto={setPorQueAberto} texto={porQuePedimos} />

          <div className="flex gap-2">
            <Button type="button" onClick={enviarCodigo}>
              Enviar código
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar solicitação
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card data-cid="verificacao.inserir-codigo">
      <CardContent className="flex flex-col gap-4 p-6">
        <h2 ref={headingRef} tabIndex={-1} className="text-[18px] font-semibold text-ml-text outline-none">Digite o código que enviamos</h2>
        <p className="text-[14px] text-ml-text-secondary">
          Enviamos um código de 6 dígitos por {LABEL_CANAL[canal]}. Ele vale por {Math.floor(EXPIRE_SECONDS / 60)}{" "}
          minutos.
        </p>
        <p className="text-[12px] italic text-ml-text-secondary">
          Ambiente de demonstração: nenhum código é enviado de verdade — use <strong>123456</strong>.
        </p>

        <form onSubmit={confirmarCodigo} className="flex flex-col gap-3">
          <div>
            <Label htmlFor="codigo-verificacao">Código de 6 dígitos</Label>
            <Input
              id="codigo-verificacao"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
              disabled={bloqueado || expirado}
              aria-invalid={Boolean(erro)}
              aria-describedby={erro ? "codigo-erro" : undefined}
              className="mt-1 max-w-[200px] tracking-[0.3em]"
            />
          </div>

          {(erro || expirado) && (
            <p id="codigo-erro" role="alert" className="flex items-center gap-1.5 text-[13px] text-ml-red">
              <AlertCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {expirado ? "Este código expirou. Peça um novo." : erro}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" disabled={codigo.length !== 6 || bloqueado || expirado}>
              Confirmar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={enviarCodigo}
              disabled={!podeReenviar && !expirado}
            >
              {podeReenviar || expirado ? "Reenviar código" : `Reenviar em ${RESEND_SECONDS - segundosDesdeEnvio}s`}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar solicitação
            </Button>
          </div>
        </form>

        <PorQuePedimos aberto={porQueAberto} setAberto={setPorQueAberto} texto={porQuePedimos} />
      </CardContent>
    </Card>
  )
}

const LABEL_CANAL: Record<Canal, string> = { sms: "SMS", whatsapp: "WhatsApp", email: "e-mail" }

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

function PorQuePedimos({
  aberto,
  setAberto,
  texto,
}: {
  aberto: boolean
  setAberto: (v: boolean) => void
  texto: string
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-ml-blue"
      >
        <HelpCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
        Por que pedimos isso?
      </button>
      {aberto && <p className="mt-2 text-[13px] text-ml-text-secondary">{texto}</p>}
    </div>
  )
}
