import { createBrowserRouter, Link } from "react-router-dom"

import { MinhaContaLayout } from "@/components/layout/MinhaContaLayout"
import { RootLayout } from "@/components/layout/RootLayout"
import { ComoExcluirMeusDados } from "@/pages/ajuda/ComoExcluirMeusDados"
import { MeusDireitosPrivacidade } from "@/pages/ajuda/MeusDireitosPrivacidade"
import { Email } from "@/pages/Email"
import { Home } from "@/pages/Home"
import { InformacoesDoPerfil } from "@/pages/minha-conta/InformacoesDoPerfil"
import { MeuPerfil } from "@/pages/minha-conta/MeuPerfil"
import { CancelarConta } from "@/pages/minha-conta/privacidade/CancelarConta"
import { CentralPrivacidade } from "@/pages/minha-conta/privacidade/CentralPrivacidade"
import { Cookies } from "@/pages/minha-conta/privacidade/Cookies"
import { ExcluirDadosEnviado } from "@/pages/minha-conta/privacidade/excluir-dados/Enviado"
import { ExcluirDadosRevisar } from "@/pages/minha-conta/privacidade/excluir-dados/Revisar"
import { ExcluirDadosSelecionar } from "@/pages/minha-conta/privacidade/excluir-dados/Selecionar"
import { ExcluirDadosVerificar } from "@/pages/minha-conta/privacidade/excluir-dados/Verificar"
import { Permissoes } from "@/pages/minha-conta/privacidade/Permissoes"
import { RelatorioEnviado } from "@/pages/minha-conta/privacidade/relatorio/Enviado"
import { RelatorioSelecionar } from "@/pages/minha-conta/privacidade/relatorio/Selecionar"
import { RelatorioVerificar } from "@/pages/minha-conta/privacidade/relatorio/Verificar"
import { RelatorioVerificarReforcada } from "@/pages/minha-conta/privacidade/relatorio/VerificarReforcada"
import { SolicitacaoDetalhe } from "@/pages/minha-conta/privacidade/SolicitacaoDetalhe"
import { Solicitacoes } from "@/pages/minha-conta/privacidade/Solicitacoes"
import { PrivacidadePublica } from "@/pages/PrivacidadePublica"
import { SobreOPrototipo } from "@/pages/SobreOPrototipo"

function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-16 text-center">
      <h1 className="text-[24px] font-semibold text-ml-text">Página não encontrada</h1>
      <p className="mt-2 text-[14px] text-ml-text-secondary">
        Esta página não existe no protótipo.{" "}
        <Link to="/" className="text-ml-blue hover:underline">
          Voltar para a home
        </Link>
        .
      </p>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "privacidade", element: <PrivacidadePublica /> },
      { path: "ajuda/meus-direitos-de-privacidade", element: <MeusDireitosPrivacidade /> },
      { path: "ajuda/como-excluir-meus-dados", element: <ComoExcluirMeusDados /> },
      { path: "email/:protocolo", element: <Email /> },
      { path: "sobre-o-prototipo", element: <SobreOPrototipo /> },
      {
        path: "minha-conta",
        element: <MinhaContaLayout />,
        children: [
          { index: true, element: <MeuPerfil /> },
          { path: "perfil", element: <InformacoesDoPerfil /> },
          {
            path: "privacidade",
            children: [
              { index: true, element: <CentralPrivacidade /> },
              { path: "permissoes", element: <Permissoes /> },
              { path: "cookies", element: <Cookies /> },
              { path: "cancelar-conta", element: <CancelarConta /> },
              { path: "relatorio", element: <RelatorioSelecionar /> },
              { path: "relatorio/verificar", element: <RelatorioVerificar /> },
              { path: "relatorio/verificar/reforcada", element: <RelatorioVerificarReforcada /> },
              { path: "relatorio/enviado", element: <RelatorioEnviado /> },
              { path: "excluir-dados", element: <ExcluirDadosSelecionar /> },
              { path: "excluir-dados/revisar", element: <ExcluirDadosRevisar /> },
              { path: "excluir-dados/verificar", element: <ExcluirDadosVerificar /> },
              { path: "excluir-dados/enviado", element: <ExcluirDadosEnviado /> },
              { path: "solicitacoes", element: <Solicitacoes /> },
              { path: "solicitacoes/:protocolo", element: <SolicitacaoDetalhe /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
])
