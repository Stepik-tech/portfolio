import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Максим — Веб-дизайнер & Fullstack-разработчик",
  description:
    "Портфолио Максима — веб-дизайн, Fullstack-разработка, безопасные приложения. React, TypeScript, Python. Административные панели, игра-сайт Монополия, защита от SQL-инъекций, JWT, E2E-шифрование.",
  keywords: [
    "Максим",
    "веб-дизайнер",
    "портфолио",
    "React",
    "TypeScript",
    "Python",
    "безопасность сайтов",
    "админ-панель",
    "Монополия",
  ],
  authors: [{ name: "Максим" }],
  openGraph: {
    title: "Максим — Веб-дизайнер & Fullstack-разработчик",
    description:
      "Портфолио: безопасные приложения, игра-сайт Монополия, React, TypeScript, Python.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-black selection:text-white custom-cursor-active`}
      >
        <div className="noise-overlay" aria-hidden />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
