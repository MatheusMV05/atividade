export interface Thread {
  id: string
  screen_key: string
  anchor_cid: string | null
  offset_x: number | null
  offset_y: number | null
  page_x: number | null
  page_y: number | null
  viewport_w: number | null
  resolved: boolean
  created_at: string
}

export interface CommentItem {
  id: string
  thread_id: string
  author_name: string
  author_role: string | null
  author_token: string
  body: string
  created_at: string
}

export interface NewThreadInput {
  screen_key: string
  anchor_cid: string | null
  offset_x: number | null
  offset_y: number | null
  page_x: number | null
  page_y: number | null
  viewport_w: number | null
}

export interface NewCommentInput {
  thread_id: string
  author_name: string
  author_role: string | null
  author_token: string
  body: string
}

export const AUTHOR_ROLES = ["Grupo", "Professor", "Jurídico", "Técnico", "Executivo"] as const
