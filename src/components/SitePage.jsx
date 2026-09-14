import { useEffect } from "react";
import { Link } from "react-router-dom";
import Galleries from "./Galleries.jsx";
import { EVENT_POSTS } from "../data/eventPosts.js";
import { getSitePage } from "../data/sitePages.js";
import { setPageSeo } from "../utils/seo.js";
import "./SitePage.css";

const JOIN_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdMVKcMmq4l9L5o5bGypUNR7_dYsgI5bKBdlB9Odwk6AqT3CA/viewform?embedded=true";

const getPost = (id) => EVENT_POSTS.find((post) => post.id === id);

function EvidenceLinks({ ids = [] }) {
  const posts = ids.map(getPost).filter(Boolean);
  if (!posts.length) return null;

  return (
    <div className="site-page__evidence">
      <span>Evidence</span>
      {posts.map((post) => (
        <Link key={post.id} to={`/blog/${post.id}`}>{post.title}</Link>
      ))}
    </div>
  );
}

function StoryGrid({ ids }) {
  const posts = (ids?.length ? ids.map(getPost) : EVENT_POSTS).filter(Boolean);
  if (!posts.length) return null;

  return (
    <div className="site-page__story-grid">
      {posts.map((post) => (
        <article className="site-page__story-card" key={post.id}>
          <img src={post.coverImage} alt="" loading="lazy" />
          <div>
            <p className="site-page__story-meta">{post.category} · {post.displayDate}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`}>Read the documented story →</Link>
          </div>
        </article>
      ))}
    </div>
  );
}

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
            <Link className="site-page__primary" to="/">Return home</Link>
          </div>
        </section>
      </main>
    );
  }

  const evidenceIds = page.evidence ?? page.sections.flatMap((section) => section.evidence ?? []);

  return (
    <main className="site-page">
      <section className="site-page__hero">
        <div className="container site-page__hero-inner">
          <p className="site-page__kicker">{page.kicker}</p>
          <h1>{page.title}</h1>
          <p className="site-page__lead">{page.intro}</p>
          <div className="site-page__hero-actions">
            <Link className="site-page__primary" to={page.id === "partners" ? "/contact" : "/membership"}>
              {page.id === "partners" ? "Start a partnership conversation" : "Join ProWIFETA"}
            </Link>
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
                <EvidenceLinks ids={section.evidence} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.featureTitle ? (
        <section className="site-page__feature-band">
          <div className="container site-page__feature-copy">
            <p className="site-page__kicker">Institutional context</p>
            <h2>{page.featureTitle}</h2>
            <p>{page.featureBody}</p>
            {page.links?.length ? (
              <div className="site-page__link-row">
                {page.links.map((item) => <Link key={item.to} to={item.to}>{item.label} →</Link>)}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.profiles?.length ? (
        <section className="site-page__directory">
          <div className="container">
            <div className="site-page__section-heading">
              <p className="site-page__kicker">Leadership directory</p>
              <h2>People behind the association</h2>
              <p>Profiles use information already published by ProWIFETA and can be expanded as additional approved professional details become available.</p>
            </div>
            <div className="site-page__profile-grid">
              {page.profiles.map((profile) => (
                <article className="site-page__profile" key={profile.name}>
                  <img src={profile.image} alt={`Portrait of ${profile.name}`} loading="lazy" />
                  <div>
                    <p className="site-page__profile-role">{profile.role}</p>
                    <h3>{profile.name}</h3>
                    <p>{profile.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {evidenceIds.length && !page.eventArchive ? (
        <section className="site-page__evidence-section">
          <div className="container">
            <div className="site-page__section-heading">
              <p className="site-page__kicker">Documented work</p>
              <h2>Evidence from the ProWIFETA archive</h2>
              <p>These stories connect the page to activities already documented by the association.</p>
            </div>
            <StoryGrid ids={[...new Set(evidenceIds)]} />
          </div>
        </section>
      ) : null}

      {page.emptyState ? (
        <section className="site-page__status">
          <div className="container">
            <div className="site-page__status-card">
              <p className="site-page__kicker">Current status</p>
              <h2>No unverified listings</h2>
              <p>{page.emptyState}</p>
            </div>
          </div>
        </section>
      ) : null}

      {page.eventArchive ? (
        <>
          <section className="site-page__evidence-section">
            <div className="container">
              <div className="site-page__section-heading">
                <p className="site-page__kicker">Past activities</p>
                <h2>Documented events and engagements</h2>
                <p>Browse completed activities by story, date, location, and programme context.</p>
              </div>
              <StoryGrid />
            </div>
          </section>
          <section className="site-page__archive">
            <div className="container">
              <div className="site-page__section-heading">
                <p className="site-page__kicker">Visual archive</p>
                <h2>ProWIFETA in action</h2>
              </div>
              <Galleries />
            </div>
          </section>
        </>
      ) : null}

      {page.membershipForm ? (
        <section className="site-page__membership">
          <div className="container site-page__membership-grid">
            <div>
              <p className="site-page__kicker">Application</p>
              <h2>Ready to apply?</h2>
              <p>Complete the existing ProWIFETA membership form after reviewing the eligibility, benefits, and professional expectations above.</p>
            </div>
            <div className="site-page__form-shell">
              <iframe title="ProWIFETA membership application form" src={JOIN_EMBED_URL} loading="lazy" allow="storage-access">
                Loading membership form...
              </iframe>
            </div>
          </div>
        </section>
      ) : null}

      {page.links?.length && !page.featureTitle ? (
        <section className="site-page__feature-band">
          <div className="container site-page__feature-copy">
            <p className="site-page__kicker">Useful links</p>
            <h2>Continue to the right channel</h2>
            <div className="site-page__link-row">
              {page.links.map((item) => <Link key={item.to} to={item.to}>{item.label} →</Link>)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="site-page__closing">
        <div className="container site-page__closing-inner">
          <div>
            <p className="site-page__kicker">Next step</p>
            <h2>{page.id === "partners" ? "Build something useful with ProWIFETA." : "Stay connected to ProWIFETA's work."}</h2>
          </div>
          <div className="site-page__closing-actions">
            <Link className="site-page__primary" to="/blog">Read latest stories</Link>
            <Link className="site-page__secondary" to="/contact">Contact ProWIFETA</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SitePage;
