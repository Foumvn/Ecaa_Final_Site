"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { MapPin, Phone, Mail, Facebook, Linkedin, MessageSquare } from "lucide-react";

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
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Atelier Principal</h4>
                                    <p className="mt-1 text-muted-foreground">Ékié, Yaoundé - Cameroun</p>
                                    <p className="text-sm text-muted-foreground italic">Face au Petit Marché d'Ékié</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">Téléphone & WhatsApp</h4>
                                    <p className="mt-1 text-muted-foreground">+237 6 56 49 03 21</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">E-mail</h4>
                                    <p className="mt-1 text-muted-foreground">ecatehnology90@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Suivez notre actualité</h4>
                            <div className="mt-4 flex gap-4">
                                {[
                                    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61550682794649" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/home?originalSubdomain=cm" },
                                    { icon: MessageSquare, href: "https://wa.me/237656490321" },
                                ].map((social, i) => (
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
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider">Nom Complet</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Ex: Jean Dupont"
                                            required
                                            className="h-12 border-border/50 bg-background/50 focus-visible:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            required
                                            className="h-12 border-border/50 bg-background/50 focus-visible:ring-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider">Sujet de votre demande</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="Ex: Réparation calculateur moteur / Devis formation"
                                        required
                                        className="h-12 border-border/50 bg-background/50 focus-visible:ring-primary"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">Votre Message</Label>
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
