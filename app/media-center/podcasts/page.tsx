import { Podcasts } from './podcast'
import { getPodcastsPageData } from '@/lib/api/mediaCenter'

export default async function PodcastsPage() {
  const pageData = await getPodcastsPageData()

  return (
    <div>
      <Podcasts items={pageData.podcasts} />
    </div>
  )
}
