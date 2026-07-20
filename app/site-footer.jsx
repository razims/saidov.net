import Link from "next/link";

import { getContent } from "./site-content";
import { PROFILE } from "./seo";
import { SocialIcon } from "./social-icons";

export default function SiteFooter({ locale = "en" }) {
  const content = getContent(locale);
  const prefix = locale === "de" ? "/de" : "";

  return (
    <footer className="site-footer">
      <div className="footer-links">
        <ul>
          <li>
            <Link href={`${prefix}/imprint/`}>{content.footer.imprint}</Link>
          </li>
          <li>
            <Link href={`${prefix}/privacy/`}>{content.footer.privacy}</Link>
          </li>
        </ul>
        <ul className="footer-social" aria-label={content.footer.profilesLabel}>
          {PROFILE.profiles.map((profile) => (
            <li key={profile.url}>
              <a
                aria-label={profile.name}
                href={profile.url}
                rel="me noopener noreferrer"
                target="_blank"
                title={profile.name}
              >
                <SocialIcon name={profile.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p>© {new Date().getFullYear()} Razim Saidov</p>
    </footer>
  );
}
