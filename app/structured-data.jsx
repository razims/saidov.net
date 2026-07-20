import { PROFILE, SITE_URL } from "./seo";

const descriptions = {
  en: "Professional SAP consulting for SAP HANA, ABAP development, SAP CAP, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP Joule and Business AI.",
  de: "Professionelle SAP Beratung für SAP HANA, ABAP Entwicklung, SAP CAP, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP Joule und Business AI."
};

const personDescriptions = {
  en: "Professional SAP Consultant covering SAP HANA, ABAP development, SAP CAP, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP Joule and Business AI. Based in Austria, serving the DACH region and available remotely worldwide.",
  de: "Professioneller SAP Berater für SAP HANA, ABAP Entwicklung, SAP CAP, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP Joule und Business AI. Ansässig in Österreich, tätig in der DACH-Region und remote weltweit verfügbar."
};

const pageNames = {
  en: "Razim Saidov — SAP Consultant for HANA, ABAP, CAP, BTP and Business AI",
  de: "Razim Saidov — SAP Berater für HANA, ABAP, CAP, BTP und Business AI"
};

const knowsAbout = [
  "SAP HANA",
  "SAP ABAP",
  "SAP Grants Management",
  "SAP Public Sector",
  "SAP FI/CO",
  "SAP CAP",
  "SAP HANA XS Advanced",
  "SAP BTP",
  "SAP NetWeaver",
  "SAP BW/4HANA",
  "SAP BW on HANA",
  "SAP Business One",
  "SAP Joule",
  "Business AI"
];

const knowsLanguage = [
  { "@type": "Language", name: "English", alternateName: "en" },
  { "@type": "Language", name: "German", alternateName: "de" }
];

const countryNames = { AT: "Austria", DE: "Germany", CH: "Switzerland" };

export default function StructuredData({ locale, services }) {
  const pageUrl = locale === "de" ? `${SITE_URL}/de/` : `${SITE_URL}/`;
  const jobTitle = PROFILE.jobTitle[locale] || PROFILE.jobTitle.en;

  const personId = `${SITE_URL}/#person`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const logoId = `${SITE_URL}/#logo`;
  const primaryImageId = `${SITE_URL}/#primaryimage`;

  const address = { "@type": "PostalAddress", addressCountry: PROFILE.addressCountry };
  const areaServed = PROFILE.areaServed.map((code) => ({
    "@type": "Country",
    name: countryNames[code] || code
  }));

  const logo = {
    "@type": "ImageObject",
    "@id": logoId,
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
    caption: PROFILE.name
  };

  const primaryImage = {
    "@type": "ImageObject",
    "@id": primaryImageId,
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630
  };

  const person = {
    "@type": "Person",
    "@id": personId,
    name: PROFILE.name,
    honorificSuffix: PROFILE.honorificSuffix,
    jobTitle,
    description: personDescriptions[locale] || personDescriptions.en,
    url: SITE_URL,
    image: { "@id": logoId },
    address,
    knowsAbout,
    knowsLanguage,
    worksFor: { "@id": organizationId },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` }
  };

  if (PROFILE.sameAs.length > 0) {
    person.sameAs = PROFILE.sameAs;
  }

  const organization = {
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: PROFILE.name,
    url: SITE_URL,
    description: descriptions[locale] || descriptions.en,
    inLanguage: locale,
    availableLanguage: ["en", "de"],
    image: { "@id": primaryImageId },
    logo: { "@id": logoId },
    founder: { "@id": personId },
    address,
    areaServed,
    knowsAbout,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE_URL}/#contact`,
      availableLanguage: ["English", "German"]
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "de" ? "SAP Leistungen" : "SAP services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.title,
          provider: { "@id": organizationId }
        }
      }))
    }
  };

  if (PROFILE.sameAs.length > 0) {
    organization.sameAs = PROFILE.sameAs;
  }

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: PROFILE.name,
    description: descriptions[locale] || descriptions.en,
    inLanguage: ["en", "de"],
    publisher: { "@id": personId }
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageNames[locale] || pageNames.en,
    description: descriptions[locale] || descriptions.en,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
    primaryImageOfPage: { "@id": primaryImageId }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [website, person, organization, webPage, logo, primaryImage]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c")
      }}
    />
  );
}
