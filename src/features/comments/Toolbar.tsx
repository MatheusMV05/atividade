import * as React from "react"
import { Eye, EyeOff, FlaskConical, GraduationCap, MessageSquarePlus, PanelRight, Sparkles, X } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ScenarioPanel } from "@/features/requests/ScenarioPanel"
import { cn } from "@/lib/utils"

import { useComments } from "./context"

export function Toolbar() {
  const {
    commentMode,
    setCommentMode,
    threads,
    showPins,
    setShowPins,
    sheetOpen,
    setSheetOpen,
    mode,
  } = useComments()

  const [scenarioOpen, setScenarioOpen] = React.useState(false)
  const [showFindings, setShowFindings] = React.useState(false)

  React.useEffect(() => {
    document.body.classList.toggle("show-findings", showFindings)
    return () => document.body.classList.remove("show-findings")
  }, [showFindings])

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const typing = ["INPUT", "TEXTAREA"].includes(target.tagName) || target.isContentEditable
      if (typing) return
      if (e.key.toLowerCase() === "c" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setCommentMode(!commentMode)
      }
      if (e.key === "Escape" && commentMode) {
        setCommentMode(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [commentMode, setCommentMode])

  const openCount = threads.filter((t) => !t.resolved).length

  return (
    <div
      data-comments-ui
      role="region"
      aria-label="Ferramentas do protótipo (fora do site)"
      className="fixed bottom-4 right-4 left-4 z-50 flex flex-col items-end gap-2 font-sans sm:left-auto"
    >
      {commentMode && (
        <div className="rounded-[6px] bg-ml-text px-3 py-2 text-[13px] text-white shadow-lg">
          Clique em qualquer ponto da tela para comentar · <kbd className="font-semibold">Esc</kbd> para sair
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-1 rounded-[1.5rem] border border-ml-border bg-ml-surface px-2 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
        <Button
          type="button"
          variant={commentMode ? "primary" : "secondary"}
          size="sm"
          className="rounded-full"
          onClick={() => setCommentMode(!commentMode)}
          aria-pressed={commentMode}
        >
          {commentMode ? <X className="size-4" strokeWidth={1.5} aria-hidden="true" /> : <MessageSquarePlus className="size-4" strokeWidth={1.5} aria-hidden="true" />}
          {commentMode ? "Cancelar" : "Comentar"}
          <kbd className="ml-1 rounded bg-black/10 px-1 text-[10px] font-normal">C</kbd>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={() => setSheetOpen(!sheetOpen)}
          aria-pressed={sheetOpen}
        >
          <PanelRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          {openCount} {openCount === 1 ? "thread" : "threads"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label={showPins ? "Ocultar pins" : "Mostrar pins"}
          aria-pressed={showPins}
          onClick={() => setShowPins(!showPins)}
        >
          {showPins ? <Eye className="size-4" strokeWidth={1.5} aria-hidden="true" /> : <EyeOff className="size-4" strokeWidth={1.5} aria-hidden="true" />}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={() => setScenarioOpen(true)}
        >
          <FlaskConical className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Cenários
        </Button>

        <Button
          type="button"
          variant={showFindings ? "primary" : "ghost"}
          size="sm"
          className="rounded-full"
          onClick={() => setShowFindings(!showFindings)}
          aria-pressed={showFindings}
          title="Destaca os blocos que corrigem um achado do diagnóstico (F06-F09)"
        >
          <Sparkles className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Anotações
        </Button>

        <Button asChild type="button" variant="ghost" size="sm" className="rounded-full">
          <Link to="/sobre-o-prototipo">Sobre o protótipo</Link>
        </Button>

        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-ml-text-secondary",
            mode === "local" && "bg-ml-orange/10"
          )}
          title={
            mode === "local"
              ? "Comentários salvos só neste navegador (sem Supabase configurado)"
              : "Comentários sincronizados em tempo real via Supabase"
          }
        >
          <GraduationCap className="size-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="hidden sm:inline">Protótipo acadêmico — CESAR School · não é o site oficial</span>
        </div>
      </div>

      <ScenarioPanel open={scenarioOpen} onOpenChange={setScenarioOpen} />
    </div>
  )
}
