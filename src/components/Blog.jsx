import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  MapPin,
  Newspaper,
} from "lucide-react";
import "./Blog.css";
import { EVENT_POSTS, ALL_EVENTS_FILTER, ARCHIVE_FILTERS, getEventPostPath } from "../data/eventPosts.js";
import { getBlogPageSeo, setPageSeo } from "../utils/seo.js";

const JOIN_URL = "https://forms.gle/SsHAeFN9ncR7PiFz8";

const renderEventDate = (post) =>
  post.dateTime ? <time dateTime={post.dateTime}>{post.displayDate}</time> : post.displayDate;

export default function Blog() {
  const featuredPost = EVENT_POSTS[0];
  const [activePostId, setActivePostId] = useState(() => {
    const hashId = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";

    return EVENT_POSTS.some((post) => post.id === hashId) ? hashId : featuredPost.id;
  });
  const [selectedFilter, setSelectedFilter] = useState(ALL_EVENTS_FILTER);

  useEffect(() => {
    setPageSeo(getBlogPageSeo());

    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const posts = Array.from(document.querySelectorAll(".event-post"));
    if (posts.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((firstEntry, secondEntry) => secondEntry.intersectionRatio - firstEntry.intersectionRatio);

        if (visibleEntries[0]?.target?.id) {
          setActivePostId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.55, 0.75],
      }
    );

    posts.forEach((post) => observer.observe(post));

    return () => observer.disconnect();
  }, []);

  const recentPosts = EVENT_POSTS.slice(0, 3);
  const filteredPosts =
    selectedFilter === ALL_EVENTS_FILTER
      ? EVENT_POSTS
      : EVENT_POSTS.filter((post) => post.category === selectedFilter);
  const visibleActivePostId = filteredPosts.some((post) => post.id === activePostId)
    ? activePostId
    : filteredPosts[0]?.id;
  const totalPhotos = EVENT_POSTS.reduce((count, post) => count + post.gallery.length, 0);
  const archiveThemeCount = ARCHIVE_FILTERS.length - 1;

  return (
    <div className="blog-page">
      <main className="blog-main">
        <section className="blog-hero" aria-labelledby="blog-title">
          <div className="blog-container blog-hero__inner">
            <div className="blog-hero__copy">
              <p className="blog-kicker">
                <Newspaper size={16} aria-hidden="true" />
                <span>Events & Stories</span>
              </p>
              <h1 id="blog-title" className="blog-hero__title">
                Event details, recaps, and photo stories from the ProWIFETA community.
              </h1>
              <p className="blog-hero__lead">
                Follow ProWIFETA's outreach work, keynote engagements, campaign launches,
                awards, graduation programmes, and industry collaborations across Ghana.
              </p>

              <div className="blog-hero__actions">
                <Link className="blog-primary-action" to={getEventPostPath(featuredPost)}>
                  Read featured event
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="blog-secondary-action" to="/">
                  Back to home
                </Link>
              </div>

              <div className="blog-hero__stats" aria-label="Event blog summary">
                <div className="blog-stat">
                  <strong>{EVENT_POSTS.length}</strong>
                  <span>event stories</span>
                </div>
                <div className="blog-stat">
                  <strong>{totalPhotos}+</strong>
                  <span>event photos</span>
                </div>
                <div className="blog-stat">
                  <strong>{archiveThemeCount}</strong>
                  <span>archive themes</span>
                </div>
              </div>
            </div>

            <article className="blog-featured-card">
              <div className="blog-featured-card__image-wrap">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="blog-featured-card__image"
                />
              </div>
              <div className="blog-featured-card__content">
                <p className="blog-card-kicker">{featuredPost.category}</p>
                <h2 className="blog-featured-card__title">{featuredPost.title}</h2>
                <div className="blog-meta-row">
                  <span>
                    <CalendarDays size={16} aria-hidden="true" />
                    {renderEventDate(featuredPost)}
                  </span>
                  <span>
                    <MapPin size={16} aria-hidden="true" />
                    {featuredPost.location}
                  </span>
                </div>
                <p className="blog-featured-card__excerpt">{featuredPost.excerpt}</p>
                <Link className="blog-inline-link" to={getEventPostPath(featuredPost)}>
                  View full event story
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="blog-overview" aria-labelledby="overview-title">
          <div className="blog-container">
            <div className="blog-section-heading">
              <p className="blog-section-kicker">Recent posts</p>
              <h2 id="overview-title">Browse recent outreach, industry, and advocacy updates.</h2>
            </div>

            <div className="blog-overview-grid">
              {recentPosts.map((post) => (
                <article key={post.id} className="event-card">
                  <img src={post.coverImage} alt={post.title} className="event-card__image" />
                  <div className="event-card__content">
                    <p className="blog-card-kicker">{post.category}</p>
                    <h3>{post.title}</h3>
                    <div className="blog-meta-row">
                      <span>
                        <CalendarDays size={16} aria-hidden="true" />
                        {renderEventDate(post)}
                      </span>
                      <span>
                        <Camera size={16} aria-hidden="true" />
                        {post.gallery.length} photos
                      </span>
                    </div>
                    <p>{post.excerpt}</p>
                    <Link className="blog-inline-link" to={getEventPostPath(post)}>
                      Read event details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-posts" aria-labelledby="stories-title">
          <div className="blog-container">
            <div className="blog-section-heading">
              <p className="blog-section-kicker">Event archive</p>
              <h2 id="stories-title">Detailed stories with galleries from ProWIFETA programmes and milestones.</h2>
              <p className="blog-archive-heading-copy">
                Use the side navigator to jump between event previews, then open the full
                story page for any update you want to share directly.
              </p>
            </div>

            <div className="blog-filter-bar" aria-label="Filter event archive">
              {ARCHIVE_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`blog-filter-chip ${filter === selectedFilter ? "is-active" : ""}`}
                  onClick={() => {
                    setSelectedFilter(filter);
                    if (filter === ALL_EVENTS_FILTER) {
                      setActivePostId(EVENT_POSTS[0]?.id ?? "");
                      return;
                    }

                    const nextPost = EVENT_POSTS.find((post) => post.category === filter);
                    if (nextPost) {
                      setActivePostId(nextPost.id);
                    }
                  }}
                  aria-pressed={filter === selectedFilter}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="blog-archive-layout">
              <aside className="blog-archive-nav" aria-label="Archive event navigation">
                <div className="blog-archive-nav__inner">
                  <div className="blog-archive-nav__intro">
                    <p className="blog-card-kicker">Browse the archive</p>
                    <p className="blog-archive-nav__description">
                      Jump between event previews on this page and open any story in its own URL.
                    </p>
                    <p className="blog-archive-nav__count">
                      Showing {filteredPosts.length} of {EVENT_POSTS.length} event stories.
                    </p>
                  </div>

                  <div className="blog-archive-nav__list">
                    {filteredPosts.map((post, index) => (
                      <a
                        key={post.id}
                        href={`#${post.id}`}
                        className={`blog-archive-link ${post.id === visibleActivePostId ? "is-active" : ""}`}
                        onClick={() => setActivePostId(post.id)}
                        aria-current={post.id === visibleActivePostId ? "location" : undefined}
                      >
                        <span className="blog-archive-link__index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <img
                          src={post.coverImage}
                          alt=""
                          className="blog-archive-link__image"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="blog-archive-link__copy">
                          <strong>{post.title}</strong>
                          <span>
                            {post.displayDate} - {post.gallery.length} photos
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="event-posts">
                {filteredPosts.map((post) => (
                  <article key={post.id} id={post.id} className="event-post">
                    <div className="event-post__hero">
                      <div className="event-post__image-wrap">
                        <img src={post.coverImage} alt={post.title} className="event-post__image" />
                      </div>
                      <div className="event-post__summary">
                        <p className="blog-card-kicker">{post.category}</p>
                        <h3>{post.title}</h3>
                        <div className="blog-meta-row">
                          <span>
                            <CalendarDays size={16} aria-hidden="true" />
                            {renderEventDate(post)}
                          </span>
                          <span>
                            <MapPin size={16} aria-hidden="true" />
                            {post.location}
                          </span>
                        </div>
                        <p className="event-post__lead">{post.lead}</p>
                        <Link className="blog-inline-link" to={getEventPostPath(post)}>
                          Open shareable story page
                        </Link>
                      </div>
                    </div>

                    <div className="event-post__body">
                      <div className="event-post__content">
                        {post.details.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      <aside className="event-post__sidebar">
                        <div className="event-post__sidebar-card">
                          <p className="blog-card-kicker">
                            <Camera size={16} aria-hidden="true" />
                            <span>Highlights</span>
                          </p>
                          <ul className="event-highlight-list">
                            {post.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </aside>
                    </div>

                    <div className="event-gallery-grid">
                      {post.gallery.map((image) => (
                        <figure key={image.src} className="event-gallery-card">
                          <img src={image.src} alt={image.alt} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  </article>
                ))}

                {filteredPosts.length === 0 ? (
                  <article className="blog-empty-state">
                    <p className="blog-card-kicker">No events yet</p>
                    <h3>No event stories match this filter right now.</h3>
                    <p>
                      Try another archive filter or add a new event story with pictures and
                      details to expand this section.
                    </p>
                  </article>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="blog-cta" aria-labelledby="blog-cta-title">
          <div className="blog-container blog-cta__inner">
            <div>
              <p className="blog-section-kicker">Next update</p>
              <h2 id="blog-cta-title">Keep the community visible with regular event stories.</h2>
              <p>
                Each new workshop, meeting, or training session can be added here as a new
                event post with a cover image, written recap, and gallery from the day.
              </p>
            </div>
            <div className="blog-cta__actions">
              <a className="blog-primary-action" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                Join the association
              </a>
              <Link className="blog-secondary-action" to="/">
                Return to landing page
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
