export const dynamic = "force-static";

export default function manifest() {
  return {
    id: "/",
    name: "Razim Saidov — SAP Consultant",
    short_name: "Razim Saidov",
    description:
      "Professional SAP consulting for HANA, ABAP, CAP, BTP, NetWeaver, BW/4HANA, Business One, Joule and Business AI.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity", "technology"],
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
