import { AboutHeader } from '@/components/common/aboutHeader'
import { ChooseUs } from './chooseUs'
import { HallmarksOfExcellence } from '@/components/common/excellence'
import { getWhyChooseUsPageData } from '@/lib/api/about'
import { getAboutPageHeader } from '@/lib/api/pageHeaders'
import { getHallmarks } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

export default async function WhyChooseUsPage() {
  const [pageHeader, pageData, hallmarks] = await Promise.all([
    getAboutPageHeader(),
    getWhyChooseUsPageData(),
    getHallmarks(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Hallmarks of Excellence'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/About Us Header.png')}
      />
      <ChooseUs data={pageData.sectionHeader} />
      <HallmarksOfExcellence items={hallmarks} />
    </div>
  )
}
