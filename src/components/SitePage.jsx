import { useEffect } from "react";
import { Link } from "react-router-dom";
import Galleries from "./Galleries.jsx";
import { getSitePage } from "../data/sitePages.js";
import { setPageSeo } from "../utils/seo.js";
import "./SitePage.css";

const JOIN_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdMVKcMmq4l9L5o5bGypUNR7_dYsgI5bKBdlB9Odwk6AqT3CA/viewform?embedded=true";

function SitePage({ pageId }) {
  const page = getSitePage(pageId);

  useEffect(() => {
    if (page) {
      setPageSeo({
        title: `${page.navLabel} | ProWIFETA`,
        description: page.description,
        path: page.path,
        image: "/img/logo.png",
      });
    }
  }, [page]);

  if (!page) {
    return (
      <main className="site-page">
        <section className="site-page__hero">
          <div className="container site-page__hero-inner">
            <p className="site-page__kicker">ProWIFETA</p>
            <h1>Page not found</h1>
            <p>The page you requested is not available.</p>
            <Link className="site-page__primary" to="/">Return home</Link>
          </div>
        </section>
      </main>
    );
  }

  const showGallery = page.id === "events";
  const showLeadership = page.id === "leadership";
  const showMembershipForm = page.id === "membership";

  return (
    <main className="site-page">
      <section className="site-page__hero">
        <div className="container site-page__hero-inner">
          <p className="site-page__kicker">{page.kicker}</p>
          <h1>{page.title}</h1>
          <p className="site-page__lead">{page.intro}</p>
          <div className="site-page__hero-actions">
            {page.ctaHref ? (
              <a className="site-page__primary" href={page.ctaHref} target="_blank" rel="noopener noreferrer">
                {page.ctaLabel}
              </a>
            ) : (
              <Link className="site-page__primary" to="/membership">Join ProWIFETA</Link>
            )}
            <Link className="site-page__secondary" to="/blog">News &amp; Insights</Link>
          </div>
        </div>
      </section>

      <section className="site-page__content">
        <div className="container">
          <div className="site-page__grid">
            {page.sections.map((section) => (
              <article className="site-page__card" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showLeadership ? (
        <section className="site-page__feature-band">
          <div className="container site-page__feature-copy">
            <p className="site-page__kicker">Current profiles</p>
            <h2>Meet the leadership already profiled on the ProWIFETA homepage.</h2>
            <p>
              The existing leadership directory remains available while individual profile pages and a richer professional directory are developed.
            </p>
            <Link className="site-page__primary" to="/#members">View current leadership profiles</Link>
          </div>
        </section>
      ) : null}

      {showGallery ? (
        <section className="site-page__archive">
          <div className="container">
            <div className="site-page__section-heading">
              <p className="site-page__kicker">Visual archive</p>
              <h2>ProWIFETA in action</h2>
              <p>Browse the existing event and outreach photography while upcoming-event functionality is expanded.</p>
            </div>
            <Galleries />
          </div>
        </section>
      ) : null}

      {showMembershipForm ? (
        <section className="site-page__membership">
          <div className="container site-page__membership-grid">
            <div>
              <p className="site-page__kicker">Membership application</p>
              <h2>Apply without leaving the website.</h2>
              <p>
                The current ProWIFETA Google Form remains connected while the membership experience is progressively upgraded.
              </p>
            </div>
            <div className="site-page__form-shell">
              <iframe
                title="ProWIFETA membership application form"
                src={JOIN_EMBED_URL}
                loading="lazy"
                allow="storage-access"
              >
                Loading membership form...
              </iframe>
            </div>
          </div>
        </section>
      ) : null}

      <section className="site-page__closing">
        <div className="container site-page__closing-inner">
          <div>
            <p className="site-page__kicker">Stay connected</p>
            <h2>Follow ProWIFETA's work as the platform grows.</h2>
          </div>
          <div className="site-page__closing-actions">
            <Link className="site-page__primary" to="/blog">Read latest stories</Link>
            <Link className="site-page__secondary" to="/partners">Explore partnerships</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SitePage;
