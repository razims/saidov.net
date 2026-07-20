"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        title={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X aria-hidden="true" size={17} /> : <Menu aria-hidden="true" size={18} />}
      </button>
      <div className={`nav-links${isMenuOpen ? " is-open" : ""}`} id="site-navigation">
        {navigation.map((item) => (
          <Link
            href={isHome ? `#${item}` : `${homePath}#${item}`}
            key={item}
            onClick={() => setIsMenuOpen(false)}
          >
            {content.navigation[item]}
          </Link>
        ))}
        <span
          className={`language-switch${locale === "de" ? " is-de" : ""}`}
          role="group"
          aria-label={content.navigation.languageLabel}
        >
          <Link
            className={locale === "en" ? "is-active" : ""}
            href={pagePath("en", page)}
            hrefLang="en"
            lang="en"
            onClick={() => {
              window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "en");
              setIsMenuOpen(false);
            }}
          >
            EN
          </Link>
          <Link
            className={locale === "de" ? "is-active" : ""}
            href={pagePath("de", page)}
            hrefLang="de"
            lang="de"
            onClick={() => {
              window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, "de");
              setIsMenuOpen(false);
            }}
          >
            DE
          </Link>
        </span>
      </div>
    </nav>
  );
}
