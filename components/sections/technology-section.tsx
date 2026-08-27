"use client";

import Image from "next/image";
import { useRef } from "react";
import { BentoSideColumn } from "@/components/bento-side-column";
import {
  useStickyScrollProgress,
  useViewportRevealProgress,
} from "@/hooks/use-scroll-progress";
import { getBentoTransforms, type BentoImage } from "@/lib/bento-animation";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const progress = useViewportRevealProgress(containerRef);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;

        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "var(--foreground)" : "#e4e4e7",
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const sideImages: BentoImage[] = [
  {
    src: "/images/eca/portfolio/masonry-portfolio-4.webp",
    alt: "Conception design",
    position: "left",
    span: 1,
  },
  {
    src: "/images/eca/portfolio/masonry-portfolio-5.webp",
    alt: "Réparation électronique",
    position: "left",
    span: 1,
  },
  {
    src: "/images/eca/portfolio/masonry-portfolio-7.webp",
    alt: "Maintenance technique",
    position: "right",
    span: 1,
  },
  {
    src: "/images/eca/portfolio/8.webp",
    alt: "Programmation automobile",
    position: "right",
    span: 1,
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useStickyScrollProgress(sectionRef);

  const descriptionText = "Découvrez ECA Technology, une entreprise camerounaise spécialisée dans la réparation électronique et automobile, la formation professionnelle et la conception design. Depuis 2016, nous accompagnons nos clients avec expertise, précision et un engagement total envers la qualité de nos services.";

  const {
    imageProgress,
    centerWidth,
    sideWidth,
    sideOpacity,
    sideTranslateLeft,
    sideTranslateRight,
    borderRadius,
    gap,
  } = getBentoTransforms(scrollProgress);

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-foreground">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >

            <BentoSideColumn
              images={sideImages}
              position="left"
              width={sideWidth}
              gap={gap}
              translateX={sideTranslateLeft}
              opacity={sideOpacity}
              borderRadius={borderRadius}
            />

            {/* Main Center Image */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/eca/hero/groupe.webp"
                alt="Équipe ECA Technology au complet"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40" />

              {/* Title Text */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                <h2 className="max-w-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl">
                  {["Notre", "Expertise."].map((word, index) => {
                    const wordFadeStart = index * 0.07;
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    const wordOpacity = 1 - wordProgress;
                    const wordBlur = wordProgress * 10;

                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={{
                          opacity: wordOpacity,
                          filter: `blur(${wordBlur}px)`,
                          transition: 'opacity 0.1s linear, filter 0.1s linear',
                          marginRight: index < 1 ? '0.3em' : '0',
                        }}
                      >
                        {word}
                        {index === 0 && <br />}
                      </span>
                    );
                  })}
                </h2>
              </div>
            </div>

            <BentoSideColumn
              images={sideImages}
              position="right"
              width={sideWidth}
              gap={gap}
              translateX={sideTranslateRight}
              opacity={sideOpacity}
              borderRadius={borderRadius}
            />

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Description Section with Scroll Reveal */}
      <div className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
