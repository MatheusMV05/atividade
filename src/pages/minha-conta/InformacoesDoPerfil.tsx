import * as React from "react"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockUser } from "@/content/mockUser"

interface CampoDef {
  id: string
  label: string
  tipo: string
}

const campos: CampoDef[] = [
  { id: "nome", label: "Nome completo", tipo: "text" },
  { id: "email", label: "E-mail", tipo: "email" },
  { id: "celular", label: "Celular", tipo: "tel" },
  { id: "dataNascimento", label: "Data de nascimento", tipo: "date" },
]

type Valores = Record<string, string>
type Erros = Record<string, string | undefined>

const valoresIniciais: Valores = {
  nome: mockUser.nome,
  email: mockUser.emailCompleto,
  celular: mockUser.celularCompleto,
  dataNascimento: mockUser.dataNascimento,
}

// Validação inline no blur (item 5 · Conforme, CLAUDE.md §6): mesma regra
// reaproveitada em todo formulário novo do redesenho.
export function InformacoesDoPerfil() {
  const [valores, setValores] = React.useState<Valores>(valoresIniciais)
  const [erros, setErros] = React.useState<Erros>({})

  function validarCampo(id: string, valor: string) {
    if (!valor.trim()) return "Preencha esse dado."
    if (id === "email" && !/^\S+@\S+\.\S+$/.test(valor)) return "Digite um e-mail válido."
    return undefined
  }

  function handleBlur(id: string) {
    setErros((prev) => ({ ...prev, [id]: validarCampo(id, valores[id]) }))
  }

  function handleChange(id: string, valor: string) {
    setValores((prev) => ({ ...prev, [id]: valor }))
    // corrige o erro assim que o dado passa a ser válido, sem esperar o próximo blur
    if (erros[id]) {
      setErros((prev) => ({ ...prev, [id]: validarCampo(id, valor) }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const proximosErros: Erros = {}
    for (const campo of campos) {
      proximosErros[campo.id] = validarCampo(campo.id, valores[campo.id])
    }
    setErros(proximosErros)
    if (Object.values(proximosErros).some(Boolean)) return

    toast("Dados atualizados com sucesso.")
  }

  return (
    <div data-cid="informacoes-perfil.root" className="flex flex-col gap-4">
      <Breadcrumb items={[{ label: "Meu perfil", to: "/minha-conta" }, { label: "Informações do seu perfil" }]} />
      <h1 className="text-[24px] font-semibold text-ml-text">Informações do seu perfil</h1>
      <p className="text-[14px] text-ml-text-secondary">
        Mantenha seus dados pessoais e da conta atualizados. Isso ajuda a manter sua conta segura e as respostas às
        suas solicitações de privacidade corretas.
      </p>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {campos.map((campo) => (
              <div key={campo.id}>
                <Label htmlFor={`perfil-${campo.id}`}>{campo.label}</Label>
                <Input
                  id={`perfil-${campo.id}`}
                  type={campo.tipo}
                  value={valores[campo.id]}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  onBlur={() => handleBlur(campo.id)}
                  aria-invalid={Boolean(erros[campo.id])}
                  aria-describedby={erros[campo.id] ? `perfil-${campo.id}-erro` : undefined}
                  className="mt-1"
                />
                {erros[campo.id] && (
                  <p
                    id={`perfil-${campo.id}-erro`}
                    role="alert"
                    className="mt-1 flex items-center gap-1.5 text-[13px] text-ml-red"
                  >
                    <AlertCircle className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {erros[campo.id]}
                  </p>
                )}
              </div>
            ))}

            <div className="mt-2 flex gap-2">
              <Button type="submit">Salvar alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
