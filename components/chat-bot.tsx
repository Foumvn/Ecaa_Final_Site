"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Bonjour ! Je suis l'assistant IA d'ECA Technology. Comment puis-je vous aider aujourd'hui ?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer LdHmWp1zphUfEVoJNq1GKhLqMQlirWjy`,
                },
                body: JSON.stringify({
                    model: "mistral-tiny",
                    messages: [
                        {
                            role: "system",
                            content: `Tu es l'expert assistant virtuel d'ECA Technology. 
              
              CONTEXTE :
              - Entreprise basée à Yaoundé, Cameroun (Quartier Ékié, près du petit marché).
              - Fondée en 2016 par des experts passionnés.
              
              DOMAINES D'EXPERTISE :
              1. Maintenance & Réparation Électronique : Cartes mères, appareils industriels, matériel biomédical, écrans, etc.
              2. Électronique Automobile : Reprogrammation de calculateurs (ECU), diagnostic scanner, réparation de tableaux de bord, BSI, clés programmables.
              3. Formation Professionnelle : Stages pratiques en électronique et électricité.
              4. Conception Design : Graphisme, identité visuelle, logos professionnels.
              
              TON ET STYLE :
              - Professionnel, chaleureux, expert et très serviable.
              - Utilise un français impeccable.
              - IMPORTANT : RÉPONDS TOUJOURS EN TEXTE BRUT UNIQUEMENT. Ne JAMAIS utiliser de Markdown (pas de **, pas de #, pas de listes à puces, pas de gras).
              - Tes messages doivent ressembler à des messages WhatsApp simples et lisibles.
              - N'hésite pas à mentionner que les clients peuvent passer à l'atelier à Ékié ou appeler le +237 6 56 49 03 21.
              - Si tu ne connais pas une réponse technique spécifique, suggère de contacter l'équipe technique via le formulaire de contact.`,
                        },
                        ...messages,
                        userMessage,
                    ],
                }),
            });

            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: assistantMessage },
            ]);
        } catch (error) {
            console.error("Error calling Mistral API:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Désolé, j'ai rencontré une erreur. Veuillez réessayer plus tard.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px]"
                    >
                        <Card className="border-2 border-border shadow-2xl overflow-hidden rounded-2xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-[#bef264] p-4 text-black border-b border-black/10">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Sparkles size={20} className="text-black" />
                                    Assistant IA ECA
                                </CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 text-black hover:bg-black/10 rounded-full"
                                >
                                    <X size={18} />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0 bg-background">
                                <ScrollArea className="h-[400px] p-4">
                                    <div className="space-y-4">
                                        {messages.map((m, i) => (
                                            <div
                                                key={i}
                                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex max-w-[85%] gap-2 rounded-2xl px-4 py-2.5 text-sm ${m.role === "user"
                                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                                        : "bg-muted text-muted-foreground rounded-tl-none border border-border/50"
                                                        }`}
                                                >
                                                    {m.role === "assistant" && <Bot size={16} className="mt-1 shrink-0 text-primary" />}
                                                    <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="flex gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground rounded-tl-none border border-border/50">
                                                    <Loader2 size={16} className="mt-1 animate-spin text-primary" />
                                                    <p>IA ECA réfléchit...</p>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-3 bg-background border-t border-border">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex w-full items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border"
                                >
                                    <Input
                                        placeholder="Comment l'IA peut vous aider ?"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="h-10 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !input.trim()}
                                        className="h-10 w-10 rounded-lg bg-[#bef264] text-black hover:bg-[#a3d945] transition-all flex items-center justify-center shrink-0"
                                    >
                                        <Send size={18} className="transform -rotate-12" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center h-16 w-16 rounded-full shadow-[0_10px_40px_rgba(190,242,100,0.3)] transition-all hover:scale-110 active:scale-95 bg-[#bef264] text-black shrink-0`}
                whileHover={{ y: -4 }}
                layout
            >
                {isOpen ? (
                    <X size={32} />
                ) : (
                    <Sparkles size={32} className="animate-pulse" />
                )}
            </motion.button>
        </div>
    );
}
