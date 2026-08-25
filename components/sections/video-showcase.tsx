"use client";

import { useEffect, useRef, useState } from "react";

export function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoScale, setVideoScale] = useState(1.08);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textTranslateY, setTextTranslateY] = useState(40);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.85;
      const endOffset = windowHeight * 0.3;
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      const progress = Math.max(0, Math.min(1, currentPosition / totalDistance));

      const scale = 1.08 - progress * 0.08;
      setVideoScale(scale);

      const opacity = Math.max(0, Math.min(1, (progress - 0.1) / 0.5));
      setTextOpacity(opacity);

      const translateY = 40 - progress * 40;
      setTextTranslateY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="bg-background">
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
        <div
          ref={videoRef}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl"
        >
          {/* Video */}
          <div
            className="relative aspect-video w-full"
            style={{ transform: `scale(${videoScale})`, transition: "transform 0.1s linear" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              src="/video1.mp4"
            />
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-12 lg:p-16">
            {/* Top badge */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10">
              <span
                className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-md"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textTranslateY}px)`,
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
              >
                ECA Technology
              </span>
            </div>

            {/* Bottom content */}
            <div className="w-full max-w-3xl text-center">
              <h2
                className="mb-4 text-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textTranslateY}px)`,
                  transition: "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
                }}
              >
                L&apos;Excellence au Service
                <br />
                de la Technologie
              </h2>

              <p
                className="mb-8 text-sm leading-relaxed text-white/70 md:text-base lg:text-lg"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textTranslateY}px)`,
                  transition: "opacity 0.7s ease-out 0.25s, transform 0.7s ease-out 0.25s",
                }}
              >
                Depuis 2016, nous repoussons les limites de l&apos;innovation
                pour offrir des solutions techniques d&apos;exception.
              </p>

              <div
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textTranslateY}px)`,
                  transition: "opacity 0.7s ease-out 0.4s, transform 0.7s ease-out 0.4s",
                }}
              >
                <a
                  href="https://wa.me/237656490321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
                >
                  Découvrir nos services
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div
            className="pointer-events-none absolute top-0 left-0 h-24 w-24 border-l-2 border-t-2 border-white/10"
            style={{
              opacity: textOpacity,
              transition: "opacity 0.8s ease-out 0.5s",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 border-b-2 border-r-2 border-white/10"
            style={{
              opacity: textOpacity,
              transition: "opacity 0.8s ease-out 0.5s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
