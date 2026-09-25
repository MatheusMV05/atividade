import { Badge } from "@/components/ui/badge"

import { STATUS_BADGE_VARIANT, STATUS_LABEL } from "./constants"
import type { RequestStatus } from "./types"

export function StatusBadge({ status }: { status: RequestStatus }) {
  return <Badge variant={STATUS_BADGE_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
}
