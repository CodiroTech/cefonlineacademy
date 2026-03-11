import { Testimonials } from './testimonials'
import { StudentTestimonials } from './student'
import { getTestimonialsPageData } from '@/lib/api/mediaCenter'

export default async function TestimonialsPage() {
  const pageData = await getTestimonialsPageData()

  return (
    <div>
      <Testimonials data={pageData.sectionHeader} />
      <StudentTestimonials testimonials={pageData.testimonials} />
    </div>
  )
}
