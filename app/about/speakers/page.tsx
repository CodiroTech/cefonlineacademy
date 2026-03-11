import { MeetOurSpeakers } from './MeetOurSpeakers'
import { getSpeakersPageData } from '@/lib/api/about'

export default async function SpeakersPage() {
  const pageData = await getSpeakersPageData()

  return (
    <div>
      <MeetOurSpeakers
        sectionHeader={pageData.sectionHeader}
        speakers={pageData.speakers}
      />
    </div>
  )
}
