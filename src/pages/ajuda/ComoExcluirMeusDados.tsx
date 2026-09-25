import { Link } from "react-router-dom"

import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Card, CardContent } from "@/components/ui/card"

export function ComoExcluirMeusDados() {
  return (
    <div data-cid="ajuda.como-excluir.root" className="mx-auto max-w-[800px] px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Ajuda", to: "/ajuda/meus-direitos-de-privacidade" },
          { label: "Como posso excluir meus dados pessoais?" },
        ]}
      />
      <h1 className="text-[24px] font-semibold text-ml-text">Como posso excluir meus dados pessoais?</h1>

      <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ml-text">
        <p>
          Você tem duas formas de excluir dados pessoais no Mercado Livre, dependendo do que você precisa:
        </p>

        <Card data-finding="F07" data-cid="ajuda.como-excluir.opcao.especificos" className="border-l-4 border-l-ml-blue">
          <CardContent className="p-4">
            <p className="text-[16px] font-semibold text-ml-text">
              1. Excluir só alguns dados, mantendo a sua conta
            </p>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Use <strong>Excluir dados específicos</strong> para apagar, por exemplo, seu histórico de buscas,
              produtos vistos, favoritos, perguntas feitas a vendedores ou opiniões publicadas — sem cancelar sua
              conta nem perder o acesso às suas compras.
            </p>
            <Link
              to="/minha-conta/privacidade/excluir-dados"
              className="mt-2 inline-block text-[14px] font-semibold text-ml-blue hover:underline"
            >
              Excluir dados específicos
            </Link>
          </CardContent>
        </Card>

        <Card data-finding="F07" data-cid="ajuda.como-excluir.opcao.conta" className="border-l-4 border-l-ml-border">
          <CardContent className="p-4">
            <p className="text-[16px] font-semibold text-ml-text">2. Excluir todos os seus dados pessoais</p>
            <p className="mt-1 text-[14px] text-ml-text-secondary">
              Se você quer remover todos os seus dados pessoais do Mercado Livre e do Mercado Pago, use{" "}
              <strong>Cancelar conta</strong>. Essa ação é irreversível: você perde o acesso ao histórico de
              compras, pagamentos e comprovantes.
            </p>
            <Link
              to="/minha-conta/privacidade/cancelar-conta"
              className="mt-2 inline-block text-[14px] font-semibold text-ml-blue hover:underline"
            >
              Cancelar conta
            </Link>
          </CardContent>
        </Card>

        <p className="text-[13px] text-ml-text-secondary">
          Alguns dados podem continuar armazenados por período determinado quando exigido por lei — por exemplo,
          notas fiscais e registros de transações (art. 16 da LGPD). Explicamos exatamente o que fica retido antes
          de você confirmar qualquer exclusão.
        </p>
      </div>
    </div>
  )
}
