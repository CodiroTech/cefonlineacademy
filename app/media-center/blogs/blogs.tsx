'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@/components/common/text'

type ArticleCardProps = {
  title: string
  description: string
  author: string
  image: string
  reverse?: boolean
  slug?: string | null
}

function ArticleCard({
  title,
  description,
  author,
  image,
  reverse = false,
  slug,
}: ArticleCardProps) {
  const content = (
    <>
      <div className="relative w-full lg:w-[24%] h-56 lg:h-58 mt-0 lg:-mt-11">
        <Image
          src={image}
          alt={title}
          fill
          className="lg:object-cover object-contain"
        />
      </div>
      <div className="w-full lg:w-[76%]">
        <h2 className="text-[#065D80] font-bold">{title}</h2>
        <Text className="text-justify text-[13px] lg:mt-6 font-medium leading-tight">
          {description}
        </Text>
        <p className="mt-4 ml-1 font-medium text-[#065D80]">By: {author}</p>
      </div>
    </>
  )

  const wrapperClass = `relative max-w-6xl mx-auto
    rounded-tr-[60px] rounded-bl-[60px]
    px-6 lg:px-14 py-4
    flex flex-col ${
      reverse ? 'lg:flex-row-reverse bg-[#EAF7E5]' : 'lg:flex-row bg-[#EAF4F6]'
    }
    items-center lg:items-start gap-3`

  return (
    <section className="w-full px-4 lg:px-0 py-8">
      {slug ? (
        <Link href={`/media-center/blogs/${slug}`} className={`block ${wrapperClass} hover:opacity-95 transition-opacity`}>
          {content}
        </Link>
      ) : (
        <div className={wrapperClass}>{content}</div>
      )}
    </section>
  )
}

const FALLBACK_ARTICLES: ArticleCardProps[] = [
  { title: 'Inspiring Minds at CEF Online Academy', description: "CEF Online Academy provides students with more than academic learning. Its programs connect revealed knowledge with acquired knowledge, fostering both spiritual understanding and practical skills.", author: 'Nabiha Waqar', image: '/Imspiring.png' },
  { title: 'Learning Beyond the Classroom', description: "At CEF Online Academy, education goes beyond memorization. Courses are designed to connect revealed knowledge with acquired knowledge, nurturing both intellect and character.", author: 'Rizwan Altaf', image: '/Learning.png', reverse: true },
  { title: 'Bridging Knowledge and Character', description: "CEF Online Academy bridges revealed knowledge and acquired knowledge, helping students grow intellectually, morally, and spiritually.", author: 'Kashif Khan', image: '/Bridging.png' },
]

export type InspiringMindsArticle = {
  title: string
  description: string
  author: string
  image: string
  reverse?: boolean
  slug?: string | null
}

type InspiringMindsSectionProps = {
  articles?: InspiringMindsArticle[] | null
}

export default function InspiringMindsSection({ articles }: InspiringMindsSectionProps) {
  const list = Array.isArray(articles) && articles.length > 0
    ? articles.map((a, i) => ({ ...a, reverse: i % 2 === 1 }))
    : FALLBACK_ARTICLES

  return (
    <div className="w-full font-poppins">
      {list.map((item, index) => (
        <ArticleCard key={item.slug ?? index} {...item} />
      ))}
    </div>
  )
}
