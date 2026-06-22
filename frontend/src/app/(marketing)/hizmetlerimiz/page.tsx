import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Reform İnovasyon Yapı - Kaba inşaat, iç mekan, dış cephe, mobilya, elektrik & mekanik ve danışmanlık hizmetleri.",
};

const services = [
  { name: "Kaba İnşaat", desc: "Demir, beton, kalıp, duvar, çatı ve temel işleri." },
  { name: "İç Mekan", desc: "Kapı, pencere, alçıpan, boya, parke ve merdiven işleri." },
  { name: "Islak Hacim", desc: "Seramik, fayans, mermer, tesisat ve su yalıtımı." },
  { name: "Elektrik & Mekanik", desc: "Elektrik tesisatı, aydınlatma, HVAC, asansör ve güvenlik sistemleri." },
  { name: "Dış Cephe", desc: "Dış cephe kaplama, giydirme cephe, iskele ve peyzaj." },
  { name: "Mobilya & Dekorasyon", desc: "Mutfak dolapları, gömme dolaplar, perde ve ofis mobilyaları." },
  { name: "Danışmanlık", desc: "Proje yönetimi, mimari danışmanlık, statik proje ve maliyet keşif." },
];

export default function HizmetlerimizPage() {
  return (
    <div className="content-container" style={{ paddingTop: "140px", paddingBottom: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "var(--theme-color, #FF6B6B)", letterSpacing: "2px", borderRadius: "50px" }}>
              Hizmetlerimiz
            </span>
            <h1 className="display-4 fw-bold" style={{ color: "#fff" }}>Hizmetlerimiz</h1>
            <p className="lead" style={{ color: "rgba(255,255,255,0.5)" }}>
              İnşaatın her alanında yanınızdayız.
            </p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {services.map((s) => (
            <div key={s.name} className="col-lg-4 col-md-6">
              <div className="p-4 h-100 content-card">
                <h5 className="fw-bold mb-2" style={{ color: "var(--theme-color, #FF6B6B)", letterSpacing: "1px", fontSize: "0.9rem" }}>{s.name}</h5>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
