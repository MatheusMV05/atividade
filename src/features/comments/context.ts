import * as React from "react"

import type { Identity } from "./identity"
import type { Thread } from "./types"

export interface CommentsContextValue {
  screenKey: string
  mode: "supabase" | "local"
  threads: Thread[]
  refresh: () => void
  commentMode: boolean
  setCommentMode: (v: boolean) => void
  showPins: boolean
  setShowPins: (v: boolean) => void
  showResolved: boolean
  setShowResolved: (v: boolean) => void
  sheetOpen: boolean
  setSheetOpen: (v: boolean) => void
  identity: Identity | null
  saveIdentity: (name: string, role: string | null) => Identity
  activeThreadId: string | null
  setActiveThreadId: (id: string | null) => void
  scrollTargetThreadId: string | null
  focusThread: (id: string) => void
}

export const CommentsContext = React.createContext<CommentsContextValue | null>(null)

export function screenKeyFor(pathname: string, search: string): string {
  const params = new URLSearchParams(search)
  const scenario = params.get("scenario")
  return scenario ? `${pathname}?scenario=${scenario}` : pathname
}

export function useComments() {
  const ctx = React.useContext(CommentsContext)
  if (!ctx) throw new Error("useComments precisa estar dentro de <CommentsProvider>")
  return ctx
}
