import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
const SECTION_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "goals", label: "Goals" },
  { id: "members", label: "Members" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Join Us" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isBlogRoute = location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSectionNavigation = (sectionId) => {
    closeMenu();

    if (location.pathname === "/") {
      const target = document.getElementById(sectionId);
      if (target) {
        const nextUrl = sectionId === "home" ? "/" : `/#${sectionId}`;
        window.history.replaceState(null, "", nextUrl);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    navigate(sectionId === "home" ? "/" : `/#${sectionId}`);
  };

  return (
    <nav className="site-navbar">
      <div className="site-nav__container">
        <Link
          to="/"
          className="site-nav__brand"
          onClick={(event) => {
            event.preventDefault();
            handleSectionNavigation("home");
          }}
        >
          <img src="/img/logo.png" alt="ProWIFETA logo" className="site-nav__logo" />
          <span className="site-nav__name">ProWIFETA</span>
        </Link>

        <ul
          id="primary-navigation"
          className={`site-nav__menu ${isMenuOpen ? "is-open" : ""}`}
        >
          {SECTION_LINKS.map((item) => (
            <li key={item.id} className="site-nav__item">
              <button
                type="button"
                className="site-nav__link"
                onClick={() => handleSectionNavigation(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="site-nav__item">
            <Link
              to="/blog"
              className={`site-nav__link ${isBlogRoute ? "site-nav__link--active" : ""}`}
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li>
        </ul>

        <div className="site-nav__actions">
          <button
            type="button"
            className="site-nav__button"
            onClick={() => handleSectionNavigation("contact")}
          >
            Join Us Today
          </button>
        </div>

        <button
          type="button"
          className={`site-nav__toggle ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="site-nav__bar"></span>
          <span className="site-nav__bar"></span>
          <span className="site-nav__bar"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
