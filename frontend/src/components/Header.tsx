"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { api, SocialMediaItem } from "@/lib/api";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [socials, setSocials] = useState<SocialMediaItem[]>([]);

  useEffect(() => {
    api.getSocialMedia().then(setSocials).catch(() => {});
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="navbar navbar-dark fixed-top p-3 glass-header">
        <div className="container-fluid px-md-4">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <img src="/assets/images/logo/logo-white.png" alt="Reform İnovasyon" height="36" style={{ height: "36px", width: "auto" }} />
          </Link>

          <nav className="d-none d-lg-flex align-items-center gap-4">
            <Link href="/" className={`nav-link-item header-nav-link small fw-semibold text-uppercase ls-wide-sm ${isActive("/") ? "active" : ""}`}>
              Anasayfa
            </Link>

            <div className="dropdown">
              <a href="#" className="nav-link-item header-nav-link dropdown-toggle small fw-semibold text-uppercase ls-wide-sm text-decoration-none"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kurumsal
              </a>
              <ul className="dropdown-menu dropdown-menu-dark glass-dropdown">
                <li><Link className="dropdown-item small fw-normal" href="/about">Hakkımızda</Link></li>
                <li><Link className="dropdown-item small fw-normal" href="/vizyonumuz">Vizyonumuz</Link></li>
                <li><Link className="dropdown-item small fw-normal" href="/misyonumuz">Misyonumuz</Link></li>
              </ul>
            </div>

            <Link href="/hizmetlerimiz" className={`nav-link-item header-nav-link small fw-semibold text-uppercase ls-wide-sm ${isActive("/hizmetlerimiz") ? "active" : ""}`}>
              Hizmetlerimiz
            </Link>

            <div className="dropdown">
              <a href="#" className="nav-link-item header-nav-link dropdown-toggle small fw-semibold text-uppercase ls-wide-sm text-decoration-none"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Projeler
              </a>
              <ul className="dropdown-menu dropdown-menu-dark glass-dropdown">
                <li><Link className="dropdown-item small fw-normal" href="/refbrown">REF<span className="color-brown ps-1">BROWN</span></Link></li>
                <li><Link className="dropdown-item small fw-normal" href="/refblue">REF<span className="color-blue ps-1">BLUE</span></Link></li>
                <li><Link className="dropdown-item small fw-normal" href="/refred">REF<span className="color-red ps-1">RED</span></Link></li>
                <li><Link className="dropdown-item small fw-normal" href="/refgreen">REF<span className="color-green ps-1">GREEN</span></Link></li>
              </ul>
            </div>

            <Link href="/contact" className={`nav-link-item header-nav-link small fw-semibold text-uppercase ls-wide-sm ${isActive("/contact") ? "active" : ""}`}>
              İletişim
            </Link>

            <Link href="/bizimle-calisin" className={`nav-link-item header-nav-link small fw-semibold text-uppercase ls-wide-sm ${isActive("/bizimle-calisin") ? "active" : ""}`}>
              Bizimle Çalışın
            </Link>

            {socials.length > 0 && (
              <div className="d-flex align-items-center gap-2 ms-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(255,77,77,0.08)",
                      border: "1px solid rgba(255,77,77,0.2)",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.75rem",
                      textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--theme-color)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--theme-color)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,77,77,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,77,77,0.2)"; }}
                    title={s.platform}
                  >
                    {s.icon ? (
                      <img src={s.icon} alt={s.platform} style={{ width: "14px", height: "14px", filter: "invert(1)" }} />
                    ) : (
                      s.platform.charAt(0).toUpperCase()
                    )}
                  </a>
                ))}
              </div>
            )}

            <div className="dropdown ms-2">
              <a href="#" className="nav-link-item header-nav-link dropdown-toggle small fw-semibold text-uppercase ls-wide-sm d-flex align-items-center gap-2 text-decoration-none"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://flagcdn.com/w20/tr.png" alt="TR" className="lang-flag" /> TR
              </a>
              <ul className="dropdown-menu dropdown-menu-dark glass-dropdown dropdown-menu-end lang-dropdown-menu">
                <li><Link href="#" className="dropdown-item small fw-normal d-flex align-items-center gap-2 active"><img src="https://flagcdn.com/w20/tr.png" alt="TR" className="lang-flag" /> Türkçe (TR)</Link></li>
                <li><Link href="#" className="dropdown-item small fw-normal d-flex align-items-center gap-2"><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="lang-flag" /> English (EN)</Link></li>
                <li><Link href="#" className="dropdown-item small fw-normal d-flex align-items-center gap-2"><img src="https://flagcdn.com/w20/sa.png" alt="AR" className="lang-flag" /> العربية (AR)</Link></li>
              </ul>
            </div>
          </nav>

          <button className="menu-trigger-btn d-lg-none" type="button" onClick={() => setMenuOpen(true)}>
            <span className="menu-icon-line"></span>
            <span className="menu-icon-line"></span>
            <span className="menu-icon-line"></span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1080 }} onClick={() => setMenuOpen(false)} />
      )}
      <div className={`offcanvas offcanvas-end glass-menu ${menuOpen ? "show" : ""}`} tabIndex={-1}>
        <div className="offcanvas-header justify-content-end p-4">
          <button type="button" className="btn-close btn-close-white" onClick={() => setMenuOpen(false)}></button>
        </div>
        <div className="offcanvas-body d-flex flex-column justify-content-center align-items-center">
          <nav className="slider-nav">
            <ul className="list-unstyled text-center">
              <li><Link href="/" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>Anasayfa</Link></li>
              <li><Link href="/about" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>Hakkımızda</Link></li>
              <li><Link href="/vizyonumuz" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>Vizyonumuz</Link></li>
              <li><Link href="/misyonumuz" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>Misyonumuz</Link></li>
              <li><Link href="/hizmetlerimiz" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>Hizmetlerimiz</Link></li>
              <li><Link href="/refbrown" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>REF<span className="color-brown">BROWN</span></Link></li>
              <li><Link href="/refblue" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>REF<span className="color-blue">BLUE</span></Link></li>
              <li><Link href="/refred" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>REF<span className="color-red">RED</span></Link></li>
              <li><Link href="/refgreen" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>REF<span className="color-green">GREEN</span></Link></li>
              <li><Link href="/contact" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>İletişim</Link></li>
              <li><Link href="/bizimle-calisin" className="nav-link-item fs-3 fw-semibold" onClick={() => setMenuOpen(false)}>Bizimle Çalışın</Link></li>
            </ul>
          </nav>
          {socials.length > 0 && (
            <div className="d-flex gap-3 justify-content-center mt-4">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,77,77,0.08)",
                    border: "1px solid rgba(255,77,77,0.2)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  title={s.platform}
                >
                  {s.icon ? (
                    <img src={s.icon} alt={s.platform} style={{ width: "18px", height: "18px", filter: "invert(1)" }} />
                  ) : (
                    s.platform.charAt(0).toUpperCase()
                  )}
                </a>
              ))}
            </div>
          )}
          <div className="mobile-lang-selector d-flex gap-3 justify-content-center mt-3">
            <button className="mobile-lang-item active" title="Türkçe"><img src="https://flagcdn.com/w20/tr.png" alt="TR" className="lang-flag" /></button>
            <button className="mobile-lang-item" title="English"><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="lang-flag" /></button>
            <button className="mobile-lang-item" title="العربية"><img src="https://flagcdn.com/w20/sa.png" alt="AR" className="lang-flag" /></button>
          </div>
        </div>
      </div>
    </>
  );
}
