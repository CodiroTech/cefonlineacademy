import { notFound } from 'next/navigation'
import { getPolicyById } from '@/lib/api/policies'
import { sanitizeApiContent } from '@/lib/sanitizeApiContent'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const policy = await getPolicyById(Number(id))
  if (!policy) return { title: 'Policy Not Found' }
  const title = policy.title ?? 'Policy'
  const description =
    typeof policy.description === 'string'
      ? policy.description.replace(/<[^>]*>/g, '').trim().slice(0, 160)
      : undefined
  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function PolicyPage({ params }: Props) {
  const { id } = await params
  const policy = await getPolicyById(Number(id))
  if (!policy) notFound()

  const title = policy.title ?? 'Policy'
  const description = policy.description ?? ''

  return (
    <div className="w-full font-poppins">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 pt-8 pb-12">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#065D80] mb-8">
          {title}
        </h1>
        <div
          className="mx-auto max-w-[1600px] px-0 lg:px-20 text-[#414141] font-medium text-base 2xl:text-lg leading-relaxed prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeApiContent(description) }}
        />
      </div>
    </div>
  )
}
