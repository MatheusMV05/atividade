export interface CapturedAnchor {
  anchor_cid: string | null
  offset_x: number | null
  offset_y: number | null
  page_x: number
  page_y: number
  viewport_w: number
}

/** Sobe no DOM a partir do elemento clicado até achar o [data-cid] mais próximo. */
export function closestCid(el: Element | null): HTMLElement | null {
  return (el?.closest("[data-cid]") as HTMLElement | null) ?? null
}

export function captureAnchor(clientX: number, clientY: number, target: Element | null): CapturedAnchor {
  const page_x = (clientX + window.scrollX) / document.documentElement.scrollWidth
  const page_y = (clientY + window.scrollY) / document.documentElement.scrollHeight
  const viewport_w = window.innerWidth

  const anchorEl = closestCid(target)
  if (!anchorEl) {
    return { anchor_cid: null, offset_x: null, offset_y: null, page_x, page_y, viewport_w }
  }

  const rect = anchorEl.getBoundingClientRect()
  const offset_x = rect.width > 0 ? (clientX - rect.left) / rect.width : 0.5
  const offset_y = rect.height > 0 ? (clientY - rect.top) / rect.height : 0.5

  return {
    anchor_cid: anchorEl.getAttribute("data-cid"),
    offset_x,
    offset_y,
    page_x,
    page_y,
    viewport_w,
  }
}

export interface ResolvedPosition {
  left: number
  top: number
  inContext: boolean
}

/** Calcula a posição (em coordenadas de documento) de um pin a partir da âncora salva. */
export function resolvePosition(t: {
  anchor_cid: string | null
  offset_x: number | null
  offset_y: number | null
  page_x: number | null
  page_y: number | null
}): ResolvedPosition {
  if (t.anchor_cid) {
    const el = document.querySelector(`[data-cid="${cssEscape(t.anchor_cid)}"]`) as HTMLElement | null
    if (el) {
      const rect = el.getBoundingClientRect()
      const ox = t.offset_x ?? 0.5
      const oy = t.offset_y ?? 0.5
      return {
        left: window.scrollX + rect.left + ox * rect.width,
        top: window.scrollY + rect.top + oy * rect.height,
        inContext: true,
      }
    }
    // âncora não existe mais nesta tela/estado — fica só no painel lateral
    return { left: 0, top: 0, inContext: false }
  }

  if (t.page_x != null && t.page_y != null) {
    return {
      left: t.page_x * document.documentElement.scrollWidth,
      top: t.page_y * document.documentElement.scrollHeight,
      inContext: true,
    }
  }

  return { left: 0, top: 0, inContext: false }
}

function cssEscape(s: string) {
  return typeof CSS !== "undefined" && CSS.escape ? CSS.escape(s) : s.replace(/"/g, '\\"')
}
