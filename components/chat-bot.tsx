"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, X, Bot, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "eca-chat-messages";
const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Bonjour ! Je suis l'assistant IA d'ECA Technology. Je connais tout sur nos services, notre équipe et notre entreprise. Comment puis-je vous aider aujourd'hui ?",
};

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [INITIAL_MESSAGE];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [INITIAL_MESSAGE];
}

function saveMessages(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesLoaded = useRef(false);

  useEffect(() => {
    if (!messagesLoaded.current) {
      setMessages(loadMessages());
      messagesLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messagesLoaded.current) {
      saveMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleCopy = useCallback(async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(index);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const assistantIndex = updatedMessages.length;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        let errorMsg = "Désolé, j'ai rencontré une erreur. Veuillez réessayer plus tard.";
        if (res.status === 500) {
          errorMsg = "Désolé, le service est temporairement indisponible. Veuillez réessayer plus tard.";
        } else if (res.status === 429) {
          errorMsg = "Désolé, vous avez envoyé trop de messages. Veuillez attendre un moment avant de réessayer.";
        } else if (res.status === 401 || res.status === 403) {
          errorMsg = "Désolé, le service n'est pas correctement configuré. Veuillez contacter l'équipe technique.";
        }
        setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Désolé, je n'ai pas pu obtenir de réponse." },
        ]);
        return;
      }

      const decoder = new TextDecoder();
      let fullContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        fullContent += text;

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          updated[lastIndex] = { ...updated[lastIndex], content: fullContent };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, je n'ai pas pu me connecter au service. Vérifiez votre connexion internet et réessayez.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 w-[350px] sm:w-[400px]"
          >
            <Card
              className="border-2 border-border shadow-2xl overflow-hidden rounded-2xl"
              role="dialog"
              aria-label="Assistant IA ECA Technology"
            >
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
                  aria-label="Fermer le chat"
                >
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-background">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4" role="log" aria-live="polite">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`group relative flex max-w-[85%] gap-2 rounded-2xl px-4 py-2.5 text-sm ${
                            m.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none"
                              : "bg-muted text-muted-foreground rounded-tl-none border border-border/50"
                          }`}
                        >
                          {m.role === "assistant" && (
                            <Bot size={16} className="mt-1 shrink-0 text-primary" />
                          )}
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {m.content || (isLoading && i === messages.length - 1 ? "" : "")}
                          </p>
                          {m.role === "assistant" && m.content && (
                            <button
                              onClick={() => handleCopy(m.content, i)}
                              className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted"
                              aria-label="Copier le message"
                            >
                              {copiedId === i ? (
                                <Check size={12} className="text-green-500" />
                              ) : (
                                <Copy size={12} className="text-muted-foreground" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.content === "" && (
                      <div className="flex justify-start">
                        <div className="flex gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground rounded-tl-none border border-border/50">
                          <Loader2 size={16} className="animate-spin text-primary" />
                          <span className="flex gap-0.5">
                            IA ECA réfléchit
                            <span className="animate-pulse">.</span>
                            <span className="animate-pulse delay-100">.</span>
                            <span className="animate-pulse delay-200">.</span>
                          </span>
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
                    ref={inputRef}
                    placeholder="Comment l'IA peut vous aider ?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="h-10 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                    aria-label="Votre message"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="h-10 w-10 rounded-lg bg-[#bef264] text-black hover:bg-[#a3d945] transition-all flex items-center justify-center shrink-0"
                    aria-label="Envoyer le message"
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
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
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
