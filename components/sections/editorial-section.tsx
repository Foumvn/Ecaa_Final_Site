"use client";

import { BackgroundVideo } from "@/components/background-video";
import { STATS } from "@/lib/site-config";

const specs = [
  { label: "Clients Satisfaits", value: STATS.clientsSatisfaits },
  { label: "Projets Réalisés", value: STATS.projetsRealises },
  { label: "Années d'Expérience", value: STATS.anneesExperience },
  { label: "Membres de l'Équipe", value: STATS.membresEquipe },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Decorative Padding */}
      <div className="flex items-center justify-center gap-6 pb-20">
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <BackgroundVideo src="/video1.mp4" />
      </div>
    </section>
  );
}
