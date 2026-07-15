import HomePage from "./home-page";
import LanguageDetector from "./language-detector";
import { createPageMetadata } from "./seo";

export const metadata = createPageMetadata({
  locale: "en",
  page: "home",
  title: "SAP Consultant: HANA, ABAP, CAP, BTP & AI | Razim Saidov",
  description:
    "Professional SAP consulting for HANA, ABAP development, CAP, BTP, NetWeaver, BW/4HANA, Business One, Joule and Business AI."
});

export default function Home() {
  return (
    <>
      <LanguageDetector />
      <HomePage locale="en" />
    </>
  );
}
