"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { api, Slide } from "@/lib/api";

export default function HomeSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    api.getSlides().then(setSlides).catch(() => {});
  }, []);

  if (slides.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#0a0a0a" }}>
        <div className="text-center">
          <div className="spinner-border text-light mb-3" role="status" />
          <p className="text-white-50">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <main style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
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
    </main>
  );
}
