import React from 'react'
import { AboutHeader } from '@/components/common/aboutHeader'
import BookshopContent from './BookshopContent'

const Page = () => {
  return (
    <div>
      <AboutHeader title="CEF Bookshop" imageSrc="/1.png" />
      <BookshopContent />
    </div>
  )
}

export default Page
