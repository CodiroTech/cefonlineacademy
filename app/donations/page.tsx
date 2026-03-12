import { getDonationsPageData, getDonationAccordionData } from '@/lib/api/donations'
import DonationsClient from './DonationsClient'

export const metadata = {
  title: 'Donations',
}

export default async function DonationsPage() {
  const [donationData, accordionData] = await Promise.all([
    getDonationsPageData(),
    getDonationAccordionData(),
  ])

  return (
    <DonationsClient
      donationData={donationData}
      accordionData={accordionData}
    />
  )
}
