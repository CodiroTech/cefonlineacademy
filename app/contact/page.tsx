import { AboutHeader } from '@/components/common/aboutHeader'
import FAQSection from './faq'
import OfficeInfoSection from './contactHeader'
import ContactSection from './form'
import { HelpDesk } from './desk'
import { getContactPageData } from '@/lib/api/contact'
import { getContactPageHeader } from '@/lib/api/pageHeaders'
import { getHelpDeskItems } from '@/lib/api/homepage'
import { mediaUrl } from '@/lib/headless'

export default async function ContactPage() {
  const [pageHeader, pageData, helpDeskItems] = await Promise.all([
    getContactPageHeader(),
    getContactPageData(),
    getHelpDeskItems(),
  ])

  return (
    <div>
      <AboutHeader
        title={pageHeader?.title ?? 'Contact Us'}
        imageSrc={mediaUrl(pageHeader?.['header-image'], '/Kid.png')}
      />
      <OfficeInfoSection data={pageData.contactInfo} />
      <FAQSection faqs={pageData.faqs} />
      <ContactSection />
      <HelpDesk items={helpDeskItems} />
    </div>
  )
}
