export const SITE_URL = "https://saidov.net";

// Public professional profiles. Single source of truth for both the footer
// links and the schema.org `sameAs` entity signal. Use canonical, publicly
// reachable URLs; `name` is the accessible label and icon key in the footer.
const profiles = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/razimsaidov/" },
  { name: "GitHub", url: "https://github.com/razims" },
  { name: "Xing", url: "https://www.xing.com/profile/Razim_Saidov" }
];

// Single source of truth for the person/practice entity used across metadata and
// JSON-LD structured data. Keep every value truthful and verifiable.
export const PROFILE = {
  name: "Razim Saidov",
  honorificSuffix: "MSc",
  jobTitle: { en: "SAP Consultant", de: "SAP Berater" },
  // Registered in Austria (see imprint: GISA 37566845, VAT ATU81245948).
  addressCountry: "AT",
  // Primary service region is DACH; remote delivery is available worldwide.
  areaServed: ["AT", "DE", "CH"],
  profiles,
  sameAs: profiles.map((profile) => profile.url)
};

const OG_IMAGE_ALT = {
  en: "Razim Saidov — SAP Consultant for HANA, ABAP, CAP, BTP and Business AI",
  de: "Razim Saidov — SAP Berater für HANA, ABAP, CAP, BTP und Business AI"
};

const routePaths = {
  home: { en: "/", de: "/de/" },
  imprint: { en: "/imprint/", de: "/de/imprint/" },
  privacy: { en: "/privacy/", de: "/de/privacy/" }
};

export function getLocalizedPaths(page) {
  return routePaths[page];
}

export function createPageMetadata({ locale, page, title, description, index = true }) {
  const paths = getLocalizedPaths(page);
  const ogLocale = locale === "de" ? "de_DE" : "en_US";
  const alternateLocale = locale === "de" ? "en_US" : "de_DE";

  const image = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT[locale] || OG_IMAGE_ALT.en,
    type: "image/png"
  };

  return {
    title,
    description,
    alternates: {
      canonical: paths[locale],
      languages: {
        en: paths.en,
        de: paths.de,
        "x-default": paths.en
      }
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale,
      url: paths[locale],
      siteName: "Razim Saidov",
      title,
      description,
      images: [image]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
      : {
          index: false,
          follow: true
        }
  };
}
