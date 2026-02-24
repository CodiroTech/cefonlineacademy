import { AboutHeader } from '@/components/common/aboutHeader'
import { OurPrograms } from './ourPrograms'
import { getAccreditationsPageData } from '@/lib/api/about'
import { getAboutPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

export default async function ProgramsPage() {
  const [pageHeader, pageData] = await Promise.all([
    getAboutPageHeader(),
    getAccreditationsPageData(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Our Accreditations'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/About Us Header.png')}
      />
      <OurPrograms
        sectionHeader={pageData.sectionHeader}
        accreditations={pageData.accreditations}
      />
    </div>
  )
}
