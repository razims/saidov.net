import { PrivacyPageContent } from "../legal-pages";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  locale: "en",
  page: "privacy",
  title: "Privacy | Razim Saidov",
  description: "Privacy information for Razim Saidov.",
  index: false
});

export default function PrivacyPage() {
  return <PrivacyPageContent locale="en" />;
}
