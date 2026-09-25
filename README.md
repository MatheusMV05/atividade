# Central de Privacidade · Mercado Livre (protótipo acadêmico)

Protótipo navegável de alta fidelidade — trabalho de IHC + Direito (CESAR School). Redesenha o canal de
exercício de direitos do titular (LGPD, art. 18) no Mercado Livre a partir de um diagnóstico próprio.
**Não é o site oficial do Mercado Livre.**

Todo o contexto do projeto (escopo, achados do diagnóstico, arquitetura de telas, regras de UI) está em
[`CLAUDE.md`](./CLAUDE.md).

## Rodando localmente

```bash
npm install
npm run dev
```

Sem as variáveis de ambiente do Supabase, o app roda normalmente: o sistema de comentários cai
automaticamente em modo `localStorage` (funciona no seu navegador, mas não sincroniza entre pessoas
diferentes) e a toolbar mostra um aviso disso.

## Scripts

```bash
npm run dev        # servidor de desenvolvimento
npm run build       # typecheck (tsc -b) + build de produção
npm run typecheck    # só o typecheck
npm run lint        # ESLint
npm run preview      # serve o build de produção localmente
```

## Configurando o Supabase (comentários em tempo real)

O sistema de comentários (estilo Figma, pins ancorados na tela) funciona com dois backends
intercambiáveis, atrás da mesma interface (`src/features/comments/api.ts`):

- **Sem configurar nada:** localStorage — os comentários ficam só no seu navegador.
- **Com as variáveis abaixo:** Supabase — comentários em tempo real, compartilhados entre todo mundo que
  abrir o link.

Passo a passo:

1. Crie uma conta e um projeto em [supabase.com](https://supabase.com) (plano gratuito é suficiente).
2. No painel do projeto, abra **SQL Editor** → **New query**, cole o conteúdo de
   [`supabase/schema.sql`](./supabase/schema.sql) e rode. Isso cria as tabelas `threads` e `comments`,
   os índices, habilita Realtime e configura as políticas de RLS.
3. Em **Project Settings → API Keys**, copie a **Project URL** e a **publishable key** (instalação por
   framework — é a chave pública nova do Supabase, substitui a antiga `anon key`).
4. Na raiz do repositório, crie um arquivo `.env.local` (nunca commitado — já está no `.gitignore` via
   `*.local`) com:
   ```
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sua-publishable-key
   ```
5. Reinicie `npm run dev`. A toolbar do protótipo deixa de mostrar o aviso de "modo local" quando a
   conexão está ativa.
6. No deploy (Vercel), adicione as mesmas duas variáveis em **Project Settings → Environment Variables**.

Nenhum dado pessoal real trafega por aqui — os comentários são só feedback sobre o protótipo (nome,
papel opcional e o texto do comentário, que quem comenta escolhe informar).

## Stack

Vite + React 19 + TypeScript · Tailwind CSS v4 + shadcn/ui (adaptado à identidade do Mercado Livre) ·
React Router v7 · Zustand (estado mock das solicitações) · Supabase (Postgres + Realtime, comentários) ·
lucide-react.

## Aviso acadêmico

Este é um protótipo de estudo. Nenhum campo envia dados reais: senha, CPF, documento e selfie são
simulados. O selo "Protótipo acadêmico — CESAR School · não é o site oficial" fica sempre visível na
toolbar do protótipo.
