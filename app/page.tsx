import { InsightsSection } from '@/components/home/blogpost'
import { CEFBookshopSection } from '@/components/home/bookshop'
import { OurCoursesSection } from '@/components/home/courses'
import { HallmarksOfExcellence } from '@/components/common/excellence'
import { Header } from '@/components/home/hero'
import { JoinCEFSection } from '@/components/home/joincef'
import { JourneyStepsSection } from '@/components/home/journey'
import { MissionKirdaarSection } from '@/components/home/mkirdaar'
// import { OtherOfferingsSection } from '@/components/home/offerings'
import { ListenLearnSection } from '@/components/home/podcasts'
import { QuickActions } from '@/components/home/quickActions'
import { TestimonialsSection } from '@/components/home/review'
import { WhatsNewSection } from '@/components/home/whatsnew'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { HelpDesk } from '@/components/common/HelpDesk'
import { getHomepageData } from '@/lib/api/homepage'

export default async function Home() {
  const data = await getHomepageData()

  return (
    <div>
      <Header hero={data.hero} steps={data.sliderSteps} />
      <QuickActions items={data.quickActions} />
      <WhatsNewSection unlockNew={data.unlockNew} latestCourses={data.latestCourses} />
      <WhyChooseUs stats={data.whyChooseUs} />
      <JourneyStepsSection steps={data.journeySteps} />
      <HallmarksOfExcellence heading="Hallmarks of Excellence" items={data.hallmarks} />
      <OurCoursesSection sections={data.courseSections} />
      {/* <OtherOfferingsSection items={data.offerings} /> */}
      <CEFBookshopSection data={data.bookshop} />
      <TestimonialsSection items={data.testimonials} />
      <MissionKirdaarSection items={data.missionKirdaar} />
      <InsightsSection />
      <ListenLearnSection items={data.listenLearn} />
      <JoinCEFSection data={data.joinCEF} />
      <HelpDesk items={data.helpDesk} />
    </div>
  )
}
