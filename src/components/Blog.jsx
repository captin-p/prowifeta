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
const buildSlideGallery = (numbers, altPrefix) =>
  numbers.map((number, index) => ({
    src: `/img/slides/d${number}.jpg`,
    alt: `${altPrefix} ${index + 1}`,
  }));
const buildEventGallery = (folder, alts) =>
  alts.map((alt, index) => ({
    src: `/img/events/${folder}/${folder}-${String(index + 1).padStart(2, "0")}.jpeg`,
    alt,
  }));
const AGENDA_WEAR_MEDIA_LAUNCH_GALLERY = buildEventGallery("agenda-wear-media-launch", [
  "Steering committee members at the Agenda Wear Ghana media launch.",
  "A speaking moment during the Agenda Wear Ghana media launch.",
  "ProWIFETA representation during the Agenda Wear Ghana media launch.",
  "Stakeholders gathered for the Agenda Wear Ghana media launch.",
  "A campaign platform moment during the Agenda Wear Ghana media launch.",
  "A speaking moment for ProWIFETA during the Agenda Wear Ghana media launch.",
]);
const AGENDA_WEAR_OFFICIAL_LAUNCH_GALLERY = buildEventGallery("agenda-wear-official-launch", [
  "A speaking moment during the official launch of the Agenda Wear Ghana Campaign.",
  "A podium moment during the official launch of the Agenda Wear Ghana Campaign.",
  "A close-up speaking moment during the official launch of the Agenda Wear Ghana Campaign.",
]);
const KUMASI_ART_EXPERIENCE_GALLERY = buildEventGallery("kumasi-art-experience-2026", [
  "A discussion moment during the Kumasi Art Experience programme at KNUST.",
  "Participants engaged during the Kumasi Art Experience programme at KNUST.",
  "Audience interaction during the Kumasi Art Experience programme at KNUST.",
  "Guests gathered for the Kumasi Art Experience programme at KNUST.",
  "A session moment during the British Council-supported programme at KNUST.",
  "Audience members attending the Kumasi Art Experience programme at KNUST.",
]);

const EVENT_POSTS = [
  {
    id: "agenda-wear-ghana-campaign-official-launch",
    category: "Campaign & Advocacy",
    title: "Official Launch of the Agenda Wear Ghana Campaign",
    dateTime: "2026-03-23",
    displayDate: "March 23, 2026",
    location: "Agenda Wear Ghana Campaign launch",
    coverImage: AGENDA_WEAR_OFFICIAL_LAUNCH_GALLERY[0].src,
    excerpt:
      "ProWIFETA joined the official launch as a steering committee member helping shape stronger fashion education, enterprise growth, and industry visibility in Ghana.",
    lead:
      "The official launch of the Agenda Wear Ghana Campaign marked a major step toward coordinated action across Ghana's fashion ecosystem, with ProWIFETA contributing to both the campaign vision and its public momentum.",
    details: [
      "The campaign was launched in collaboration with the Asante Fashion Industry Network and brought together stakeholders committed to innovation, sustainability, and strategic industry partnerships.",
      "As part of the steering committee, ProWIFETA contributed to the development of key objectives and implementation strategies designed to strengthen fashion education, enterprise growth, and industry visibility.",
      "During the launch event, the CEO of ProWIFETA delivered a supporting address that emphasized collaborative action, professional development, and stronger alignment between education and industry as essential to positioning Ghanaian fashion on wider platforms.",
    ],
    highlights: [
      "Steering committee leadership within the Agenda Wear Ghana Campaign.",
      "A supporting address from the CEO of ProWIFETA during the official launch.",
      "Clear focus on innovation, sustainability, and stronger industry partnerships.",
    ],
    gallery: AGENDA_WEAR_OFFICIAL_LAUNCH_GALLERY,
  },
  {
    id: "agenda-wear-ghana-media-launch",
    category: "Campaign & Advocacy",
    title: "Media Launch of the Agenda Wear Ghana Campaign",
    dateTime: "2026-03-19",
    displayDate: "March 19, 2026",
    location: "Collaboration with the Asante Fashion Industry Network",
    coverImage: AGENDA_WEAR_MEDIA_LAUNCH_GALLERY[0].src,
    excerpt:
      "ProWIFETA joined the media launch of the Agenda Wear Ghana Campaign as part of the steering committee advocating for locally made fashion and industry visibility.",
    lead:
      "At the media launch of the Agenda Wear Ghana Campaign, ProWIFETA joined key fashion and creative industry stakeholders to amplify advocacy for locally made fashion and support the next phase of policy and industry dialogue.",
    details: [
      "The launch created a platform for stakeholders to speak with a more unified voice about promoting Ghana-made fashion and strengthening public awareness around the sector.",
      "ProWIFETA's presence on the steering committee reflected its active role in shaping campaign direction and contributing to collaborative industry planning.",
      "The engagement reinforced the association's commitment to sustainable fashion development, sector visibility, and stronger advocacy partnerships within Ghana's creative economy.",
    ],
    highlights: [
      "Advocacy for locally made fashion through a national campaign platform.",
      "Steering committee representation from ProWIFETA.",
      "Stronger policy dialogue and industry visibility for Ghana's fashion sector.",
    ],
    gallery: AGENDA_WEAR_MEDIA_LAUNCH_GALLERY,
  },
  {
    id: "kumasi-art-experience-panel",
    category: "Thought Leadership",
    title: "Kumasi Art Experience Panel Representation",
    dateTime: "2026-03-19",
    displayDate: "March 19, 2026",
    location: "Kwame Nkrumah University of Science and Technology",
    coverImage: KUMASI_ART_EXPERIENCE_GALLERY[5].src,
    excerpt:
      "The Founder of ProWIFETA represented the association at the Kumasi Art Experience as a panelist discussing creative industry development, fashion, and education.",
    lead:
      "ProWIFETA's participation in the Kumasi Art Experience placed the association inside an important creative industry conversation linking artistic expression, fashion education, and Ghana's wider cultural economy.",
    details: [
      "Held at KNUST under a creative industry initiative supported by the British Council, the programme created space for artists, educators, and industry voices to exchange ideas.",
      "The Founder of ProWIFETA joined a panel discussion that explored creative industry development, artistic expression, and the role of fashion and education in shaping Ghana's creative future.",
      "The engagement strengthened ProWIFETA's position in thought leadership and showed its continued willingness to contribute to national and international creative arts dialogue.",
    ],
    highlights: [
      "Panel participation at a British Council-supported creative industry programme.",
      "Discussion on fashion, education, and Ghana's creative economy.",
      "Visible thought leadership from ProWIFETA within the arts and culture space.",
    ],
    gallery: KUMASI_ART_EXPERIENCE_GALLERY,
  },
  {
    id: "pqi-apprenticeship-graduation-programme",
    category: "Skills & Graduation",
    title: "PQI Apprenticeship Graduation Programme",
    dateTime: "2026-02-11",
    displayDate: "February 11, 2026",
    location: "PQI apprenticeship graduation programme",
    coverImage: "/img/slides/d213.jpg",
    excerpt:
      "ProWIFETA took part in the PQI apprenticeship graduation programme celebrating dedication, technical competence, and creative growth among vocational trainees.",
    lead:
      "The PQI apprenticeship graduation programme highlighted the value of structured skills development and the role of partnership-driven training in building stronger futures for young people.",
    details: [
      "On February 11, 2026, ProWIFETA joined the programme sponsored by the Mastercard Foundation in collaboration with partner organisations including GTI and Accents Art.",
      "The event recognised apprentices across several vocational areas, including fashion design, with awards that acknowledged dedication, technical competence, and creative growth.",
      "The programme also reinforced the importance of industry partnerships in supporting youth empowerment, practical learning, and sustainable pathways into work and enterprise.",
    ],
    highlights: [
      "Participation in a Mastercard Foundation-supported graduation programme.",
      "Recognition of apprentices' technical competence and creative growth.",
      "Strong emphasis on partnership-led youth empowerment and skills development.",
    ],
    gallery: buildSlideGallery([213, 214, 215], "PQI apprenticeship graduation moment"),
  },
  {
    id: "edwenase-rehabilitation-center-outreach",
    category: "Outreach & Mentorship",
    title: "Edwenase Rehabilitation Center Empowerment Outreach",
    dateTime: "2025-11-26",
    displayDate: "November 26, 2025",
    location: "Edwenase Rehabilitation Center",
    coverImage: EDWENASE_GALLERY[0].src,
    excerpt:
      "ProWIFETA visited the Edwenase Rehabilitation Center with practical sessions in fashion and cosmetology aimed at building confidence, vocational ability, and reintegration support.",
    lead:
      "On November 26, 2025, ProWIFETA carried its empowerment outreach programme to the Edwenase Rehabilitation Center, using hands-on vocational engagement to encourage confidence, skills growth, and social reintegration.",
    details: [
      "The team worked with students through practical sessions in fashion and cosmetology, creating a supportive setting for learning by doing.",
      "These sessions were designed not only to build technical ability, but also to strengthen confidence and help participants see new possibilities for personal and professional development.",
      "The outreach reflected ProWIFETA's belief that creative and technical training can be a powerful tool for empowerment, transition, and long-term reintegration.",
    ],
    highlights: [
      "Practical skill development in fashion and cosmetology.",
      "Focus on confidence building and vocational growth.",
      "Support for social reintegration through creative and technical training.",
    ],
    gallery: EDWENASE_GALLERY,
  },
  {
    id: "st-louis-college-keynote-engagement",
    category: "Thought Leadership",
    title: "Keynote Engagement at St. Louis College of Education",
    dateTime: "2025-08",
    displayDate: "August 2025",
    location: "St. Louis College of Education",
    coverImage: "/img/slides/d150.jpg",
    excerpt:
      "The CEO of ProWIFETA delivered a keynote under the Vocational Education and Training programme, inspiring students around fashion education, skills growth, and career progression.",
    lead:
      "An invitation to deliver a keynote address at St. Louis College of Education reflected ProWIFETA's growing influence in empowering young talents through fashion education and knowledge-sharing.",
    details: [
      "The engagement took place under the institution's Vocational Education and Training programme and created an opportunity to mentor students at an important stage of their development.",
      "The keynote focused on pathways in fashion education, practical skills development, and career progression, helping students connect their present studies to future opportunities.",
      "The invitation itself signaled ProWIFETA's expanding impact and the value that partners place on the association's voice in education, empowerment, and professional guidance.",
    ],
    highlights: [
      "Keynote delivery under a Vocational Education and Training programme.",
      "Mentorship on fashion education, skills development, and career growth.",
      "Recognition of ProWIFETA's growing impact through strategic partnerships.",
    ],
    gallery: buildSlideGallery([150, 151, 152], "St. Louis College of Education keynote moment"),
  },
  {
    id: "kstu-alumni-homecoming-fashion-expression-2025",
    category: "Industry Engagement",
    title: "KsTU Alumni Homecoming - Fashion Expression 2025",
    dateTime: "2025-08",
    displayDate: "August 2025",
    location: "Kumasi Technical University",
    coverImage: "/img/slides/d153.jpg",
    excerpt:
      "ProWIFETA members joined KsTU Alumni Homecoming - Fashion Expression 2025 to share professional journeys, industry insight, and practical guidance with students and emerging designers.",
    lead:
      "Participation in KsTU Alumni Homecoming - Fashion Expression 2025 allowed ProWIFETA members to connect classroom preparation with industry realities through direct engagement with students and young designers.",
    details: [
      "The team contributed to a panel discussion on 'Alumni Journey in the Fashion Industry,' bringing real professional experiences into the conversation.",
      "Students and emerging designers benefited from practical guidance, reflections on industry pathways, and advice shaped by working experience in the fashion sector.",
      "The engagement reinforced ProWIFETA's commitment to mentorship, industry collaboration, and bridging the gap between fashion education and professional practice.",
    ],
    highlights: [
      "Panel contribution on alumni journeys in the fashion industry.",
      "Professional guidance for students and emerging designers.",
      "Stronger links between education, mentorship, and industry practice.",
    ],
    gallery: buildSlideGallery([153, 154, 155], "KsTU Fashion Expression event moment"),
  },
  {
    id: "usted-food-bazaar-and-fashion-show",
    category: "Skills & Graduation",
    title: "USTED Food Bazaar and Fashion Show",
    dateTime: "2025-08",
    displayDate: "August 2025",
    location: "University of Skill Development and Training (USTED)",
    coverImage: "/img/slides/d156.jpg",
    excerpt:
      "Under the leadership of its Founder, ProWIFETA organised a Food Bazaar and Fashion Show that gave diploma students a practical platform to present creativity, entrepreneurship, and applied fashion skills.",
    lead:
      "The Food Bazaar and Fashion Show organised at USTED turned student assessment into a public-facing learning experience that celebrated creativity, entrepreneurship, and applied design practice.",
    details: [
      "The event formed part of the end-of-programme project for diploma students and created a practical setting for them to demonstrate what they had developed through their training.",
      "The Food Bazaar offered an interactive cultural and economic experience, while the Fashion Show highlighted innovative student collections created during the programme.",
      "By linking academic assessment with real audience engagement, the initiative strengthened ProWIFETA's commitment to experiential learning and better industry exposure for emerging fashion professionals.",
    ],
    highlights: [
      "End-of-programme platform for diploma students at USTED.",
      "A combined cultural, entrepreneurial, and fashion presentation experience.",
      "Experiential learning that connected classroom work with public engagement.",
    ],
    gallery: buildSlideGallery([156, 157, 158], "USTED Food Bazaar and Fashion Show moment"),
  },
  {
    id: "fashion-show-awards-support-across-ghana",
    category: "Recognition & Awards",
    title: "Awards Support for Tertiary Fashion Shows",
    displayDate: "2025 academic year",
    location: "Technical and traditional universities across Ghana",
    coverImage: "/img/slides/d159.jpg",
    excerpt:
      "Throughout the 2025 academic year, ProWIFETA presented awards at tertiary fashion shows to recognise creativity, technical skill, innovation, and craftsmanship.",
    lead:
      "Across the 2025 academic year, ProWIFETA used awards presentation as a way to encourage excellence, motivate emerging designers, and strengthen connections between academia and industry.",
    details: [
      "The association supported fashion shows organised by both technical and traditional universities, making its presence felt across a wider education landscape.",
      "Awards were presented to outstanding fashion design students in recognition of creativity, technical skills, innovation, and craftsmanship.",
      "The initiative encouraged higher standards of professionalism within tertiary fashion education while also reinforcing meaningful collaboration between educators, institutions, and the industry.",
    ],
    highlights: [
      "Awards presented across university fashion shows in Ghana.",
      "Recognition for creativity, technical skill, innovation, and craftsmanship.",
      "Encouragement for stronger industry-academia collaboration and professionalism.",
    ],
    gallery: buildSlideGallery([159, 160, 161], "Tertiary fashion awards presentation moment"),
  },
  {
    id: "school-empowerment-outreach-waec-preparation",
    category: "Outreach & Mentorship",
    title: "School Empowerment Outreach for WAEC Preparation",
    displayDate: "2025 outreach programme",
    location: "Yaa Asantewaa Girls' Senior High School and J.A. Kufuor Senior High School",
    coverImage: "/img/slides/d162.jpg",
    excerpt:
      "Clothing and Textiles students received targeted guidance on WAEC preparation, performance improvement, career awareness, and selecting suitable tertiary pathways.",
    lead:
      "During visits to Yaa Asantewaa Girls' Senior High School and J.A. Kufuor Senior High School, ProWIFETA supported Clothing and Textiles students with academic direction and practical career guidance.",
    details: [
      "Students received targeted support on effective WAEC examination preparation together with practical tips to strengthen performance in Clothing and Textiles.",
      "The sessions also focused on career awareness, helping students understand fashion and textiles-related opportunities beyond secondary school.",
      "Guidance on choosing suitable tertiary institutions and academic pathways gave students clearer direction for their future progression.",
    ],
    highlights: [
      "Targeted WAEC preparation guidance for Clothing and Textiles students.",
      "Career awareness around fashion and textiles-related opportunities.",
      "Support for choosing suitable tertiary institutions and academic pathways.",
    ],
    gallery: buildSlideGallery([162, 163, 164], "School empowerment outreach moment"),
  },
];
const ARCHIVE_FILTERS = [ALL_EVENTS_FILTER, ...new Set(EVENT_POSTS.map((post) => post.category))];
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
              <h2 id="stories-title">Detailed stories with galleries from ProWIFETA programmes and milestones.</h2>
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
