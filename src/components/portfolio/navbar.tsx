"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

const links = [
  { label: "Обо мне", href: "#about" },
  { label: "Стек", href: "#stack" },
  { label: "Админ-панель", href: "#admin" },
  { label: "Монополия", href: "#monopoly" },
  { label: "Безопасность", href: "#security" },
  { label: "Работы", href: "#gallery" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).offsetTop - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500",
          scrolled
            ? "glass shadow-apple py-2.5"
            : "bg-transparent py-3"
        )}
        style={{ marginLeft: "1rem", marginRight: "1rem" }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
          aria-label="Наверх"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
            М
            <span className="absolute inset-0 rounded-full ring-2 ring-black/10 transition-transform duration-500 group-hover:scale-110" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Максим
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-black/5"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic
            as="a"
            href="https://t.me/fcocietyI"
            target="_blank"
            rel="noreferrer"
            strength={0.25}
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-[13.5px] font-medium text-white transition-colors duration-300 hover:bg-neutral-800"
          >
            <Send className="h-3.5 w-3.5" />
            Связаться
          </Magnetic>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5"
            aria-label="Меню"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-4 mt-2 glass rounded-3xl p-3 shadow-apple"
          >
            <div className="grid gap-1">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="rounded-2xl px-4 py-2.5 text-left text-[15px] font-medium text-foreground/80 hover:bg-black/5"
                >
                  {l.label}
                </button>
              ))}
              <a
                href="https://t.me/fcocietyI"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-[15px] font-medium text-white"
              >
                <Send className="h-4 w-4" />
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
