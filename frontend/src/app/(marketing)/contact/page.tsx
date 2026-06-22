"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { api, ContactInfoItem, SocialMediaItem } from "@/lib/api";

const MapDisplay = dynamic(
  () => import("./MapDisplay"),
  { ssr: false, loading: () => <div className="bg-secondary rounded-3" style={{ height: "350px" }} /> }
);

export default function ContactPage() {
  const [contacts, setContacts] = useState<ContactInfoItem[]>([]);
  const [socials, setSocials] = useState<SocialMediaItem[]>([]);

  useEffect(() => {
    api.getContactInfo().then(setContacts).catch(() => {});
    api.getSocialMedia().then(setSocials).catch(() => {});
  }, []);

  const getValue = (type: string) => contacts.find((c) => c.type === type)?.value || "";

  const socialIcons: Record<string, string> = {
    instagram: "📷", facebook: "👍", twitter: "🐦", linkedin: "💼", youtube: "▶️",
  };

  return (
    <div className="content-container" style={{ paddingTop: "140px", paddingBottom: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "var(--theme-color, #FF6B6B)", letterSpacing: "2px", borderRadius: "50px" }}>
              İletişim
            </span>
            <h1 className="display-4 fw-bold" style={{ color: "#fff" }}>Bize Ulaşın</h1>
            <p className="lead" style={{ color: "rgba(255,255,255,0.5)" }}>
              Projeleriniz için bizimle iletişime geçin.
            </p>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="contact-card p-5 content-card">
              <div className="row g-4">
                <div className="col-md-4 text-center">
                  <div className="mb-3" style={{ fontSize: "2rem", color: "var(--theme-color, #FF6B6B)" }}>📞</div>
                  <h5 className="fw-semibold mb-2" style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "1px" }}>TELEFON</h5>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{getValue("phone") || "+90 (212) 555 0 555"}</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="mb-3" style={{ fontSize: "2rem", color: "var(--theme-color, #FF6B6B)" }}>✉️</div>
                  <h5 className="fw-semibold mb-2" style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "1px" }}>E-POSTA</h5>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{getValue("email") || "info@reforminovasyon.com"}</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="mb-3" style={{ fontSize: "2rem", color: "var(--theme-color, #FF6B6B)" }}>📍</div>
                  <h5 className="fw-semibold mb-2" style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "1px" }}>ADRES</h5>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>{getValue("address") || "İstanbul, Türkiye"}</p>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="text-center mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,77,77,0.2)" }}>
                  <h5 className="fw-semibold mb-3" style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "1px" }}>SOSYAL MEDYA</h5>
                  <div className="d-flex justify-content-center gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "rgba(255,77,77,0.08)",
                          border: "1px solid rgba(255,77,77,0.2)",
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "1.3rem",
                          textDecoration: "none",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--theme-color)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "var(--theme-color)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,77,77,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,77,77,0.2)"; }}
                        title={s.platform}
                      >
                        {s.icon ? (
                          <img src={s.icon} alt={s.platform} style={{ width: "22px", height: "22px", filter: "invert(1)" }} />
                        ) : (
                          socialIcons[s.platform.toLowerCase()] || "🔗"
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,77,77,0.2)" }}>
              <MapDisplay lat={Number(getValue("map_lat")) || 41.0082} lng={Number(getValue("map_lng")) || 28.9784} />
            </div>
            {getValue("map_address") && (
              <p className="mt-3 text-center" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                📍 {getValue("map_address")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
