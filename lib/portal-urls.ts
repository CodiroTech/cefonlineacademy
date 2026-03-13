import { portalUrl } from './config'

/** Portal checkout URL (e.g. /student/checkout) so user can complete billing. */
export function getCheckoutUrl(): string {
  const base = (portalUrl || '').replace(/\/$/, '')
  return base ? `${base}/student/checkout` : ''
}

/** Checkout URL with token and role in hash so the portal restores session. */
export function getCheckoutUrlWithAuth(token: string, role: string): string {
  const base = getCheckoutUrl()
  if (!base) return ''
  const hash = `token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}`
  return `${base}#${hash}`
}
