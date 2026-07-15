export const SITE_URL = "https://saidov.net";

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
      locale: locale === "de" ? "de_DE" : "en_US",
      url: paths[locale],
      siteName: "Razim Saidov",
      title,
      description,
      images: ["/og-image.png"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"]
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
