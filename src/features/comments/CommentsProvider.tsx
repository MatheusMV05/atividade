import * as React from "react"
import { useLocation } from "react-router-dom"

import { commentsApi, commentsMode, subscribeToChanges } from "./api"
import { CommentsContext, screenKeyFor, type CommentsContextValue } from "./context"
import { getIdentity, setIdentity as persistIdentity, type Identity } from "./identity"
import type { Thread } from "./types"

export function CommentsProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const screenKey = screenKeyFor(location.pathname, location.search)

  const [threads, setThreads] = React.useState<Thread[]>([])
  const [commentMode, setCommentMode] = React.useState(false)
  const [showPins, setShowPins] = React.useState(true)
  const [showResolved, setShowResolved] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [identity, setIdentityState] = React.useState<Identity | null>(() => getIdentity())
  const [activeThreadId, setActiveThreadId] = React.useState<string | null>(null)
  const [scrollTargetThreadId, setScrollTargetThreadId] = React.useState<string | null>(null)

  const refresh = React.useCallback(() => {
    commentsApi
      .listThreads(screenKey)
      .then(setThreads)
      .catch((err) => {
        console.error("Falha ao carregar comentários desta tela:", err)
        setThreads([])
      })
  }, [screenKey])

  React.useEffect(() => {
    refresh()
    const unsubscribe = subscribeToChanges(screenKey, refresh)
    return unsubscribe
  }, [screenKey, refresh])

  // Sai do modo comentário e fecha threads ativas ao trocar de tela — evita cliques
  // perdidos criando pins na tela errada. Depende de `screenKey` mudar (navegação),
  // não é um cálculo derivável no corpo do render.
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setCommentMode(false)
    setActiveThreadId(null)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [screenKey])

  React.useEffect(() => {
    document.body.classList.toggle("comment-mode", commentMode)
    return () => document.body.classList.remove("comment-mode")
  }, [commentMode])

  const saveIdentity = React.useCallback((name: string, role: string | null) => {
    const identity = persistIdentity(name, role)
    setIdentityState(identity)
    return identity
  }, [])

  const focusThread = React.useCallback((id: string) => {
    setScrollTargetThreadId(id)
    setActiveThreadId(id)
    window.setTimeout(() => setScrollTargetThreadId(null), 1200)
  }, [])

  const value: CommentsContextValue = {
    screenKey,
    mode: commentsMode,
    threads,
    refresh,
    commentMode,
    setCommentMode,
    showPins,
    setShowPins,
    showResolved,
    setShowResolved,
    sheetOpen,
    setSheetOpen,
    identity,
    saveIdentity,
    activeThreadId,
    setActiveThreadId,
    scrollTargetThreadId,
    focusThread,
  }

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>
}
