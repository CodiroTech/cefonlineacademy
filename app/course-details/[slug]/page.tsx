import { notFound } from 'next/navigation'
import { getCourseDetailBySlug } from '@/lib/api/course-detail'
import { getCoursesWithDetails } from '@/lib/api/demo'
import { getPageHeader } from '@/lib/api/pageHeaders'
import { AboutHeader } from '@/components/common/aboutHeader'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseDetailLayout } from '@/components/course-detail/CourseDetailLayout'
import { mediaUrl } from '@/lib/headless'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const course = await getCourseDetailBySlug(slug)
  if (!course) {
    return { title: 'Course Not Found' }
  }
  const title = course.course_details_left_content_area?.title ?? course.course_slug
  const description =
    typeof course.course_details_left_content_area?.overview_tab?.description === 'string'
      ? course.course_details_left_content_area.overview_tab.description.replace(/<[^>]*>/g, '').slice(0, 160)
      : `Course: ${title}`
  const image = course.course_cover_image ?? undefined
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params
  const [course, allCourses, header] = await Promise.all([
    getCourseDetailBySlug(slug),
    getCoursesWithDetails(20),
    getPageHeader('course-details'),
  ])
  if (!course) notFound()

  const relatedCourses = allCourses
    .filter((c) => c.slug && c.slug !== slug)
    .slice(0, 3)

  const pageTitle = course.course_details_left_content_area?.title ?? course.course_slug
  const coverImage = course.course_cover_image || '/placeholder-course.png'
  const headerTitle = header?.title ?? 'Course Description'
  const headerImageSrc = mediaUrl(header?.['header-image']) || '/1.png'

  return (
    <div className="w-full font-poppins">
      <AboutHeader
        title={headerTitle}
        imageSrc={headerImageSrc}
      />
      <div className="w-full px-4 lg:px-12">
        <div className="container mx-auto rounded-[20px] px-2 lg:px-2 pt-6 pb-6 overflow-hidden">
          {/* Course main image - full width within container, no border radius */}
          <div className="relative w-full aspect-[21/9] max-h-[320px] overflow-hidden bg-[#EAF7E5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          {/* Two-column section: each block has its own background (same as You May Also Like) */}
          <CourseDetailLayout course={course} pageTitle={pageTitle} />

          {/* You May Also Like - 3 cards, same design as /courses/quran-tutoring-courses */}
          {relatedCourses.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#065D80] text-center mb-8">
                You May Also Like
              </h2>
              <div className="bg-[#EAF7E5] px-6 py-6 rounded-tr-[60px] rounded-bl-[60px] w-fit max-w-full mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {relatedCourses.map((course) => (
                    <div key={course.id} className="w-[252px] max-w-full">
                      <CourseCard
                        slug={course.slug ?? ''}
                        title={course.title}
                        subtitle={course.short_description ?? ''}
                        languageName="Course"
                        averageRating="—"
                        imageUrl={mediaUrl(course.image_url) || '/placeholder-course.png'}
                        price={0}
                        classes={0}
                        currencySymbol="Rs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
