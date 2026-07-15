"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 480;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId;

    function updateVisibility() {
      frameId = undefined;
      const nextVisible = window.scrollY > SCROLL_THRESHOLD;
      setIsVisible((currentVisible) =>
        currentVisible === nextVisible ? currentVisible : nextVisible
      );
    }

    function handleScroll() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    }

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }

  return (
    <button
      className={`scroll-top${isVisible ? " is-visible" : ""}`}
      type="button"
      aria-label="Back to top"
      title="Back to top"
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <ArrowUp aria-hidden="true" size={18} strokeWidth={1.5} />
    </button>
  );
}
