import { ECA_KNOWLEDGE } from "./eca-knowledge";

/** Single source of truth for the contact details rendered across the site. */
export const CONTACT = {
  city: "Ékié, Yaoundé - Cameroun",
  landmark: "Face au Petit Marché d'Ékié",
  phone: ECA_KNOWLEDGE.company.phone,
  email: ECA_KNOWLEDGE.company.email,
} as const;

export const SOCIAL_LINKS = ECA_KNOWLEDGE.navigation.reseauxSociaux;

export const WHATSAPP_URL = SOCIAL_LINKS.whatsapp;

export const STATS = ECA_KNOWLEDGE.stats;

export const PARTNERS = ECA_KNOWLEDGE.partenaires;

/** Main navigation targets, shared by the header and the footer. */
export const NAV_LINKS = ECA_KNOWLEDGE.navigation.liens.map((link) => ({
  label: link.nom,
  href: link.href,
}));

export const LOGO = {
  src: "/images/logo.png",
  alt: ECA_KNOWLEDGE.company.name,
  width: 158,
  height: 64,
} as const;
