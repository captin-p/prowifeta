import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Handshake,
  Lightbulb,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import "./LandingPage.css";
import Galleries from "./Galleries.jsx";

const JOIN_URL = "https://forms.gle/SsHAeFN9ncR7PiFz8";
const HERO_SLIDES = Array.from({ length: 63 }, (_, index) => ({
  image: `/img/slides/d${index + 1}.jpg`,
}));
const GALLERY_IMAGE_COUNT = 314;
const HERO_AUDIENCES = ["Lecturers", "Trainers", "Researchers", "Mentors"];
const VALUE_PROPOSITIONS = [
  {
    icon: GraduationCap,
    title: "Professional development",
    description:
      "Sharpen your teaching practice through workshops, shared resources, and industry-informed learning.",
  },
  {
    icon: Handshake,
    title: "Purposeful networking",
    description:
      "Build meaningful relationships with women across institutions, disciplines, and leadership levels.",
  },
  {
    icon: TrendingUp,
    title: "Career visibility",
    description:
      "Grow your influence through collaborations, speaking opportunities, and a stronger professional profile.",
  },
  {
    icon: Lightbulb,
    title: "Fresh industry insight",
    description:
      "Stay close to conversations shaping fashion education, innovation, and practice-led training.",
  },
];
const ABOUT_HIGHLIGHTS = [
  {
    icon: Users,
    title: "A cross-institution community",
    description:
      "Connect with women teaching, researching, and mentoring across universities, colleges, and training spaces.",
  },
  {
    icon: Target,
    title: "Focused on meaningful growth",
    description:
      "The association creates room for mentorship, curriculum dialogue, and professional confidence.",
  },
  {
    icon: Scale,
    title: "Advocacy with purpose",
    description:
      "We champion visibility, equity, and stronger representation for women in fashion education and training.",
  },
];
const MISSION_PILLARS = [
  {
    icon: Handshake,
    title: "Professional networking",
    description:
      "Encourage women in fashion education and training to share experiences and build strong professional relationships.",
  },
  {
    icon: BookOpen,
    title: "Knowledge exchange",
    description:
      "Promote best practices, industry insight, and strong instructional strategies across the profession.",
  },
  {
    icon: Target,
    title: "Professional development",
    description:
      "Offer workshops, mentorship, and practical resources that help members strengthen their careers.",
  },
  {
    icon: Scale,
    title: "Advocacy",
    description:
      "Promote diversity, gender equality, and equitable opportunity within fashion education and training.",
  },
];
const MEMBERSHIP_STEPS = [
  {
    icon: BookOpen,
    title: "Share your professional profile",
    description:
      "Tell us about your teaching, research, mentorship, or training experience in fashion education.",
  },
  {
    icon: Handshake,
    title: "Connect with the network",
    description:
      "Join a community of educators and practitioners committed to collaboration and visible leadership.",
  },
  {
    icon: TrendingUp,
    title: "Build your next chapter",
    description:
      "Access relationships, opportunities, and conversations that strengthen your long-term impact.",
  },
];
const MEMBERS = [
  {
    image: "/card/v1.jpg",
    name: "Phyllis Mensah",
    role: "Director",
    bio: "A seasoned fashion designer and educator with over 20 years of experience and multiple advanced degrees, currently lecturing at AAMUSTED while pursuing a doctorate.",
  },
  {
    image: "/card/v11.jpg",
    name: "Abena Okyerewaa Siaw",
    role: "President",
    bio: "Fashion lecturer at Kumasi Technical University and a PhD candidate at KNUST with interests in vocational education, sustainable fashion, and accessories production.",
  },
  {
    image: "/card/v2.jpg",
    name: "Joyceline Dzordzi Esi Lawoe",
    role: "Vice President",
    bio: "Fashion lecturer at Sunyani Technical University and PhD student at the University of Johannesburg, researching sustainable fashion and garment production.",
  },
  {
    image: "/card/v3.jpg",
    name: "Matilda Ekua Tawiah (Ms. Tilly)",
    role: "Secretary",
    bio: "Head of Fashion at BlueCrest College and a seasoned mentor specializing in garment construction and textiles.",
  },
  {
    image: "/card/v4.jpg",
    name: "Vida Adu-Gyamfi",
    role: "Member",
    bio: "A seasoned fashion lecturer at Sunyani Technical University.",
  },
  {
    image: "/card/v5.jpg",
    name: "Aidam Yayra Kokui",
    role: "Member",
    bio: "Fashion lecturer at Gbewaa College of Education and CEO of Unique Designs, with over 15 years of experience in apparel design and cultural clothing research.",
  },
  {
    image: "/card/v6.jpg",
    name: "Fanny Banson",
    role: "Member",
    bio: "Fashion educator and industry professional at Sunyani Technical University, specializing in millinery, accessories, and craft design.",
  },
  {
    image: "/card/v7.jpg",
    name: "Adukwei Sempe Glover",
    role: "Member",
    bio: "Senior technician in Fashion Design and Textiles at AAMUSTED and CEO of Gasy Signature, with research interests in sustainability, technology adoption, and education in Ghana's fashion industry.",
  },
  {
    image: "/card/v8.jpg",
    name: "Abigail Nkansah",
    role: "Member",
    bio: "Fashion professional and lecturer at AAMUSTED with experience in teaching, apparel design, and doctoral studies at KNUST.",
  },
  {
    image: "/card/v12.jpg",
    name: "Dr. Fatimatu Hajia Ibrahim",
    role: "Member",
    bio: "Fibre artist and lecturer at Tamale Technical University with interests in crochet, macrame, needlepoint, and instructional design for teaching and learning.",
  },
];

const getLeadSentence = (text) => {
  const match = text.match(/[^.?!]+[.?!]/);
  return match ? match[0].trim() : text;
};

function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const sectionId = location.hash.replace("#", "");

    if (!sectionId) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const nextUrl = sectionId === "home" ? "/" : `/#${sectionId}`;
    window.history.replaceState(null, "", nextUrl);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToPrev = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0 ? HERO_SLIDES.length - 1 : previousSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % HERO_SLIDES.length);
  };

  const featuredLeader = MEMBERS.find((member) => member.role === "Director") ?? MEMBERS[0];
  const executiveTeam = MEMBERS.filter(
    (member) => member.role !== "Member" && member.name !== featuredLeader.name
  );
  const communityMembers = MEMBERS.filter((member) => member.role === "Member");
  const heroStats = [
    { value: `${GALLERY_IMAGE_COUNT}+`, label: "archive images" },
    { value: String(MISSION_PILLARS.length), label: "mission pillars" },
    { value: String(MEMBERS.length), label: "leaders profiled" },
  ];
  const currentSlideLabel = String(currentSlide + 1).padStart(2, "0");
  const totalSlideLabel = String(HERO_SLIDES.length).padStart(2, "0");
  const heroProgress = `${(((currentSlide + 1) / HERO_SLIDES.length) * 100).toFixed(2)}%`;

  return (
    <div className="landing-page">
      <main className="landing-main">
        <section id="home" className="hero-section" aria-labelledby="home-title">
          <div
            className="hero-stage"
            style={{
              backgroundImage: HERO_SLIDES[currentSlide]
                ? `url(${encodeURI(HERO_SLIDES[currentSlide].image)})`
                : "linear-gradient(135deg, #0b2239 0%, #102c4a 100%)",
            }}
          >
            <div className="hero-backdrop" aria-hidden="true"></div>
            <div className="container hero-shell">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="section-kicker section-kicker--hero">
                    <Sparkles size={16} aria-hidden="true" />
                    <span>Professional Women in Fashion Education &amp; Training</span>
                  </p>
                  <h1 id="home-title" className="hero-title">
                    The network helping women in fashion education lead, collaborate,
                    and grow.
                  </h1>
                  <p className="hero-lead">
                    ProWIFETA brings together lecturers, trainers, researchers, and
                    mentors who want stronger collaboration, sharper professional growth,
                    and a more connected future for fashion education.
                  </p>

                  <div className="hero-actions">
                    <button
                      type="button"
                      className="hero-primary-action"
                      onClick={() => scrollToSection("about")}
                    >
                      Explore ProWIFETA
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                    <a
                      className="hero-secondary-action"
                      href={JOIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join the association
                    </a>
                  </div>

                  <ul className="hero-audience-list" aria-label="Who ProWIFETA is for">
                    {HERO_AUDIENCES.map((audience) => (
                      <li key={audience} className="hero-audience-chip">
                        {audience}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hero-aside">
                  <div className="hero-insight-card">
                    <div className="hero-card-head">
                      <div>
                        <p className="hero-card-kicker">Association snapshot</p>
                        <h2 className="hero-card-title">
                          Built for visible leadership, shared learning, and stronger
                          professional momentum.
                        </h2>
                      </div>
                      <div className="hero-nav" aria-label="Hero slideshow navigation">
                        <button
                          type="button"
                          className="hero-nav-button"
                          onClick={goToPrev}
                          aria-label="Show previous hero slide"
                        >
                          <ChevronLeft size={20} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="hero-nav-button"
                          onClick={goToNext}
                          aria-label="Show next hero slide"
                        >
                          <ChevronRight size={20} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="hero-stat-grid">
                      {heroStats.map((item) => (
                        <div key={item.label} className="hero-stat-card">
                          <strong>{item.value}</strong>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="hero-progress-row">
                      <div className="hero-progress-copy">
                        <span className="hero-progress-label">Featured visual story</span>
                        <span>
                          {currentSlideLabel}/{totalSlideLabel}
                        </span>
                      </div>
                      <div className="hero-progress-track" aria-hidden="true">
                        <span className="hero-progress-fill" style={{ width: heroProgress }} />
                      </div>
                    </div>
                  </div>

                  <article className="hero-member-card">
                    <p className="hero-member-kicker">Leadership spotlight</p>
                    <div className="hero-member-profile">
                      <img
                        className="hero-member-avatar"
                        src={featuredLeader.image}
                        alt={`Portrait of ${featuredLeader.name}`}
                      />
                      <div className="hero-member-meta">
                        <h3 className="hero-member-name">{featuredLeader.name}</h3>
                        <p className="hero-member-role">{featuredLeader.role}</p>
                      </div>
                    </div>
                    <p className="hero-member-summary">{getLeadSentence(featuredLeader.bio)}</p>
                  </article>
                </div>
              </div>

              <button
                type="button"
                className="hero-scroll-link"
                onClick={() => scrollToSection("about")}
              >
                Explore the mission
              </button>
            </div>
          </div>
        </section>

        <section className="value-section" aria-labelledby="value-title">
          <div className="container">
            <div className="section-intro section-intro--center">
              <p className="section-kicker">Why ProWIFETA</p>
              <h2 id="value-title" className="section-title">
                A professional home for the women shaping classrooms, studios, and
                industry-ready training.
              </h2>
              <p className="section-summary">
                Whether you lecture, train, mentor, or research, ProWIFETA helps you stay
                connected to peers, ideas, and opportunities that make your work more
                visible and more sustainable.
              </p>
            </div>

            <div className="value-grid">
              {VALUE_PROPOSITIONS.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="value-card">
                    <div className="value-icon">
                      <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="container">
            <div className="section-intro section-intro--split">
              <div>
                <p className="section-kicker">About ProWIFETA</p>
                <h2 id="about-title" className="section-title">
                  Designed to amplify expertise, collaboration, and leadership in fashion
                  education.
                </h2>
              </div>
              <p className="section-summary">
                The Professional Women in Fashion Education and Training Association is a
                vibrant community for women who teach, train, and influence the future of
                fashion learning. We bring practice, scholarship, and mentorship into one
                shared space.
              </p>
            </div>

            <div className="about-layout">
              <article className="about-story-card">
                <div className="about-logo-lockup">
                  <div className="about-logo-badge">
                    <img src="/img/logo.png" alt="ProWIFETA logo" />
                  </div>
                  <div>
                    <p className="about-logo-label">Professional community</p>
                    <h3>Connected by purpose, grounded in practice.</h3>
                  </div>
                </div>
                <p>
                  ProWIFETA creates room for women in fashion education to exchange ideas,
                  strengthen curriculum, mentor one another, and grow their influence as
                  visible leaders in the sector.
                </p>
                <p>
                  From lecture halls to practical training environments, the association is
                  committed to building a more collaborative and inspiring future for
                  current and emerging professionals.
                </p>
              </article>

              <div className="about-detail-grid">
                {ABOUT_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article key={item.title} className="about-detail-card">
                      <div className="about-detail-icon">
                        <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="goals" className="goals-section" aria-labelledby="goals-title">
          <div className="container">
            <div className="section-intro section-intro--split">
              <div>
                <p className="section-kicker">Our focus</p>
                <h2 id="goals-title" className="section-title">
                  What the association is building for members and for the wider fashion
                  education industry.
                </h2>
              </div>
              <p className="section-summary">
                Our work is centered on practical support, professional connection, and the
                kind of advocacy that helps women lead with stronger confidence and deeper
                influence.
              </p>
            </div>

            <div className="goals-grid">
              {MISSION_PILLARS.map((goal) => {
                const Icon = goal.icon;

                return (
                  <article key={goal.title} className="goal-card">
                    <div className="goal-icon">
                      <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-intro section-intro--split">
              <div>
                <p className="section-kicker">Gallery</p>
                <h2 id="gallery-title" className="section-title">
                  A visual archive of workshops, events, and the community in motion.
                </h2>
              </div>
              <p className="section-summary">
                Explore the atmosphere behind ProWIFETA programs, leadership gatherings,
                and shared learning moments across the network.
              </p>
            </div>

            <Galleries />
          </div>
        </section>

        <section id="members" className="members-section" aria-labelledby="members-title">
          <div className="container">
            <div className="section-intro section-intro--split">
              <div>
                <p className="section-kicker">Leadership</p>
                <h2 id="members-title" className="section-title">
                  Meet the women guiding ProWIFETA&apos;s vision and community direction.
                </h2>
              </div>
              <p className="section-summary">
                A respected team of educators, researchers, and practitioners is helping
                shape the association&apos;s identity, standards, and collaborative momentum.
              </p>
            </div>

            <div className="members-layout">
              <article className="featured-member-card">
                <div className="featured-member-image-wrap">
                  <img
                    src={featuredLeader.image}
                    alt={`Portrait of ${featuredLeader.name}`}
                    loading="lazy"
                  />
                  <span className="member-role-tag">{featuredLeader.role}</span>
                </div>
                <div className="featured-member-copy">
                  <p className="featured-member-kicker">Featured leader</p>
                  <h3>{featuredLeader.name}</h3>
                  <p className="featured-member-bio">{featuredLeader.bio}</p>
                </div>
              </article>

              <div className="executive-grid">
                {executiveTeam.map((member) => (
                  <article key={member.name} className="executive-card">
                    <div className="executive-card-header">
                      <img
                        className="executive-member-avatar"
                        src={member.image}
                        alt={`Portrait of ${member.name}`}
                        loading="lazy"
                      />
                      <div>
                        <p className="directory-role">{member.role}</p>
                        <h3>{member.name}</h3>
                      </div>
                    </div>
                    <p>{member.bio}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="directory-intro">
              <h3>Association members</h3>
              <p>
                Experienced educators and practitioners contributing to the strength of the
                network across institutions and specialist areas.
              </p>
            </div>

            <div className="member-directory">
              {communityMembers.map((member) => (
                <article key={member.name} className="directory-card">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    loading="lazy"
                  />
                  <p className="directory-role">{member.role}</p>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="join-section" aria-labelledby="contact-title">
          <div className="container">
            <div className="join-layout">
              <div className="join-copy">
                <p className="section-kicker">Membership</p>
                <h2 id="contact-title" className="section-title">
                  Join a community that understands the work behind fashion education.
                </h2>
                <p className="section-summary">
                  If you teach, mentor, train, research, or manage learning experiences in
                  fashion, ProWIFETA offers the network, visibility, and support to help
                  your contribution go further.
                </p>

                <div className="join-benefit-grid">
                  {MEMBERSHIP_STEPS.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article key={item.title} className="join-benefit-card">
                        <div className="join-benefit-icon">
                          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                        </div>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <aside className="join-card">
                <p className="join-card-kicker">Next step</p>
                <h3>Ready to become part of ProWIFETA?</h3>
                <ol className="join-step-list">
                  <li>Complete the membership application form.</li>
                  <li>Share your professional background and areas of interest.</li>
                  <li>Prepare to connect with a stronger network of women in fashion education.</li>
                </ol>
                <a
                  className="join-action"
                  href={JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Complete the membership form
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/img/logo.png" alt="ProWIFETA logo" />
            <div className="footer-brand-copy">
              <p className="footer-name">ProWIFETA</p>
              <p>
                Professional Women in Fashion Education &amp; Training Association
              </p>
            </div>
          </div>

          <div className="footer-links">
            <button type="button" onClick={() => scrollToSection("home")}>Home</button>
            <button type="button" onClick={() => scrollToSection("about")}>About</button>
            <button type="button" onClick={() => scrollToSection("goals")}>Focus</button>
            <button type="button" onClick={() => scrollToSection("gallery")}>Gallery</button>
            <button type="button" onClick={() => scrollToSection("members")}>Members</button>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              Join Us
            </a>
          </div>

          <div className="footer-meta">
            <p>&copy; 2026 ProWIFETA. All rights reserved.</p>
            <p>Powered by Bright Ko Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
