import { ImprintPageContent } from "../legal-pages";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  locale: "en",
  page: "imprint",
  title: "Imprint | Razim Saidov",
  description: "Legal information for Razim Saidov.",
  index: false
});

export default function ImprintPage() {
  return <ImprintPageContent locale="en" />;
}
