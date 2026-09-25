export interface Finding {
  id: "F06" | "F07" | "F08" | "F09"
  item: number
  titulo: string
  eixo: string
  heuristica: string
  artigos: string[]
  avaliacao: "Parcialmente Conforme"
  problema: string
  solucao: string
  telas: string[]
}

export const findings: Finding[] = [
  {
    id: "F06",
    item: 6,
    titulo: "Feedback e visibilidade do status do sistema",
    eixo: "Heurísticas de Nielsen (#1 — Visibilidade do status do sistema)",
    heuristica: "Nielsen #1",
    artigos: ["Art. 18", "Art. 19", "Art. 18, §4º"],
    avaliacao: "Parcialmente Conforme",
    problema:
      "Há feedback imediato e prazos comunicados, mas não existe número de protocolo nem painel de acompanhamento do pedido.",
    solucao:
      "Todo pedido gera um comprovante com protocolo, prazo estimado com data concreta, canal de acompanhamento e um e-mail de confirmação. Uma nova área \"Minhas solicitações\" lista os pedidos com status e prazo, e o detalhe de cada um mostra uma linha do tempo (Recebida → Identidade confirmada → Em análise → Concluída) com o próximo passo sempre explícito, além dos estados de exceção (informações adicionais, indeferida, prazo excedido).",
    telas: [
      "/minha-conta/privacidade/solicitacoes",
      "/minha-conta/privacidade/solicitacoes/:protocolo",
      "/email/:protocolo",
    ],
  },
  {
    id: "F07",
    item: 7,
    titulo: "Granularidade e liberdade de controle do usuário",
    eixo: "Heurísticas de Nielsen (#3 — Controle e liberdade) / Base legal",
    heuristica: "Nielsen #3",
    artigos: ["Art. 8º, §5º", "Art. 18, VI e §2º", "Art. 16"],
    avaliacao: "Parcialmente Conforme",
    problema:
      "Há controle granular para permissões, cookies, retificação e portabilidade, mas a eliminação de dados só existe via \"Cancelar conta\" — uma lógica tudo ou nada.",
    solucao:
      "Novo item \"Excluir dados específicos\" na Central de Privacidade, separado de \"Cancelar conta\": o titular escolhe por categoria (nenhuma pré-marcada), revisa o impacto de cada exclusão e o que fica retido por obrigação legal (art. 16), antes de confirmar. O artigo da Ajuda sobre exclusão de dados passa a explicar as duas opções.",
    telas: [
      "/minha-conta/privacidade",
      "/minha-conta/privacidade/excluir-dados",
      "/ajuda/como-excluir-meus-dados",
    ],
  },
  {
    id: "F08",
    item: 8,
    titulo: "Carga cognitiva e autonomia na coleta de identidade",
    eixo: "Heurísticas de Nielsen (#6 — Reconhecimento em vez de memorização) / Minimização",
    heuristica: "Nielsen #6",
    artigos: ["Art. 6º, III", "Art. 18", "Art. 11"],
    avaliacao: "Parcialmente Conforme",
    problema:
      "O relatório de dados exige documento oficial + biometria já no primeiro passo, antes de qualquer seleção e mesmo com o usuário autenticado — uma coleta desproporcional frente ao cancelamento, que aceita só um código por SMS/WhatsApp.",
    solucao:
      "Inverte a ordem: primeiro o titular escolhe os dados do relatório, depois verifica a identidade. O padrão passa a ser um código de 6 dígitos (mesmo canal do cancelamento); a verificação reforçada com documento + selfie só aparece quando há risco maior, sempre explicando por que é pedida, para que serve e por quanto tempo fica guardada, com uma alternativa sem biometria.",
    telas: [
      "/minha-conta/privacidade/relatorio",
      "/minha-conta/privacidade/relatorio/verificar",
      "/minha-conta/privacidade/relatorio/verificar/reforcada",
    ],
  },
  {
    id: "F09",
    item: 9,
    titulo: "Acessibilidade e responsividade (universalidade)",
    eixo: "Heurísticas / IHC geral — Universalidade",
    heuristica: "Geral",
    artigos: ["Art. 18", "LBI (Lei 13.146/15)"],
    avaliacao: "Parcialmente Conforme",
    problema:
      "O site é responsivo e tem foco visível, mas 7 de 150 controles interativos não têm nome acessível e 1 imagem não tem alt; não houve auditoria dedicada de contraste nem de leitor de tela, e o levantamento encontrou toggles sem rótulo e textos em espanhol no site em português.",
    solucao:
      "Todo controle só de ícone recebe aria-label; toda imagem tem alt; contraste ajustado para WCAG 2.2 AA; navegação completa por teclado com skip link e foco movido a cada troca de etapa; aria-live nos comprovantes e mudanças de status; auditoria automatizada com @axe-core/react registrada em /sobre-o-prototipo.",
    telas: ["transversal — shell, componentes base e todos os formulários novos"],
  },
]

export const conformeItems = [
  {
    item: 1,
    titulo: "Descobrabilidade e custo de interação",
    mantido: "Caminho em 2 cliques: dropdown do usuário → Minha conta → card \"Privacidade\".",
  },
  {
    item: 2,
    titulo: "Adequação da linguagem",
    mantido:
      "Tom simples dos rótulos existentes (\"Administrar permissões\", \"Conhecer relatório de dados\"...); todo texto novo segue o mesmo padrão.",
  },
  {
    item: 3,
    titulo: "Prevenção de fricção artificial",
    mantido: "Fluxo de cancelamento sem burocracia extra ou canais desconectados.",
  },
  {
    item: 4,
    titulo: "Hierarquia visual e neutralidade",
    mantido: "Botões de confirmação e desistência com peso visual equivalente, sem confirmshaming.",
  },
  {
    item: 5,
    titulo: "Prevenção de erros",
    mantido:
      "Validação inline no blur, sem perder o que já foi preenchido — padrão reaproveitado em todo formulário novo do redesenho.",
  },
  {
    item: 10,
    titulo: "Recuperabilidade e reversibilidade",
    mantido:
      "Aviso prévio das consequências + confirmação por e-mail antes de ações irreversíveis. Ressalva não endereçada: falta um prazo de carência explícito após a confirmação final.",
  },
]
