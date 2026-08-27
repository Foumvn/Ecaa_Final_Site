"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { MapPin, Phone, Mail, Facebook, Linkedin, MessageSquare } from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "@/lib/site-config";

const contactDetails = [
    {
        icon: MapPin,
        title: "Atelier Principal",
        value: CONTACT.city,
        note: CONTACT.landmark,
    },
    {
        icon: Phone,
        title: "Téléphone & WhatsApp",
        value: CONTACT.phone,
    },
    {
        icon: Mail,
        title: "E-mail",
        value: CONTACT.email,
    },
];

const socialLinks = [
    { icon: Facebook, href: SOCIAL_LINKS.facebook },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin },
    { icon: MessageSquare, href: SOCIAL_LINKS.whatsapp },
];

const formFields = [
    {
        id: "name",
        label: "Nom Complet",
        placeholder: "Ex: Jean Dupont",
        type: "text",
        halfWidth: true,
    },
    {
        id: "email",
        label: "Email",
        placeholder: "votre@email.com",
        type: "email",
        halfWidth: true,
    },
    {
        id: "subject",
        label: "Sujet de votre demande",
        placeholder: "Ex: Réparation calculateur moteur / Devis formation",
        type: "text",
        halfWidth: false,
    },
];

const FIELD_LABEL_CLASS = "text-xs font-bold uppercase tracking-wider";
const FIELD_INPUT_CLASS = "h-12 border-border/50 bg-background/50 focus-visible:ring-primary";

function ContactField({
    id,
    label,
    placeholder,
    type,
}: {
    id: string;
    label: string;
    placeholder: string;
    type: string;
}) {
    return (
        <div className="space-y-3">
            <Label htmlFor={id} className={FIELD_LABEL_CLASS}>{label}</Label>
            <Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                required
                className={FIELD_INPUT_CLASS}
            />
        </div>
    );
}

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        // Simulation d'envoi
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success("Message envoyé ! Notre équipe vous contactera sous 24h.");
        (e.target as HTMLFormElement).reset();
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20">
            {/* Éléments décoratifs en arrière-plan */}
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

            <Toaster position="top-center" />
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="grid gap-16 lg:grid-cols-5">
                    {/* Informations de contact (2 colonnes) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            Parlons de votre <br />
                            <span className="text-muted-foreground italic">prochain défi.</span>
                        </h2>
                        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                            Une panne complexe ? Un besoin de formation ? Ou un projet de design innovant ?
                            ECA Technology met son expertise à votre service au Cameroun.
                        </p>

                        <div className="mt-12 space-y-8">
                            {contactDetails.map((detail) => (
                                <div key={detail.title} className="flex gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <detail.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">{detail.title}</h4>
                                        <p className="mt-1 text-muted-foreground">{detail.value}</p>
                                        {detail.note && (
                                            <p className="text-sm text-muted-foreground italic">{detail.note}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Suivez notre actualité</h4>
                            <div className="mt-4 flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.href}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Formulaire (3 colonnes) */}
                    <div className="lg:col-span-3">
                        <div className="rounded-3xl border border-border bg-card/50 p-8 shadow-xl backdrop-blur-sm md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid gap-8 md:grid-cols-2">
                                    {formFields.filter((field) => field.halfWidth).map((field) => (
                                        <ContactField key={field.id} {...field} />
                                    ))}
                                </div>
                                {formFields.filter((field) => !field.halfWidth).map((field) => (
                                    <ContactField key={field.id} {...field} />
                                ))}
                                <div className="space-y-3">
                                    <Label htmlFor="message" className={FIELD_LABEL_CLASS}>Votre Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Décrivez votre besoin ou votre panne de manière détaillée..."
                                        required
                                        className="min-h-[180px] border-border/50 bg-background/50 focus-visible:ring-primary lg:min-h-[220px]"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="h-14 w-full rounded-xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                            Envoi en cours...
                                        </span>
                                    ) : "Envoyer le Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
