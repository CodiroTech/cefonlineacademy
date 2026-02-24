import { AboutHeader } from '@/components/common/aboutHeader'
import { Testimonials } from './testimonials'
import { StudentTestimonials } from './student'
import { getTestimonialsPageData } from '@/lib/api/mediaCenter'
import { getMediaCenterPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'

export default async function TestimonialsPage() {
  const [pageHeader, pageData] = await Promise.all([
    getMediaCenterPageHeader(),
    getTestimonialsPageData(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Testimonials'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/Testimonials.png')}
      />
      <Testimonials data={pageData.sectionHeader} />
      <StudentTestimonials testimonials={pageData.testimonials} />
    </div>
  )
}
