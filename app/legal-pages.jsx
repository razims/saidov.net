import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import ProtectedEmail from "./protected-email";
import { getContent } from "./site-content";

export function ImprintPageContent({ locale }) {
  const content = getContent(locale);
  const { imprint } = content;

  return (
    <main className="site-shell legal-page mx-auto font-sans" lang={locale}>
      <SiteHeader locale={locale} page="imprint" />
      <section className="legal-intro">
        <p className="eyebrow">{imprint.eyebrow}</p>
        <h1>{imprint.title}</h1>
        <p>{imprint.intro}</p>
      </section>

      <section className="legal-content" aria-labelledby="business-details">
        <h2 id="business-details">{imprint.detailsTitle}</h2>
        <dl className="legal-details">
          {imprint.details.map(([label, value]) => {
            const isProtectedEmail = value === "protected-email";

            return (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {isProtectedEmail ? (
                    <ProtectedEmail loadingLabel={imprint.emailLoading} />
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

export function PrivacyPageContent({ locale }) {
  const content = getContent(locale);
  const { privacy } = content;

  return (
    <main className="site-shell legal-page mx-auto font-sans" lang={locale}>
      <SiteHeader locale={locale} page="privacy" />
      <section className="legal-intro">
        <p className="eyebrow">{privacy.eyebrow}</p>
        <h1>{privacy.title}</h1>
        <p>{privacy.intro}</p>
      </section>

      {privacy.sections.map((section, index) => (
        <section
          className="legal-content"
          aria-labelledby={`privacy-section-${index}`}
          key={section.title}
        >
          <h2 id={`privacy-section-${index}`}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <SiteFooter locale={locale} />
    </main>
  );
}
