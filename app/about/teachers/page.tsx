import { AboutHeader } from '@/components/common/aboutHeader'
import { MeetOurTeachersSection } from './MeetOurTeachersSection'
import { getTeachersPageData } from '@/lib/api/about'
import { getAboutPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

export default async function TeachersPage() {
  const [pageHeader, pageData] = await Promise.all([
    getAboutPageHeader(),
    getTeachersPageData(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Our Esteemed Teachers'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/About Us Header.png')}
      />
      <MeetOurTeachersSection
        sectionHeader={pageData.sectionHeader}
        teachers={pageData.teachers}
      />
    </div>
  )
}
