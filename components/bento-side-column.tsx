"use client";

import Image from "next/image";
import type { BentoImage } from "@/lib/bento-animation";

interface BentoSideColumnProps {
  images: BentoImage[];
  position: "left" | "right";
  width: number;
  gap: number;
  translateX: number;
  translateY?: number;
  opacity: number;
  borderRadius: number;
}

export function BentoSideColumn({
  images,
  position,
  width,
  gap,
  translateX,
  translateY = 0,
  opacity,
  borderRadius,
}: BentoSideColumnProps) {
  return (
    <div
      className="flex flex-col will-change-transform"
      style={{
        width: `${width}%`,
        gap: `${gap}px`,
        transform: `translateX(${translateX}%) translateY(${translateY}%)`,
        opacity,
      }}
    >
      {images
        .filter((image) => image.position === position)
        .map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden will-change-transform"
            style={{ flex: image.span, borderRadius: `${borderRadius}px` }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
    </div>
  );
}
