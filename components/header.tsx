"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Briefcase, GraduationCap, Image as ImageIcon, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

const navLinks = [
  { label: "Services", href: "#services", icon: <Briefcase size={18} />, gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)" },
  { label: "Formation", href: "#formation", icon: <GraduationCap size={18} />, gradient: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, rgba(15,118,110,0) 100%)" },
  { label: "Portfolio", href: "#portfolio", icon: <ImageIcon size={18} />, gradient: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)" },
  { label: "Équipe", href: "#equipe", icon: <Users size={18} />, gradient: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-6 gap-2">
      <motion.div
        layout
        className={`relative flex items-center justify-between transition-all duration-500 ${isScrolled
            ? "w-full max-w-2xl rounded-2xl bg-background/80 backdrop-blur-2xl border border-border/40 shadow-2xl p-3 gap-4"
            : "w-full max-w-5xl rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-none px-6 py-4 gap-6"
          }`}
      >
        {/* Glow & Clipping Container */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] pointer-events-none">
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                layoutId="nav-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: navLinks[hoveredIndex].gradient,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3 group shrink-0">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${isScrolled ? "bg-primary text-primary-foreground" : "bg-white text-primary"}`}>
            <span className="font-bold text-xs italic">ECA</span>
          </div>
          <span className={`hidden sm:block text-base font-bold tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}>
            Technology
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center md:flex relative z-10">
          <ul className="flex items-center gap-1">
            {navLinks.map((link, index) => (
              <li key={link.label} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all rounded-xl flex items-center gap-2 ${isScrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white"
                    }`}
                >
                  <span className="transition-transform">{link.icon}</span>
                  {link.label}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-10 rounded-xl ${isScrolled ? "bg-muted" : "bg-white/10"}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA & Actions */}
        <div className="flex items-center gap-2 md:gap-4 relative z-10 shrink-0">
          <ModeToggle
            className={isScrolled ? "text-foreground" : "text-white"}
          />

          <Link
            href="https://wa.me/237656490321"
            target="_blank"
            className="group relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 32 32" className="h-6 w-6 md:h-8 md:w-8 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.14 8L.06 32l8.26-2.16c2.32 1.28 4.96 1.96 7.68 1.96 8.84 0 16-7.16 16-16S24.84 0 16 0zm0 29.38c-2.42 0-4.78-.62-6.86-1.8l-.48-.28L3.74 28.5l1.24-4.54-.3-.48C3.48 21.4 2.62 18.74 2.62 16c0-7.38 6-13.38 13.38-13.38s13.38 6 13.38 13.38-6 13.38-13.38 13.38zm7.36-10.08c-.4-.2-2.38-1.18-2.74-1.32-.36-.14-.62-.2-.88.2s-1 1.32-2.34 1.48c-.14-.14-.28-.3-.52-.42-1.14-.56-2.08-1.07-2.9-1.88-.64-.63-1.02-1.36-1.14-1.66-.12-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.72-1.74-.98-2.4-.26-.64-.52-.56-.72-.56h-.61c-.21 0-.54.08-.82.38-.28.3-1.07 1.05-1.07 2.56s1.1 2.97 1.25 3.17c.15.2 2.16 3.48 5.4 4.75.77.3 1.37.49 1.84.64.77.24 1.48.21 2.04.13.62-.09 1.91-.78 2.18-1.54s.27-1.41.19-1.54c-.08-.13-.3-.21-.7-.41z" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all md:hidden shrink-0 ${isScrolled ? "text-foreground bg-muted" : "text-white bg-white/10"
              }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="w-full max-w-sm bg-background/95 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl md:hidden overflow-hidden z-[60]"
          >
            <nav className="flex flex-col p-2 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span className="text-primary">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                <Link
                  href="https://wa.me/237656490321"
                  target="_blank"
                  className="flex items-center justify-center gap-3 bg-[#25D366] px-5 py-4 text-center text-lg font-semibold text-white rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.14 8L.06 32l8.26-2.16c2.32 1.28 4.96 1.96 7.68 1.96 8.84 0 16-7.16 16-16S24.84 0 16 0zm0 29.38c-2.42 0-4.78-.62-6.86-1.8l-.48-.28L3.74 28.5l1.24-4.54-.3-.48C3.48 21.4 2.62 18.74 2.62 16c0-7.38 6-13.38 13.38-13.38s13.38 6 13.38 13.38-6 13.38-13.38 13.38zm7.36-10.08c-.4-.2-2.38-1.18-2.74-1.32-.36-.14-.62-.2-.88.2s-1 1.32-2.34 1.48c-.14-.14-.28-.3-.52-.42-1.14-.56-2.08-1.07-2.9-1.88-.64-.63-1.02-1.36-1.14-1.66-.12-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.72-1.74-.98-2.4-.26-.64-.52-.56-.72-.56h-.61c-.21 0-.54.08-.82.38-.28.3-1.07 1.05-1.07 2.56s1.1 2.97 1.25 3.17c.15.2 2.16 3.48 5.4 4.75.77.3 1.37.49 1.84.64.77.24 1.48.21 2.04.13.62-.09 1.91-.78 2.18-1.54s.27-1.41.19-1.54c-.08-.13-.3-.21-.7-.41z" />
                  </svg>
                  Discuter sur WhatsApp
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
