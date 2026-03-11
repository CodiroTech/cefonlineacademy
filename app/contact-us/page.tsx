import FAQSection from './faq'
import OfficeInfoSection from './contactHeader'
import ContactSection from './form'
import { HelpDesk } from './desk'
import { getContactPageData } from '@/lib/api/contact'
import { getHelpDeskItems } from '@/lib/api/homepage'

export default async function ContactUsPage() {
  const [pageData, helpDeskItems] = await Promise.all([
    getContactPageData(),
    getHelpDeskItems(),
  ])

  return (
    <div>
      <OfficeInfoSection data={pageData.contactInfo} />
      <FAQSection faqs={pageData.faqs} />
      <ContactSection />
      <HelpDesk items={helpDeskItems} />
    </div>
  )
}
