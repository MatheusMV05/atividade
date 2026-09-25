import * as React from "react"

import { cn } from "@/lib/utils"

import { resolvePosition } from "./anchor"
import { useComments } from "./context"
import { ThreadPopover } from "./ThreadPopover"
import type { Thread } from "./types"

export function Pin({ thread, number }: { thread: Thread; number: number }) {
  const { scrollTargetThreadId } = useComments()
  const [pos, setPos] = React.useState(() => resolvePosition(thread))

  React.useEffect(() => {
    function recompute() {
      setPos(resolvePosition(thread))
    }
    recompute()
    window.addEventListener("resize", recompute)
    window.addEventListener("scroll", recompute, true)
    const id = window.setInterval(recompute, 800)
    return () => {
      window.removeEventListener("resize", recompute)
      window.removeEventListener("scroll", recompute, true)
      window.clearInterval(id)
    }
  }, [thread])

  if (!pos.inContext) return null

  const isTarget = scrollTargetThreadId === thread.id

  return (
    <div
      data-comments-ui
      className="absolute z-40"
      style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -100%)" }}
    >
      <ThreadPopover thread={thread} number={number}>
        <button
          type="button"
          aria-label={`Thread de comentário ${number}${thread.resolved ? " (resolvida)" : ""}`}
          className={cn(
            "flex size-8 items-center justify-center rounded-full rounded-bl-none border-2 border-white text-[13px] font-bold text-white shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-transform hover:scale-110",
            thread.resolved ? "bg-ml-text-secondary" : "bg-ml-orange",
            isTarget && "ring-4 ring-ml-blue"
          )}
        >
          {number}
        </button>
      </ThreadPopover>
    </div>
  )
}
