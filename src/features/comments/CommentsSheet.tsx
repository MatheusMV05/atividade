import * as React from "react"
import { MapPin, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import { commentsApi } from "./api"
import { resolvePosition } from "./anchor"
import { useComments } from "./context"
import type { CommentItem, Thread } from "./types"

function ThreadRow({ thread, number }: { thread: Thread; number: number }) {
  const { focusThread, setSheetOpen } = useComments()
  const [comments, setComments] = React.useState<CommentItem[]>([])

  React.useEffect(() => {
    commentsApi.listComments(thread.id).then(setComments).catch(() => setComments([]))
  }, [thread.id])

  const first = comments[0]

  function goToPin() {
    const pos = resolvePosition(thread)
    if (pos.inContext) {
      window.scrollTo({ top: Math.max(0, pos.top - 160), behavior: "smooth" })
    }
    focusThread(thread.id)
    setSheetOpen(false)
  }

  return (
    <li>
      <button
        type="button"
        onClick={goToPin}
        className="flex w-full items-start gap-3 rounded-[6px] border border-ml-border p-3 text-left hover:bg-ml-bg"
      >
        <span
          className={cn(
            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white",
            thread.resolved ? "bg-ml-text-secondary" : "bg-ml-orange"
          )}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[13px] font-semibold text-ml-text">
              {first ? first.author_name : "Sem comentários ainda"}
            </p>
            {thread.resolved && (
              <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-ml-text-secondary">
                Resolvida
              </span>
            )}
          </div>
          {first && <p className="line-clamp-2 text-[13px] text-ml-text-secondary">{first.body}</p>}
          <p className="mt-1 flex items-center gap-1 text-[11px] text-ml-blue">
            <MapPin className="size-3" strokeWidth={1.5} aria-hidden="true" />
            {comments.length} {comments.length === 1 ? "comentário" : "comentários"}
          </p>
        </div>
      </button>
    </li>
  )
}

export function CommentsSheet() {
  const { sheetOpen, setSheetOpen, threads, showResolved, setShowResolved } = useComments()

  const abertas = threads.filter((t) => !t.resolved)
  const resolvidas = threads.filter((t) => t.resolved)
  const visible = showResolved ? threads : abertas

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent data-comments-ui side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="size-5" strokeWidth={1.5} aria-hidden="true" />
            Comentários desta tela
          </SheetTitle>
          <SheetDescription>
            {abertas.length} aberta{abertas.length === 1 ? "" : "s"} · {resolvidas.length} resolvida
            {resolvidas.length === 1 ? "" : "s"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex gap-2 p-4 pb-2">
          <Button
            type="button"
            variant={showResolved ? "outline" : "secondary"}
            size="sm"
            onClick={() => setShowResolved(false)}
          >
            Abertas
          </Button>
          <Button
            type="button"
            variant={showResolved ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowResolved(true)}
          >
            Todas
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-2">
          {visible.length === 0 ? (
            <p className="text-[14px] text-ml-text-secondary">
              Nenhum comentário {showResolved ? "" : "aberto"} nesta tela ainda. Clique em "Comentar" na barra
              flutuante para deixar o primeiro.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {visible.map((t) => {
                const number = threads.indexOf(t) + 1
                return <ThreadRow key={t.id} thread={t} number={number} />
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
