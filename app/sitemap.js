import { SITE_URL } from "./seo";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          de: `${SITE_URL}/de/`
        }
      }
    },
    {
      url: `${SITE_URL}/de/`,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          de: `${SITE_URL}/de/`
        }
      }
    }
  ];
}
