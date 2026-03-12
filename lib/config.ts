export const headlessBaseUrl =
  process.env.NEXT_PUBLIC_HEADLESS_BASE_URL ?? ''

export const headlessApiToken =
  process.env.HEADLESS_API_TOKEN ?? ''

export const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''

/** Portal (Laravel/SPA) base URL. Used for Dashboard, checkout, and auth redirects so user is not asked to log in again. */
export const portalUrl =
  process.env.NEXT_PUBLIC_PORTAL_URL?.trim() ?? ''

/** External CEF bookshop (e.g. cef.org.pk/shop). Used for "CEF Bookshop" nav links. */
export const bookshopUrl =
  process.env.NEXT_PUBLIC_BOOKSHOP_URL ?? 'http://cef.org.pk/shop'

/** CEF.org.pk site base URL. Used for Help Desk links (Queries, Complaints, etc.). */
export const cefOrgBaseUrl =
  process.env.NEXT_PUBLIC_CEF_ORG_URL ?? 'https://cef.org.pk'
