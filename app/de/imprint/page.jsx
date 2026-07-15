import { ImprintPageContent } from "../../legal-pages";
import { createPageMetadata } from "../../seo";

export const metadata = createPageMetadata({
  locale: "de",
  page: "imprint",
  title: "Impressum | Razim Saidov",
  description: "Rechtliche Angaben von Razim Saidov.",
  index: false
});

export default function GermanImprintPage() {
  return <ImprintPageContent locale="de" />;
}
