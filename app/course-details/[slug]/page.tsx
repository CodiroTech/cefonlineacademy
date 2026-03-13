import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCourseDetailBySlug } from '@/lib/api/course-detail'
import { getCoursesWithDetails } from '@/lib/api/demo'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseDetailLayout } from '@/components/course-detail/CourseDetailLayout'
import { mediaUrl } from '@/lib/headless'
import { isLikelySanctumToken } from '@/lib/auth-cookie'

const AUTH_COOKIE_NAME = 'cef_auth'

/** Parse cef_auth cookie. Supports "token|role" or "userId|token|role". Returns full Bearer token (for 3 parts: "userId|token"), or null. */
function getAuthTokenFromCookie(cookieStore: Awaited<ReturnType<typeof cookies>>): string | null {
  const value = cookieStore.get(AUTH_COOKIE_NAME)?.value
  if (!value) return null
  try {
    const decoded = decodeURIComponent(value)
    const parts = decoded.split('|').map((s) => s?.trim() ?? '')
    const token = parts.length >= 3 ? `${parts[0]}|${parts[1]}` : parts[0]
    const t = token?.trim() || null
    return t && isLikelySanctumToken(t) ? t : null
  } catch {
    return null
  }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cookieStore = await cookies()
  const authToken = getAuthTokenFromCookie(cookieStore)
  const course = await getCourseDetailBySlug(slug, authToken)
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
  const cookieStore = await cookies()
  const authToken = getAuthTokenFromCookie(cookieStore)
  const [course, allCourses] = await Promise.all([
    getCourseDetailBySlug(slug, authToken),
    getCoursesWithDetails(20),
  ])
  if (!course) notFound()

  const relatedCourses = allCourses
    .filter((c) => c.slug && c.slug !== slug)
    .slice(0, 3)

  const pageTitle = course.course_details_left_content_area?.title ?? course.course_slug
  const coverImage = course.course_cover_image || '/placeholder-course.png'

  return (
    <div className="w-full font-poppins">
      {/* Course main image - full width on mobile, same as header on lg */}
      <div className="w-full max-w-[1600px] mx-auto px-0 lg:px-20 pt-6">
        <div className="relative w-full bg-[#EAF7E5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Course section - full width on mobile, same as header on lg */}
      <div className="w-full max-w-[1600px] mx-auto px-0 lg:px-20">
        <div className="rounded-[20px] px-0 lg:px-2 pt-6 pb-6 overflow-hidden">
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
