import { getDonationFAQPageData } from '@/lib/api/donations'
import DonationQueriesClient from './DonationQueriesClient'

export const metadata = {
  title: 'Donation Queries',
}

export default async function DonationQueriesPage() {
  const data = await getDonationFAQPageData()
  return <DonationQueriesClient data={data} />
}
