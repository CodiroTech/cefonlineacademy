import { MeetOurTeachersSection } from './MeetOurTeachersSection'
import { getTeachersPageData } from '@/lib/api/about'

export default async function TeachersPage() {
  const pageData = await getTeachersPageData()

  return (
    <div>
      <MeetOurTeachersSection
        sectionHeader={pageData.sectionHeader}
        teachers={pageData.teachers}
      />
    </div>
  )
}
