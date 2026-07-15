"use client";

import Image from "next/image";
import Link from "next/link";

import { getContent } from "./site-content";

const LANGUAGE_PREFERENCE_KEY = "saidov.net.language";

function pagePath(locale, page) {
  const prefix = locale === "de" ? "/de" : "";

  if (page === "home") {
    return `${prefix}/`;
  }

  return `${prefix}/${page}/`;
}

export default function SiteHeader({ isHome = false, locale = "en", page = "home" }) {
  const content = getContent(locale);
  const navigation = ["home", "services", "contact"];
  const homePath = pagePath(locale, "home");

  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <Link
        className="site-name"
        href={isHome ? "#home" : homePath}
        aria-label="Razim Saidov home"
      >
        <Image
          alt=""
          className="site-mark"
          height={64}
          priority
          src="/logo.svg"
          width={64}
        />
        <span>Razim Saidov</span>
      </Link>
      <div className="nav-links">
        {navigation.map((item) => (
          <Link href={isHome ? `#${item}` : `${homePath}#${item}`} key={item}>
            {content.navigation[item]}
          </Link>
        ))}
        <span
          className="language-switch"
          role="group"
          aria-label={content.navigation.languageLabel}
        >
          <Link
            className={locale === "en" ? "is-active" : ""}
            href={pagePath("en", page)}
            hrefLang="en"
            lang="en"
            onClick={() => window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "en")}
          >
            EN
          </Link>
          <Link
            className={locale === "de" ? "is-active" : ""}
            href={pagePath("de", page)}
            hrefLang="de"
            lang="de"
            onClick={() => window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "de")}
          >
            DE
          </Link>
        </span>
      </div>
    </nav>
  );
}
