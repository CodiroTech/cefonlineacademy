'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@/components/common/text'
import { stripHtml } from '@/lib/headless'
import type { BackendBlogItem } from '@/lib/api/academy'

type BlogListFromBackendProps = {
  blogs: BackendBlogItem[]
}

export function BlogListFromBackend({ blogs }: BlogListFromBackendProps) {
  if (!blogs.length) return null

  return (
    <section className="w-full px-4 lg:px-12 py-8 font-poppins">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#065D80] mb-6">Latest from the blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            const href = blog.slug ? `/media-center/blogs/${blog.slug}` : `/media-center/blogs/${blog.id}`
            const imageUrl = blog.image_url || '/placeholder-course.png'
            return (
              <Link key={blog.id} href={href} className="group block bg-[#EAF7E5] rounded-[20px] overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={imageUrl}
                    alt={blog.title ?? 'Blog'}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[#065D80] font-bold line-clamp-2">{blog.title}</h3>
                  <Text className="text-sm mt-2 line-clamp-2">{stripHtml(blog.excerpt ?? blog.content ?? '')}</Text>
                  {blog.author && (
                    <p className="mt-2 text-sm text-[#065D80] font-medium">By {blog.author}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
