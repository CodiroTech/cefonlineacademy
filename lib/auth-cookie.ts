/**
 * Shared auth cookie for unified login (cef-online-academy and cef-dashboard).
 * Domain from env so both apps (e.g. subdomains) can read it.
 */

const COOKIE_NAME = 'cef_auth'
const MAX_AGE_DAYS = 7

/** Sanctum tokens are long strings (e.g. 40+ chars); reject short numeric values that are likely user id. */
export function isLikelySanctumToken(value: string | null | undefined): boolean {
  if (!value || typeof value !== 'string') return false
  const t = value.trim()
  if (t.length < 20) return false
  if (/^\d+$/.test(t)) return false
  return true
}

/**
 * Normalize env value to a valid cookie domain (hostname only; leading dot for subdomain sharing).
 * Strips protocol/path so values like https://cefonlineacademy.com become .cefonlineacademy.com.
 */
function normalizeCookieDomain(raw: string): string {
  const s = raw.trim()
  if (!s) return ''
  try {
    if (/^https?:\/\//i.test(s)) {
      const hostname = new URL(s).hostname
      if (!hostname) return ''
      if (hostname === 'localhost') return 'localhost'
      return hostname.startsWith('.') ? hostname : `.${hostname}`
    }
    if (s === 'localhost') return 'localhost'
    return s.startsWith('.') ? s : `.${s}`
  } catch {
    return ''
  }
}

/**
 * True if the current host is the configured domain or a subdomain of it (so setting the cookie is allowed).
 */
function currentHostMatchesDomain(cookieDomain: string): boolean {
  if (typeof window === 'undefined' || !cookieDomain) return false
  const hostname = window.location.hostname
  const base = cookieDomain.startsWith('.') ? cookieDomain.slice(1) : cookieDomain
  return hostname === base || hostname.endsWith(`.${base}`)
}

function getAuthDomain(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CEF_AUTH_DOMAIN) {
    const normalized = normalizeCookieDomain(process.env.NEXT_PUBLIC_CEF_AUTH_DOMAIN)
    if (normalized) return normalized
  }
  // In dev, share cookie across localhost:3000 (academy) and localhost:5173 (portal) so enrollment state is consistent
  if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
    return 'localhost'
  }
  return ''
}

/**
 * Set auth cookie (token + role) so academy navbar shows "Dashboard" when logged in.
 * Call after successful login in academy popup or dashboard login page.
 * @param options.fromLogin - When true, always set the cookie with whatever token the backend returned (so academy stays logged in); otherwise only set if token looks like a Sanctum token.
 */
export function setAuthCookie(token: string, role: string, options?: { fromLogin?: boolean }): void {
  if (typeof document === 'undefined') return
  const t = token?.trim()
  const r = role?.trim()
  if (!t || !r) return
  if (!options?.fromLogin && !isLikelySanctumToken(t)) return
  const configuredDomain = getAuthDomain()
  const domain =
    configuredDomain && currentHostMatchesDomain(configuredDomain) ? configuredDomain : ''
  const value = encodeURIComponent(`${t}|${r}`)
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
    const parts = decoded.split('|').map((s) => s?.trim() ?? '')
    let token: string
    let role: string
    if (parts.length >= 3) {
      token = `${parts[0]}|${parts[1]}`
      role = parts[2]
    } else if (parts.length === 2) {
      token = parts[0]
      role = parts[1]
    } else {
      return null
    }
    if (token && role) return { token, role }
  } catch {
    // ignore malformed
  }
  return null
}

/**
 * Clear auth cookie (e.g. on logout). Must use same path/domain as when set, so we clear both
 * host-only (no domain) and domain-scoped (e.g. domain=localhost) to cover all cases.
 */
export function clearAuthCookie(): void {
  if (typeof document === 'undefined') return
  const domain = getAuthDomain()
  // Clear host-only cookie (no domain) – matches when cookie was set without domain
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`
  // Clear domain-scoped cookie – matches when cookie was set with domain= (e.g. localhost)
  if (domain) {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; domain=${domain}`
  }
}
