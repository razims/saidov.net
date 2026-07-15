import ContactForm from "./contact-form";
import CurrentFocus from "./current-focus";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import StructuredData from "./structured-data";
import Hyperrectangle from "./tesseract";
import { getContent } from "./site-content";

export default function HomePage({ locale }) {
  const content = getContent(locale);
  const { home } = content;

  return (
    <main className="site-shell mx-auto font-sans" lang={locale}>
      <StructuredData locale={locale} services={home.services} />
      <SiteHeader isHome locale={locale} page="home" />

      <section id="home" className="intro-section relative">
        <Hyperrectangle />
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>{home.title}</h1>
          <p className="intro-copy">{home.introduction}</p>
          <CurrentFocus label={home.currentFocusLabel} items={home.currentFocus} />
        </div>
      </section>

      <section id="services" className="content-section scroll-mt-6">
        <div className="section-intro">
          <h2>{home.servicesTitle}</h2>
          <p>{home.servicesIntro}</p>
        </div>
        <div className="service-list">
          {home.services.map((service, index) => (
            <article className="service-item" key={service.title}>
              <span className="service-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="service-copy">
                <div className="service-heading">
                  <h3>{service.title}</h3>
                  <span>{service.meta}</span>
                </div>
                <p>{service.description}</p>
                <p className="service-systems">{service.systems}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>{home.workingStyleTitle}</h2>
        <p>{home.workingStyle}</p>
      </section>

      <section id="contact" className="content-section">
        <div className="section-intro contact-intro">
          <h2>{home.contactTitle}</h2>
          <p>{home.contactIntro}</p>
        </div>
        <ContactForm copy={home.form} />
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
