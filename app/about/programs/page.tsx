import { OurPrograms } from './ourPrograms'
import { getAccreditationsPageData } from '@/lib/api/about'

export default async function ProgramsPage() {
  const pageData = await getAccreditationsPageData()

  return (
    <div>
      <OurPrograms
        sectionHeader={pageData.sectionHeader}
        accreditations={pageData.accreditations}
      />
    </div>
  )
}
