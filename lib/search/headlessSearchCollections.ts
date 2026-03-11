/**
 * Collections included in site-wide search (headless CMS).
 * Each is queried with ?search=term&limit= via headless API.
 * Slugs must match the headless API collection slugs used in lib/api/*.
 */

export type SearchCollectionConfig = {
  slug: string
  label: string
  titleFields: string[]
  getUrl: (content: Record<string, unknown>) => string
}

export const headlessSearchCollections: SearchCollectionConfig[] = [
  {
    slug: 'about-us',
    label: 'About Us',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about-us',
  },
  {
    slug: 'contact-us',
    label: 'Contact',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/contact-us',
  },
  {
    slug: 'blog-article',
    label: 'Blogs',
    titleFields: ['page-title', 'blog-title', 'title', 'description'],
    getUrl: () => '/media-center/blogs',
  },
  {
    slug: 'testimonials',
    label: 'Testimonials',
    titleFields: ['name', 'title', 'page-title'],
    getUrl: () => '/media-center/testimonials',
  },
  {
    slug: 'listen-and-learn',
    label: 'Podcasts',
    titleFields: ['title', 'page-title'],
    getUrl: () => '/media-center/podcasts',
  },
  {
    slug: 'faqs',
    label: 'FAQs',
    titleFields: ['question', 'title', 'page-title'],
    getUrl: () => '/contact-us',
  },
  {
    slug: 'teachers',
    label: 'Teachers',
    titleFields: ['name', 'page-title', 'title'],
    getUrl: () => '/about/teachers',
  },
  {
    slug: 'speakers',
    label: 'Speakers',
    titleFields: ['name', 'page-title', 'title'],
    getUrl: () => '/about/speakers',
  },
  {
    slug: 'accreditations',
    label: 'Programs',
    titleFields: ['page-title', 'title', 'name'],
    getUrl: () => '/about/programs',
  },
  {
    slug: 'our-story-section',
    label: 'About Us',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/vissionMissionValues',
  },
  {
    slug: 'vision-section',
    label: 'Vision, Mission & Values',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/vissionMissionValues',
  },
  {
    slug: 'mission-section',
    label: 'Vision, Mission & Values',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/vissionMissionValues',
  },
  {
    slug: 'values-section',
    label: 'Vision, Mission & Values',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/vissionMissionValues',
  },
  {
    slug: 'choose-us-section',
    label: 'Why Choose Us',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/whyChooseUs',
  },
  {
    slug: 'our-teachers-section',
    label: 'Teachers',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/teachers',
  },
  {
    slug: 'our-speakers-section',
    label: 'Speakers',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/speakers',
  },
  {
    slug: 'our-accreditations-section',
    label: 'Programs',
    titleFields: ['page-title', 'title'],
    getUrl: () => '/about/programs',
  },
]
