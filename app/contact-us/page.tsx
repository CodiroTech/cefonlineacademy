import FAQSection from './faq'
import OfficeInfoSection from './contactHeader'
import ContactSection from './form'
import { HelpDesk } from './desk'
import { getContactPageData } from '@/lib/api/contact'
import { getHelpDeskItems } from '@/lib/api/homepage'
import { getSiteSettings, buildSiteSettingsData } from '@/lib/api/siteSettings'

export default async function ContactUsPage() {
  const [pageData, helpDeskItems, settings] = await Promise.all([
    getContactPageData(),
    getHelpDeskItems(),
    getSiteSettings(60),
  ])
  const siteData = buildSiteSettingsData(settings)

  const socialUrls = {
    'facebook-url': siteData['facebook-url'],
    'insta-url': siteData['insta-url'],
    'youtube-url': siteData['youtube-url'],
    'linkedin-url': siteData['linkedin-url'],
  }

  return (
    <div>
      <OfficeInfoSection data={pageData.contactInfo} />
      <FAQSection faqs={pageData.faqs} />
      <ContactSection socialUrls={socialUrls} />
      <HelpDesk items={helpDeskItems} />
    </div>
  )
}
