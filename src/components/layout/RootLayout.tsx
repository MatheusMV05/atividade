import * as React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Toaster } from "sonner"

import { CommentLayer } from "@/features/comments/CommentLayer"
import { CommentsProvider } from "@/features/comments/CommentsProvider"
import { CommentsSheet } from "@/features/comments/CommentsSheet"
import { Toolbar } from "@/features/comments/Toolbar"

import { CookieBanner } from "./CookieBanner"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function RootLayout() {
  const location = useLocation()
  const mainRef = React.useRef<HTMLElement>(null)
  const primeiraRenderizacao = React.useRef(true)

  // Move o foco para o início do conteúdo a cada troca de rota (F09): quem
  // navega por teclado/leitor de tela não fica preso no header a cada tela.
  React.useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false
      return
    }
    mainRef.current?.focus()
  }, [location.pathname])

  return (
    <CommentsProvider>
      <div className="relative flex min-h-screen flex-col bg-ml-bg">
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo-principal" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
        <CookieBanner />

        <CommentLayer />
        <Toolbar />
        <CommentsSheet />
        <Toaster position="bottom-left" />
      </div>
    </CommentsProvider>
  )
}
