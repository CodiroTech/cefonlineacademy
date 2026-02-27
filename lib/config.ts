export const headlessBaseUrl =
  process.env.NEXT_PUBLIC_HEADLESS_BASE_URL ?? ''

export const headlessApiToken =
  process.env.HEADLESS_API_TOKEN ?? ''

export const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? ''

/** External CEF bookshop (e.g. cef.org.pk/shop). Used for "CEF Bookshop" nav links. */
export const bookshopUrl =
  process.env.NEXT_PUBLIC_BOOKSHOP_URL ?? 'http://cef.org.pk/shop'
