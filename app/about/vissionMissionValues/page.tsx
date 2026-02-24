import { AboutHeader } from '@/components/common/aboutHeader'
import { VisionMissionValues } from './VisionMissionValues'
import { OurStorySection } from './story'
import { getVisionMissionValuesPageData } from '@/lib/api/about'
import { getAboutPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

export default async function AboutPage() {
  const [pageHeader, pageData] = await Promise.all([
    getAboutPageHeader(),
    getVisionMissionValuesPageData(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'About Us'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/About Us Header.png')}
        headingOffset="22%"
      />
      <OurStorySection data={pageData.story} />
      <VisionMissionValues
        vision={pageData.vision}
        mission={pageData.mission}
        values={pageData.values}
      />
    </div>
  )
}
