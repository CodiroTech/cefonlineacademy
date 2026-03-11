# Cursor Rules — cef-online-academy

This file is the **app-specific** reference for **cef-online-academy**. The workspace-level rules live in the repo root: `../CURSOR_RULES.md`. When working in this directory, follow both; this file contains the details that apply only to this app.

---

## 1) Role and Goal

- **Role:** Next.js LMS UI that **replaces** the current cef-backend Laravel Blade–based academy UI. All academy-facing UX (marketing, courses, enrollment, bookshop, student flows) will be served from this app.
- **Goal:** Everything API-driven. No hardcoded content or business logic. All data comes from either **headless** (content) or **cef-backend** (LMS, bookshop, auth). Same content pattern as **cef.org.pk**; different project ID and collection names for the academy.

---

## 2) Two Base URLs

- **Headless base URL**
  - **Use for:** All **content** (pages, menus, banners, marketing copy, media).
  - **Pattern:** Same as cef.org.pk: project UUID + collection slugs. **Different project ID** and collection names for the academy.
  - **Config:** Env (e.g. `NEXT_PUBLIC_HEADLESS_BASE_URL`). No hardcoded URLs.

- **cef-backend base URL**
  - **Use for:** **LMS and e‑commerce** (students, courses, search, enrollment, registration, bookshop product-list, cart, checkout, auth).
  - **Config:** Env (e.g. `NEXT_PUBLIC_BACKEND_API_URL` or equivalent). No hardcoded URLs.

- **Single config:** Centralize both base URLs (and project ID if needed) in one module (e.g. `lib/api/config.ts` or `config/api.ts`). All API calls use this config. Do not scatter base URLs across components or routes.

---

## 3) What Comes From Headless (Content API)

- **Source:** Headless CMS (ElmAPI). Same backend as cef.org.pk; **different project ID** and collection names.
- **Use for:**
  - Homepage hero, sections, banners, Why choose us, testimonials.
  - About, offerings, media center (blogs, podcasts, upcoming courses), CMS-driven pages.
  - Menus, footer links, site labels.
  - Images and media referenced by content.
- **Pattern:** Request by project UUID and collection/slug. Define collection names to match the academy design (e.g. `home-sections`, `about`, `offerings`, `bookshop-content`, `media-center`, etc.).
- **No business logic:** Headless returns content only. No pricing, enrollment, or cart logic.

---

## 4) What Comes From cef-backend (LMS + Bookshop APIs)

- **Source:** cef-backend Laravel APIs.
- **Use for:**
  - **Students:** Auth (login, register, profile), session, password reset.
  - **Courses:** List, detail, search, filters, categories.
  - **Enrollment / registration:** Enroll, unenroll, status, history.
  - **Bookshop:** Product list (product-list), product detail, categories, search.
  - **Cart & checkout:** Add to cart, update, remove, checkout, payment status (courses and bookshop).
  - **Other LMS:** Demos, schedules, tutors (if exposed), dashboard links.
- **Rule:** All LMS and bookshop **data and actions** go through cef-backend. This app does not implement enrollment logic, pricing, or cart rules; it only calls backend APIs and renders the response.

---

## 5) API Layer Structure

- **Headless client:** One module (e.g. `lib/api/headless.ts` or `api/headless/`) that reads headless base URL from config and exposes methods for projects/collections/content by slug or ID. Pages and components that need CMS content use this only.
- **Backend client:** One module (e.g. `lib/api/backend.ts` or `api/backend/`) that reads cef-backend base URL from config and exposes methods for auth, courses, search, enrollment, registration, bookshop (product-list, product detail, cart, checkout). Pages and components that need LMS or bookshop data use this only.
- **Routes and components:** Do not call fetch/axios with raw base URLs. They call the headless or backend API layer only.

---

## 6) Headless Project ID and Collection Names

- **Project ID:** The academy uses a **different project UUID** in headless than cef.org.pk. Configure via env (e.g. `NEXT_PUBLIC_HEADLESS_PROJECT_ID`) or in the headless API config.
- **Collection names:** Define and document names to match the academy design. When adding a new page or section, use the agreed collection/slug; do not invent new names without aligning with headless.
- **Consistency:** Same pattern as cef.org.pk: base URL + project + collection + slug/id. Only the project and collection names differ.

---

## 7) Replacing Laravel Blade UI

- **Target:** The current cef-backend Laravel Blade UI for academy (login, registration, course list/detail, enrollment, bookshop product-list, cart, checkout, etc.) will be **fully replaced** by this Next.js app.
- **Backend:** cef-backend remains the source of truth and exposes REST APIs. This app consumes existing (or extended) backend endpoints.
- **Headless:** Only content is served from headless; LMS and bookshop data are not in headless.

---

## 8) Cursor Behavior (When Implementing APIs Here)

1. **Identify data source:** Content → headless (project + collections). LMS / bookshop / auth → cef-backend.
2. **Use the right base:** Content calls use headless config; student/course/enrollment/bookshop calls use backend config. Never mix.
3. **Centralize:** New endpoints go through the headless or backend API layer; no ad‑hoc fetch with raw URLs in components.
4. **Env only:** Base URLs and project ID from env (or config that reads env). No hardcoded hostnames or paths.
5. **Follow cef.org.pk pattern for content:** Same request style (project, collection, slug); only project ID and collection names differ.
6. **Document exceptions:** If a flow must bypass this (e.g. special redirect), document it in this file or the app’s API doc.

---

## 9) Implementation Status (Reference)

*Summary of what is implemented for homepage, other pages, and site-wide content. Use for future work and debugging.*

### Config and env

- **`lib/config.ts`:** `headlessBaseUrl`, `headlessProjectId`, `backendBaseUrl`, `headlessApiToken`.
- **`.env.local`:** `NEXT_PUBLIC_HEADLESS_BASE_URL`, `NEXT_PUBLIC_HEADLESS_PROJECT_ID`, `NEXT_PUBLIC_BACKEND_BASE_URL`, `HEADLESS_API_TOKEN`. All headless requests use Bearer token from env.

### API layer (lib/)

- **`lib/headless.ts`:** Generic `fetchCollection(slug)`, `fetchSingleContent(collection, id?)`. Sends `Authorization: Bearer <token>`. Used by all headless fetchers.
- **`lib/backend.ts`:** `fetchBackend(path)` for cef-backend. Used for courses, blogs, products, search.
- **`lib/api/homepage.ts`:** `getHomepageData()` — aggregates all homepage headless + backend calls; returns hero, steps, journey, excellence, offerings, missionKirdaar, listenLearn, quickActions, whyChooseUs, helpDesk, latestCourses (from backend). Logs full API URLs and response summaries for debugging.
- **`lib/api/siteSettings.ts`:** `getSiteSettings()`, `buildSiteSettingsData()` — single content `site-settings` for logo, favicon, social links, footer text. Consumed by root layout and navbar/footer.
- **`lib/api/pageHeaders.ts`:** `getAboutPageHeader()`, `getMediaCenterPageHeader()`, `getContactPageHeader()`, `getPageHeader(slug)` — single content for page headers (title, header-image). Used by `app/api/page-header/route.ts` which applies static fallback titles when CMS data is missing.
- **`lib/api/about.ts`:** Story, Vision/Mission/Values, Teachers section + teachers, Speakers section + speakers, Accreditations section + accreditations, Choose Us section. Collections: `our-story-section` (145), `vision-section` (146), `mission-section` (147), `values-section` (148), `our-teachers-section` (149), `teachers` (150), `our-speakers-section` (151), `speakers` (152), `our-accreditations-section` (153), `accreditations` (154), `choose-us-section` (155).
- **`lib/api/mediaCenter.ts`:** Testimonials section header + testimonials (`testimonials-section` 133, `testimonial-items` 142), Listen & Learn / podcasts (`listen-and-learn` 136).
- **`lib/api/contact.ts`:** Contact info single (`contact-us` 160), FAQs list (`faqs` 161). Help desk items still from homepage API (reused).

### Homepage (`app/page.tsx`)

- **Data:** Single call to `getHomepageData()` from `lib/api/homepage.ts`.
- **From headless:** Hero (image, title, etc.), 4 Easy Steps, Journey steps, Hallmarks of Excellence, Our Courses section content, Other Offerings, Mission Kirdaar (media + optional video-url), Listen & Learn, Quick Actions, Why Choose Us counters, Help Desk items.
- **From cef-backend:** "Unlock What's New" — latest 2 courses from `/api/academy/courses` (limit 2).
- **Components:** All homepage sections receive props from page; each has fallbacks to original static content if API fails or is empty.

### Site-wide (layout, navbar, footer)

- **`app/layout.tsx`:** Async. Fetches `site-settings` via `getSiteSettings()` / `buildSiteSettingsData()`. Passes navbar data (header-logo, social links) and footer data (header-logo, footer-text) to `Navbar01Page` and `Footer`. `generateMetadata()` sets favicon from site-settings.
- **Navbar:** Logo from `data['header-logo']?.full_url`, social links from same API; fallbacks to defaults.
- **Footer:** Logo and footer text from API; fallbacks to defaults.

### Page header (green banner)

- **Source:** Headless page-level collections: `title` and `header-image` from the collection mapped to the current path. Fetched via `GET /api/page-header?path=<pathname>` (client-side from navbar).
- **API:** `app/api/page-header/route.ts` maps pathname to a headless slug via `getSlugOrFetcher`, then calls `getAboutPageHeader()` / `getMediaCenterPageHeader()` / `getContactPageHeader()` or `getPageHeader(slug)` from `lib/api/pageHeaders.ts`. Returns `{ title, imageSrc }`; when headless returns no title or empty title, static fallback titles are used so the banner always shows for mapped paths.
- **Fallbacks:** Static fallback titles live in the route: per-key (e.g. `about`, `contact`, `bookshop-page`, `blogs-page`, offerings pages) and path-specific for about sub-pages (e.g. `/about/teachers` → "Meet Our Teachers", `/about/vissionMissionValues` → "Vision, Mission & Values"). Default image when headless has no `header-image`: `/About Us Header.png`.
- **Path-to-slug mapping:** `about/*` → about-us; `contact` → contact-us; `media-center` (incl. podcasts, testimonials) → media-center; `media-center/blogs` → blogs-page; `media-center/upcomingcourses` → upcoming-courses-page; `bookshop` → bookshop-page; `courses/quran-tutoring-courses` → quran-tutoring-courses-page; `courses/other-courses` → other-courses-page; `course-details/*` → course-details; `offerings/mentorship` → mentorship-page; same pattern for webinars, specialSeries, weeklySessions, workshops.

### Other pages (content from headless)

- **About**
  - **`/about/vissionMissionValues`:** Page header (about-us) + our-story-section, vision-section, mission-section, values-section. Components: `AboutHeader`, `OurStorySection`, `VisionMissionValues`.
  - **`/about/teachers`:** Page header + our-teachers-section (header, from headless) + teachers list (from cef-backend `GET /api/academy/instructors`; fallback to headless `teachers` collection if backend returns empty). Component: `MeetOurTeachersSection`.
  - **`/about/speakers`:** Page header + our-speakers-section (header) + speakers list. Component: `MeetOurSpeakers`.
  - **`/about/programs`:** Page header + our-accreditations-section (header) + accreditations list. Component: `OurPrograms`.
  - **`/about/whyChooseUs`:** Page header + choose-us-section (header) + Hallmarks of Excellence (same as homepage). Components: `ChooseUs`, `HallmarksOfExcellence`.
- **Media Center**
  - **`/media-center/testimonials`:** Page header (media-center) + testimonials-section (header) + testimonial-items. Components: `Testimonials`, `StudentTestimonials`.
  - **`/media-center/podcasts`:** Page header + listen-and-learn collection (section title/description + items). Component: `Podcasts`.
- **Contact**
  - **`/contact`:** Page header (contact-us) + contact info (address, phone, email, description), FAQs list, Help Desk (from homepage API). Components: `AboutHeader`, `OfficeInfoSection` (contactHeader), `FAQSection`, `HelpDesk`, plus static contact form.

### Backend API endpoints used (cef-backend)

- **`GET /api/academy/courses`:** List courses (homepage uses `?limit=2` for latest).
- **`GET /api/academy/instructors`:** List featured, approved instructors (same as backend homepage "Teachers Who Inspire"); used by `/about/teachers` for the teachers list. Section title/description for that page come from headless `our-teachers-section`.
- **`GET /api/academy/blogs`:** (Planned for blog listing.)
- **`GET /api/academy/products`:** (Planned for bookshop.)
- **`GET /api/academy/search`:** (Planned for global search.)

### Headless collections reference (project ID 3)

- **Homepage:** site-settings (121), homepage-hero-section (122), how-it-works (124), journey (128), hallmarks-of-excellence (129), our-courses (130), offerings (131), mission-kirdaar (134), listen-and-learn (136), join-cef (137), why-choose-us (127), footer-help-desk (143), unlock-new (126) + homepage sections (141).
- **Page headers (title + header-image):** about-us (158), media-center (159), contact-us (160), course-details (162), bookshop-page (163), quran-tutoring-courses-page (164), other-courses-page (165), upcoming-courses-page (166), blogs-page (167), workshops-page (168), weekly-sessions-page (169), webinars-page (170), special-series-page (171), mentorship-page (172). Faqs (161) has header fields but is not currently used for a standalone page header route.
- **About:** our-story-section (145), vision-section (146), mission-section (147), values-section (148), our-teachers-section (149), teachers (150), our-speakers-section (151), speakers (152), our-accreditations-section (153), accreditations (154), choose-us-section (155).
- **Media / Contact:** testimonials-section (133), testimonial-items (142), listen-and-learn (136), contact-us (160), faqs (161).

### Reusable UI

- **`components/common/VideoPopup.tsx`:** Modal for video playback (YouTube, Vimeo, Google Drive, direct MP4). Used by Mission Kirdaar when `video-url` is set; reusable site-wide.
- **`lib/videoUrl.ts`:** `parseVideoUrl(url)` for embed/src URLs.

### SQL / CMS data

- **`missing-headless-fields.sql`:** Homepage-related missing fields (e.g. video-url, link on offerings, etc.).
- **`remaining-pages-headless.sql`:** Missing fields for remaining pages (teachers/speakers/accreditations `link`, faqs `question`/`answer`, contact-us `address`/`phone`/`email`/`description`) and content entries (IDs 789–831) for page headers, story/vision/mission/values, teachers, speakers, accreditations, choose-us, testimonials header, contact info, FAQs, podcasts placeholder. Field IDs in that file start at 1008 (after 1001–1007 used by site-settings in current db).

---

## 10) Forbidden in This App

- ❌ Hardcoding headless or cef-backend base URLs.
- ❌ Putting business logic (enrollment rules, pricing, cart calculations) in the Next.js app; these live in cef-backend.
- ❌ Duplicating content in code when it should come from headless (use collections and slugs).
- ❌ Calling cef-backend for **content** that belongs in headless (e.g. marketing copy, banners).
- ❌ Calling headless for **LMS or bookshop data** (courses, products, cart, enrollment); those come from cef-backend.
- ❌ Scattering API base URLs or endpoint paths across components; use the centralized API layer and config only.

---

## 11) Architecture Tag

Use in comments when editing this app:

`[MODULE: cef-online-academy]`

---

*For workspace-wide rules (cef.org.pk, headless, cef-backend, donation flows, etc.), see `../CURSOR_RULES.md`.*
