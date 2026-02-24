import { AboutHeader } from '@/components/common/aboutHeader'
import { MeetOurSpeakers } from './MeetOurSpeakers'
import { getSpeakersPageData } from '@/lib/api/about'
import { getAboutPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

export default async function SpeakersPage() {
  const [pageHeader, pageData] = await Promise.all([
    getAboutPageHeader(),
    getSpeakersPageData(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Our Distinguished Speakers'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/About Us Header.png')}
      />
      <MeetOurSpeakers
        sectionHeader={pageData.sectionHeader}
        speakers={pageData.speakers}
      />
    </div>
  )
}
