import { useLocation } from "react-router-dom"

import { Comprovante } from "@/features/requests/Comprovante"

export function ExcluirDadosEnviado() {
  const location = useLocation()
  const protocolo = (location.state as { protocolo?: string } | null)?.protocolo

  return (
    <Comprovante
      protocolo={protocolo}
      titulo="Solicitação enviada"
      mensagem="Recebemos o seu pedido de exclusão. Vamos avisar por aqui e por e-mail a cada mudança de status."
    />
  )
}
