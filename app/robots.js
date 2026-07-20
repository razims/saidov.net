import { SITE_URL } from "./seo";

export const dynamic = "force-static";

// AI assistants, answer engines, and model crawlers are explicitly welcomed so
// that this site can be surfaced, cited, and summarized by AI agents. Adjust or
// move a name into a disallow rule to opt a specific crawler out.
const aiUserAgents = [
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini / Vertex AI) and Apple Intelligence extended crawlers
  "Google-Extended",
  "Applebot-Extended",
  // Other answer engines and AI crawlers
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
  "CCBot"
];

export default function robots() {
  return {
    rules: [
      { userAgent: aiUserAgents, allow: "/" },
      { userAgent: "*", allow: "/" }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
