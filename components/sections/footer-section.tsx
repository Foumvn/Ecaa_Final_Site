"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTACT, LOGO, NAV_LINKS, PARTNERS, SOCIAL_LINKS } from "@/lib/site-config";

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: Record<"explore" | "about" | "services", FooterLink[]> = {
  explore: NAV_LINKS,
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

const partnerLogoWidths: Record<string, number> = {
  Ministère: 150,
  CFA: 120,
  Safyad: 140,
  Elect: 130,
};

function FooterLinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-foreground">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
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
  );
}

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Partenaires Section - Integration of Partners inside Footer area */}
      <div className="border-t border-border px-6 py-12 md:px-12 lg:px-20">
        <p className="mb-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Nos Partenaires de Confiance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 opacity-100 transition-all">
          {PARTNERS.map((partner) => (
            <Image
              key={partner.nom}
              src={partner.logo}
              alt={partner.nom}
              width={partnerLogoWidths[partner.nom] ?? 140}
              height={60}
              className="h-12 w-auto object-contain"
            />
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image {...LOGO} className="h-10 w-auto object-contain" />
            </Link>
            <div className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              <p>{CONTACT.city}</p>
              <p className="mt-2">Spécialistes en maintenance électronique et innovation technologique depuis 2016.</p>
              <p className="mt-4"><strong>Tél:</strong> {CONTACT.phone}</p>
              <p><strong>Email:</strong> {CONTACT.email}</p>
            </div>
          </div>

          <FooterLinkColumn title="Découvrir" links={footerLinks.explore} />
          <FooterLinkColumn title="À Propos" links={footerLinks.about} />
          <FooterLinkColumn title="Services" links={footerLinks.services} />
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
            {[
              { label: "Facebook", href: SOCIAL_LINKS.facebook },
              { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
              { label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
