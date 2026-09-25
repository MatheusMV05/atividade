export function generateProtocolo(): string {
  const n = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0")
  return `LGPD-2026-${n}`
}
