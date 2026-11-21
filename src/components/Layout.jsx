// The frame around every page: navigation at the top, the page itself in
// the middle (<Outlet />), and the footer at the bottom.

import { Link, NavLink, Outlet } from "react-router";
import Header from "./Header.jsx";
import SocialLinks from "./SocialLinks.jsx";
import { SITE } from "../siteConfig.js";

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <Link to="/" className="brand">
            🌱 {SITE.name}
          </Link>
          <nav aria-label="Main">
            <ul className="nav-links">
              {/* NavLink adds class="active" to the link for the current page. */}
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>

      <Header title={`${SITE.name}.`} tagline={SITE.tagline} />

      <main id="main" className="wrap page">
        <Outlet />
      </main>

      <footer className="wrap footer">
        <SocialLinks />
        <p>
          {SITE.name} supports UN Sustainable Development Goals 3, 11 and 13 · Built by {SITE.team} · Air quality data from{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
        </p>
      </footer>
    </>
  );
}
