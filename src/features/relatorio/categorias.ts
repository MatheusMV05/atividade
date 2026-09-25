export interface CategoriaRelatorio {
  id: string
  titulo: string
  descricao: string
  sensivel?: boolean
}

// CLAUDE.md §6 (F08): o titular escolhe os dados do relatório antes de qualquer
// verificação de identidade. Categorias com dados financeiros do Mercado Pago
// exigem verificação reforçada (documento + selfie) — as demais, só um código.
export const CATEGORIAS_RELATORIO: CategoriaRelatorio[] = [
  {
    id: "cadastrais",
    titulo: "Dados cadastrais",
    descricao: "Nome, e-mail, telefone e endereços salvos na sua conta.",
  },
  {
    id: "compras",
    titulo: "Histórico de compras e pedidos",
    descricao: "Produtos comprados, datas e status das entregas.",
  },
  {
    id: "navegacao",
    titulo: "Histórico de buscas e navegação",
    descricao: "Termos buscados e produtos visitados recentemente.",
  },
  {
    id: "interacoes",
    titulo: "Avaliações, perguntas e favoritos",
    descricao: "Opiniões publicadas, perguntas feitas a vendedores e itens favoritados.",
  },
  {
    id: "localizacao",
    titulo: "Dados de localização",
    descricao: "Localização aproximada usada para recomendações e segurança da conta.",
  },
  {
    id: "publicidade",
    titulo: "Interações com publicidade",
    descricao: "Cliques e visualizações em anúncios patrocinados.",
  },
  {
    id: "pagamentos",
    titulo: "Dados de pagamento e faturas do Mercado Pago",
    descricao: "Cartões salvos, faturas e histórico de pagamentos.",
    sensivel: true,
  },
]
