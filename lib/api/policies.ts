import { fetchCollection } from '../headless'

export type PolicyItem = {
  id: number
  locale?: string
  title: string
  description: string
}

type RawPolicy = Record<string, unknown> & { id?: number; title?: string; description?: string; fields?: Record<string, unknown> }

function normalizeItem(raw: RawPolicy): PolicyItem | null {
  if (!raw || typeof raw !== 'object') return null
  const fields = (raw.fields && typeof raw.fields === 'object' ? raw.fields : raw) as Record<string, unknown>
  const id = typeof raw.id === 'number' ? raw.id : Number(fields.id ?? fields.ID)
  if (Number.isNaN(id) || id <= 0) return null
  const title = String(raw.title ?? fields.title ?? fields.Title ?? '').trim()
  const description = typeof (raw.description ?? fields.description ?? fields.Description) === 'string'
    ? (raw.description ?? fields.description ?? fields.Description) as string
    : ''
  return { id, locale: raw.locale as string | undefined, title, description }
}

export async function getPolicies(revalidate = 60): Promise<PolicyItem[]> {
  const raw = await fetchCollection<RawPolicy>('policies', revalidate)
  if (!Array.isArray(raw)) return []
  const out: PolicyItem[] = []
  for (const item of raw) {
    const norm = normalizeItem(item)
    if (norm?.title) out.push(norm)
  }
  return out
}

export async function getPolicyById(id: number, revalidate = 60): Promise<PolicyItem | null> {
  const list = await getPolicies(revalidate)
  const found = list.find((p) => p.id === Number(id))
  return found ?? null
}
