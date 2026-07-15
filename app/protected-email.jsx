"use client";

import { useState } from "react";

import { getContactEmail } from "./contact-email";

export default function ProtectedEmail({ loadingLabel }) {
  const [email] = useState(() =>
    typeof window === "undefined" ? "" : getContactEmail()
  );

  return (
    <a href={email ? `mailto:${email}` : undefined} suppressHydrationWarning>
      {email || loadingLabel}
    </a>
  );
}
