"use client";

import { useSyncExternalStore } from "react";

import { getContactEmail } from "./contact-email";

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return "";
}

export default function ProtectedEmail({ loadingLabel }) {
  const email = useSyncExternalStore(subscribe, getContactEmail, getServerSnapshot);

  return (
    <a href={email ? `mailto:${email}` : undefined} suppressHydrationWarning>
      {email || loadingLabel}
    </a>
  );
}
