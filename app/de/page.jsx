import HomePage from "../home-page";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  locale: "de",
  page: "home",
  title: "SAP Beratung: HANA, ABAP, CAP, BTP & AI | Razim Saidov",
  description:
    "Professionelle SAP Beratung für HANA, ABAP Entwicklung, CAP, BTP, NetWeaver, BW/4HANA, Business One, Joule und Business AI."
});

export default function GermanHomePage() {
  return <HomePage locale="de" />;
}
