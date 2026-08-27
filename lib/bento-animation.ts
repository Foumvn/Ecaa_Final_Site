import { clampProgress } from "@/hooks/use-scroll-progress";

export interface BentoImage {
  src: string;
  alt: string;
  position: "left" | "right";
  span: number;
}

export interface BentoTransforms {
  /** Overlay text fades out over the first 20% of the scroll range. */
  textOpacity: number;
  /** Images expand over the remaining 80% of the scroll range. */
  imageProgress: number;
  centerWidth: number;
  centerHeight: number;
  sideWidth: number;
  sideOpacity: number;
  sideTranslateLeft: number;
  sideTranslateRight: number;
  borderRadius: number;
  gap: number;
}

const TEXT_FADE_END = 0.2;

/**
 * Interpolations for the sticky "bento grid" reveal shared by the hero and
 * technology sections: a full-bleed centre image shrinks while two side columns
 * slide in from the edges.
 */
export function getBentoTransforms(scrollProgress: number): BentoTransforms {
  const imageProgress = clampProgress((scrollProgress - TEXT_FADE_END) / (1 - TEXT_FADE_END));

  return {
    textOpacity: Math.max(0, 1 - scrollProgress / TEXT_FADE_END),
    imageProgress,
    centerWidth: 100 - imageProgress * 58,
    centerHeight: 100 - imageProgress * 30,
    sideWidth: imageProgress * 22,
    sideOpacity: imageProgress,
    sideTranslateLeft: -100 + imageProgress * 100,
    sideTranslateRight: 100 - imageProgress * 100,
    borderRadius: imageProgress * 24,
    gap: imageProgress * 16,
  };
}
