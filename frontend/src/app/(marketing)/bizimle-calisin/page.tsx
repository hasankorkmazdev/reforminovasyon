"use client";

import { api, CategoryGroup } from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";

export default function BizimleCalisinPage() {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getCategories().then(setGroups).catch(() => {});
  }, []);

  const selectedOption = groups
    .flatMap((g) => g.categories.map((c) => ({ ...c, groupName: g.name })))
    .find((c) => c.id === Number(selectedCatId));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedCatId || !company || !contact || !email || !phone) {
      setError("Lütfen tüm zorunlu alanları doldurunuz.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi giriniz.");
      return;
    }

    setLoading(true);
    try {
      await api.createApplication({
        categoryId: Number(selectedCatId),
        companyName: company,
        contactPerson: contact,
        email,
        phone,
        description,
      });
      setSuccess(true);
      setSelectedCatId("");
      setCompany("");
      setContact("");
      setEmail("");
      setPhone("");
      setDescription("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-container" style={{ paddingTop: "140px", paddingBottom: "120px", minHeight: "100vh", background: "radial-gradient(circle at 90% 10%, rgba(255,107,107,0.05) 0%, transparent 50%)" }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "var(--theme-color, #FF6B6B)", letterSpacing: "2px", borderRadius: "50px" }}>
              İş Ortaklığı
            </span>
            <h1 className="display-4 fw-bold" style={{ color: "#fff" }}>Bizimle Çalışın</h1>
            <p className="lead" style={{ color: "rgba(255,255,255,0.5)" }}>
              Projelerimizde yer almak istediğiniz iş kolunu seçin, size en kısa sürede dönüş yapalım.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="form-card p-4 p-md-5 content-card">
              {success ? (
                <div className="text-center py-5">
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(40,167,69,0.15)", border: "2px solid rgba(40,167,69,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2.5rem", color: "#28A745" }}>✓</div>
                  <h3 className="fw-bold mb-3" style={{ color: "#fff" }}>Başvurunuz Alındı!</h3>
                  <p className="mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                  <button className="btn px-4 py-2 rounded-pill fw-semibold" style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "#fff" }} onClick={() => setSuccess(false)}>Yeni Başvuru</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Çalışmak İstediğiniz İş Kolu</label>
                      <select className="form-select" value={selectedCatId} onChange={(e) => setSelectedCatId(e.target.value)}
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,77,77,0.2)", color: "#fff", borderRadius: "10px", padding: "0.8rem 1rem", width: "100%" }}>
                        <option value="">-- Seçiniz --</option>
                        {groups.map((g) => (
                          <optgroup key={g.id} label={g.name} style={{ background: "#000", color: "var(--theme-color, #FF6B6B)" }}>
                            {g.categories.map((c) => (
                              <option key={c.id} value={c.id} style={{ color: "#fff" }}>
                                {c.name} ({c.applicationCount} talep)
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {selectedOption && (
                        <div className="mt-2 p-3" style={{ background: "rgba(255,107,107,0.05)", border: "1px solid rgba(255,107,107,0.15)", borderRadius: "12px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                          Grup: {selectedOption.groupName} | Bu iş kolunda şu ana kadar {selectedOption.applicationCount} başvuru bulunuyor.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Firma Adı</label>
                      <input type="text" className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} required
                        placeholder="Firmanızın adı"
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,77,77,0.2)", color: "#fff", borderRadius: "10px", padding: "0.8rem 1rem", width: "100%" }} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Yetkili Kişi</label>
                      <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required
                        placeholder="Adınız Soyadınız"
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,77,77,0.2)", color: "#fff", borderRadius: "10px", padding: "0.8rem 1rem", width: "100%" }} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>E-Posta</label>
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required
                        placeholder="ornek@firma.com"
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,77,77,0.2)", color: "#fff", borderRadius: "10px", padding: "0.8rem 1rem", width: "100%" }} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>Telefon</label>
                      <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required
                        placeholder="05XX XXX XX XX"
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,77,77,0.2)", color: "#fff", borderRadius: "10px", padding: "0.8rem 1rem", width: "100%" }} />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                        Proje Açıklaması <span style={{ fontWeight: 300, fontSize: "0.85rem" }}>(isteğe bağlı)</span>
                      </label>
                      <textarea className="form-control" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Yapmak istediğiniz işi kısaca açıklayınız..."
                        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,77,77,0.2)", color: "#fff", borderRadius: "10px", padding: "0.8rem 1rem", width: "100%" }} />
                    </div>

                    {error && (
                      <div className="col-12">
                        <div className="p-3" style={{ background: "rgba(255,77,77,0.1)", border: "1px solid rgba(255,77,77,0.3)", borderRadius: "10px", color: "#FF6B6B", fontSize: "0.85rem" }}>{error}</div>
                      </div>
                    )}

                    <div className="col-12 mt-2">
                      <button type="submit" disabled={loading}
                        className="btn w-100 py-3 rounded-pill fw-semibold"
                        style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", color: "#fff", transition: "all 0.3s" }}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Başvuruyu Gönder"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
