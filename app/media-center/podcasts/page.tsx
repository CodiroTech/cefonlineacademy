import { AboutHeader } from '@/components/common/aboutHeader'
import { Podcasts } from './podcast'
import { getPodcastsPageData } from '@/lib/api/mediaCenter'
import { getMediaCenterPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

export default async function PodcastsPage() {
  const [pageHeader, pageData] = await Promise.all([
    getMediaCenterPageHeader(),
    getPodcastsPageData(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Podcast'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/Podcast.png')}
      />
      <Podcasts items={pageData.podcasts} />
    </div>
  )
}
