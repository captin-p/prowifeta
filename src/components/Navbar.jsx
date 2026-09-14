import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const PRIMARY_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programmes", label: "Programmes" },
  { to: "/impact", label: "Impact" },
  { to: "/partners", label: "Partners" },
  { to: "/blog", label: "News & Insights" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <nav className="site-navbar">
      <div className="site-nav__container">
        <Link to="/" className="site-nav__brand" onClick={closeMenu}>
          <img src="/img/logo.png" alt="ProWIFETA logo" className="site-nav__logo" />
          <span className="site-nav__name">ProWIFETA</span>
        </Link>

        <ul id="primary-navigation" className={`site-nav__menu ${isMenuOpen ? "is-open" : ""}`}>
          {PRIMARY_LINKS.map((item) => (
            <li key={item.to} className="site-nav__item">
              <Link
                to={item.to}
                className={`site-nav__link ${isActive(item.to) ? "site-nav__link--active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="site-nav__actions">
          <Link to="/membership" className="site-nav__button" onClick={closeMenu}>
            Join ProWIFETA
          </Link>
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
