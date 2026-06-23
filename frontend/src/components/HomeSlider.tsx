"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { api, Slide, Project } from "@/lib/api";

export default function HomeSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const projectSwiperRef = useRef<any>(null);

  useEffect(() => {
    api.getSlides().then(setSlides).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  return (
    <>
      <main style={{ position: "relative", width: "100%", height: "75vh", overflow: "hidden" }}>
        {slides.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center" style={{ height: "75vh" }}>
            <div className="text-center">
              <div className="spinner-border text-light mb-3" role="status" />
              <p className="text-white-50">Yükleniyor...</p>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            navigation
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav === "object") {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8%",
                    }}
                  >
                    <div style={{ maxWidth: "650px" }}>
                      {slide.subtitle && (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "8px 20px",
                            marginBottom: "24px",
                            background: "rgba(255,77,77,0.15)",
                            border: "1px solid rgba(255,77,77,0.3)",
                            color: "var(--theme-color, #FF6B6B)",
                            letterSpacing: "3px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            borderRadius: "50px",
                            textTransform: "uppercase",
                          }}
                        >
                          {slide.subtitle}
                        </span>
                      )}
                      {slide.title && (
                        <h1
                          style={{
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            fontWeight: 800,
                            color: "#fff",
                            lineHeight: 1.1,
                            marginBottom: "20px",
                            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                          }}
                        >
                          {slide.title}
                        </h1>
                      )}
                      {slide.description && (
                        <p
                          style={{
                            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                            color: "rgba(255,255,255,0.65)",
                            lineHeight: 1.8,
                            marginBottom: "32px",
                            maxWidth: "520px",
                          }}
                        >
                          {slide.description}
                        </p>
                      )}
                      {slide.linkUrl && (
                        <a
                          href={slide.linkUrl}
                          className="btn btn-outline-light px-5 py-3 rounded-pill fw-semibold"
                          style={{ fontSize: "0.9rem", letterSpacing: "1px" }}
                        >
                          {slide.linkText || "Detaylı Bilgi"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          zIndex: 10,
          display: "flex",
          gap: "12px",
        }}>
          <button
            ref={prevRef}
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              width: "80px",
              height: "44px",
              cursor: "pointer",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            ref={nextRef}
            style={{
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#fff",
              width: "80px",
              height: "44px",
              cursor: "pointer",
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </main>

      {projects.length > 0 && (
        <section style={{ padding: "80px 0" }}>
          <div className="container" style={{ position: "relative" }}>
            <div className="text-center mb-5">
              <span className="badge mb-3 px-3 py-2 text-uppercase d-inline-block"
                style={{ background: "rgba(255,77,77,0.15)", border: "1px solid rgba(255,77,77,0.3)", letterSpacing: "2px", color: "#fff", borderRadius: "50px" }}>
                Projelerimiz
              </span>
              <h2 className="fw-bold" style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Tamamlanan Projeler
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                Her biri özenle planlanmış ve titizlikle hayata geçirilmiş işlerimiz
              </p>
            </div>
            <Swiper
              className="project-carousel"
              onBeforeInit={(swiper) => { projectSwiperRef.current = swiper; }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              style={{ padding: "4px" }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                    <div
                      className="h-100 d-flex flex-column project-card"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        transition: "all 0.4s ease",
                        cursor: "pointer",
                      }}
                  >
                    <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                      />
                      {(() => {
                        const c = project.color;
                        if (!c) return null;
                        const shortName = project.title.split(" — ")[0] || project.title;
                        const colorPart = shortName.startsWith("Ref") ? shortName.slice(3) : shortName;
                        return (
                          <div
                            style={{
                              position: "absolute",
                              left: "4px",
                              bottom: "4px",
                              writingMode: "sideways-lr",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                              pointerEvents: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
                            }}
                          >
                            <span style={{ color: "#fff", fontSize: "30px", fontWeight: 900, lineHeight: 1, fontFamily: "'Prompt', sans-serif", textShadow: "0 0 20px rgba(255,255,255,0.9)" }}>
                              Ref
                            </span>
                            <span style={{ fontSize: "30px", lineHeight: 1, color: "transparent" }}>&nbsp;</span>
                            <span
                              className="text-stroke"
                              style={{
                                WebkitTextStrokeColor: c,
                                fontSize: "30px",
                                fontWeight: 900,
                                lineHeight: 1,
                                fontFamily: "'Prompt', sans-serif",
                                textShadow: "0 0 20px rgba(255,255,255,0.9)",
                              }}
                            >
                              {colorPart}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="p-4 d-flex flex-column" style={{ flex: 1 }}>
                      <h5 className="fw-semibold mb-2" style={{ color: "#fff" }}>{project.title}</h5>
                      {project.description && (
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.6, flex: 1, margin: 0, marginBottom: "16px" }}>
                          {project.description}
                        </p>
                      )}
                      <a
                        href={`/ref${(() => { const s = project.title.split(" — ")[0]; return s.startsWith("Ref") ? s.slice(3).toLowerCase() : ""; })()}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginTop: "auto",
                          padding: "10px 20px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          color: "#fff",
                          background: "rgba(255,255,255,0.06)",
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "50px",
                          textDecoration: "none",
                          textTransform: "uppercase",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Projeyi İncele
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="project-carousel-btn prev"
              onClick={() => projectSwiperRef.current?.slidePrev()}
              aria-label="Önceki"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              className="project-carousel-btn next"
              onClick={() => projectSwiperRef.current?.slideNext()}
              aria-label="Sonraki"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </section>
      )}
    </>
  );
}
