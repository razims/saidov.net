import { SITE_URL } from "./seo";

const descriptions = {
  en: "Professional SAP consulting for SAP HANA, ABAP development, SAP CAP, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP Joule and Business AI.",
  de: "Professionelle SAP Beratung für SAP HANA, ABAP Entwicklung, SAP CAP, SAP BTP, SAP NetWeaver, BW/4HANA, SAP Business One, SAP Joule und Business AI."
};

export default function StructuredData({ locale, services }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Razim Saidov",
    url: SITE_URL,
    description: descriptions[locale],
    inLanguage: locale,
    availableLanguage: ["en", "de"],
    knowsAbout: [
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
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "de" ? "SAP Leistungen" : "SAP services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description
        }
      }))
    }
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
