import { supabase, supabaseEnabled } from "@/lib/supabase"
import type { CommentItem, NewCommentInput, NewThreadInput, Thread } from "./types"

const THREADS_KEY = "lgpd-proto:threads"
const COMMENTS_KEY = "lgpd-proto:comments"

export const commentsMode: "supabase" | "local" = supabaseEnabled ? "supabase" : "local"

// ---------- fallback localStorage ----------

function readLocal<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

function writeLocal<T>(key: string, value: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    // dispara nas outras abas (o storage event não dispara na própria aba)
    window.dispatchEvent(new CustomEvent("lgpd-proto:local-change"))
  } catch {
    // localStorage indisponível — comentários ficam só em memória durante a sessão
  }
}

async function localListThreads(screenKey: string): Promise<Thread[]> {
  return readLocal<Thread>(THREADS_KEY).filter((t) => t.screen_key === screenKey)
}

async function localCreateThread(input: NewThreadInput): Promise<Thread> {
  const thread: Thread = {
    id: crypto.randomUUID(),
    resolved: false,
    created_at: new Date().toISOString(),
    ...input,
  }
  const all = readLocal<Thread>(THREADS_KEY)
  all.push(thread)
  writeLocal(THREADS_KEY, all)
  return thread
}

async function localSetResolved(threadId: string, resolved: boolean): Promise<void> {
  const all = readLocal<Thread>(THREADS_KEY)
  const next = all.map((t) => (t.id === threadId ? { ...t, resolved } : t))
  writeLocal(THREADS_KEY, next)
}

async function localDeleteThread(threadId: string): Promise<void> {
  writeLocal(
    THREADS_KEY,
    readLocal<Thread>(THREADS_KEY).filter((t) => t.id !== threadId)
  )
  writeLocal(
    COMMENTS_KEY,
    readLocal<CommentItem>(COMMENTS_KEY).filter((c) => c.thread_id !== threadId)
  )
}

async function localListComments(threadId: string): Promise<CommentItem[]> {
  return readLocal<CommentItem>(COMMENTS_KEY).filter((c) => c.thread_id === threadId)
}

async function localAddComment(input: NewCommentInput): Promise<CommentItem> {
  const comment: CommentItem = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...input,
  }
  const all = readLocal<CommentItem>(COMMENTS_KEY)
  all.push(comment)
  writeLocal(COMMENTS_KEY, all)
  return comment
}

async function localDeleteComment(commentId: string, authorToken: string): Promise<void> {
  const all = readLocal<CommentItem>(COMMENTS_KEY)
  const comment = all.find((c) => c.id === commentId)
  if (!comment || comment.author_token !== authorToken) return
  writeLocal(
    COMMENTS_KEY,
    all.filter((c) => c.id !== commentId)
  )
}

// ---------- Supabase ----------

async function supaListThreads(screenKey: string): Promise<Thread[]> {
  const { data, error } = await supabase!
    .from("threads")
    .select("*")
    .eq("screen_key", screenKey)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data as Thread[]
}

async function supaCreateThread(input: NewThreadInput): Promise<Thread> {
  const { data, error } = await supabase!.from("threads").insert(input).select().single()
  if (error) throw error
  return data as Thread
}

async function supaSetResolved(threadId: string, resolved: boolean): Promise<void> {
  const { error } = await supabase!.from("threads").update({ resolved }).eq("id", threadId)
  if (error) throw error
}

async function supaDeleteThread(threadId: string): Promise<void> {
  const { error } = await supabase!.from("threads").delete().eq("id", threadId)
  if (error) throw error
}

async function supaListComments(threadId: string): Promise<CommentItem[]> {
  const { data, error } = await supabase!
    .from("comments")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data as CommentItem[]
}

async function supaAddComment(input: NewCommentInput): Promise<CommentItem> {
  const { data, error } = await supabase!.from("comments").insert(input).select().single()
  if (error) throw error
  return data as CommentItem
}

async function supaDeleteComment(commentId: string, authorToken: string): Promise<void> {
  const { error } = await supabase!
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("author_token", authorToken)
  if (error) throw error
}

// ---------- interface pública (mesma para os dois modos) ----------

export const commentsApi = {
  listThreads: supabaseEnabled ? supaListThreads : localListThreads,
  createThread: supabaseEnabled ? supaCreateThread : localCreateThread,
  setResolved: supabaseEnabled ? supaSetResolved : localSetResolved,
  deleteThread: supabaseEnabled ? supaDeleteThread : localDeleteThread,
  listComments: supabaseEnabled ? supaListComments : localListComments,
  addComment: supabaseEnabled ? supaAddComment : localAddComment,
  deleteComment: supabaseEnabled ? supaDeleteComment : localDeleteComment,
}

/**
 * Assina mudanças (novas threads/comentários) para a tela atual.
 * Supabase: Realtime de verdade entre pessoas diferentes.
 * localStorage: sincroniza entre abas do mesmo navegador (evento customizado + storage event).
 */
export function subscribeToChanges(screenKey: string, onChange: () => void): () => void {
  if (supabaseEnabled && supabase) {
    const client = supabase
    const channel = client
      .channel(`screen:${screenKey}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "threads" }, onChange)
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, onChange)
      .subscribe()
    return () => {
      client.removeChannel(channel)
    }
  }

  const handler = () => onChange()
  window.addEventListener("lgpd-proto:local-change", handler)
  window.addEventListener("storage", handler)
  return () => {
    window.removeEventListener("lgpd-proto:local-change", handler)
    window.removeEventListener("storage", handler)
  }
}
