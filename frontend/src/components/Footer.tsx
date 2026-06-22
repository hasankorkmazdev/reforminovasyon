"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api, SocialMediaItem } from "@/lib/api";

export default function Footer() {
  const pathname = usePathname();
  const [socials, setSocials] = useState<SocialMediaItem[]>([]);

  useEffect(() => {
    api.getSocialMedia().then(setSocials).catch(() => {});
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo d-flex align-items-center gap-1">
              <img src="/assets/images/logo/logo-white.png" alt="Reform İnovasyon" height="32" />
            </Link>
            <p className="footer-desc">
              Reform İnovasyon Yapı, inşaat sektöründe yenilikçi projeleriyle geleceği inşa ediyor. Kaba inşaat, iç mekan, dış cephe, mobilya ve danışmanlık hizmetleri.
            </p>
            {socials.length > 0 && (
              <div className="footer-social">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.platform}
                  >
                    {s.icon ? (
                      <img src={s.icon} alt={s.platform} style={{ width: "16px", height: "16px", filter: "invert(1)" }} />
                    ) : (
                      s.platform.charAt(0).toUpperCase()
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h5 className="footer-heading">Hızlı Linkler</h5>
            <ul className="footer-links">
              <li><Link href="/">Anasayfa</Link></li>
              <li><Link href="/about">Hakkımızda</Link></li>
              <li><Link href="/contact">İletişim</Link></li>
              <li><Link href="/bizimle-calisin">Bizimle Çalışın</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="footer-heading">Projeler</h5>
            <ul className="footer-links">
              <li><Link href="/refbrown">Ref<span style={{color:"#8B4513"}}>Brown</span></Link></li>
              <li><Link href="/refblue">Ref<span style={{color:"#0F52BA"}}>Blue</span></Link></li>
              <li><Link href="/refred">Ref<span style={{color:"#DC3545"}}>Red</span></Link></li>
              <li><Link href="/refgreen">Ref<span style={{color:"#28A745"}}>Green</span></Link></li>
            </ul>
          </div>
          <div>
            <h5 className="footer-heading">İletişim</h5>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>İstanbul, Türkiye</span>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:info@reforminovasyon.com">info@reforminovasyon.com</a>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+902121234567">+90 (212) 123 45 67</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright">&copy; {new Date().getFullYear()} Reform İnovasyon Yapı. Tüm hakları saklıdır.</span>
          <div className="footer-bottom-links">
            <a href="#">Gizlilik Politikası</a>
            <a href="#">Kullanım Koşulları</a>
            <a href="#">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
