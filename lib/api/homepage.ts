import { fetchCollection, fetchSingleContent, type HeadlessMedia } from '../headless'
import { fetchBackend } from '../backend'

// --------------- Types ---------------

export type HeroSection = {
  title: string
  description: string
  image: HeadlessMedia
}

export type SliderStep = {
  step: string
  title: string
  'step-description': string
  icon: HeadlessMedia
}

export type JourneyStep = {
  title: string
  text: string
  icon: HeadlessMedia
}

export type QuickAction = {
  heading: string
  'button-text': string
  icon: HeadlessMedia
}

export type WhyChooseUsStat = {
  number: string
  text: string
  icon: HeadlessMedia
}

export type HallmarkItem = {
  icon: HeadlessMedia
  title: string
  description: string
}

export type OfferingItem = {
  image: HeadlessMedia
  title: string
  description: string
}

export type BookshopSection = {
  image: HeadlessMedia
  title: string
  description: string
}

export type MissionKirdaarItem = {
  title: string
  description: string
  media: HeadlessMedia
  'video-url'?: string
}

export type JoinCEFSection = {
  title: string
  description: string
}

export type TestimonialItem = {
  image: HeadlessMedia
  name: string
  country: string
  text: string
}

export type HelpDeskItem = {
  icon: HeadlessMedia
  title: string
}

export type UnlockNewSection = {
  title: string
  'unlock-description': string
}

export type ListenLearnItem = {
  title: string
  description: string
  image?: HeadlessMedia
  'video-url'?: string
}

export type OurCourseItem = {
  image?: HeadlessMedia
  heading?: string
  description?: string
}

// --------------- Fetch functions ---------------

export async function getHeroSection() {
  return fetchSingleContent<HeroSection>('homepage-hero-section')
}

export async function getSliderSteps() {
  return fetchCollection<SliderStep>('slider-4-steps')
}

export async function getJourneySteps() {
  return fetchCollection<JourneyStep>('journey')
}

export async function getQuickActions() {
  return fetchCollection<QuickAction>('how-it-works')
}

export async function getWhyChooseUsStats() {
  return fetchCollection<WhyChooseUsStat>('why-choose-us')
}

export async function getHallmarks() {
  return fetchCollection<HallmarkItem>('hallmarks-of-excellence')
}

export async function getOfferings() {
  return fetchCollection<OfferingItem>('offerings')
}

export async function getBookshopSection() {
  return fetchSingleContent<BookshopSection>('bookshop')
}

export async function getMissionKirdaar() {
  return fetchCollection<MissionKirdaarItem>('mission-kirdaar')
}

export async function getJoinCEF() {
  return fetchSingleContent<JoinCEFSection>('join-cef')
}

export async function getTestimonials() {
  return fetchCollection<TestimonialItem>('testimonials')
}

export async function getHelpDeskItems() {
  return fetchCollection<HelpDeskItem>('footer-help-desk')
}

export async function getUnlockNew() {
  return fetchSingleContent<UnlockNewSection>('unlock-new')
}

export async function getListenLearnItems() {
  return fetchCollection<ListenLearnItem>('listen-and-learn')
}

export async function getCourseSections() {
  return fetchCollection<OurCourseItem>('our-courses')
}

// --------------- Backend (cef-backend) ---------------

export type BackendCourseItem = {
  id: number
  uuid?: string
  title: string
  slug?: string
  short_description?: string
  description?: string
  image_url?: string | null
}

type BackendCoursesResponse = { success?: boolean; data?: BackendCourseItem[] }

export async function getLatestCoursesFromBackend(limit = 2): Promise<BackendCourseItem[]> {
  const res = await fetchBackend<BackendCoursesResponse>(
    `/academy/courses?limit=${limit}&sort=newest`,
  )
  const list = res?.data
  return Array.isArray(list) ? list : []
}

// --------------- Aggregate fetch ---------------

export async function getHomepageData() {
  const [
    hero,
    sliderSteps,
    journeySteps,
    quickActions,
    whyChooseUs,
    hallmarks,
    offerings,
    bookshop,
    missionKirdaar,
    joinCEF,
    testimonials,
    helpDesk,
    unlockNew,
    listenLearn,
    courseSections,
    latestCourses,
  ] = await Promise.all([
    getHeroSection(),
    getSliderSteps(),
    getJourneySteps(),
    getQuickActions(),
    getWhyChooseUsStats(),
    getHallmarks(),
    getOfferings(),
    getBookshopSection(),
    getMissionKirdaar(),
    getJoinCEF(),
    getTestimonials(),
    getHelpDeskItems(),
    getUnlockNew(),
    getListenLearnItems(),
    getCourseSections(),
    getLatestCoursesFromBackend(2),
  ])

  // Debug: log full data from each headless API (see terminal running `next dev`)
  const debugFull = (key: string, value: unknown) => {
    console.log(`\n---------- [homepage API] ${key} ----------`)
    if (value == null) {
      console.log('null/undefined')
      return
    }
    try {
      console.log(JSON.stringify(value, null, 2))
    } catch {
      console.log(value)
    }
  }
  debugFull('hero', hero)
  debugFull('sliderSteps', sliderSteps)
  debugFull('journeySteps', journeySteps)
  debugFull('quickActions', quickActions)
  debugFull('whyChooseUs', whyChooseUs)
  debugFull('hallmarks', hallmarks)
  debugFull('offerings', offerings)
  debugFull('bookshop', bookshop)
  debugFull('missionKirdaar', missionKirdaar)
  debugFull('joinCEF', joinCEF)
  debugFull('testimonials', testimonials)
  debugFull('helpDesk', helpDesk)
  debugFull('unlockNew', unlockNew)
  debugFull('listenLearn', listenLearn)
  debugFull('courseSections', courseSections)

  return {
    hero,
    sliderSteps,
    journeySteps,
    quickActions,
    whyChooseUs,
    hallmarks,
    offerings,
    bookshop,
    missionKirdaar,
    joinCEF,
    testimonials,
    helpDesk,
    unlockNew,
    listenLearn,
    courseSections,
    latestCourses,
  }
}
