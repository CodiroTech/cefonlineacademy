import { VisionMissionValues } from '@/app/about/vissionMissionValues/VisionMissionValues'
import { OurStorySection } from '@/app/about/vissionMissionValues/story'
import { getVisionMissionValuesPageData } from '@/lib/api/about'

export default async function AboutUsPage() {
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
