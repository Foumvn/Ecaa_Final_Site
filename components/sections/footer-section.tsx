"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  explore: [
    { label: "Services", href: "#services" },
    { label: "Formation", href: "#formation" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Équipe", href: "#equipe" },
  ],
  about: [
    { label: "Notre Histoire", href: "#" },
    { label: "Témoignages", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Contact", href: "#" },
  ],
  services: [
    { label: "Maintenance", href: "#Services" },
    { label: "Réparation Électronique", href: "#Services" },
    { label: "Programmation Auto", href: "#Services" },
    { label: "Design Graphique", href: "#Services" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Partenaires Section - Integration of Partners inside Footer area */}
      <div className="border-t border-border px-6 py-12 md:px-12 lg:px-20">
        <p className="mb-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Nos Partenaires de Confiance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 opacity-100 transition-all">
          <Image src="/images/eca/clients/ministere.webp" alt="Ministère" width={150} height={60} className="h-12 w-auto object-contain" />
          <Image src="/images/eca/clients/cfa.webp" alt="CFA" width={120} height={60} className="h-12 w-auto object-contain" />
          <Image src="/images/eca/clients/safyad.webp" alt="Safyad" width={140} height={60} className="h-12 w-auto object-contain" />
          <Image src="/images/eca/clients/elect.webp" alt="Elect" width={130} height={60} className="h-12 w-auto object-contain" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-lg font-medium text-foreground">
              ECA Technology
            </Link>
            <div className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              <p>Ékié, Yaoundé - Cameroun</p>
              <p className="mt-2">Spécialistes en maintenance électronique et innovation technologique depuis 2016.</p>
              <p className="mt-4"><strong>Tél:</strong> +237 6 56 49 03 21</p>
              <p><strong>Email:</strong> ecatehnology90@gmail.com</p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Découvrir</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">À Propos</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ECA Technology. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://www.facebook.com/profile.php?id=61550682794649"
              target="_blank"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Facebook
            </Link>
            <Link
              href="https://www.linkedin.com/home?originalSubdomain=cm"
              target="_blank"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
            <Link
              href="https://wa.me/237656490321"
              target="_blank"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
