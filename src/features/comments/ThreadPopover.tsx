import * as React from "react"
import { Check, RotateCcw, Send, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { commentsApi, subscribeToChanges } from "./api"
import { useComments } from "./context"
import { AUTHOR_ROLES } from "./types"
import type { CommentItem, Thread } from "./types"

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("")
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
}

export function ThreadPopover({
  thread,
  number,
  children,
}: {
  thread: Thread
  number: number
  children: React.ReactNode
}) {
  const { activeThreadId, setActiveThreadId, identity, saveIdentity, screenKey, refresh } = useComments()
  const open = activeThreadId === thread.id

  const [comments, setComments] = React.useState<CommentItem[]>([])
  const [body, setBody] = React.useState("")
  const [nameDraft, setNameDraft] = React.useState("")
  const [roleDraft, setRoleDraft] = React.useState<string>(AUTHOR_ROLES[0])

  const load = React.useCallback(() => {
    commentsApi.listComments(thread.id).then(setComments).catch(() => setComments([]))
  }, [thread.id])

  React.useEffect(() => {
    if (!open) return
    load()
    const unsubscribe = subscribeToChanges(screenKey, load)
    return unsubscribe
  }, [open, load, screenKey])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return

    let author = identity
    if (!author) {
      if (!nameDraft.trim()) return
      author = saveIdentity(nameDraft.trim(), roleDraft)
    }

    await commentsApi.addComment({
      thread_id: thread.id,
      author_name: author.name,
      author_role: author.role,
      author_token: author.token,
      body: body.trim(),
    })
    setBody("")
    load()
  }

  async function toggleResolved() {
    await commentsApi.setResolved(thread.id, !thread.resolved)
    refresh()
  }

  async function handleDeleteThread() {
    await commentsApi.deleteThread(thread.id)
    setActiveThreadId(null)
    refresh()
  }

  async function handleDeleteComment(commentId: string) {
    if (!identity) return
    await commentsApi.deleteComment(commentId, identity.token)
    load()
  }

  return (
    <Popover open={open} onOpenChange={(v) => setActiveThreadId(v ? thread.id : null)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent data-comments-ui className="w-96 p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex items-center justify-between border-b border-ml-border p-3">
          <span className="text-[13px] font-semibold text-ml-text-secondary">
            Thread #{number} {thread.resolved && "· resolvida"}
          </span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label={thread.resolved ? "Reabrir thread" : "Resolver thread"}
              onClick={toggleResolved}
            >
              {thread.resolved ? <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden="true" /> : <Check className="size-4" strokeWidth={1.5} aria-hidden="true" />}
            </Button>
            {comments.length === 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-ml-red"
                aria-label="Excluir thread vazia"
                onClick={handleDeleteThread}
              >
                <Trash2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto p-3">
          {comments.length === 0 && (
            <p className="text-[13px] text-ml-text-secondary">Ainda sem comentários. Seja o primeiro a responder.</p>
          )}
          <ul className="flex flex-col gap-3">
            {comments.map((c) => (
              <li key={c.id} className="flex gap-2">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-ml-blue-light text-[11px] font-semibold text-ml-blue">
                  {initials(c.author_name)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[13px] font-semibold text-ml-text">
                      {c.author_name}
                      {c.author_role && <span className="ml-1 font-normal text-ml-text-secondary">· {c.author_role}</span>}
                    </p>
                    {identity?.token === c.author_token && (
                      <button
                        type="button"
                        className="text-ml-text-secondary hover:text-ml-red"
                        aria-label="Excluir comentário"
                        onClick={() => handleDeleteComment(c.id)}
                      >
                        <Trash2 className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap break-words text-[14px] text-ml-text">{c.body}</p>
                  <p className="text-[11px] text-ml-text-secondary">{formatTime(c.created_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-ml-border p-3">
          {!identity && (
            <div className="mb-2 flex flex-col gap-2 rounded-[6px] bg-ml-bg p-2">
              <div>
                <Label htmlFor={`name-${thread.id}`} className="sr-only">
                  Seu nome
                </Label>
                <Input
                  id={`name-${thread.id}`}
                  placeholder="Seu nome"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  className="h-9 text-[13px]"
                  required
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {AUTHOR_ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRoleDraft(role)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[12px]",
                      roleDraft === role
                        ? "border-ml-blue bg-ml-blue-light text-ml-blue"
                        : "border-ml-border text-ml-text-secondary"
                    )}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-end gap-2">
            <Input
              placeholder="Escreva um comentário…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="h-10 text-[14px]"
              aria-label="Escrever comentário"
            />
            <Button type="submit" size="icon" aria-label="Enviar comentário" disabled={!body.trim()}>
              <Send className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
