# CLAUDE.md — Protótipo LGPD · Central de Privacidade do Mercado Livre

## 1. O que é este projeto

Trabalho acadêmico de IHC + Direito (CESAR School). **Não é o site oficial do Mercado Livre.**

- **Parte 1 (feita, fora deste repo):** diagnóstico do canal real de exercício de direitos do titular (LGPD, art. 18) no Mercado Livre, com um checklist próprio organizado em quatro eixos: Existência e acesso · Heurísticas de Nielsen · Dark patterns · Base legal/LGPD.
- **Parte 2 (este repo):** protótipo **navegável e de alta fidelidade** que redesenha esse canal e corrige de forma intencional cada problema encontrado no diagnóstico. Substitui o Figma que o enunciado sugere.

Material de referência em `docs/`: `analise-ihc-lgpd-mercado-livre.pdf` (checklist completo com capturas das telas atuais, a referência visual do "antes") e `enunciado-parte2.txt` (enunciado da atividade).

Prazo de entrega: **02/10/2026**. A entrega é um **link público** (Vercel) em que o avaliador navega e **deixa comentários**.

### O que o enunciado exige (requisitos obrigatórios)

1. **Ponto de entrada**: como o titular encontra o canal, com o caminho de descoberta a partir da home.
2. **Fluxo completo de pelo menos 2 direitos do art. 18**. Escolhidos a partir dos achados: **acesso/portabilidade** (art. 18, II e V; relatório de dados, F08) e **eliminação** (art. 18, VI; exclusão granular, F07).
3. **Estados intermediários**: confirmação de identidade → feedback de envio → acompanhamento → resposta final.
4. **Erros e exceções explícitos**: solicitação indeferida, prazo excedido, pedido de informações adicionais, falha de verificação de identidade.
5. **Texto final real** em todas as telas. **Proibido lorem ipsum ou placeholder.** A linguagem faz parte da conformidade (art. 6º, VI; art. 9º).
6. **Alta fidelidade**: um print deve ser indistinguível do site publicado. Nada de wireframe em tons de cinza.
7. **Sem pontas soltas**: todo botão e link visível leva a algum lugar. Links fora do escopo abrem um toast discreto ("Esta área não faz parte do protótipo").

Critério central da nota: **coerência entre diagnóstico e solução**. Um design bonito que não responde a um achado não vale nada. Toda decisão de UI precisa estar ligada a um achado (§6).

---

## 2. Stack

- **Vite + React 19 + TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (componentes copiados em `src/components/ui`, re-estilizados com os tokens do ML)
- **React Router v7** (modo SPA/data router)
- **Supabase** (Postgres + Realtime): apenas para o sistema de comentários
- **Zustand** (persistido em `localStorage`): estado mock das solicitações do titular (protocolos, status)
- **lucide-react**: ícones com `strokeWidth={1.5}` para imitar o traço fino dos ícones do ML
- **Deploy:** Vercel (`vercel.json` com rewrite de SPA para `/index.html`)

**Ponto de partida:** o repo já tem o scaffold padrão do `create-vite` (React 19, Vite 8, TypeScript 6, ESLint 10), ainda sem Tailwind/shadcn/router. Remova o conteúdo de exemplo (`App.css`, `src/assets`, contador do `App.tsx`) e adicione o resto em cima dele. Configure o alias `@/` → `src/` no `vite.config.ts` e no `tsconfig.app.json` (o shadcn exige isso).

Comandos: `npm run dev`, `npm run build` (já roda `tsc -b`), `npm run lint`. Adicione `"typecheck": "tsc -b --noEmit"` ao `package.json`.

Variáveis de ambiente (`.env.local`, nunca commitar):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```
Sem as variáveis, o app precisa rodar mesmo assim: o sistema de comentários cai em modo `localStorage` e mostra um aviso na toolbar.

---

## 3. Identidade visual — Mercado Livre 1:1

Objetivo: fidelidade visual ao site atual (design system "Andes" do ML). Use as capturas do diagnóstico como referência (páginas: home com dropdown do usuário, "Minha conta", "Gerencie a privacidade da sua conta", permissões, cookies, fluxo de cancelamento).

### Tokens (definir como CSS variables em `src/index.css` e mapear no tema do shadcn)

| Token | Valor | Uso |
|---|---|---|
| `--ml-yellow` | `#FFE600` | Header / navbar |
| `--ml-blue` | `#3483FA` | Botão primário, links, toggles ativos |
| `--ml-blue-hover` | `#2968C8` | Hover do primário |
| `--ml-blue-light` | `rgba(65,137,230,.15)` | Fundo do botão secundário ("Sair", "Voltar") |
| `--ml-bg` | `#EDEDED` | Fundo das páginas internas (medido) |
| `--ml-surface` | `#FFFFFF` | Cards |
| `--ml-text` | `rgba(0,0,0,.9)` | Texto principal |
| `--ml-text-secondary` | `rgba(0,0,0,.55)` | Descrições de card |
| `--ml-border` | `rgba(0,0,0,.1)` | Divisórias |
| `--ml-green` | `#00A650` | Sucesso, check de confirmação |
| `--ml-orange` | `#FF7733` | Alertas / pendências (badge "!" laranja) |
| `--ml-red` | `#F23D4F` | Erro, indeferido |
| `--ml-pink-meli` | `#E4007C` aprox. | Pílula "meli+" (só no header) |

- **Medidas extraídas do site (25/09/2026):** header `#FFE600` com 100px de altura; busca com 40px, raio 2px e sombra `0 1px 2px rgba(0,0,0,.2)`; texto do header 13px; cards `andes-card` com raio 6px e sombra `0 1px 2px rgba(0,0,0,.12)`; título de card 16px/400 `rgba(0,0,0,.9)`; descrição 14px `rgba(0,0,0,.55)`; breadcrumb com link 16px azul `#3483FA`; item da sidebar 14px `#333` com padding `8px 24px`; botão pequeno ("Validar") 32px 14px/600; botões do banner de cookies 33px, 13px/600, raio 5px, fundo `rgba(65,137,230,.15)` e texto `#3483FA`. As classes do ML seguem o design system **Andes** (`andes-card`, `andes-typography`, `andes-button`); use os mesmos nomes como referência mental.
- **Tipografia:** o ML usa Proxima Nova (licenciada). Use `"Proxima Nova", "Montserrat", -apple-system, Roboto, sans-serif` e carregue Montserrat pelo Google Fonts como fallback visual. Pesos 400/600. Títulos de página 24px/600, título de card 16px/400, descrição 14px secundária.
- **Cards:** raio 6px, sombra `0 1px 2px rgba(0,0,0,.12)`, lista com divisórias internas e chevron `>` azul à direita (como em "Gerencie a privacidade da sua conta").
- **Botões:** altura 48px (grande) / 32px (pequeno), raio 6px, 14–16px/600. Primário azul sólido; secundário azul-claro com texto azul; link azul sem fundo.
- **Toggles:** azul com check branco dentro do thumb (estilo ML, não o switch padrão do shadcn; customizar `Switch`).
- **Layout "Minha conta":** sidebar esquerda fixa (~240px, fundo branco, itens com ícone + label, badge "NOVO" azul) + conteúdo centralizado com largura máx. ~ 800px e breadcrumb azul ("Meu perfil > Privacidade").
- **Header:** amarelo, com logo, busca, CEP, links de categoria, menu do usuário com dropdown (Compras, Histórico, Perguntas, Opiniões, ... "Minha conta").
- **Logo e marcas:** **não desenhar nem recriar o logo do ML em SVG/código.** O grupo coloca o arquivo em `public/brand/logo-ml.svg` (e `logo-ml-mobile.svg`). Enquanto o arquivo não existir, renderizar um bloco neutro com o texto "Logo" do mesmo tamanho.
- **Responsivo:** desktop e mobile (390px). No mobile a sidebar vira menu hambúrguer, como no site.
- Acessibilidade (faz parte da defesa: LBI 13.146/15 e item de acessibilidade do checklist): contraste AA, foco visível, navegação completa por teclado, `aria-live` nos feedbacks de envio, labels em todos os campos.

### Aviso acadêmico
Por ser um link público com telas de login e verificação de identidade, mantenha **sempre visível** um selo discreto no canto inferior ("Protótipo acadêmico — CESAR School · não é o site oficial"). Esse selo pode ficar integrado à toolbar de comentários. **Nenhum campo envia dados reais**: senha, CPF, documento e selfie são simulados (upload aceita qualquer arquivo e não o envia a lugar nenhum; campos de senha aceitam qualquer valor).

---

## 3.1 Mapa de navegação real do Mercado Livre (levantado em 25/09/2026)

**Regra:** o protótipo precisa reproduzir **todos os caminhos** que o titular pode usar para chegar ao canal, e não só a Central. O avaliador deve conseguir sair da home e chegar a cada tela corrigida por qualquer um desses caminhos. Links fora do escopo de privacidade (Compras, Ofertas, produtos etc.) ficam visíveis e clicáveis, mas só mostram um toast.

### Caminho A · pelo menu do usuário (principal, item 1 Conforme)
1. **Home** `/` → header amarelo. Linha 1: logo · busca "Buscar produtos, marcas e muito mais…" · pílula meli+ ("Por apenas R$ 74,90/mês"). Linha 2: "Enviar para [cidade CEP]" · Categorias ⌄ · Ofertas · Cupons · Supermercado · Moda · Mercado Play (selo verde "GRÁTIS") · Vender · Contato · [avatar] Nome ⌄ · Compras · Favoritos ⌄ · sino · carrinho.
2. **Hover no nome → dropdown**, nesta ordem: bloco do usuário (avatar, nome, e-mail, botão de recolher ^) · "Adicionar conta" · pílula rosa "meli+ Assine com até 65% OFF >" · divisória · Compras · Histórico · Perguntas · Opiniões · divisória · Empréstimos · Assinaturas · Mercado Play [GRÁTIS] · divisória · Vender · Ir para Central de vendedores [NOVO] · divisória · Sair.
   - ⚠️ **Não existe item "Minha conta" no dropdown.** Para chegar lá, o usuário clica no **nome/e-mail no topo do dropdown** (ou no próprio nome no header). Reproduza exatamente assim; isso reforça o item 1 (2 cliques).
3. **Meu perfil** `/minha-conta` (no ML: `/accounts/profile`). Sidebar "≡ Minha conta": Central de vendedores [NOVO] · — · Compras · Perguntas · Opiniões · Favoritos · Lojas que sigo · Explorando veículos · Explorando imóveis · Buscas salvas · Empréstimos · Assinaturas · Faturamento · Meu perfil · Minhas marcas. Conteúdo: avatar grande, nome, e-mail; alerta com borda laranja "Valide seu e-mail e mantenha sua conta segura" [Validar] [×]; grid 3 colunas de cards: Informações do seu perfil (Dados pessoais e da conta. · !) · Segurança (Você tem configurações pendentes. · !) · Colaboradores (Pessoas que operam com a sua conta.) · Meli+ (Assinatura com benefícios em frete, compras e entretenimento.) · Cartões (Cartões salvos na sua conta.) · Endereços (Endereços salvos na sua conta.) · **Privacidade (Preferências e controle do uso dos seus dados.)** · Comunicações (Escolha que tipo de informação você quer receber.).
4. **Central de privacidade da conta** `/minha-conta/privacidade` (no ML: `/privacy-preferences`). Breadcrumb "Meu perfil > Privacidade", título "Gerencie a privacidade da sua conta", card com 4 linhas (ícone em círculo · título · descrição · chevron azul): Administrar permissões → `/privacy-permissions` · Conhecer relatório de dados → `/export` · Configurar cookies → `/cookies` · Cancelar conta → `/cancelar-conta`. Abaixo: "Saiba mais sobre [como cuidamos da sua privacidade]." → Centro de privacidade público.

### Caminho B · pelo rodapé
Rodapé de todas as páginas: Trabalhe conosco · Termos e condições · Promoções · **Como cuidamos da sua privacidade** · Acessibilidade · Contato · Informações sobre seguros · Programa de Afiliados · "Copyright © 1999-2026. Mercado Livre Brasil Ltda." · CNPJ e endereço.
→ **Centro de privacidade público** `/privacidade`: "Centro de privacidade Mercado Livre", "Saiba como usamos e protegemos seus dados pessoais…", abas "Administre o uso dos seus dados" / "Conheça seus direitos", atalhos (Gerenciar seus dados pessoais · Configurar suas preferências · Saiba como processamos seus dados · Consultar perguntas e acessos frequentes) e as seções "Gerencie seus dados pessoais" ("Você pode acessar, consultar, atualizar e corrigir seus dados pessoais.") · "Configure suas preferências" · "Como usamos os cookies" · "Como processamos seus dados" · "O que são e para que usamos os dados biométricos" · FAQ ("Como excluo meus dados pessoais?", "Como posso exercer meus direitos se eu não tiver uma conta?"…). Botões relevantes: "Gerenciar privacidade" → Central da conta; "Solicitar o relatório" → relatório; "Configurar cookies" → cookies; "Gerenciar seus dados" → perfil.

### Caminho C · pelo banner de cookies
Banner fixo no rodapé da primeira visita: "Usamos cookies para melhorar sua experiência no Mercado Livre. Consulte mais informações na nossa [Central de privacidade]." [Aceitar cookies] [Configurar cookies] (dois botões secundários com o **mesmo peso visual**; manter). "Configurar cookies" → tela de cookies.

### Caminho D · pela Ajuda
"Contato"/Ajuda → **Meus direitos de privacidade** (`/ajuda/17960`): lista com Como altero ou corrijo os dados da minha conta? · Como posso excluir meus dados pessoais? · Como posso consultar e baixar meus dados pessoais? · O que são as decisões automatizadas…? · Como configuro as comunicações que recebo? · Quero saber com quem compartilham meus dados · Se eu não me cadastrei, o Mercado Livre salva meus dados pessoais? · O que são os cookies e como funcionam? · Quais são meus direitos de privacidade?
- O artigo **"Como posso excluir meus dados pessoais?"** (`/ajuda/17219`) hoje diz que remover dados pessoais **exclui a conta de todos os sites**. As exclusões parciais (opiniões, perguntas, favoritos) ficam **espalhadas em outras seções**, e o fim do texto aponta para "inicie uma solicitação de exclusão". **Essa é a evidência mais forte do F07.** No protótipo, esse artigo é reescrito para apontar para "Excluir dados específicos".

### Telas de cada ação (estado atual)
- **Permissões** (`/privacy-permissions`): breadcrumb "Meu perfil > Privacidade > Configurar permissões de privacidade"; título "Gerenciar permissões de privacidade"; aviso azul (i) "Essas alterações podem levar até 5 dias para serem efetuadas. [Saiba mais em nossa Declaração de privacidade.]"; cards: Dados de localização essenciais para sua segurança (sem toggle, texto "Mantemos essa permissão ativa porque usamos alguns dados da sua localização para proteger sua conta e evitar casos de fraude.") · Permissão de localização (sem toggle, "Mantenha a permissão de localização ativa nas configurações do seu dispositivo para acessar produtos, serviços, descontos e benefícios disponíveis na sua região.") · Informações sobre suas últimas compras, buscas e favoritos [toggle] ("Mantenha a permissão ativa para saber recomendações úteis sobre outros produtos ao usar sua conta.") · Publicidade e conteúdo personalizado [toggle] ("Usamos sua atividade para mostrar anúncios e conteúdos que interessem a você, tanto no Mercado Pago, Mercado Livre e outros sites."). Os toggles salvam na hora, sem botão de salvar.
- **Cookies** (`/cookies`): breadcrumb "… > Configurar cookies"; aviso azul "Os cookies são uma tecnologia que nos permite conhecer como você usa o nosso site. Com essas informações, facilitamos o uso da sua conta e te mostramos publicidade relacionada aos seus interesses. [Saiba mais sobre cookies no Mercado Livre.]"; cards: Cookies essenciais (sem toggle, "São usados para reconhecer você quando acessar, salvar suas preferências de configuração e proteger sua conta. Não podem ser desativados porque são necessários para o funcionamento do nosso site.") · Cookies analíticos [toggle] ("Permitem analisar sua navegação no site para podermos melhorar nossos serviços.") · Cookies de publicidade personalizada [toggle] ("Eles nos permitem entender suas preferências para mostrar produtos e anúncios patrocinados interessantes para você.") · Cookies de desempenho [toggle] ("Eles nos permitem otimizar algumas funções do nosso site.") · Cookies funcionais [toggle] ("Eles nos permitem manter o bom funcionamento do nosso site.").
- **Relatório de dados** (`/export` → redireciona para `/onboarding`): card branco centralizado **sem breadcrumb e sem botão Voltar**, ilustração de documento, "Precisamos validar sua identidade para que você possa pedir o relatório", "Pediremos alguns dados para nos certificarmos de que é você. Pegue sua CNH ou RG e procure um lugar tranquilo e bem iluminado.", "Leva só alguns minutos!", [Começar] → sai para `liveness.mercadolivre.com.br` com header mínimo (só o logo): "Escaneie o código QR com seu celular e tire uma selfie para confirmar sua identidade", QR, aviso "Por segurança, nunca compartilhe este código QR. Ninguém do Mercado Livre ou Mercado Pago pedirá para você enviá-lo.", "Não tem seu celular por perto? Use seu computador para [tirar a selfie]." **Não há cancelar/voltar nem explicação de finalidade ou retenção da biometria** (evidência para F08). A escolha de quais dados pedir só aparece **depois** da biometria.
- **Cancelar conta** (`/cancelar-conta`) → sai para `mercadolivre.com/…/phone-validation`: layout com **faixa amarela no topo (~1/3 da altura) e card branco centralizado** sobre fundo `#EDEDED`, header só com o logo. "Valide que esta é a sua conta" / "Escolha como quer receber o código de validação." / linhas: SMS · WhatsApp · Ligação telefônica ("No celular terminado em ####") / link "Verificar de outra forma". Depois (PDF): "Explique o motivo do cancelamento" (select "Selecione um motivo" + "Conte-nos um pouco mais (opcional)") [Continuar] → "O que acontece se você cancelar sua conta?" (3 itens com ícone) [Continuar] → "Você solicitou o cancelamento / Enviaremos para você um e-mail com a confirmação." [Sair].

### Observações extras do levantamento (fora do checklist; vão para o memorial)
- Na Declaração de privacidade, o link "Consultar canais" leva a uma seção errada ("Alterações na Declaração de Privacidade"). Os canais de contato e o encarregado ficam no "anexo do seu país", a 3 ou mais cliques de distância.
- Conteúdo em **espanhol** misturado no site em português: "Si me registro en Mercado Libre, ¿También tendré una cuenta en Mercado Pago?", "Ir arriba", botão "Cerrar descripción de" na tela de cookies (mais evidência para o F09).
- Os toggles de permissões/cookies **não têm nome acessível** (só ids aleatórios), mais evidência para o F09.

---

## 4. Arquitetura de telas e rotas

Regra: **todo estado relevante tem URL própria.** Isso deixa o protótipo navegável, permite linkar telas específicas no quadro "antes e depois" e faz os comentários se ancorarem à tela certa.

```
/                                   Home ML (hero, carrosséis mock) + dropdown do usuário + banner de cookies (Caminho C)
/privacidade                        Centro de privacidade público (Caminho B), fiel ao atual
/ajuda/meus-direitos-de-privacidade Lista da Ajuda (Caminho D)
/ajuda/como-excluir-meus-dados      Artigo reescrito apontando para "Excluir dados específicos" (F07)
/minha-conta                        Meu perfil: grid de cards (Caminho A, passo 3)
/minha-conta/perfil                 Informações do seu perfil (destino de "Corrigir seus dados"; fiel, item 5 Conforme)
/minha-conta/privacidade            CENTRAL DE PRIVACIDADE (hub reorganizado — F07, F06)
/minha-conta/privacidade/permissoes  Permissões (fiel ao atual + status "em processamento" por toggle — F06)
/minha-conta/privacidade/cookies     Cookies (fiel ao atual)

# Direito 1 — Acesso/portabilidade (art. 18, II e V) — "Conhecer relatório de dados"
/minha-conta/privacidade/relatorio                   1. Escolher quais dados (ANTES da verificação — F08)
/minha-conta/privacidade/relatorio/verificar         2. Verificação proporcional (código; reforçada só se necessário — F08)
/minha-conta/privacidade/relatorio/verificar/reforcada   2b. Documento + selfie, com justificativa e finalidade (F08)
/minha-conta/privacidade/relatorio/enviado           3. Comprovante com protocolo (F06)

# Direito 2 — Eliminação (art. 18, VI) — granular, sem cancelar a conta (F07)
/minha-conta/privacidade/excluir-dados               1. Escolher categorias de dados a excluir
/minha-conta/privacidade/excluir-dados/revisar       2. Impacto por categoria + o que fica retido por lei (art. 16)
/minha-conta/privacidade/excluir-dados/verificar     3. Verificação por código (F08)
/minha-conta/privacidade/excluir-dados/enviado       4. Comprovante com protocolo (F06)

# Cancelar conta (eliminação total) — fluxo atual PRESERVADO (itens 3, 4 e 10 Conforme);
# só a tela final muda (protocolo — F06)
/minha-conta/privacidade/cancelar-conta              identidade (SMS/WhatsApp/ligação) → motivo → "O que acontece…" → enviado

/minha-conta/privacidade/solicitacoes            "Minhas solicitações" (F06)
/minha-conta/privacidade/solicitacoes/:protocolo Detalhe: linha do tempo + estado atual (F06)
/email/:protocolo                                Mock do e-mail de confirmação, mesmo protocolo (F06)
/sobre-o-prototipo                               Mapa achado → solução (§6) + créditos
```

Os passos de cada fluxo podem ser sub-rotas ou `?etapa=`; o importante é que cada estado tenha uma URL que dê para compartilhar.

### Estados da solicitação (máquina de estados em `src/features/requests/`)
`recebida → em_verificacao → em_analise → (informacoes_adicionais ↺) → concluida | indeferida | prazo_excedido`

- Cada estado tem tela/variante própria no detalhe, com texto final, próximo passo claro e prazo.
- **Seletor de cenários:** um painel "Cenários de demonstração" (atrás de um botão na toolbar do protótipo) força o estado de um protocolo para a demo ao vivo. Nunca aparece como parte da UI do "site".
- Mock de protocolos persistido no Zustand; botão "Reiniciar demonstração" limpa tudo.

### Referências legais para os textos (usar nos microtextos e no `/sobre-o-prototipo`)
- Art. 18, caput e incisos I–IX (direitos); §3º (requerimento expresso); §4º (resposta motivada quando não for possível atender de imediato → base da tela **indeferida**); §5º (**sem custos** ao titular).
- Art. 19: confirmação de existência/acesso de forma simplificada **imediata** ou declaração completa em **até 15 dias** → base do prazo exibido e da tela **prazo excedido**.
- Art. 16: hipóteses de conservação após a eliminação (obrigação legal/fiscal) → texto do que é retido após o cancelamento.
- Art. 6º (princípios: III necessidade, IV livre acesso, V qualidade, VI transparência); art. 8º §5º e art. 9º (consentimento e informação clara); art. 41 (**encarregado/DPO**: exibir contato na Central).

---

## 5. Sistema de comentários (estilo Figma)

Qualquer pessoa com o link pode comentar em **qualquer ponto** de qualquer tela.

### UX
- Toolbar flutuante (canto inferior direito, fora da estética ML, para ficar claro que não faz parte do site): botão **Comentar** (atalho `C`), contador de threads na tela, alternar "mostrar/ocultar pins", "mostrar resolvidos", **Cenários**, selo acadêmico.
- **Modo comentário:** cursor vira crosshair, cliques na página são interceptados (não navegam) e o elemento sob o cursor ganha um outline sutil. O clique cria um **pin numerado** e abre o popover de nova thread.
- **Pin:** círculo com as iniciais/número; clique abre a thread (Popover do shadcn) com mensagens, campo de resposta, **Resolver/Reabrir** e excluir (só o autor).
- **Identidade do comentarista:** no primeiro comentário, pedir o nome (e um papel opcional: Grupo · Professor · Jurídico · Técnico · Executivo), salvo em `localStorage`. Sem login.
- Painel lateral (Sheet) "Comentários desta tela" com a lista e filtro aberto/resolvido; clicar rola até o pin.
- Tempo real: novas threads e respostas aparecem para todos sem recarregar (Supabase Realtime).

### Ancoragem (o ponto crítico)
Os pins precisam continuar no lugar em outra largura de tela.
1. Componentes relevantes recebem `data-cid="<id-estável>"` (ex.: `privacy-center.card.eliminacao`). Criar um helper `cid()` e aplicar em todos os blocos das telas.
2. Ao clicar, sobe no DOM até o `[data-cid]` mais próximo e salva `anchor_cid` + posição **relativa** dentro dele (`offset_x`, `offset_y` em 0–1).
3. Fallback sem `data-cid`: salvar `x`/`y` em % do documento + `viewport_w`.
4. Na renderização, os pins são posicionados via `getBoundingClientRect` do anchor, recalculando em `resize`/`scroll` (ResizeObserver). Se o anchor não existir mais (ex.: estado diferente), a thread aparece no painel lateral como "fora de contexto".
5. A chave da tela é `pathname` + `scenario` ativo, para que comentários sobre "indeferida" não apareçam em "concluída".

### Schema Supabase (`supabase/schema.sql`)
```sql
create table threads (
  id uuid primary key default gen_random_uuid(),
  screen_key text not null,          -- pathname + '?scenario=...'
  anchor_cid text,
  offset_x real, offset_y real,      -- relativo ao anchor (0–1)
  page_x real, page_y real,          -- fallback em % do documento
  viewport_w int,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);
create table comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references threads(id) on delete cascade,
  author_name text not null,
  author_role text,
  author_token text not null,        -- uuid aleatório do localStorage, para permitir editar/excluir só o próprio
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index on threads (screen_key);
alter publication supabase_realtime add table threads, comments;
```
RLS: habilitar; `select` e `insert` liberados para `anon`; `update`/`delete` de `comments` restritos ao mesmo `author_token` (via header/claim ou RPC `security definer`); `update` de `threads.resolved` liberado. Documentar o setup no README.

### Organização do código
```
src/features/comments/
  CommentsProvider.tsx   # contexto: modo ativo, nome do usuário, threads da tela
  CommentLayer.tsx       # overlay que captura cliques e renderiza pins
  Pin.tsx, ThreadPopover.tsx, CommentsSheet.tsx, Toolbar.tsx
  anchor.ts              # captura e resolução de posição
  api.ts                 # Supabase + fallback localStorage (mesma interface)
```
O `CommentLayer` envolve o app inteiro no `App.tsx`, para que qualquer tela nova já seja comentável sem código extra.

---

## 6. Achados do diagnóstico → soluções (rastreabilidade)

Fonte: *Checklist IHC & LGPD — Mercado Livre* (versão completa, coleta de 25/09/2026). Placar: **6 Conforme · 4 Parcialmente Conforme · 0 Não Conforme.**

### Regra de escopo (decisão do grupo)
**Só os itens que NÃO estão "Conforme" são redesenhados: 6, 7, 8 e 9.** Tudo o que for Conforme (1, 2, 3, 4, 5, 10) é reproduzido **fiel ao site atual**, apenas para o fluxo ficar navegável do começo ao fim. Não "melhore" telas Conformes por conta própria: se não está em F06–F09, fica igual ao ML.

Fonte única da verdade: `src/content/findings.ts`:
```ts
{ id: 'F06', item: 6, titulo, eixo, heuristica, artigos: string[], avaliacao: 'Parcialmente Conforme',
  problema, solucao, telas: string[] /* rotas */, cids: string[] }
```
- Todo elemento que implementa uma correção recebe `data-finding="F0X"`.
- O toggle **"Mostrar anotações do redesenho"** (na toolbar do protótipo) destaca esses elementos com uma etiqueta do achado. É isso que sustenta a demo e o quadro "antes e depois".
- `/sobre-o-prototipo` mostra a tabela achado → solução → heurística → artigo, com links para as telas, e lista os itens Conformes como "preservados".

### Itens preservados (Conforme): não alterar
| # | Critério | O que manter igual ao ML |
|---|---|---|
| 1 | Descoberta | Caminho em 2 cliques: dropdown do usuário → Minha conta → card "Privacidade". |
| 2 | Linguagem | Tom simples dos rótulos ("Administrar permissões", "Conhecer relatório de dados", "Configurar cookies", "Cancelar conta"). Todo texto novo segue esse padrão, sem juridiquês. |
| 3 | Sem fricção artificial | Fluxo de cancelamento: identidade (SMS/WhatsApp/ligação) → motivo → consequências → confirmado. |
| 4 | Sem confirmshaming | Tela "O que acontece se você cancelar sua conta?" com os 3 itens atuais e sem manipulação. |
| 5 | Prevenção de erros | Validação inline no blur ("Preencha esse dado.") sem perder o que já foi preenchido. **Use o mesmo padrão em todo formulário novo.** |
| 10 | Reversibilidade | Aviso prévio + confirmação por e-mail no cancelamento. (A ressalva sobre a falta de um prazo de carência explícito **não** é implementada, porque o item é Conforme; ela fica registrada no memorial como não endereçada.) |

### Itens a corrigir

#### F06 · Feedback e visibilidade do status (item 6)
- **Heurística:** Nielsen #1 (Visibilidade do status do sistema). **LGPD:** art. 18; art. 19 (II: declaração completa em até 15 dias); art. 18 §4º.
- **Problema:** há feedback imediato ("Você solicitou o cancelamento. Enviaremos para você um e-mail…") e prazos soltos (até 5 dias para permissões, até 2 dias para o relatório), mas **não há número de protocolo nem painel de acompanhamento do pedido**.
- **Solução:**
  1. Toda solicitação (relatório, exclusão de dados, cancelamento) termina num **comprovante** com: protocolo `LGPD-2026-XXXXXX` (com botão de copiar), data e hora, direito exercido e artigo, **prazo estimado com data concreta** ("até 27/09/2026"), prazo legal máximo, canal de acompanhamento e botão "Acompanhar solicitação". O comprovante também diz "Enviamos este comprovante para m*****@gmail.com".
  2. Nova entrada **"Minhas solicitações"** na Central, com a lista de pedidos, badge de status e prazo.
  3. **Detalhe da solicitação** com uma linha do tempo (Recebida → Identidade confirmada → Em análise → Concluída) e o próximo passo sempre explícito.
  4. Estados de exceção com texto final:
     - **Informações adicionais necessárias:** o que falta, por quê e até quando; o prazo fica pausado.
     - **Indeferida:** motivo concreto (art. 18 §4º), o que o titular pode fazer, contato do **encarregado (DPO)** (art. 41) e menção ao direito de peticionar à **ANPD** (art. 18 §1º).
     - **Prazo excedido:** reconhecimento do atraso, nova previsão, opção de escalar ao encarregado e link da ANPD.
     - **Concluída:** relatório pronto para download (formatos JSON/CSV/PDF, disponível por 7 dias) ou confirmação da exclusão com o que foi retido por lei.
  5. **Mock do e-mail** (`/email/:protocolo`) com o mesmo protocolo e link para o acompanhamento.
  6. **Permissões:** o aviso genérico "Essas alterações podem levar até 5 dias" vira status **por toggle** ("Em processamento · efetiva até 30/09"), para o titular ver que a mudança foi registrada.

#### F07 · Granularidade e controle (item 7)
- **Heurística:** Nielsen #3 (Controle e liberdade do usuário). **LGPD:** art. 8º §5º; art. 18, VI e §2º; art. 16.
- **Problema:** há controle granular para permissões, cookies, retificação e portabilidade, mas **a eliminação de dados só existe via "Cancelar conta"**, ou seja, tudo ou nada.
- **Solução:**
  1. Novo item na Central: **"Excluir dados específicos"** ("Apague só o que você escolher, sem cancelar sua conta"), separado de "Cancelar conta".
  2. Tela de seleção por categoria (checkbox **nenhum pré-marcado**), cada uma com o que é e o impacto de excluir. Categorias: histórico de buscas; histórico de navegação e produtos vistos; favoritos; perguntas feitas a vendedores; endereços salvos (exceto o de entregas em andamento); dados de localização usados para recomendações; histórico de interações com publicidade.
  3. Revisão: o que será apagado, o impacto (ex.: "suas recomendações vão recomeçar do zero") e **o que fica retido por obrigação legal** (art. 16: notas fiscais e registros de transações pelo prazo legal, dados de prevenção a fraude), em linguagem simples.
  4. O artigo da Ajuda "Como posso excluir meus dados pessoais?" e a FAQ do Centro de privacidade público passam a explicar as duas opções (dados específicos × cancelar conta), com link direto para cada uma. Hoje as exclusões parciais (opiniões, perguntas, favoritos) estão espalhadas pelo site; o redesenho as **reúne** no fluxo único (incluir "Opiniões publicadas" nas categorias).
  5. "Cancelar conta" continua existindo como opção de eliminação total, com o fluxo atual preservado. No topo, um link discreto: "Quer apagar só alguns dados? Excluir dados específicos".
  6. A Central é reorganizada em grupos claros (mesmos cards e ícones do ML): **Seus dados** (Conhecer relatório de dados · Corrigir seus dados → leva ao perfil · Excluir dados específicos) · **Preferências** (Administrar permissões · Configurar cookies) · **Solicitações** (Minhas solicitações) · **Conta** (Cancelar conta). No rodapé: contato do encarregado e "Como cuidamos da sua privacidade".

#### F08 · Carga cognitiva e verificação de identidade (item 8)
- **Heurística:** Nielsen #6 (Reconhecimento em vez de memorização) + minimização. **LGPD:** art. 6º, III (necessidade); art. 18; art. 11 (dado biométrico é dado sensível).
- **Problema:** o relatório de dados exige **CNH/RG + selfie com liveness via QR já no primeiro passo**, antes de qualquer seleção e mesmo com o usuário autenticado. Já o cancelamento aceita só um código por SMS/WhatsApp/ligação. A assimetria indica coleta excessiva.
- **Solução:**
  1. **Inverter a ordem:** primeiro o titular escolhe os dados do relatório, depois verifica a identidade.
  2. **Verificação proporcional ao risco:** o padrão para usuário autenticado é um **código de 6 dígitos** pelo mesmo canal do cancelamento (SMS · WhatsApp · e-mail), com reenvio após 60s, validação inline e mensagem de erro clara.
  3. **Verificação reforçada (documento + selfie) só quando necessária**, por exemplo login recente em dispositivo novo ou pedido que inclui dados financeiros do Mercado Pago. Nesse caso, a tela explica **por que** está pedindo, **para que** serve a biometria, **por quanto tempo** fica guardada e que ela não será usada para outra finalidade. Oferece também alternativa sem biometria (atendimento com documento).
  4. As telas de verificação ficam **dentro do layout do site** (header, breadcrumb, botão "Voltar" e "Cancelar solicitação"), sem sair para outro domínio sem aviso, e sempre com o "Por que pedimos isso?" expansível.
  5. Antes de começar, uma tela "Do que você vai precisar", com tempo estimado, para o titular não ser pego de surpresa.
  6. Exceções: código expirado, código incorreto (3 tentativas), verificação reforçada que falhou (com caminho alternativo), sessão expirada **sem perder a seleção feita** (liga ao padrão do item 5).
  7. Cenário de demo para alternar "verificação padrão" e "verificação reforçada exigida".

#### F09 · Acessibilidade e responsividade (item 9)
- **Heurística:** IHC geral / Universalidade. **LGPD:** art. 18; **LBI (Lei 13.146/15)**.
- **Problema:** responsivo e com foco visível, mas **7 de 150 controles interativos sem nome acessível** (ícones) e **1 imagem sem `alt`**; não houve auditoria de contraste nem de leitor de tela. No levantamento de navegação também apareceram toggles sem rótulo acessível e textos em espanhol no site em português (§3.1).
- **Solução (critérios de aceite do protótipo inteiro):**
  1. Todo botão ou link só de ícone tem `aria-label` descritivo; ícones decorativos com `aria-hidden`. Toda imagem tem `alt`, vazio quando é decorativa.
  2. Contraste **WCAG 2.2 AA** em todos os tokens. Atenção: o texto secundário `rgba(0,0,0,.55)` sobre `#EBEBEB` e o azul `#3483FA` sobre branco em texto pequeno precisam ser checados; se não passarem, escureça **só onde for necessário** e registre isso em `findings.ts`.
  3. Navegação completa por teclado, `skip link` ("Pular para o conteúdo"), foco visível no estilo ML (contorno azul), ordem de foco lógica, foco movido para o título a cada troca de etapa.
  4. `aria-live="polite"` para comprovantes e mudanças de status; erros ligados ao campo com `aria-describedby` e `aria-invalid`.
  5. `lang="pt-BR"`, zoom permitido até 500%, alvos de toque ≥ 44px no mobile, respeitar `prefers-reduced-motion`.
  6. Stepper dos fluxos com "Etapa 2 de 4" lido pelo leitor de tela.
  7. Todo toggle com `aria-label` igual ao título do card e estado anunciado ("ativado/desativado"); todo texto em pt-BR (nada em espanhol).
  8. Auditoria automatizada: `@axe-core/react` em modo dev (loga violações no console) + checagem manual com NVDA ou VoiceOver nos dois fluxos. O resultado vai para `/sobre-o-prototipo` como evidência do "depois".

### Mapa rápido achado → telas
| Achado | Telas principais |
|---|---|
| F06 | todos os `/enviado`, `/solicitacoes`, `/solicitacoes/:protocolo`, `/email/:protocolo`, `/permissoes` |
| F07 | `/minha-conta/privacidade` (hub), `/excluir-dados/*`, link em `/cancelar-conta` |
| F08 | `/relatorio`, `/relatorio/verificar`, `/relatorio/verificar/reforcada`, `/excluir-dados/verificar` |
| F09 | transversal (shell, componentes base, todos os formulários) |

---

## 7. Regras de trabalho para o Claude Code

- Português do Brasil em toda a UI, com o tom do ML (tratamento "você", frases curtas, verbos no imperativo nos botões: "Continuar", "Enviar solicitação", "Acompanhar solicitação").
- **Nunca** use lorem ipsum, "Texto aqui", "TODO" visível ou dado genérico. Dados mock plausíveis e **inventados** (não usar nomes das contas usadas na análise): nome "Marina Costa", e-mail `m*****@gmail.com`, celular terminado em 4821, protocolo `LGPD-2026-000123`.
- Ao criar um componente de tela: `data-cid` nos blocos, `data-finding` onde aplicável, rota própria para cada estado, texto final.
- Não usar componentes do shadcn "crus": sempre adaptar ao visual ML (§3).
- Sem dark patterns no redesenho: botões de confirmação e desistência com peso equivalente, sem checkbox pré-marcado para consentimento, sem confirmshaming, prazos sempre explícitos.
- Antes de concluir uma tarefa: `npm run typecheck && npm run lint && npm run build`, conferir a tela em 1280px e 390px e navegar só pelo teclado.
- Commits pequenos, por tela ou feature.

### Ordem sugerida de implementação
1. Scaffold (Vite, Tailwind v4, shadcn, router, tokens ML, fontes) + `vercel.json`.
2. Shell: header amarelo com dropdown do usuário, layout "Minha conta" com sidebar, footer. Responsivo.
3. Home mock (com dropdown e banner de cookies) + `/minha-conta` + Central de Privacidade + Centro de privacidade público + páginas da Ajuda: **todos os caminhos A–D do §3.1 navegáveis**.
4. Sistema de comentários completo (Supabase + fallback) + toolbar + selo acadêmico.
5. Telas Conformes fiéis ao ML: permissões, cookies e fluxo de cancelamento (itens 1–5 e 10).
6. `findings.ts` + máquina de estados das solicitações + F06 (comprovante, Minhas solicitações, detalhe, e-mail, exceções) + seletor de cenários.
7. F07: hub reorganizado + fluxo "Excluir dados específicos".
8. F08: relatório com seleção antes da verificação + verificação proporcional/reforçada.
9. F09: passada de acessibilidade em tudo + axe + overlay de anotações + `/sobre-o-prototipo`.
10. Deploy na Vercel com as variáveis de ambiente.
