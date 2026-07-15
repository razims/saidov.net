import { PrivacyPageContent } from "../../legal-pages";
import { createPageMetadata } from "../../seo";

export const metadata = createPageMetadata({
  locale: "de",
  page: "privacy",
  title: "Datenschutz | Razim Saidov",
  description: "Datenschutzhinweise von Razim Saidov.",
  index: false
});

export default function GermanPrivacyPage() {
  return <PrivacyPageContent locale="de" />;
}
