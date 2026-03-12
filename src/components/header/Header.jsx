import { useState, useEffect } from "react";
import "./header.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Add backdrop blur + border when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight nav link for the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Close mobile menu on link click
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header__inner">
        {/* ── Logo ── */}
        <a href="#" className="header__logo" onClick={handleNavClick}>
          <span className="header__logo-bracket">&lt;</span>
          Selvi
          <span className="header__logo-bracket">/&gt;</span>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map(({ label, href }) => {
              const id = href.replace("#", "");
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={`header__nav-link${activeSection === id ? " header__nav-link--active" : ""}`}
                  >
                    {label}
                    <span className="header__nav-link-dot" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="header__cta"
          >
            Resume
          </a>
        </nav>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`header__hamburger${menuOpen ? " header__hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`header__drawer${menuOpen ? " header__drawer--open" : ""}`}
      >
        <ul className="header__drawer-list">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            return (
              <li key={label}>
                <a
                  href={href}
                  className={`header__drawer-link${activeSection === id ? " header__drawer-link--active" : ""}`}
                  onClick={handleNavClick}
                >
                  {label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="header__drawer-cta"
              onClick={handleNavClick}
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
