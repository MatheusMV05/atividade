const STORAGE_KEY = "lgpd-proto:comment-identity"

export interface Identity {
  name: string
  role: string | null
  token: string
}

export function getIdentity(): Identity | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Identity
  } catch {
    return null
  }
}

export function setIdentity(name: string, role: string | null): Identity {
  const existing = getIdentity()
  const identity: Identity = {
    name,
    role,
    token: existing?.token ?? crypto.randomUUID(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
  } catch {
    // localStorage indisponível (modo privado) — segue só em memória para esta sessão
  }
  return identity
}
