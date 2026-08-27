"use client";

import Image from "next/image";
import { useRef } from "react";
import { useStickyScrollProgress } from "@/hooks/use-scroll-progress";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useStickyScrollProgress(
    sectionRef,
    (element) => element.offsetHeight - window.innerHeight
  );

  // Réparation block comes from left (-100% to 0%), automobile from right (100% to 0%)
  const alpineTranslateX = (1 - progress) * -100;
  const forestTranslateX = (1 - progress) * 100;

  // Title fades out as blocks come together
  const titleOpacity = 1 - progress;

  return (
    <section id="services" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[12vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6">
                Réparation & Formation.
              </h2>
            </div>

            {/* Product Grid - blocks slide in from both edges */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              {[
                {
                  src: "/images/eca/portfolio/20.webp",
                  alt: "Réparation électronique - carte mère",
                  badge: "Électronique",
                  translateX: alpineTranslateX,
                },
                {
                  src: "/images/eca/portfolio/5.webp",
                  alt: "Programmation capteur automobile",
                  badge: "Automobile",
                  translateX: forestTranslateX,
                },
              ].map((block) => (
                <div
                  key={block.badge}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{
                    transform: `translate3d(${block.translateX}%, 0, 0)`,
                    WebkitTransform: `translate3d(${block.translateX}%, 0, 0)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <Image src={block.src} alt={block.alt} fill className="object-cover" />
                  <div className="absolute bottom-6 left-6">
                    <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                      {block.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Depuis 2016
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-3xl text-center">
            ECA Technology offre des services de réparation électronique et automobile,
            de la formation professionnelle et de la conception design au Cameroun.
          </p>
        </div>
      </div>
    </section>
  );
}
