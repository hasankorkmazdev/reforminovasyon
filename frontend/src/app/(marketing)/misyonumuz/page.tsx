import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Misyonumuz",
  description: "Reform İnovasyon Yapı misyonu, müşteri memnuniyetini merkeze alan, yenilikçi ve güvenilir çözümler sunmaktır.",
};

export default function MisyonumuzPage() {
  return (
    <div className="content-container" style={{ paddingTop: "140px", paddingBottom: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "var(--theme-color, #FF6B6B)", letterSpacing: "2px", borderRadius: "50px" }}>
              Misyonumuz
            </span>
            <h1 className="display-4 fw-bold" style={{ color: "#fff" }}>Kalite ve Güven</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="p-5 content-card">
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "1.05rem" }}>
                Müşteri memnuniyetini merkeze alan, yenilikçi ve güvenilir çözümlerle inşaat sektöründe
                fark yaratmak. Her projede kalite, zaman ve bütçe dengesini en iyi şekilde yöneterek,
                müşterilerimize en yüksek değeri sunmayı misyon ediniyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
