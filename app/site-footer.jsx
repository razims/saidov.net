import Link from "next/link";

import { getContent } from "./site-content";

export default function SiteFooter({ locale = "en" }) {
  const content = getContent(locale);
  const prefix = locale === "de" ? "/de" : "";

  return (
    <footer className="site-footer">
      <ul>
        <li>
          <Link href={`${prefix}/imprint/`}>{content.footer.imprint}</Link>
        </li>
        <li>
          <Link href={`${prefix}/privacy/`}>{content.footer.privacy}</Link>
        </li>
      </ul>
      <p>© {new Date().getFullYear()} Razim Saidov</p>
    </footer>
  );
}
