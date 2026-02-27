---
name: ""
overview: ""
todos: []
isProject: false
---

# Homepage links, cursor pointer, and modal behavior for /register, /enroll, /demo, /login

## 1. Current state

**Existing app routes:** Courses: `/courses/qurantutorCourses`, `/courses/otherCourses`. Offerings: `/offerings/workshops`, `/offerings/weeklySessions`, `/offerings/webinars`, `/offerings/specialSeries`, `/offerings/mentorship`. Media: `/media-center/blogs`, `/media-center/upcomingcourses`, `/media-center/podcasts`, `/media-center/testimonials`. Other: `/bookshop`, `/contact`, `/donations`, `/course-details/[slug]`.

**Modals:** The navbar already has (1) **LoginPopup** opened via custom event `cef-open-login-popup` (QuickActions "Student Login" uses this), and (2) **BookADemoPopup** opened only via navbar buttons (`setDemoOpen(true)`). There is no global event for opening the demo/signup modal.

**User request:** For `/register`, `/enroll`, and `/demo` — open the existing **Book a Demo / signup modal** (same as header "Book a Demo"). For `/login` — open the existing **login popup**.

---

## 2. Open demo modal for /register, /enroll, /demo and login popup for /login

### 2.1 Add global event for “open Book a Demo” modal

- **File:** [components/navbar/navbar.tsx](cef-online-academy/components/navbar/navbar.tsx)
- Add a `useEffect` that listens for a new custom event (e.g. `cef-open-demo-popup`). On fire: call `setDemoPreselectedCourse(null)` and `setDemoOpen(true)` so the same Book a Demo modal used by the header opens from anywhere.

### 2.2 Hero — “Register for Free Demo”

- **File:** [components/home/hero.tsx](cef-online-academy/components/home/hero.tsx)
- Replace the `<Link href="/register">` + Button with a client-side behavior that opens the demo modal. Options:
  - **A:** Extract the CTA into a small client component (e.g. `OpenDemoButton`) that renders the same button styling and on click dispatches `cef-open-demo-popup`; use it in the server-rendered hero.
  - **B:** Make the hero (or only the CTA block) a client component and use a `<button>` that dispatches `cef-open-demo-popup`.
- Do **not** navigate to `/register`; only open the modal.

### 2.3 QuickActions — Demo, Enroll, Student Login

- **File:** [components/home/quickActions.tsx](cef-online-academy/components/home/quickActions.tsx)
- **Student Login:** Already opens login popup via button + `cef-open-login-popup` (no change).
- **Demo** and **Enroll:** Today they use `<Link href={item.href}>` (e.g. `/demo`, `/enroll`). Change so that when the action is “Demo” or “Enroll”, render a `<button>` that dispatches `cef-open-demo-popup` (same styling as now), instead of a Link. That way “BOOK A FREE DEMO” and “CHOOSE & ENROLL” open the Book a Demo modal.

### 2.4 JoinCEF — “Enroll Now”

- **File:** [components/home/joincef.tsx](cef-online-academy/components/home/joincef.tsx)
- “Enroll Now” currently `<Link href="/enroll">`. Replace with a client behavior: either a client wrapper component that looks like the link/button and dispatches `cef-open-demo-popup`, or make the relevant block client and use a button that dispatches the event. No navigation to `/enroll`; only open the demo modal.

### 2.5 Mobile navigation sheet

- **File:** [components/navbar/navigation-sheet.tsx](cef-online-academy/components/navbar/navigation-sheet.tsx)
- The sheet already receives `onLoginOpen` and `onBookDemoOpen` from the navbar and uses them when present. The fallback `<Link href="/login">` and `<Link href="/book-demo">` are only used when those props are missing. Ensure the parent always passes `onLoginOpen` and `onBookDemoOpen` (navbar already does), so no change is strictly required unless there is another code path that renders the sheet without these props. If desired, remove the Link fallbacks and always use the button + callback so “Student Login” and “Book a Demo” never navigate.

---

## 3. Link all other homepage buttons/links to relevant pages


| Location                                                                                | Current                                       | Change to                                                                                                                                   |
| --------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [components/home/hero.tsx](cef-online-academy/components/home/hero.tsx)                 | `/courses`                                    | `/courses/qurantutorCourses`                                                                                                                |
| hero                                                                                    | `/offerings`                                  | `/offerings/workshops`                                                                                                                      |
| hero                                                                                    | `/news`                                       | `/media-center/upcomingcourses`                                                                                                             |
| hero                                                                                    | `/bookshop`                                   | Keep                                                                                                                                        |
| [components/home/quickActions.tsx](cef-online-academy/components/home/quickActions.tsx) | “Need Help?” `href="#"`                       | `/contact`                                                                                                                                  |
| quickActions fallback                                                                   | `href: '/courses'`                            | `/courses/qurantutorCourses`                                                                                                                |
| [components/home/whatsnew.tsx](cef-online-academy/components/home/whatsnew.tsx)         | `href="/news"`                                | `/media-center/upcomingcourses`                                                                                                             |
| [components/home/courses.tsx](cef-online-academy/components/home/courses.tsx)           | fallback `link: '/courses/quran-tutoring'`    | `/courses/qurantutorCourses`                                                                                                                |
| courses                                                                                 | fallback `link: '/courses/other'`             | `/courses/otherCourses`                                                                                                                     |
| [components/home/offerings.tsx](cef-online-academy/components/home/offerings.tsx)       | linkMap/fallbackOfferings (kebab, cef-series) | Use routes: `/offerings/weeklySessions`, `/offerings/specialSeries`, `/offerings/webinars`, `/offerings/workshops`, `/offerings/mentorship` |
| [components/home/joincef.tsx](cef-online-academy/components/home/joincef.tsx)           | `href="/donate"`                              | `/donations`                                                                                                                                |
| [components/home/review.tsx](cef-online-academy/components/home/review.tsx)             | `href="/mission-kirdaar"`                     | `/media-center/testimonials`                                                                                                                |
| [components/home/mkirdaar.tsx](cef-online-academy/components/home/mkirdaar.tsx)         | `href="/mission-kirdaar"`                     | `/media-center/testimonials`                                                                                                                |
| [components/home/blogpost.tsx](cef-online-academy/components/home/blogpost.tsx)         | `href="/blogs"`                               | `/media-center/blogs`                                                                                                                       |
| [components/home/podcasts.tsx](cef-online-academy/components/home/podcasts.tsx)         | `href="/podcasts"`                            | `/media-center/podcasts`                                                                                                                    |


---

## 4. Site-wide pointer cursor for clickables

- In [app/globals.css](cef-online-academy/app/globals.css), add:
  - `a, button, [role="button"] { cursor: pointer; }`
  - (Or inside `@layer base { ... }` with `@apply cursor-pointer`.)
- This gives pointer to all `<a>`, `<button>`, and `[role="button"]`. Disabled controls keep `cursor-not-allowed` via component classes. Decorative non-clickable elements (e.g. journey step cards) remain `<div>` without `role="button"` so they keep default cursor.

---

## 5. Files to touch (summary)

- **Modals and events**
  - [components/navbar/navbar.tsx](cef-online-academy/components/navbar/navbar.tsx) — add listener for `cef-open-demo-popup` → open Book a Demo modal.
- **Homepage: open modals instead of navigating**
  - [components/home/hero.tsx](cef-online-academy/components/home/hero.tsx) — Register CTA opens demo modal (client component or wrapper); fix courses/offerings/news links.
  - [components/home/quickActions.tsx](cef-online-academy/components/home/quickActions.tsx) — Demo & Enroll open demo modal; fix “Need Help?” to `/contact` and fallback courses href.
  - [components/home/joincef.tsx](cef-online-academy/components/home/joincef.tsx) — Enroll Now opens demo modal; Donate → `/donations`.
- **Homepage: fix other links**
  - [components/home/whatsnew.tsx](cef-online-academy/components/home/whatsnew.tsx), [components/home/courses.tsx](cef-online-academy/components/home/courses.tsx), [components/home/offerings.tsx](cef-online-academy/components/home/offerings.tsx), [components/home/review.tsx](cef-online-academy/components/home/review.tsx), [components/home/mkirdaar.tsx](cef-online-academy/components/home/mkirdaar.tsx), [components/home/blogpost.tsx](cef-online-academy/components/home/blogpost.tsx), [components/home/podcasts.tsx](cef-online-academy/components/home/podcasts.tsx) — as in table above.
- **Global cursor**
  - [app/globals.css](cef-online-academy/app/globals.css) — add cursor rule for `a`, `button`, `[role="button"]`.
- **Optional**
  - [components/navbar/navigation-sheet.tsx](cef-online-academy/components/navbar/navigation-sheet.tsx) — ensure Login and Book a Demo always use callbacks (no Link fallbacks) if you want consistency.

No new routes or pages required. `/register`, `/enroll`, `/demo` and `/login` are no longer used for navigation from the updated links; they open the existing signup/demo modal or login popup.