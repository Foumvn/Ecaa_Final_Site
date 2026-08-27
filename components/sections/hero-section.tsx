"use client";

import Image from "next/image";
import { useRef } from "react";
import { BentoSideColumn } from "@/components/bento-side-column";
import { useStickyScrollProgress } from "@/hooks/use-scroll-progress";
import { getBentoTransforms, type BentoImage } from "@/lib/bento-animation";

const word = "ECA";

const sideImages: BentoImage[] = [
  {
    src: "/images/eca/portfolio/20.webp",
    alt: "Réparation carte mère",
    position: "left",
    span: 1,
  },
  {
    src: "/images/eca/portfolio/5.webp",
    alt: "Programmation capteur automobile",
    position: "left",
    span: 1,
  },
  {
    src: "/images/eca/hero/groupe.webp",
    alt: "Équipe ECA Technology",
    position: "right",
    span: 1,
  },
  {
    src: "/images/eca/about/about-main.webp",
    alt: "Atelier ECA Technology",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useStickyScrollProgress(sectionRef);

  const {
    textOpacity,
    imageProgress,
    centerWidth,
    centerHeight,
    sideWidth,
    sideOpacity,
    sideTranslateLeft,
    sideTranslateRight,
    borderRadius,
    gap,
  } = getBentoTransforms(scrollProgress);

  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >

            <BentoSideColumn
              images={sideImages}
              position="left"
              width={sideWidth}
              gap={gap}
              translateX={sideTranslateLeft}
              translateY={sideTranslateY}
              opacity={sideOpacity}
              borderRadius={borderRadius}
            />

            {/* Main Hero Image - Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/eca/hero/yess.webp"
                alt="ECA Technology - Votre satisfaction notre priorité"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay Text - Fades out first */}
              <div
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            <BentoSideColumn
              images={sideImages}
              position="right"
              width={sideWidth}
              gap={gap}
              translateX={sideTranslateRight}
              translateY={sideTranslateY}
              opacity={sideOpacity}
              borderRadius={borderRadius}
            />

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Votre satisfaction,
          <br />
          notre priorité.
        </p>
      </div>
    </section>
  );
}
