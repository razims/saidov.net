import { SITE_URL } from "./seo";

export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          de: `${SITE_URL}/de/`
        }
      }
    },
    {
      url: `${SITE_URL}/de/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          de: `${SITE_URL}/de/`
        }
      }
    }
  ];
}
