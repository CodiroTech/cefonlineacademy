import { fetchCollection, fetchSingleContent, type HeadlessMedia } from '../headless'

// --------------- Types ---------------

export type StorySection = {
  title: string
  description: string
  images?: HeadlessMedia | HeadlessMedia[]
}

export type VisionSection = {
  title: string
  description: string
  image?: HeadlessMedia
}

export type MissionSection = {
  title: string
  description: string
  image?: HeadlessMedia
}

export type ValuesSection = {
  title: string
  description: string
  image?: HeadlessMedia
}

export type TeachersSectionHeader = {
  title: string
  description: string
}

export type TeacherItem = {
  image?: HeadlessMedia
  name: string
  designation: string
  description: string
  link?: string
}

export type SpeakersSectionHeader = {
  title: string
  description: string
}

export type SpeakerItem = {
  image?: HeadlessMedia
  name: string
  designation: string
  description: string
  link?: string
}

export type AccreditationsSectionHeader = {
  title: string
  description: string
}

export type AccreditationItem = {
  image?: HeadlessMedia
  name: string
  title: string
  description: string
  link?: string
}

export type ChooseUsSectionHeader = {
  title: string
  description: string
}

export type ChooseUsItem = {
  icon?: HeadlessMedia
  title: string
  description: string
}

// --------------- Fetch functions ---------------

export async function getStorySection() {
  return fetchSingleContent<StorySection>('our-story-section')
}

export async function getVisionSection() {
  return fetchSingleContent<VisionSection>('vision-section')
}

export async function getMissionSection() {
  return fetchSingleContent<MissionSection>('mission-section')
}

export async function getValuesSection() {
  return fetchSingleContent<ValuesSection>('values-section')
}

export async function getTeachersSectionHeader() {
  return fetchSingleContent<TeachersSectionHeader>('our-teachers-section')
}

export async function getTeachers() {
  return fetchCollection<TeacherItem>('teachers')
}

export async function getSpeakersSectionHeader() {
  return fetchSingleContent<SpeakersSectionHeader>('our-speakers-section')
}

export async function getSpeakers() {
  return fetchCollection<SpeakerItem>('speakers')
}

export async function getAccreditationsSectionHeader() {
  return fetchSingleContent<AccreditationsSectionHeader>('our-accreditations-section')
}

export async function getAccreditations() {
  return fetchCollection<AccreditationItem>('accreditations')
}

export async function getChooseUsSectionHeader() {
  return fetchSingleContent<ChooseUsSectionHeader>('choose-us-section')
}

export async function getChooseUsItems() {
  return fetchCollection<ChooseUsItem>('choose-us')
}

// --------------- Aggregate fetchers ---------------

export async function getVisionMissionValuesPageData() {
  const [story, vision, mission, values] = await Promise.all([
    getStorySection(),
    getVisionSection(),
    getMissionSection(),
    getValuesSection(),
  ])
  return { story, vision, mission, values }
}

export async function getTeachersPageData() {
  const [sectionHeader, teachers] = await Promise.all([
    getTeachersSectionHeader(),
    getTeachers(),
  ])
  return { sectionHeader, teachers }
}

export async function getSpeakersPageData() {
  const [sectionHeader, speakers] = await Promise.all([
    getSpeakersSectionHeader(),
    getSpeakers(),
  ])
  return { sectionHeader, speakers }
}

export async function getAccreditationsPageData() {
  const [sectionHeader, accreditations] = await Promise.all([
    getAccreditationsSectionHeader(),
    getAccreditations(),
  ])
  return { sectionHeader, accreditations }
}

export async function getWhyChooseUsPageData() {
  const [sectionHeader, items] = await Promise.all([
    getChooseUsSectionHeader(),
    getChooseUsItems(),
  ])
  return { sectionHeader, items }
}
