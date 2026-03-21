import { ListenLearnSection } from '@/components/home/podcasts'
import { getPodcastsPageData } from '@/lib/api/mediaCenter'

export const dynamic = 'force-dynamic'

export default async function PodcastsPage() {
  const pageData = await getPodcastsPageData()
  const podcasts = pageData.podcasts ?? []

  if (!podcasts.length) {
    return null
  }

  return (
    <div className="min-h-[50vh]">
      <ListenLearnSection items={podcasts} showWatchAllLink={false} layout="grid" />
    </div>
  )
}
