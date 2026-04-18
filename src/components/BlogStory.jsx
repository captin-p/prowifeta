import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  MapPin,
  Newspaper,
} from "lucide-react";
import "./Blog.css";
import { EVENT_POSTS, getEventPostById, getEventPostPath } from "../data/eventPosts.js";
import { getEventStorySeo, setPageSeo } from "../utils/seo.js";

const renderEventDate = (post) =>
  post.dateTime ? <time dateTime={post.dateTime}>{post.displayDate}</time> : post.displayDate;

export default function BlogStory() {
  const { postId } = useParams();
  const post = getEventPostById(postId);
  const postIndex = EVENT_POSTS.findIndex((entry) => entry.id === postId);
  const newerPost = postIndex > 0 ? EVENT_POSTS[postIndex - 1] : null;
  const olderPost = postIndex >= 0 && postIndex < EVENT_POSTS.length - 1 ? EVENT_POSTS[postIndex + 1] : null;

  const relatedPosts = useMemo(() => {
    if (!post) {
      return EVENT_POSTS.slice(0, 3);
    }

    return EVENT_POSTS.filter((entry) => entry.id !== post.id)
      .sort((firstEntry, secondEntry) => {
        const firstScore = Number(firstEntry.category === post.category);
        const secondScore = Number(secondEntry.category === post.category);

        return secondScore - firstScore;
      })
      .slice(0, 3);
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    if (post) {
      setPageSeo(getEventStorySeo(post));
      return;
    }

    setPageSeo({
      title: "Event Story Not Found | ProWIFETA",
      description: "The requested ProWIFETA event story could not be found.",
      path: "/blog",
    });
  }, [post]);

  if (!post) {
    return (
      <div className="blog-page">
        <main className="blog-main">
          <section className="blog-posts" aria-labelledby="story-not-found-title">
            <div className="blog-container">
              <article className="blog-empty-state">
                <p className="blog-card-kicker">Story not found</p>
                <h3 id="story-not-found-title">We could not find that event story.</h3>
                <p>Try the main blog archive to open one of the published updates.</p>
                <div className="blog-hero__actions">
                  <Link className="blog-primary-action" to="/blog">
                    Back to blog
                  </Link>
                  <Link className="blog-secondary-action" to="/">
                    Return home
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <main className="blog-main">
        <section className="blog-hero blog-hero--story" aria-labelledby="story-title">
          <div className="blog-container blog-hero__inner">
            <div className="blog-hero__copy">
              <p className="blog-kicker">
                <Newspaper size={16} aria-hidden="true" />
                <span>{post.category}</span>
              </p>
              <h1 id="story-title" className="blog-hero__title">
                {post.title}
              </h1>
              <div className="blog-meta-row">
                <span>
                  <CalendarDays size={16} aria-hidden="true" />
                  {renderEventDate(post)}
                </span>
                <span>
                  <MapPin size={16} aria-hidden="true" />
                  {post.location}
                </span>
                <span>
                  <Camera size={16} aria-hidden="true" />
                  {post.gallery.length} photos
                </span>
              </div>
              <p className="blog-hero__lead">{post.excerpt}</p>

              <div className="blog-hero__actions">
                <Link className="blog-secondary-action" to="/blog">
                  <ArrowLeft size={18} aria-hidden="true" />
                  Back to blog
                </Link>
                <Link className="blog-primary-action" to="/">
                  Home
                </Link>
              </div>
            </div>

            <article className="blog-featured-card">
              <div className="blog-featured-card__image-wrap">
                <img src={post.coverImage} alt={post.title} className="blog-featured-card__image" />
              </div>
              <div className="blog-featured-card__content">
                <p className="blog-card-kicker">{post.displayDate}</p>
                <h2 className="blog-featured-card__title">{post.title}</h2>
                <p className="blog-featured-card__excerpt">{post.lead}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="blog-posts" aria-labelledby="story-body-title">
          <div className="blog-container">
            <div className="blog-section-heading">
              <p className="blog-section-kicker">Event story</p>
              <h2 id="story-body-title">Full recap and gallery.</h2>
            </div>

            <article className="event-post">
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
          </div>
        </section>

        <section className="blog-overview" aria-labelledby="related-stories-title">
          <div className="blog-container">
            <div className="blog-section-heading">
              <p className="blog-section-kicker">More stories</p>
              <h2 id="related-stories-title">Keep reading from the archive.</h2>
            </div>

            <div className="blog-overview-grid">
              {relatedPosts.map((entry) => (
                <article key={entry.id} className="event-card">
                  <img src={entry.coverImage} alt={entry.title} className="event-card__image" />
                  <div className="event-card__content">
                    <p className="blog-card-kicker">{entry.category}</p>
                    <h3>{entry.title}</h3>
                    <div className="blog-meta-row">
                      <span>
                        <CalendarDays size={16} aria-hidden="true" />
                        {renderEventDate(entry)}
                      </span>
                      <span>
                        <Camera size={16} aria-hidden="true" />
                        {entry.gallery.length} photos
                      </span>
                    </div>
                    <p>{entry.excerpt}</p>
                    <Link className="blog-inline-link" to={getEventPostPath(entry)}>
                      Read this story
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-cta" aria-labelledby="story-navigation-title">
          <div className="blog-container blog-cta__inner">
            <div>
              <p className="blog-section-kicker">Story navigation</p>
              <h2 id="story-navigation-title">Move through the archive or return to the full blog.</h2>
              <p>Each story now has its own shareable URL while still living inside the main archive.</p>
            </div>
            <div className="blog-cta__actions">
              {olderPost ? (
                <Link className="blog-primary-action" to={getEventPostPath(olderPost)}>
                  Older story
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ) : null}
              {newerPost ? (
                <Link className="blog-secondary-action" to={getEventPostPath(newerPost)}>
                  Newer story
                </Link>
              ) : null}
              <Link className="blog-secondary-action" to="/blog">
                Full archive
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
