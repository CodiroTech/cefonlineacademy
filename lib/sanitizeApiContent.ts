function isHtml(value: string): boolean {
  if (typeof value !== 'string' || !value.trim()) return false
  return /<[a-z][\s\S]*>/i.test(value) || /<\/[a-z]+>/i.test(value)
}

/**
 * Sanitize API-origin HTML for safe render. Use before dangerouslySetInnerHTML.
 * - Plain text returned as-is.
 * - HTML: script/style and event handlers removed; javascript: stripped from hrefs.
 */
export function sanitizeApiContent(value: string): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return value
  if (!isHtml(value)) return value

  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '')
    .replace(/javascript:/gi, '')
}
