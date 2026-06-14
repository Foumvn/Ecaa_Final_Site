"use client";

import { FadeImage } from "@/components/fade-image";

const team = [
  {
    id: 1,
    name: "Ndjamen Leonnel",
    description: "Chef du département des téléphone et micro-électronique",
    role: "Expert Technicien",
    image: "/images/eca/team/IMG_6729-removebg-preview.webp",
  },
  {
    id: 2,
    name: "Nkeing Manuela",
    description: "Assistant direction mécatronique",
    role: "Mécatronique",
    image: "/images/eca/team/IMG_6755-removebg-preview.webp",
  },
  {
    id: 3,
    name: "Fongang Mathieu",
    description: "Directeur Général et Visionnaire de l'entreprise",
    role: "Directeur Général",
    image: "/images/eca/team/IMG_6760-removebg-preview.webp",
  },
  {
    id: 4,
    name: "Djoumessi Francklin",
    description: "Chef de département Réparation TV et Moniteurs",
    role: "Spécialiste Affichage",
    image: "/images/eca/team/IMG_6766-removebg-preview.webp",
  },
  {
    id: 5,
    name: "Tchidjie Claude",
    description: "Chef de département laptop & desktop et Programmation",
    role: "Programmation",
    image: "/images/eca/team/IMG_6770-removebg-preview.webp",
  },
];

export function CollectionSection() {
  return (
    <section id="equipe" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Notre Équipe d&apos;Experts
        </h2>
      </div>

      {/* Team Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {team.map((member) => (
            <div key={member.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {team.map((member) => (
            <div key={member.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-sm uppercase tracking-widest opacity-50">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
