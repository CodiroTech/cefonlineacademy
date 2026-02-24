import React from 'react'
import Image from 'next/image'
import { AboutHeader } from '@/components/common/aboutHeader'
import { Podcasts } from './podcast'
import { OurWeeklySessions } from '@/app/offerings/weeklySessions/weeklylearningSessions'

const Page = () => {
  return (
    <div>
      <AboutHeader title="Podcast" imageSrc="/Podcast.png" />
      <Podcasts />
    </div>
  )
}

export default Page
