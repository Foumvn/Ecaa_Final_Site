"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            className={`rounded-xl w-10 h-10 md:w-12 md:h-12 transition-all hover:bg-muted relative flex items-center justify-center shrink-0 ${className}`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Sun className="h-5 w-5 md:h-6 md:w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 md:h-6 md:w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Changer le thème</span>
        </Button>
    )
}
