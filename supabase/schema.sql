-- Protótipo LGPD · Central de Privacidade do Mercado Livre
-- Schema do sistema de comentários (estilo Figma) — CLAUDE.md §5
-- Rode este arquivo inteiro no SQL Editor do seu projeto Supabase.

create extension if not exists pgcrypto;

create table if not exists threads (
  id uuid primary key default gen_random_uuid(),
  screen_key text not null,          -- pathname + '?scenario=...'
  anchor_cid text,
  offset_x real,
  offset_y real,                     -- relativo ao anchor (0–1)
  page_x real,
  page_y real,                       -- fallback em % do documento
  viewport_w int,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references threads(id) on delete cascade,
  author_name text not null,
  author_role text,
  author_token text not null,        -- uuid aleatório do localStorage do autor
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists threads_screen_key_idx on threads (screen_key);
create index if not exists comments_thread_id_idx on comments (thread_id);

alter publication supabase_realtime add table threads, comments;

-- Row Level Security: qualquer pessoa com o link pode ler e comentar;
-- só o autor (pelo token gerado no navegador) pode editar/excluir o próprio comentário.
alter table threads enable row level security;
alter table comments enable row level security;

create policy "threads: leitura pública" on threads
  for select using (true);

create policy "threads: criação pública" on threads
  for insert with check (true);

create policy "threads: qualquer um resolve/reabre" on threads
  for update using (true) with check (true);

create policy "threads: qualquer um pode excluir (thread vazia, pelo app)" on threads
  for delete using (true);

create policy "comments: leitura pública" on comments
  for select using (true);

create policy "comments: criação pública" on comments
  for insert with check (true);

create policy "comments: exclusão pública (restrita no app)" on comments
  for delete using (true);
-- Nota: este protótipo não tem autenticação real (não há login Supabase), então
-- não existe um JWT com o author_token para o Postgres validar via RLS. A regra
-- "só o autor exclui o próprio comentário" é aplicada no cliente
-- (features/comments/api.ts, sempre filtrando .eq('author_token', identity.token)
-- antes de excluir) e a UI só mostra o botão de excluir para quem é dono do
-- comentário. Para um projeto real, troque esta policy por uma função RPC
-- "security definer" que recebe o token pelo corpo da requisição e valida antes
-- de excluir, ou adote autenticação Supabase de verdade.
