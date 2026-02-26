import { redirect } from 'next/navigation'

/** Redirect legacy /desc to courses listing (per plan). */
export default function DescPage() {
  redirect('/courses')
}
