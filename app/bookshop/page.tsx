import React from 'react'
import { AboutHeader } from '@/components/common/aboutHeader'
import { getPageHeader } from '@/lib/api/pageHeaders'
import { mediaUrl } from '@/lib/headless'
import BookshopContent from './BookshopContent'

const Page = async () => {
  const header = await getPageHeader('bookshop-page')
  const title = header?.title ?? 'CEF Bookshop'
  const imageSrc = mediaUrl(header?.['header-image']) || '/1.png'

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <BookshopContent />
    </div>
  )
}

export default Page
