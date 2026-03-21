# Donations Page – Headless API Reference

The donations page loads **one** collection from the headless API. All sections are **API-bound**; if a field is empty or the relation has no entries, that section will not render.

## Endpoint

- **URL:** `GET {NEXT_PUBLIC_HEADLESS_BASE_URL}/{NEXT_PUBLIC_HEADLESS_PROJECT_ID}/donations?populate[donation-banks-relation]=*`  
  When `NEXT_PUBLIC_HEADLESS_PROJECT_ID` is **not** set, the path is `{BASE}/donations?...` (no project segment).
- **Auth:** If `HEADLESS_API_TOKEN` is set, requests send `Authorization: Bearer …` (same as other headless calls).
- **Response:** Single donation page object (or array; the app uses the first item). Bank rows may be returned as a flat array, as numeric IDs (resolved via `donation-banks` collection), or as Strapi-style `{ data: [{ id, attributes }] }` — the app normalizes all of these.

**Donation FAQs page:** `GET {BASE}/{projectId}/donation-faqs` (or `{BASE}/donation-faqs` without project ID), with the same optional Bearer token.

## Collection / field mapping

Use this to check and populate data in your headless CMS (e.g. Strapi “Donations” collection).

| Section on page | Headless field / relation | Type | Notes |
|-----------------|---------------------------|------|--------|
| **Header image** (girl in green scarf) | `header-image` | Media (single) | URL string or `{ full_url: "..." }`. If missing, header still shows but without image. |
| **Intro paragraph** | `donation-desc` | Rich text / HTML | “Join CEF’s mission…” – sanitized before render. |
| **“For General Donations” table** | `donation-banks-relation` | Relation (repeatable) | Filter where `donation-type === "General Donation"`. |
| **“For Zakat Donations” table** | `donation-banks-relation` | Relation (repeatable) | Filter where `donation-type === "Zakat Donation"`. |
| **Certificate / Fatwa image** | `image` | Media (single) | `image.full_url`. If missing, sidebar with “View Fatwa for Zakat” is hidden. |
| **Legal notice box** (teal bar) | `donations-info` | Text | e.g. “CEF is registered under Section 42…”. |
| **Contact line** (e.g. “For queries…”) | `quires-support` | Text | Fallback: “For queries and support, call us at +92 300 0444734”. |

## Bank relation item shape (`donation-banks-relation`)

Each item should have:

- `donation-type`: `"General Donation"` or `"Zakat Donation"`
- `bank-name`: string
- `account-title`: string
- `iban`: string

Optional: `id`, `locale`.

## Why sections might be missing

- **No intro text:** `donation-desc` is empty or not set.
- **No bank tables:** `donation-banks-relation` is empty, or no item has `donation-type` exactly `"General Donation"` or `"Zakat Donation"`.
- **No certificate block:** `image` is not set or has no `full_url`.
- **No notice bar:** `donations-info` is empty.

Check the **Donations** collection in headless and ensure these fields (and the relation) are filled. The “Donate Online Now” block (DonationSection2) is always rendered and does not depend on this API.
