import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/api/academy'
import { sanitizeApiContent } from '@/lib/sanitizeApiContent'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return { title: 'Blog Not Found' }
  const title = blog.title ?? 'Blog'
  const description =
    typeof blog.excerpt === 'string'
      ? blog.excerpt.replace(/<[^>]*>/g, '').slice(0, 160)
      : undefined
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: blog.image_url ? [{ url: blog.image_url }] : undefined,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()

  const title = blog.title ?? 'Blog'
  const content = blog.details ?? blog.content ?? ''
  const coverImage = blog.image_url || '/placeholder-course.png'

  return (
    <div className="w-full font-poppins">
      {/* Blog image - same as course details: full width, same container as header */}
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

      <div className="w-full max-w-[1600px] mx-auto px-0 lg:px-20 pt-6 pb-12">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#065D80] mb-8">
          {title}
        </h1>
        <div
          className="mx-auto max-w-[1600px] px-0 lg:px-20 text-[#414141] font-medium text-base 2xl:text-lg leading-relaxed prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeApiContent(content) }}
        />
      </div>
    </div>
  )
}
