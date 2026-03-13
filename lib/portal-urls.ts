import { portalUrl } from './config'

/** Portal base URL without trailing slash. */
function getPortalBase(): string {
  return (portalUrl || '').trim().replace(/\/$/, '')
}

/** Portal checkout URL (e.g. /student/checkout) so user can complete billing. */
export function getCheckoutUrl(): string {
  const base = getPortalBase()
  return base ? `${base}/student/checkout` : ''
}

/** Checkout URL with token and role in hash so the portal restores session. */
export function getCheckoutUrlWithAuth(token: string, role: string): string {
  const base = getCheckoutUrl()
  if (!base) return ''
  const hash = `token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}`
  return `${base}#${hash}`
}

/** Portal course page URL (e.g. /mycourses/{slug}) with token and role in hash so the portal restores session. */
export function getPortalCourseUrlWithAuth(slug: string, token: string, role: string): string {
  const base = getPortalBase()
  if (!base) return ''
  const path = `${base}/mycourses/${encodeURIComponent(slug)}`
  const hash = `token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}`
  return `${path}#${hash}`
}

/** Portal billing page URL with token and role in hash and checkout=1 so the portal restores session and opens checkout sidebar. */
export function getBillingUrlWithAuth(token: string, role: string): string {
  const base = getPortalBase()
  if (!base) return ''
  const path = `${base}/billing`
  const hash = `token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}&checkout=1`
  return `${path}#${hash}`
}
