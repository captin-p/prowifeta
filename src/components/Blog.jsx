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

const JOIN_URL = "https://forms.gle/SsHAeFN9ncR7PiFz8";
const ALL_EVENTS_FILTER = "All events";
const EDWENASE_GALLERY = Array.from({ length: 23 }, (_, index) => ({
  src: `/img/events/edwenase-edit/edwenase-edit-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Edwenase event photo ${index + 1}`,
}));
const EVENT_POSTS = [
  {
    id: "edwenase-event-highlights",
    category: "Latest Photo Update",
    title: "Edwenase Event Highlights",
    dateTime: "2026-03-27",
    displayDate: "March 27, 2026",
    location: "Edwenase",
    coverImage: EDWENASE_GALLERY[0].src,
    excerpt:
      "A new photo-rich update featuring the latest Edwenase event moments now added to the ProWIFETA story archive.",
    lead:
      "The newest Edwenase photo set now has its own event story so visitors can browse the atmosphere, participation, and standout moments from the gathering in one place.",
    details: [
      "This update adds the Edwenase event images as a dedicated blog feature, making it easier for visitors to revisit the day through a full visual recap instead of scattered photos.",
      "The post works as both an event memory and a content asset for the association, helping ProWIFETA show real participation, community presence, and the energy behind its activities.",
      "As more details become available, this entry can also be expanded with a fuller written recap, speaker names, outcomes, and captions tied to the images from the event.",
    ],
    highlights: [
      "A dedicated event post for the newest Edwenase images.",
      "A full photo gallery visitors can browse directly on the blog page.",
      "Stronger visual storytelling for the association's public event archive.",
    ],
    gallery: EDWENASE_GALLERY,
  },
  {
    id: "professional-development-forum",
    category: "Featured Event",
    title: "Professional Development Forum for Women in Fashion Education",
    dateTime: "2025-10-18",
    displayDate: "October 18, 2025",
    location: "ProWIFETA community event",
    coverImage: "/img/slides/d46.jpg",
    excerpt:
      "A practical event recap centered on teaching innovation, leadership confidence, and stronger collaboration across the profession.",
    lead:
      "This event brought together women working across fashion education and training to reflect on the realities of teaching, leadership, and long-term professional growth.",
    details: [
      "Sessions throughout the day focused on how educators can stay innovative in the classroom while still building stronger systems of peer support, mentorship, and professional visibility.",
      "The conversations were especially valuable because they blended research, lived teaching experience, and practical insight from women navigating both academic and industry-facing spaces.",
      "The result was an event that felt both strategic and encouraging, with real room for connection, reflection, and momentum for the next phase of ProWIFETA's work.",
    ],
    highlights: [
      "Roundtable conversations on teaching practice and curriculum direction.",
      "Peer networking moments between lecturers, trainers, and mentors.",
      "Photo highlights capturing the professional and collaborative atmosphere.",
    ],
    gallery: [
      {
        src: "/img/slides/d44.jpg",
        alt: "Participants gathered during a ProWIFETA professional development session.",
      },
      {
        src: "/img/slides/d45.jpg",
        alt: "Women in conversation during a ProWIFETA event activity.",
      },
      {
        src: "/img/slides/d46.jpg",
        alt: "A featured moment from the ProWIFETA professional development forum.",
      },
    ],
  },
  {
    id: "networking-leadership-dialogue",
    category: "Event Story",
    title: "Networking and Leadership Dialogue for Association Members",
    dateTime: "2025-09-12",
    displayDate: "September 12, 2025",
    location: "Members networking session",
    coverImage: "/img/slides/d99.jpg",
    excerpt:
      "An event story focused on shared leadership, member introductions, and the value of professional community.",
    lead:
      "This gathering created a more intimate space for members to connect around leadership, visibility, and the importance of building relationships across institutions.",
    details: [
      "The discussion emphasized how professional networks can open space for collaboration, referrals, mentorship, and stronger confidence in leadership roles.",
      "Members also reflected on what it means to build an association that feels both welcoming and professionally credible for women at different stages of their careers.",
      "The images from the event highlight the warmth of the room and the value of creating consistent spaces for dialogue, trust, and shared professional ambition.",
    ],
    highlights: [
      "Introductions and networking moments between members and leaders.",
      "Leadership dialogue focused on visibility and collaboration.",
      "Event photography documenting the atmosphere and member interactions.",
    ],
    gallery: [
      {
        src: "/img/slides/d97.jpg",
        alt: "Participants during a ProWIFETA networking session.",
      },
      {
        src: "/img/slides/d98.jpg",
        alt: "A networking conversation during a ProWIFETA leadership dialogue.",
      },
      {
        src: "/img/slides/d99.jpg",
        alt: "Members gathered during a ProWIFETA leadership event.",
      },
    ],
  },
  {
    id: "training-showcase-mentorship-session",
    category: "Event Story",
    title: "Training Showcase and Mentorship Session Highlights",
    dateTime: "2025-07-26",
    displayDate: "July 26, 2025",
    location: "Skills and mentorship showcase",
    coverImage: "/img/slides/d150.jpg",
    excerpt:
      "A photo-rich story from a session where practical training, mentorship, and community learning came together.",
    lead:
      "This event highlighted the value of practical training and mentorship by creating room for members to share experience, demonstrate craft, and support the next generation of professionals.",
    details: [
      "The session celebrated both technical practice and the softer work of mentoring, reminding members that confidence and growth often come through shared demonstration and encouragement.",
      "It also reinforced the association's role as a professional home where women can be seen not only as educators, but as leaders, makers, and trusted voices within the field.",
      "The event gallery preserves that sense of movement, concentration, and community that makes ProWIFETA's work feel real and memorable.",
    ],
    highlights: [
      "Hands-on training moments and demonstration-led learning.",
      "Mentorship conversations grounded in practical experience.",
      "A visual gallery that feels personal, active, and community-centered.",
    ],
    gallery: [
      {
        src: "/img/slides/d148.jpg",
        alt: "A practical training moment during a ProWIFETA mentorship session.",
      },
      {
        src: "/img/slides/d149.jpg",
        alt: "Participants engaged during a ProWIFETA showcase event.",
      },
      {
        src: "/img/slides/d150.jpg",
        alt: "A featured scene from a ProWIFETA training and mentorship event.",
      },
    ],
  },
];
const ARCHIVE_FILTERS = [ALL_EVENTS_FILTER, ...new Set(EVENT_POSTS.map((post) => post.category))];

export default function Blog() {
  const featuredPost = EVENT_POSTS[0];
  const [activePostId, setActivePostId] = useState(() => {
    const hashId = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";

    return EVENT_POSTS.some((post) => post.id === hashId) ? hashId : featuredPost.id;
  });
  const [selectedFilter, setSelectedFilter] = useState(ALL_EVENTS_FILTER);

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content") ?? "";

    document.title = "ProWIFETA Events & Stories | Fashion Education Blog";
    if (descriptionTag) {
      descriptionTag.setAttribute(
        "content",
        "Read ProWIFETA event updates, workshop recaps, leadership stories, and photo highlights from women in fashion education and training."
      );
    }

    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.title = previousTitle;
      if (descriptionTag) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
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
                This page is designed for publishing association updates about workshops,
                networking sessions, member gatherings, mentorship events, and other
                moments worth documenting with words and images.
              </p>

              <div className="blog-hero__actions">
                <a className="blog-primary-action" href={`#${featuredPost.id}`}>
                  Read featured event
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
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
                  <strong>Photo-rich</strong>
                  <span>post format</span>
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
                    <time dateTime={featuredPost.dateTime}>{featuredPost.displayDate}</time>
                  </span>
                  <span>
                    <MapPin size={16} aria-hidden="true" />
                    {featuredPost.location}
                  </span>
                </div>
                <p className="blog-featured-card__excerpt">{featuredPost.excerpt}</p>
                <a className="blog-inline-link" href={`#${featuredPost.id}`}>
                  View full event story
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="blog-overview" aria-labelledby="overview-title">
          <div className="blog-container">
            <div className="blog-section-heading">
              <p className="blog-section-kicker">Recent posts</p>
              <h2 id="overview-title">Browse event updates ready for details and pictures.</h2>
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
                        <time dateTime={post.dateTime}>{post.displayDate}</time>
                      </span>
                      <span>
                        <Camera size={16} aria-hidden="true" />
                        {post.gallery.length} photos
                      </span>
                    </div>
                    <p>{post.excerpt}</p>
                    <a className="blog-inline-link" href={`#${post.id}`}>
                      Read event details
                    </a>
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
              <h2 id="stories-title">Detailed stories with photo galleries from the event.</h2>
              <p className="blog-archive-heading-copy">
                Use the side navigator to jump between event stories and filter the archive
                by update type as the collection continues to grow.
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
                      Jump between event stories and keep track of the section you are
                      currently reading.
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
                            <time dateTime={post.dateTime}>{post.displayDate}</time>
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
