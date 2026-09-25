import * as React from "react"

/**
 * Devolve um ref para o título de uma etapa e move o foco para ele sempre que
 * `dep` mudar — usado em transições de etapa que não trocam de rota (ex.:
 * telas intro -> seleção de um mesmo fluxo), para que leitores de tela
 * anunciem o novo passo (F09).
 */
export function useFocusOnChange<T>(dep: T) {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const primeiraRenderizacao = React.useRef(true)

  React.useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false
      return
    }
    ref.current?.focus()
  }, [dep])

  return ref
}
