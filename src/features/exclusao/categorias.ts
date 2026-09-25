export interface CategoriaExclusao {
  id: string
  titulo: string
  descricao: string
  impacto: string
}

// CLAUDE.md §6 (F07): categorias sugeridas pelo diagnóstico, nenhuma pré-marcada.
export const CATEGORIAS_EXCLUSAO: CategoriaExclusao[] = [
  {
    id: "buscas",
    titulo: "Histórico de buscas",
    descricao: "Os termos que você já buscou no Mercado Livre.",
    impacto: "Suas sugestões de busca vão recomeçar do zero.",
  },
  {
    id: "navegacao",
    titulo: "Histórico de navegação e produtos vistos",
    descricao: "Os produtos e páginas que você visitou recentemente.",
    impacto: "A seção \"Vistos recentemente\" fica vazia.",
  },
  {
    id: "favoritos",
    titulo: "Favoritos",
    descricao: "Os produtos e lojas que você salvou como favoritos.",
    impacto: "Você perde a lista de favoritos salva até hoje.",
  },
  {
    id: "perguntas",
    titulo: "Perguntas feitas a vendedores",
    descricao: "As perguntas que você fez em anúncios de produtos.",
    impacto: "Suas perguntas somem dos anúncios, mas as respostas dos vendedores continuam visíveis para outros compradores.",
  },
  {
    id: "opinioes",
    titulo: "Opiniões publicadas",
    descricao: "As avaliações e comentários que você escreveu sobre produtos comprados.",
    impacto: "Suas opiniões deixam de aparecer nos produtos avaliados.",
  },
  {
    id: "enderecos",
    titulo: "Endereços salvos",
    descricao: "Endereços de entrega salvos na sua conta (exceto os de entregas em andamento).",
    impacto: "Você vai precisar digitar o endereço de novo na próxima compra.",
  },
  {
    id: "localizacao",
    titulo: "Dados de localização usados para recomendações",
    descricao: "A localização aproximada usada para sugerir produtos e ofertas perto de você.",
    impacto: "Recomendações baseadas em localização ficam menos precisas.",
  },
  {
    id: "publicidade",
    titulo: "Histórico de interações com publicidade",
    descricao: "Cliques e visualizações em anúncios patrocinados.",
    impacto: "Os anúncios que você vir deixam de levar em conta esse histórico.",
  },
]

// Retido independentemente da seleção acima (art. 16 da LGPD).
export const RETIDO_POR_LEI = [
  "Notas fiscais e comprovantes de compras já realizadas.",
  "Registros de pagamentos, pelo prazo exigido pela legislação fiscal.",
  "Dados usados para prevenção a fraude e segurança da conta.",
]
