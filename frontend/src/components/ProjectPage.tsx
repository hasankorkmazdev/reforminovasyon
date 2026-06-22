interface Props {
  badge: string;
  title: string;
  span: string;
  color: string;
  desc: string;
}

export default function ProjectPage({ badge, title, span, color, desc }: Props) {
  return (
    <div style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "80px", background: "radial-gradient(circle at 50% 20%, rgba(255,107,107,0.03) 0%, transparent 50%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <span className="badge mb-4 px-3 py-2 text-uppercase d-inline-block"
              style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", letterSpacing: "2px", color: "#fff", borderRadius: "50px" }}>
              {badge}
            </span>
            <h1 className="display-1 fw-bold mb-4" style={{ color: "#fff", letterSpacing: "-2px" }}>
              {title}<span style={{ color }}>{span}</span>
            </h1>
            <p className="fs-5 fw-light" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto" }}>
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
