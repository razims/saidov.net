"use client";

import { useEffect, useState } from "react";

export default function CurrentFocus({ label, items }) {
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setFocusIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [items]);

  return (
    <p className="current-focus">
      <span>{label}</span>
      <span>{items[focusIndex]}</span>
    </p>
  );
}
