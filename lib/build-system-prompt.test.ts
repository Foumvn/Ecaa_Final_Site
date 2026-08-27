import { describe, expect, it } from "vitest";

import { buildSystemPrompt } from "./build-system-prompt";
import { ECA_KNOWLEDGE } from "./eca-knowledge";

describe("buildSystemPrompt", () => {
  it("includes the company identity and contact details", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain(`Nom : ${ECA_KNOWLEDGE.company.name}`);
    expect(prompt).toContain(`Fondation : ${ECA_KNOWLEDGE.company.founded}`);
    expect(prompt).toContain(`Téléphone/WhatsApp : ${ECA_KNOWLEDGE.company.phone}`);
    expect(prompt).toContain(`Email : ${ECA_KNOWLEDGE.company.email}`);
  });

  it("serializes every service, team member, and navigation link", () => {
    const prompt = buildSystemPrompt();

    for (const service of ECA_KNOWLEDGE.services) {
      expect(prompt).toContain(`- ${service.nom} : ${service.description}`);
    }

    for (const member of ECA_KNOWLEDGE.equipe) {
      expect(prompt).toContain(
        `- ${member.nom} (${member.role}) : ${member.description}`,
      );
    }

    for (const link of ECA_KNOWLEDGE.navigation.liens) {
      expect(prompt).toContain(`- ${link.nom} -> ${link.href}`);
    }
  });

  it("includes site structure, contact fields, and response guidance", () => {
    const prompt = buildSystemPrompt();

    for (const section of ECA_KNOWLEDGE.pages.accueil.sections) {
      expect(prompt).toContain(`- ${section}`);
    }

    for (const field of ECA_KNOWLEDGE.contact.formulaire.champs) {
      expect(prompt).toContain(`- ${field}`);
    }

    expect(prompt).toContain("Format : texte brut uniquement, sans Markdown.");
    expect(prompt).toContain(ECA_KNOWLEDGE.company.phone);
  });
});
