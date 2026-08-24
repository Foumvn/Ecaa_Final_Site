import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ECA Technology | Solutions Technologiques',
  description: 'ECA Technology - Réparation électronique, automobile, formation et conception design au Cameroun. Yaoundé, Ékié.',
  keywords: 'ECA Technology, réparation, électronique, automobile, formation, Cameroun, Yaoundé',
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/icon-180.png',
  },
}

import { ChatBot } from "@/components/chat-bot";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  )
}
