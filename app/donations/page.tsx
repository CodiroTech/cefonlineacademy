import { getDonationsPageData } from '@/lib/api/donations'
import DonationsClient from './DonationsClient'

export const metadata = {
  title: 'Donations',
}

export default async function DonationsPage() {
  const donationData = await getDonationsPageData()

  return <DonationsClient donationData={donationData} />
}
