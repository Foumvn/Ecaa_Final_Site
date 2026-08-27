"use client";

import { FadeImage } from "@/components/fade-image";
import { cn } from "@/lib/utils";

interface HoverZoomImageProps {
  src: string;
  alt: string;
  /** Extra classes for the aspect-ratio wrapper (e.g. `aspect-[4/3]`). */
  className?: string;
}

/** Image tile that zooms when its enclosing `group` is hovered. */
export function HoverZoomImage({ src, alt, className }: HoverZoomImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <FadeImage
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105"
      />
    </div>
  );
}
