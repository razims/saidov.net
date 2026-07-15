# Saidov.net

Personal website for a professional SAP Consultant providing SAP HANA system
installation, administration and maintenance, ABAP
development, SAP CAP and XSA, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP
Joule and Business AI services.

## Project Guide

Read [AGENTS.md](AGENTS.md) before changing the site. It records the product,
design, localization, hosting, and SEO decisions that should remain consistent.

## Development

```bash
npm install
npm run dev
```

## Static GitHub Pages build

```bash
npm run build
```

The static export is written to `out/`. GitHub Actions publishes that directory
to GitHub Pages.

## Languages

The site ships with static English and German routes:

- English: `/`, `/imprint/`, `/privacy/`
- German: `/de/`, `/de/imprint/`, `/de/privacy/`

The `EN` / `DE` control in the header preserves the corresponding page when a
visitor changes language.

## Search visibility

The static build includes canonical URLs, English/German `hreflang` annotations,
an XML sitemap at `/sitemap.xml`, and `robots.txt`. After the first production
deployment, verify `https://saidov.net/` in Google Search Console and submit
`https://saidov.net/sitemap.xml`.

To publish Google Search Console's HTML-tag verification automatically, add its
token as the repository variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Use the
token value only, not the complete `<meta>` tag.

## Contact form

GitHub Pages cannot run a Next.js API route or server action. Configure a static
form provider such as Formspree, Basin or Web3Forms with:

```bash
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT="https://your-form-endpoint.example"
```

Without `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, the form opens the visitor's email
client with a prefilled message. The contact address is decoded in the browser
so it is not present as a literal value in the static site files.

## Project-site base path

For a GitHub Pages project site served from `/repository-name/`, set:

```bash
GITHUB_PAGES_BASE_PATH="/repository-name"
```

For `saidov.net` or a user/organization Pages site served from the domain root,
leave it empty.
