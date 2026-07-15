"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LANGUAGE_PREFERENCE_KEY = "saidov.net.language";

export default function LanguageDetector() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY)) {
      return;
    }

    const browserLanguages = navigator.languages || [navigator.language];
    const prefersGerman = browserLanguages.some((language) =>
      language.toLowerCase().startsWith("de")
    );

    if (prefersGerman) {
      router.replace("/de/");
    }
  }, [router]);

  return null;
}
