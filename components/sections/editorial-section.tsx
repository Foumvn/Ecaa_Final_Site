"use client";

const specs = [
  { label: "Clients Satisfaits", value: "500+" },
  { label: "Projets Réalisés", value: "1200+" },
  { label: "Années d'Expérience", value: "8" },
  { label: "Membres de l'Équipe", value: "15" },
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://res.cloudinary.com/dknpxid4n/video/upload/v1752971323/WhatsApp_Video_2025-07-19_at_20.59.48_lrtdtx.mp4"
        />
      </div>
    </section>
  );
}
