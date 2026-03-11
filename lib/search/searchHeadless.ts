import { fetchCollectionWithSearch } from '../headless'
import { headlessSearchCollections } from './headlessSearchCollections'

const MAX_PER_COLLECTION = 30

/** Common meta keys for relation items (when headless returns main + relations) */
const RELATION_TITLE_FIELDS = [
  'page-title',
  'title',
  'name',
  'question',
  'blog-title',
  'description',
]

export type SearchResultItem = {
  id: number
  collectionSlug: string
  collectionLabel: string
  title: string
  url: string
}

function pickTitle(content: Record<string, unknown>, titleFields: string[]): string {
  for (const key of titleFields) {
    const v = content[key]
    if (typeof v === 'string' && v.trim() !== '') return v.trim()
  }
  for (const key of Object.keys(content)) {
    const v = content[key]
    if (typeof v === 'string' && v.trim() !== '' && (key.endsWith('-title') || key === 'title' || key.endsWith('-name') || key === 'name'))
      return v.trim()
  }
  return 'Untitled'
}

function normalizeRow(
  row: Record<string, unknown>,
  collectionSlug: string,
  collectionLabel: string,
  getUrl: (content: Record<string, unknown>) => string,
  titleFields: string[],
): SearchResultItem {
  const id = typeof row.id === 'number' ? row.id : 0
  const title = pickTitle(row, titleFields)
  const urlPath = getUrl(row)
  return { id, collectionSlug, collectionLabel, title, url: urlPath }
}

/**
 * Search all configured headless collections; returns flat list of SearchResultItem.
 * Headless API may return { main: [...], relations: [...] } when search is present.
 */
export async function searchHeadless(q: string): Promise<SearchResultItem[]> {
  const query = (typeof q === 'string' ? q : '').trim()
  if (query === '') return []

  const allItems: SearchResultItem[] = []
  const slugToConfig = new Map(headlessSearchCollections.map((c) => [c.slug, c]))

  await Promise.all(
    headlessSearchCollections.map(async (config) => {
      try {
        const result = await fetchCollectionWithSearch<Record<string, unknown>>(
          config.slug,
          { search: query, limit: MAX_PER_COLLECTION },
          60,
        )

        const isExpanded =
          result &&
          typeof result === 'object' &&
          !Array.isArray(result) &&
          'main' in result &&
          Array.isArray((result as { main: unknown[] }).main)

        if (isExpanded) {
          const { main, relations } = result as {
            main: Record<string, unknown>[]
            relations: { collection_slug: string; collection_label: string; parent_slug: string; items: Record<string, unknown>[] }[]
          }
          for (const row of main) {
            allItems.push(normalizeRow(row, config.slug, config.label, config.getUrl, config.titleFields))
          }
          for (const rel of relations) {
            const parentConfig = slugToConfig.get(rel.parent_slug)
            const getUrl = parentConfig ? (item: Record<string, unknown>) => parentConfig.getUrl(item) : () => '/'
            for (const row of rel.items) {
              allItems.push(
                normalizeRow(row, rel.collection_slug, rel.collection_label, getUrl, RELATION_TITLE_FIELDS),
              )
            }
          }
        } else {
          const rows = Array.isArray(result) ? result : [result].filter(Boolean)
          for (const row of rows) {
            allItems.push(
              normalizeRow(
                row as Record<string, unknown>,
                config.slug,
                config.label,
                config.getUrl,
                config.titleFields,
              ),
            )
          }
        }
      } catch {
        // skip failed collection
      }
    }),
  )

  return allItems
}
