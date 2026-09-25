import * as React from "react"
import { toast } from "sonner"

import { captureAnchor } from "./anchor"
import { commentsApi } from "./api"
import { useComments } from "./context"
import { Pin } from "./Pin"

export function CommentLayer() {
  const { commentMode, setCommentMode, threads, showPins, showResolved, screenKey, refresh, setActiveThreadId } =
    useComments()

  React.useEffect(() => {
    if (!commentMode) return

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      // não intercepta cliques dentro da própria UI de comentários (toolbar, popover, sheet)
      if (target.closest("[data-comments-ui]")) return

      e.preventDefault()
      e.stopPropagation()

      const anchor = captureAnchor(e.clientX, e.clientY, target)
      commentsApi
        .createThread({ screen_key: screenKey, ...anchor })
        .then((thread) => {
          refresh()
          setActiveThreadId(thread.id)
          setCommentMode(false)
        })
        .catch((err) => {
          console.error("Falha ao criar comentário:", err)
          toast("Não foi possível criar o comentário agora. Veja o console para detalhes.")
          setCommentMode(false)
        })
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [commentMode, screenKey, refresh, setActiveThreadId, setCommentMode])

  const visibleThreads = threads.filter((t) => showResolved || !t.resolved)

  return (
    <div aria-hidden={!showPins} className="pointer-events-none absolute inset-0 z-30">
      {showPins &&
        visibleThreads.map((t, i) => (
          <div key={t.id} className="pointer-events-auto">
            <Pin thread={t} number={i + 1} />
          </div>
        ))}
    </div>
  )
}
