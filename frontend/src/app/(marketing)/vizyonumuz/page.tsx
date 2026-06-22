import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vizyonumuz",
  description: "Reform İnovasyon Yapı olarak vizyonumuz, modern mimari ve sürdürülebilir yapı teknolojilerini birleştirerek geleceği inşa etmek.",
};

export default function VizyonumuzPage() {
  return (
    <div className="content-container" style={{ paddingTop: "140px", paddingBottom: "120px", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "var(--theme-color, #FF6B6B)", letterSpacing: "2px", borderRadius: "50px" }}>
              Vizyonumuz
            </span>
            <h1 className="display-4 fw-bold" style={{ color: "#fff" }}>Geleceği İnşa Ediyoruz</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="p-5 content-card">
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "1.05rem" }}>
                Modern mimari ve sürdürülebilir yapı teknolojilerini birleştirerek, yaşam kalitesini yükselten,
                çevreye duyarlı ve estetik değeri yüksek projelere imza atıyoruz. Vizyonumuz, inşaat sektöründe
                yenilikçi çözümlerle fark yaratarak, yaşanabilir ve sürdürülebilir bir gelecek inşa etmektir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
