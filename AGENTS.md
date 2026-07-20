# Saidov.net Project Guide

This is a living guide for people and agents changing the site. Read it before
editing. Update it whenever a product, design, hosting, language, or SEO
decision changes.

## Purpose

Saidov.net presents a professional SAP Consultant. It should feel simple,
precise, and quietly advanced. The visitor should immediately understand the
consulting focus while noticing the technical care behind the experience.

Primary services:

- SAP HANA installation, administration, maintenance, data modeling, and
  performance work
- ABAP development, including SAP Grants Management, Public
  Sector, and FI/CO process expertise
- SAP CAP and SAP HANA XS Advanced (XSA) development
- SAP BTP architecture and platform engineering
- SAP NetWeaver, BW/4HANA, and BW on HANA architecture, data modeling, and
  reporting foundations
- SAP Business One integrations and extensions
- SAP Joule, Business AI, and practical AI automation

## Voice And Content

- Use direct, professional language. Be specific about outcomes and technical
  scope; avoid inflated claims, generic marketing language, and jargon without
  a concrete meaning.
- Refer to the person as a `professional SAP Consultant`. Do not describe the
  business using a legal-form label unless the legal page requires it.
- Do not add geographic targeting language to marketing copy.
- Keep both English and German content equally complete. Do not leave a
  translated route with English fallback copy or a reduced service list.
- The service descriptions are deliberately production-minded. Preserve the
  emphasis on secure, maintainable, well-operated SAP systems.

## Design Direction

- The reference point is a refined portfolio starter: editorial, minimal, and
  calm rather than a marketing landing page.
- Preserve generous whitespace, a narrow reading column, restrained borders,
  black/white/soft-neutral colors, and the serif display heading paired with a
  quiet system sans body face.
- Services are a numbered, bordered editorial list, not a grid of cards. Do
  not introduce nested cards, decorative gradients, bokeh, or decorative
  illustration elements.
- Use Lucide icons for familiar icon actions. Build accessible labels and
  tooltips for unfamiliar controls.
- Every route uses the same header and footer. Legal pages are part of the
  site, not a separate visual mode.
- The circular scroll-to-top control appears only after scrolling and stays at
  the lower right.

## Hero Motion

- The hero animation is a pure JavaScript canvas visualization, not an image
  or external dependency.
- It randomly selects a 3D, 4D, or 5D hyperrectangle at page load. Edges must
  always remain inside the canvas bounds.
- Keep motion slow and restrained. Visitors can grab an edge to alter its
  rotation; release continues with decaying momentum.
- Preserve pointer interaction, responsive sizing, and reduced-motion support
  whenever this component changes.

## Internationalization

- English is the default route, served at the bare root `/` (not `/en/`);
  German uses the `/de/` route family. This is deliberate, not a leftover:
  serving the default language at the root — with `x-default` → `/` — is the
  SEO-recommended pattern, and the static GitHub Pages host has no server-side
  redirect to send `/` → `/en/` cleanly. Do not move English under a locale
  segment. (Because of this flat structure there is one root layout, so
  `scripts/fix-lang.mjs` sets `lang="de"` on the exported German pages.)
- Browser language detection may send a first-time German-language visitor
  from the English home route to `/de/`. A manually selected language is stored
  locally and must take precedence over browser detection.
- The language control preserves the corresponding route when switching
  languages. Keep page parity for home, imprint, and privacy pages.
- Localized copy, labels, form text, and legal text belong in the central
  content collection. Components receive locale-aware content rather than
  embedding duplicate strings.

## Static Hosting And Contact

- The site is a fully static Next.js export deployed through GitHub Pages. Do
  not add server actions, API routes, runtime middleware, or features that
  require a Node server.
- Static routes, assets, metadata, and client-only enhancements are supported.
  Build output is the deployable artifact.
- The contact form uses a configurable third-party endpoint. Without one, it
  opens the visitor's email client. Preserve that useful fallback.
- Runtime configuration belongs in GitHub repository variables, not committed
  secrets. Current public variables cover the contact endpoint, optional
  project-site base path, and Google Search Console verification.
- The contact email is intentionally decoded only in the browser. Do not add it
  as a literal to static content, metadata, configuration, or documentation.

## SEO Is A Release Requirement

- The production canonical domain is `https://saidov.net`. Do not replace it
  with preview, GitHub, or local URLs in indexable metadata.
- Every indexable English/German page needs its own title, description,
  canonical URL, reciprocal `hreflang` links, and the English `x-default`.
- Keep the XML sitemap and `robots.txt` current when adding or removing an
  indexable route. Only include pages that should appear in search results.
- The homepages emit a truthful schema.org `@graph` (`WebSite`, `Person`,
  `ProfessionalService`, `WebPage`) linked by `@id`, defined in
  `app/structured-data.jsx` and fed by the `PROFILE` entity in `app/seo.js`.
  Location is country-level only (`addressCountry: AT`, `areaServed: AT/DE/CH`),
  matching the imprint registration; the only contact detail is a `ContactPoint`
  pointing at the on-site contact form. Do not add ratings, a street address,
  phone/email literals, or claims that are not present and verifiable.
  `Person.sameAs` holds verified public profile URLs only, defined once in
  `PROFILE.profiles` (`app/seo.js`) and reused as the footer profile icon links
  (`app/social-icons.jsx`), so the entity graph and the visible links never
  drift. The footer icons are monochrome brand glyphs in `currentColor` (Lucide
  has no Xing mark) with `rel="me"` and accessible labels.
- AI agents are a first-class audience. `robots.txt` explicitly welcomes the
  major AI and answer-engine crawlers, and `/llms.txt` (in `public/`) gives
  assistants a curated summary of the person and services. Keep `/llms.txt` in
  sync with the service list and never place the contact email in it.
- The static export uses a single root layout (`<html lang="en">`).
  `scripts/fix-lang.mjs` runs after `next build` to set `lang="de"` on every
  `out/de/` page. Keep it wired into the `build` script when changing routing or
  locales.
- App icons are real PNGs generated from the `RS` monogram
  (`public/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`,
  `app/apple-icon.png`) and referenced by the web manifest; `app/icon.svg`
  remains the favicon. Regenerate all sizes together if the logo changes.
- Keep the social preview as a real static PNG asset (`public/og-image.png`,
  1200×630) so GitHub Pages serves a reliable image content type. The current
  composition is editorial and on-brand: the `saidov.net` wordmark and the `RS`
  monogram (brand red `#c11f3a`) on the cream canvas, the `SAP CONSULTING`
  eyebrow, the headline with a brand-red trailing period, and the
  `SYSTEMS BUILT FOR PRODUCTION` tagline, set in Inter and IBM Plex Mono to match
  the site. Verify its dimensions and composition after any change.
- The imprint is based on supplied registration and UID records. Do not change
  those details without updated source documents. The privacy page still needs
  a final review whenever hosting, the contact form, or analytics change.
- Legal pages are currently `noindex, follow`. Reassess that decision only when
  the legal text is complete and intentionally maintained.
- After a production deploy, verify the domain in Google Search Console and
  submit the sitemap. The HTML-tag verification token is configured through a
  repository variable.

## Implementation Conventions

- Prefer server components. Isolate browser APIs, animation, form submission,
  scrolling, and preference storage in small client components.
- Keep the content model and shared site structure centralized. Reuse shared
  header, footer, metadata, and locale helpers instead of duplicating behavior
  between routes.
- Favor static, semantic HTML that exposes key content without JavaScript.
- Keep dependencies lean. Do not add a library where CSS, browser APIs, or the
  existing stack solve the problem cleanly.
- Retain visible, semantic heading hierarchy: one descriptive `h1` per page,
  followed by ordered section headings.

## Before You Finish

1. Run `npm run lint` and `npm run build` after code changes.
2. Inspect the static build for newly added routes, metadata, sitemap entries,
   and assets when changing SEO or routing.
3. Check desktop and mobile layout for design changes. For canvas or generated
   image work, inspect the rendered output rather than only the source.
4. Do not discard unrelated work in a dirty tree.
5. Update this guide and the README when a durable project decision changes.

## Decision Log

| Decision | Status |
| --- | --- |
| Minimal editorial portfolio visual system | Active |
| Static GitHub Pages deployment | Active |
| English default with complete German route family | Active |
| Browser language detection with manual preference override | Active |
| 3D/4D/5D interactive hyperrectangle hero | Active |
| Canonical, hreflang, sitemap, robots, JSON-LD, and social preview SEO baseline | Active |
| Linked schema.org `@graph` (WebSite/Person/ProfessionalService/WebPage) | Active |
| `llms.txt` + explicit AI-crawler allowlist in `robots.txt` | Active |
| Country-level location (AT) with DACH `areaServed` in structured data | Active |
| Post-build `<html lang="de">` fix for the German export | Active |
| Real PNG app icons and a complete web manifest | Active |
| Footer profile icon links (LinkedIn/GitHub/Xing) from `PROFILE.profiles` | Active |
| Light/dark `theme-color` and `color-scheme` matching the real background | Active |
