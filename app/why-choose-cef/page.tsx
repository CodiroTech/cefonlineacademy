import { ChooseUs } from '@/app/about/whyChooseUs/chooseUs'
import { HallmarksOfExcellence } from '@/components/common/excellence'
import { getWhyChooseUsPageData } from '@/lib/api/about'
import { getHallmarks } from '@/lib/api/homepage'

export default async function WhyChooseCefPage() {
  const [pageData, hallmarks] = await Promise.all([
    getWhyChooseUsPageData(),
    getHallmarks(),
  ])

  return (
    <div>
      <ChooseUs data={pageData.sectionHeader} />
      <HallmarksOfExcellence items={hallmarks} />
    </div>
  )
}
