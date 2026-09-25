import { useLocation } from "react-router-dom"

import { Comprovante } from "@/features/requests/Comprovante"

export function RelatorioEnviado() {
  const location = useLocation()
  const protocolo = (location.state as { protocolo?: string } | null)?.protocolo

  return (
    <Comprovante
      protocolo={protocolo}
      titulo="Solicitação enviada"
      mensagem="Recebemos o seu pedido de relatório de dados. Vamos avisar por aqui e por e-mail quando ele estiver pronto."
    />
  )
}
