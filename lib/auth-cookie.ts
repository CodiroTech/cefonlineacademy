/**
 * Shared auth cookie for unified login (cef-online-academy and cef-dashboard).
 * Domain from env so both apps (e.g. subdomains) can read it.
 */

const COOKIE_NAME = 'cef_auth'
const MAX_AGE_DAYS = 7

function getAuthDomain(): string {
  if (typeof process === 'undefined' || !process.env.NEXT_PUBLIC_CEF_AUTH_DOMAIN) {
    return ''
  }
  return process.env.NEXT_PUBLIC_CEF_AUTH_DOMAIN.trim()
}

/**
 * Set auth cookie (token + role) so academy navbar shows "Dashboard" when logged in.
 * Call after successful login in academy popup or dashboard login page.
 */
export function setAuthCookie(token: string, role: string): void {
  if (typeof document === 'undefined') return
  const domain = getAuthDomain()
  const value = encodeURIComponent(`${token}|${role}`)
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60
  const secure = typeof window !== 'undefined' && window.location?.protocol === 'https:'
  let cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
  if (domain) cookie += `; domain=${domain}`
  if (secure) cookie += '; Secure'
  document.cookie = cookie
}

/**
 * Read auth cookie. Returns { token, role } if present, else null.
 * Used by academy navbar to show "Dashboard" vs "Student Login" + "Book a Demo".
 */
export function getAuthCookie(): { token: string; role: string } | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`))
  if (!match) return null
  try {
    const decoded = decodeURIComponent(match[1])
    const [token, role] = decoded.split('|')
    if (token && role) return { token, role }
  } catch {
    // ignore malformed
  }
  return null
}

/**
 * Clear auth cookie (e.g. on logout in dashboard).
 */
export function clearAuthCookie(): void {
  if (typeof document === 'undefined') return
  const domain = getAuthDomain()
  let cookie = `${COOKIE_NAME}=; path=/; max-age=0`
  if (domain) cookie += `; domain=${domain}`
  document.cookie = cookie
}
