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

## 9) Forbidden in This App

- ❌ Hardcoding headless or cef-backend base URLs.
- ❌ Putting business logic (enrollment rules, pricing, cart calculations) in the Next.js app; these live in cef-backend.
- ❌ Duplicating content in code when it should come from headless (use collections and slugs).
- ❌ Calling cef-backend for **content** that belongs in headless (e.g. marketing copy, banners).
- ❌ Calling headless for **LMS or bookshop data** (courses, products, cart, enrollment); those come from cef-backend.
- ❌ Scattering API base URLs or endpoint paths across components; use the centralized API layer and config only.

---

## 10) Architecture Tag

Use in comments when editing this app:

`[MODULE: cef-online-academy]`

---

*For workspace-wide rules (cef.org.pk, headless, cef-backend, donation flows, etc.), see `../CURSOR_RULES.md`.*
