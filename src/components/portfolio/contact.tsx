"use client";

import { Reveal } from "./reveal";
import { motion } from "framer-motion";
import { Send, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Magnetic } from "./magnetic";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("@fcocietyI").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 aurora-bg" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-md px-4 py-1.5 text-[12.5px] font-medium text-muted-foreground mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Открыт к новым проектам
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-balance">
            <span className="text-gradient">Давайте</span> сделаем{" "}
            <span className="text-gradient-accent">ваш сайт</span> красивым
            и защищённым.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 mx-auto max-w-2xl text-[17px] leading-relaxed text-muted-foreground text-pretty">
            Напишите мне в Telegram — отвечаю быстро. Обсудим задачу, сроки,
            бюджет. Я беру в работу дизайн, разработку и аудит безопасности —
            отдельно или в комплексе.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Magnetic
              as="a"
              href="https://t.me/fcocietyI"
              target="_blank"
              rel="noreferrer"
              strength={0.35}
              className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-[15px] font-semibold text-white shadow-premium-lg"
            >
              <Send className="h-4 w-4" />
              @fcocietyI
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Magnetic>
            <button
              onClick={copy}
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-md px-5 py-4 text-[14px] font-medium text-foreground transition-all duration-300 hover:bg-white hover:shadow-apple"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  Скопировано
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Скопировать
                </>
              )}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.div
            className="mt-20 grid gap-4 sm:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {[
              { k: "Отклик", v: "в течение дня" },
              { k: "Стек", v: "React · TS · Python" },
              { k: "Формат", v: "Удалённо · Любой часовой пояс" },
            ].map((s) => (
              <motion.div
                key={s.k}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="rounded-3xl border border-black/[0.06] bg-white/70 backdrop-blur-md p-5 text-left shadow-sm"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {s.k}
                </div>
                <div className="text-[15px] font-semibold text-foreground">
                  {s.v}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
