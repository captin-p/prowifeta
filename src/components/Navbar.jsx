import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const GROUPS = [
  {
    label: "About",
    links: [
      { to: "/about", label: "Who we are" },
      { to: "/leadership", label: "Leadership" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Our Work",
    links: [
      { to: "/programmes", label: "Programmes" },
      { to: "/projects", label: "Sustainability Projects" },
      { to: "/impact", label: "Impact" },
      { to: "/partners", label: "Partners" },
      { to: "/opportunities", label: "Opportunities" },
    ],
  },
  {
    label: "News & Events",
    links: [
      { to: "/events", label: "Events" },
      { to: "/blog", label: "News & Insights" },
    ],
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (to) => location.pathname === to || (to !== "/" && location.pathname.startsWith(`${to}/`));
  const groupActive = (links) => links.some((item) => isActive(item.to));

  return (
    <nav className="site-navbar">
      <div className="site-nav__container">
        <Link to="/" className="site-nav__brand" onClick={closeMenu}>
          <img src="/img/logo.png" alt="ProWIFETA logo" className="site-nav__logo" />
          <span className="site-nav__name">ProWIFETA</span>
        </Link>
        <ul id="primary-navigation" className={`site-nav__menu ${isMenuOpen ? "is-open" : ""}`}>
          <li className="site-nav__item"><Link to="/" className={`site-nav__link ${location.pathname === "/" ? "site-nav__link--active" : ""}`} onClick={closeMenu}>Home</Link></li>
          {GROUPS.map((group) => <li key={group.label} className="site-nav__item site-nav__item--group"><button type="button" className={`site-nav__link ${groupActive(group.links) ? "site-nav__link--active" : ""}`}>{group.label} <span aria-hidden="true">▾</span></button><div className="site-nav__dropdown">{group.links.map((item) => <Link key={item.to} to={item.to} className={isActive(item.to) ? "is-active" : ""} onClick={closeMenu}>{item.label}</Link>)}</div></li>)}
          <li className="site-nav__item site-nav__mobile-join"><Link to="/membership" className="site-nav__link" onClick={closeMenu}>Join ProWIFETA</Link></li>
        </ul>
        <div className="site-nav__actions"><Link to="/membership" className="site-nav__button" onClick={closeMenu}>Join ProWIFETA</Link></div>
        <button type="button" className={`site-nav__toggle ${isMenuOpen ? "is-open" : ""}`} onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="primary-navigation" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}><span className="site-nav__bar"></span><span className="site-nav__bar"></span><span className="site-nav__bar"></span></button>
      </div>
    </nav>
  );
}

export default Navbar;
