'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { PhoneInputWrapper } from '@/components/ui/phone-input'
import { CountrySelect } from '@/components/ui/country-select'
import {
  getCountries,
  getCoursesByType,
  getCoursesWithDetails,
  getTimeSlots,
  submitRegister,
  type CountryItem,
  type CourseItem,
  type CourseWithDetails,
  type TimeSlotItem,
  type RegisterPayload,
} from '@/lib/api/demo'
import { mediaUrl, stripHtml } from '@/lib/headless'
import { cn } from '@/lib/utils'
import { setAuthCookie } from '@/lib/auth-cookie'
import type { LoginSuccessContext } from '@/components/auth/LoginPopup'

function truncateToWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '…'
}

/** Map phone country ISO code to possible country names for syncing with backend country list */
const ISO_TO_COUNTRY_NAMES: Record<string, string[]> = {
  PK: ['Pakistan'],
  US: ['United States', 'United States of America'],
  GB: ['United Kingdom', 'Great Britain'],
  IN: ['India'],
  AE: ['United Arab Emirates'],
  SA: ['Saudi Arabia'],
  CA: ['Canada'],
  AU: ['Australia'],
  DE: ['Germany'],
  FR: ['France'],
  EG: ['Egypt'],
  BD: ['Bangladesh'],
  MY: ['Malaysia'],
  TR: ['Turkey'],
  IR: ['Iran'],
  AF: ['Afghanistan'],
  IQ: ['Iraq'],
  JO: ['Jordan'],
  KW: ['Kuwait'],
  QA: ['Qatar'],
  OM: ['Oman'],
  BH: ['Bahrain'],
  YE: ['Yemen'],
  SY: ['Syria'],
  LB: ['Lebanon'],
  PS: ['Palestine'],
  NG: ['Nigeria'],
  KE: ['Kenya'],
  ZA: ['South Africa'],
  CN: ['China'],
  JP: ['Japan'],
  KR: ['South Korea'],
  SG: ['Singapore'],
  ID: ['Indonesia'],
  PH: ['Philippines'],
  TH: ['Thailand'],
  VN: ['Vietnam'],
  NL: ['Netherlands'],
  ES: ['Spain'],
  IT: ['Italy'],
  RU: ['Russia'],
  BR: ['Brazil'],
  MX: ['Mexico'],
  AR: ['Argentina'],
}

const SLIDES = [
  { title: "Let's get your journey started!", sub: 'Choose your path' },
  { title: 'Live or self-paced learning', sub: 'We have both' },
  { title: 'One step closer to your goal', sub: 'Fill in your details' },
  { title: "You're all set!", sub: 'We will be in touch' },
]

export type PreselectedCourse = {
  course_id: number
  slug: string
  title: string
  image_url?: string | null
  short_description?: string
  courseType: 1 | 2
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  preselectedCourse?: PreselectedCourse | null
  /** When backend returns token on signup, run this with token + context to auto-complete next step (enroll/buy/live form). */
  onSignupSuccess?: (ctx: LoginSuccessContext) => void | Promise<void>
  /** Intent/courseId/slug passed from parent (e.g. when opened from course-details "Join Now") so onSignupSuccess can run the same next step. */
  signupSuccessContext?: Pick<LoginSuccessContext, 'intent' | 'courseId' | 'slug'>
}

export function BookADemoPopup({ open, onOpenChange, preselectedCourse, onSignupSuccess, signupSuccessContext }: Props) {
  const [step, setStep] = useState(1)
  const [slideIndex, setSlideIndex] = useState(0)
  const [countries, setCountries] = useState<CountryItem[]>([])
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [fullCourses, setFullCourses] = useState<CourseWithDetails[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlotItem[]>([])
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isPreselected = !!preselectedCourse

  // Form state
  const [courseType, setCourseType] = useState<1 | 2>(1)
  const [course, setCourse] = useState<number | ''>('')
  const [fullname, setFullname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState<number | ''>('')
  const [age, setAge] = useState('')
  const [schoolGrade, setSchoolGrade] = useState('')
  const [parentName, setParentName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [preferredTeacher, setPreferredTeacher] = useState('')
  const [howManyStudents, setHowManyStudents] = useState('')
  const [preferDate, setPreferDate] = useState('')
  const [preferSlot, setPreferSlot] = useState<number | ''>('')

  const resetForm = useCallback(() => {
    setStep(1)
    setSlideIndex(0)
    setCourseType(1)
    setCourse('')
    setFullname('')
    setPhone('')
    setEmail('')
    setCity('')
    setCountry('')
    setAge('')
    setSchoolGrade('')
    setParentName('')
    setPassword('')
    setPasswordConfirm('')
    setPreferredTeacher('')
    setHowManyStudents('')
    setPreferDate('')
    setPreferSlot('')
    setError(null)
    setSuccess(false)
  }, [])

  useEffect(() => {
    if (!open) return
    if (preselectedCourse) {
      setStep(3)
      setCourseType(preselectedCourse.courseType)
      setCourse(preselectedCourse.course_id)
      setSlideIndex(2)
      setFullname('')
      setPhone('')
      setEmail('')
      setCity('')
      setCountry('')
      setAge('')
      setSchoolGrade('')
      setParentName('')
      setPassword('')
      setPasswordConfirm('')
      setPreferredTeacher('')
      setHowManyStudents('')
      setPreferDate('')
      setPreferSlot('')
      setError(null)
      setSuccess(false)
    } else {
      resetForm()
    }
    setLoading(true)
    Promise.all([getCountries(), getTimeSlots(), getCoursesWithDetails(100)]).then(([c, s, fc]) => {
      setCountries(c)
      setTimeSlots(s)
      setFullCourses(fc)
      setLoading(false)
    })
  }, [open, preselectedCourse, resetForm])

  // Default country to Pakistan when countries load (same as phone default)
  useEffect(() => {
    if (countries.length === 0 || country !== '') return
    const pakistan = countries.find((c) => c.country_name.toLowerCase() === 'pakistan')
    if (pakistan) setCountry(pakistan.country_id)
  }, [countries, country])

  const syncCountryFromPhoneCountry = useCallback(
    (iso: string) => {
      const names = ISO_TO_COUNTRY_NAMES[iso]
      if (!names?.length) return
      const match = countries.find((c) =>
        names.some((n) => c.country_name.toLowerCase() === n.toLowerCase())
      )
      if (match) setCountry(match.country_id)
    },
    [countries]
  )

  useEffect(() => {
    if (!open) return
    if (preselectedCourse) {
      setCourses([{ course_id: preselectedCourse.course_id, course_name: preselectedCourse.title }])
      setLoading(false)
      return
    }
    setLoading(true)
    getCoursesByType(courseType).then((list) => {
      setCourses(list)
      setCourse('')
      setLoading(false)
    })
  }, [open, courseType, preselectedCourse])

  // Sync slide with step
  useEffect(() => {
    setSlideIndex(step - 1)
  }, [step])

  // Auto-rotate slides
  useEffect(() => {
    if (!open) return
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SLIDES.length)
    }, 3500)
    return () => clearInterval(t)
  }, [open])

  const canNextStep1 = true
  const canNextStep2 = course !== ''
  const isPhoneValid = phone.trim() === '' || isPossiblePhoneNumber(phone.trim().startsWith('+') ? phone.trim() : `+${phone.trim()}`)
  const canNextStep3 =
    fullname.trim() !== '' &&
    phone.trim() !== '' &&
    isPhoneValid &&
    email.trim() !== '' &&
    city.trim() !== '' &&
    country !== '' &&
    password.length >= 6 &&
    password === passwordConfirm &&
    (courseType !== 1 || (preferDate !== '' && preferSlot !== ''))

  const handleNext = () => {
    setError(null)
    if (step === 3 && phone.trim() !== '' && !isPossiblePhoneNumber(phone.trim().startsWith('+') ? phone.trim() : `+${phone.trim()}`)) {
      setError('Please enter a valid phone number for the selected country.')
      return
    }
    if (step < 4) setStep((s) => s + 1)
  }

  const handlePrev = () => {
    setError(null)
    if (isPreselected && step === 3) return
    if (step > 1) setStep((s) => s - 1)
  }

  const handleSubmit = async () => {
    setError(null)
    if (course === '' || country === '') {
      setError('Please complete all required fields.')
      return
    }
    const phoneValue = phone.trim().startsWith('+') ? phone.trim() : `+${phone.trim()}`
    if (!isPossiblePhoneNumber(phoneValue)) {
      setError('Please enter a valid phone number for the selected country.')
      return
    }
    const payload: RegisterPayload = {
      course_type: courseType,
      course: Number(course),
      fullname: fullname.trim(),
      phone: phoneValue,
      email: email.trim(),
      city: city.trim(),
      country: Number(country),
      password,
    }
    if (age) payload.age = parseInt(age, 10)
    if (schoolGrade) payload.school_grade = schoolGrade
    if (parentName) payload.parent_name = parentName
    if (courseType === 1) {
      if (preferDate) payload.preferDate = preferDate
      if (preferSlot !== '') payload.preferSlot = Number(preferSlot)
      if (preferredTeacher) payload.preferred_teacher = preferredTeacher
      if (howManyStudents) payload.how_many_students = parseInt(howManyStudents, 10)
    }
    if (preselectedCourse?.slug) payload.slug = preselectedCourse.slug
    setSubmitLoading(true)
    const res = await submitRegister(payload)
    setSubmitLoading(false)
    if (res.status && res.message) {
      setSuccess(true)
      if (res.token != null && res.role != null) {
        setAuthCookie(res.token, String(res.role), { fromLogin: true })
        if (onSignupSuccess) {
          try {
            await onSignupSuccess({
              token: res.token,
              role: String(res.role),
              ...signupSuccessContext,
            })
          } catch (err) {
            console.warn('[BookADemoPopup] onSignupSuccess error', err)
          }
        }
      }
      setTimeout(() => onOpenChange(false), 2500)
    } else {
      const raw =
        res.message ||
        (res.error && typeof res.error === 'object' && !Array.isArray(res.error) && res.error.message) ||
        (res.error && Array.isArray(res.error) ? res.error.join(' ') : null) ||
        (res.error && typeof res.error === 'object' && res.error.error ? Object.values(res.error.error).flat().join(' ') : null) ||
        (typeof res.error === 'string' ? res.error : '')
      const isServerError =
        typeof raw === 'string' &&
        (raw.includes('Symfony') ||
          raw.includes('Dsn') ||
          raw.includes('Argument #') ||
          raw.includes('vendor') ||
          raw.includes('.php') ||
          raw.includes('::') ||
          raw.includes('MailManager') ||
          raw.includes('must be of type'))
      const msg: string =
        isServerError
          ? 'Registration failed. Please try again.'
          : typeof raw === 'string'
            ? raw || 'Registration failed. Please try again.'
            : Array.isArray(raw)
              ? raw.join(' ') || 'Registration failed. Please try again.'
              : 'Registration failed. Please try again.'
      setError(msg)
    }
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-0 rounded-2xl [&>button]:absolute [&>button]:top-2 [&>button]:right-2 [&>button]:z-10 [&>button]:flex [&>button]:h-9 [&>button]:w-9 [&>button]:shrink-0 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-white/95 [&>button]:text-gray-900 [&>button]:shadow-md"
        showCloseButton={true}
      >
        <div className="flex flex-col md:flex-row min-h-0">
          {/* Left: Form */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto min-w-0">
            <DialogTitle className="sr-only">Book a Demo / Sign Up</DialogTitle>
            <h2 className="text-lg font-bold text-[#065D80] mb-1">
              Let&apos;s get your journey started!
            </h2>
            <p className="text-sm text-gray-600 mb-4">Please enter your details</p>

            {/* Progress */}
            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    step >= s ? 'bg-[#065D80] text-white' : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {s}
                </div>
              ))}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn('flex-1 h-0.5 max-w-4', step > i ? 'bg-[#065D80]' : 'bg-gray-200')}
                />
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                Registration successful! We will be in touch.
              </div>
            )}

            {/* Step 1: Course type (hidden when preselected from course details) */}
            {step === 1 && !isPreselected && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-800">Course type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="courseType"
                      checked={courseType === 1}
                      onChange={() => setCourseType(1)}
                      className="text-[#065D80]"
                    />
                    <span>Live</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="courseType"
                      checked={courseType === 2}
                      onChange={() => setCourseType(2)}
                      className="text-[#065D80]"
                    />
                    <span>Self Learning</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Course (hidden when preselected from course details) */}
            {step === 2 && !isPreselected && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-800">Select course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value ? Number(e.target.value) : '')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.course_id} value={c.course_id}>
                      {c.course_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (with country code) *</label>
                    <PhoneInputWrapper
                      value={phone}
                      onChange={(v) => setPhone(v ?? '')}
                      onCountryChange={(iso) => iso && syncCountryFromPhoneCountry(iso)}
                      placeholder="e.g. 300 1234567"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <CountrySelect
                      countries={countries}
                      value={country}
                      onChange={setCountry}
                      placeholder="Select country"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age (optional)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min={1}
                      max={100}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Age"
                    />
                  </div>
                </div>
                {courseType === 1 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred teacher</label>
                        <select
                          value={preferredTeacher}
                          onChange={(e) => setPreferredTeacher(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Either">Either</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">How many students?</label>
                        <input
                          type="number"
                          value={howManyStudents}
                          onChange={(e) => setHowManyStudents(e.target.value)}
                          min={1}
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                          placeholder="Number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred date *</label>
                      <input
                        type="date"
                        value={preferDate}
                        onChange={(e) => setPreferDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        min={new Date().toISOString().slice(0, 10)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred time slot *</label>
                      <select
                        value={preferSlot}
                        onChange={(e) => setPreferSlot(e.target.value ? Number(e.target.value) : '')}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((s) => (
                          <option key={s.slot_id} value={s.slot_id}>
                            {s.slot_time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password * (min 6)</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password *</label>
                    <input
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Confirm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Summary + Submit */}
            {step === 4 && (
              <div className="space-y-2 text-sm">
                <p><strong>Course type:</strong> {courseType === 1 ? 'Live' : 'Self Learning'}</p>
                <p><strong>Course:</strong> {preselectedCourse?.title ?? courses.find((c) => c.course_id === course)?.course_name ?? '-'}</p>
                <p><strong>Name:</strong> {fullname}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>City:</strong> {city}</p>
                {courseType === 1 && preferDate && (
                  <p><strong>Preferred date:</strong> {preferDate}</p>
                )}
                {courseType === 1 && preferSlot !== '' && (
                  <p><strong>Time slot:</strong> {timeSlots.find((s) => s.slot_id === preferSlot)?.slot_time ?? '-'}</p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrev}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium',
                  step === 1 || (isPreselected && step === 3) ? 'invisible' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                )}
              >
                Previous
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (step === 2 && !canNextStep2) ||
                    (step === 3 && !canNextStep3)
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#065D80] text-white hover:bg-[#054a66] disabled:opacity-50"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#8DC63F] text-white hover:bg-[#7ab535] disabled:opacity-50"
                >
                  {submitLoading ? 'Submitting...' : 'Sign Up'}
                </button>
              )}
            </div>
          </div>

          {/* Right: preselected course, or step 2 course preview, or slider */}
          {(() => {
            const displayCourse = preselectedCourse
              ? {
                  title: preselectedCourse.title,
                  image_url: preselectedCourse.image_url,
                  short_description: preselectedCourse.short_description,
                  description: preselectedCourse.short_description,
                }
              : course !== ''
                ? fullCourses.find((c) => c.id === Number(course))
                : null
            const isPreselectedFromCourseDetails = !!preselectedCourse && !!displayCourse
            return (
              <div className="w-full max-w-full md:w-72 shrink-0 bg-[#EAF7E5] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl flex flex-col justify-center p-4 sm:p-6 min-h-[200px] md:min-h-0 min-w-0">
                {displayCourse ? (
                  <div className="flex flex-col gap-3">
                    <div className={cn(
                      'relative w-full overflow-hidden bg-gradient-to-br from-[#065D80]/20 to-[#8DC63F]/20',
                      isPreselectedFromCourseDetails ? 'rounded-none' : 'aspect-[16/10] rounded-xl'
                    )}>
                      {displayCourse.image_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={typeof displayCourse.image_url === 'string' && displayCourse.image_url.startsWith('http') ? displayCourse.image_url : mediaUrl(displayCourse.image_url)}
                          alt=""
                          className={isPreselectedFromCourseDetails ? 'w-full h-auto object-contain' : 'object-cover w-full h-full'}
                        />
                      ) : (
                        <div className={cn(
                          'flex items-center justify-center text-[#065D80]/60 text-sm font-medium',
                          isPreselectedFromCourseDetails ? 'min-h-[120px] w-full' : 'absolute inset-0'
                        )}>
                          {displayCourse.title}
                        </div>
                      )}
                    </div>
                    <h3 className={cn(
                      'text-base font-semibold text-[#065D80]',
                      !isPreselectedFromCourseDetails && 'line-clamp-2'
                    )}>
                      {displayCourse.title}
                    </h3>
                    {!isPreselectedFromCourseDetails && (
                      <p className="text-[13px] leading-relaxed text-gray-700 line-clamp-4">
                        {truncateToWords(
                          stripHtml(
                            displayCourse.short_description ||
                              (displayCourse as CourseWithDetails).description ||
                              ''
                          ) || 'Explore this course.',
                          40
                        )}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="relative h-40 sm:h-48 md:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#065D80] to-[#8DC63F]">
                      {SLIDES.map((s, i) => (
                        <div
                          key={i}
                          className={cn(
                            'absolute inset-0 flex flex-col items-center justify-center text-white p-4 transition-opacity duration-500',
                            i === slideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          )}
                        >
                          <p className="text-base sm:text-lg font-bold text-center">{s.title}</p>
                          <p className="text-xs sm:text-sm opacity-90 mt-1">{s.sub}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-1 mt-3">
                      {SLIDES.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Slide ${i + 1}`}
                          className={cn(
                            'w-2 h-2 rounded-full transition-colors',
                            i === slideIndex ? 'bg-[#065D80]' : 'bg-gray-300'
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
