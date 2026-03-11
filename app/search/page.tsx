import Link from 'next/link'
import { searchCombined } from '@/lib/api/search'

const PAGE_SIZE = 10

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>
}

export const metadata = {
  title: 'Search',
  description: 'Search courses, blogs, and site content.',
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.trim() : ''
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)

  const data = q ? await searchCombined(q, { page, pageSize: PAGE_SIZE }) : { items: [], total: 0, page: 1, pageSize: PAGE_SIZE }
  const totalPages = data.total > 0 ? Math.ceil(data.total / PAGE_SIZE) : 0
  const hasResults = data.items.length > 0

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-[#065D80] mb-6">Search</h1>

        <form method="GET" action="/search" className="mb-8">
          <input type="hidden" name="page" value="1" />
          <div className="flex gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search the site..."
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#065D80] focus:border-transparent"
              aria-label="Search"
            />
            <button
              type="submit"
              className="rounded-md bg-[#065D80] px-4 py-2 text-sm font-medium text-white hover:bg-[#054a66] focus:outline-none focus:ring-2 focus:ring-[#065D80] focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>

        {q === '' && (
          <p className="text-gray-600">Enter a search term above.</p>
        )}

        {q !== '' && !hasResults && (
          <p className="text-gray-600">No results found for &quot;{q}&quot;.</p>
        )}

        {q !== '' && hasResults && (
          <>
            <p className="text-gray-600 text-sm mb-4">
              {data.total} result{data.total !== 1 ? 's' : ''} for &quot;{q}&quot;
            </p>
            <ul className="space-y-3">
              {data.items.map((item) => (
                <li key={`${item.collectionSlug}-${item.id}`}>
                  <Link
                    href={item.url}
                    className="block rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{item.title}</span>
                    <span className="ml-2 text-sm text-gray-500">({item.collectionLabel})</span>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&page=${page - 1}`}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/search?q=${encodeURIComponent(q)}&page=${page + 1}`}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  )
}
