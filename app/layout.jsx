import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";

import "./tailwind.generated.css";
import "./globals.css";
import ScrollToTop from "./scroll-to-top";
import { SITE_URL } from "./seo";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Razim Saidov",
  authors: [{ name: "Razim Saidov" }],
  creator: "Razim Saidov",
  publisher: "Razim Saidov",
  category: "SAP consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  verification: googleVerification ? { google: googleVerification } : undefined
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-canvas font-sans text-ink">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
