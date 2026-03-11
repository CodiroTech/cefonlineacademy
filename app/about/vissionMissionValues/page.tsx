import { VisionMissionValues } from './VisionMissionValues'
import { OurStorySection } from './story'
import { getVisionMissionValuesPageData } from '@/lib/api/about'

export default async function AboutPage() {
  const pageData = await getVisionMissionValuesPageData()

  return (
    <div>
      <OurStorySection data={pageData.story} />
      <VisionMissionValues
        vision={pageData.vision}
        mission={pageData.mission}
        values={pageData.values}
      />
    </div>
  )
}
