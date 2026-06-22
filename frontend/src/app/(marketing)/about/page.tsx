import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Reform İnovasyon Yapı - Geleceği inşa eden yenilikçi inşaat firması. Kaliteli ve sürdürülebilir yapı projeleri.",
};

export default function AboutPage() {
  return (
    <div className="content-container" style={{ paddingTop: "140px", paddingBottom: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "var(--theme-color, #FF6B6B)", letterSpacing: "2px", borderRadius: "50px" }}>
              Hakkımızda
            </span>
            <h1 className="display-4 fw-bold" style={{ color: "#fff" }}>Geleceği İnşa Ediyoruz</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card p-5 content-card">
              <div className="row g-5">
                <div className="col-md-6">
                  <h3 className="fw-bold mb-3" style={{ color: "var(--theme-color, #FF6B6B)", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" }}>Vizyonumuz</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                    Modern mimari ve sürdürülebilir yapı teknolojilerini birleştirerek, yaşam kalitesini yükselten,
                    çevreye duyarlı ve estetik değeri yüksek projelere imza atıyoruz.
                  </p>
                </div>
                <div className="col-md-6">
                  <h3 className="fw-bold mb-3" style={{ color: "var(--theme-color, #FF6B6B)", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" }}>Misyonumuz</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                    Müşteri memnuniyetini merkeze alan, yenilikçi ve güvenilir çözümlerle inşaat sektöründe
                    fark yaratmak. Her projede kalite, zaman ve bütçe dengesini en iyi şekilde yönetmek.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
