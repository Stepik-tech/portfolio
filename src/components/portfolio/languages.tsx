"use client";

import { Reveal, Stagger } from "./reveal";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { RotatingCube } from "./rotating-cube";
import { ParticleField } from "./particle-field";

interface Lang {
  code: string;
  name: string;
  role: string;
  description: string;
  accent: string;
  bg: string;
  glyph: ReactNode;
}

const langs: Lang[] = [
  {
    code: "TSX",
    name: "TypeScript + JSX",
    role: "Типизированный UI",
    description:
      "Строго типизированный React-код: компоненты, хуки, дженерики. Ловлю ошибки на этапе компиляции, а не в проде.",
    accent: "#3178C6",
    bg: "linear-gradient(135deg, rgba(49,120,198,0.10) 0%, rgba(49,120,198,0.02) 100%)",
    glyph: (
      <span className="font-mono text-[28px] font-bold tracking-tight">
        <span className="text-blue-600">TS</span>
        <span className="text-orange-500">X</span>
      </span>
    ),
  },
  {
    code: "JS",
    name: "JavaScript",
    role: "Динамика и логика",
    description:
      "ES2023+, асинхронщина, чистые функции. От анимаций на канвасе до WebSocket-клиентов в реальном времени.",
    accent: "#F7DF1E",
    bg: "linear-gradient(135deg, rgba(247,223,30,0.18) 0%, rgba(247,223,30,0.02) 100%)",
    glyph: (
      <span className="font-mono text-[28px] font-bold tracking-tight text-yellow-500">
        JS
      </span>
    ),
  },
  {
    code: "CSS",
    name: "CSS3 / Tailwind",
    role: "Визуальный язык",
    description:
      "Адаптив, анимации, кастомные свойства, Container Queries. Дизайн-системы, которые легко поддерживать.",
    accent: "#1572B6",
    bg: "linear-gradient(135deg, rgba(21,114,182,0.10) 0%, rgba(21,114,182,0.02) 100%)",
    glyph: (
      <span className="font-mono text-[28px] font-bold tracking-tight text-blue-500">
        CSS
      </span>
    ),
  },
  {
    code: "React",
    name: "React 19",
    role: "Компонентная архитектура",
    description:
      "Server Components, Suspense, хуки, контексты. Строю переиспользуемые UI-системы на shadcn/ui и Tailwind.",
    accent: "#61DAFB",
    bg: "linear-gradient(135deg, rgba(97,218,251,0.16) 0%, rgba(97,218,251,0.02) 100%)",
    glyph: (
      <span className="font-mono text-[28px] font-bold tracking-tight text-cyan-500">
        ⚛
      </span>
    ),
  },
  {
    code: "Python",
    name: "Python 3",
    role: "Бэкенд и автоматизация",
    description:
      "FastAPI, боты, парсеры, криптография, асинхронные задачи. Пишу сервисы, которые держат нагрузку.",
    accent: "#3776AB",
    bg: "linear-gradient(135deg, rgba(55,118,171,0.10) 0%, rgba(255,212,59,0.06) 100%)",
    glyph: (
      <span className="font-mono text-[28px] font-bold tracking-tight">
        <span className="text-blue-500">py</span>
      </span>
    ),
  },
  {
    code: "HTML",
    name: "HTML5",
    role: "Семантика и доступность",
    description:
      "Семантическая разметка, ARIA, SEO-готовность, прогрессивное улучшение. Фундамент, на котором стоит всё.",
    accent: "#E34F26",
    bg: "linear-gradient(135deg, rgba(227,79,38,0.12) 0%, rgba(227,79,38,0.02) 100%)",
    glyph: (
      <span className="font-mono text-[28px] font-bold tracking-tight text-orange-600">
        &lt;/&gt;
      </span>
    ),
  },
];

function LangCard({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-full rounded-3xl border border-black/[0.06] bg-white p-7 shadow-apple transition-[transform,box-shadow] duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: lang.bg }}
        aria-hidden
      />
      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            {lang.glyph}
          </div>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
            style={{ background: lang.accent }}
          >
            {lang.code}
          </span>
        </div>
        <h3 className="text-[18px] font-semibold tracking-tight mb-1">
          {lang.name}
        </h3>
        <div className="text-[12.5px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
          {lang.role}
        </div>
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          {lang.description}
        </p>
      </div>
    </div>
  );
}

export function Languages() {
  return (
    <section id="stack" className="relative py-28 md:py-40 bg-secondary/40 overflow-hidden">
      {/* Particle background */}
      <ParticleField count={50} color="blue" interactive />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-black/20" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
              Технологии
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr,1fr] lg:gap-16 lg:items-center">
          <div>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] max-w-4xl text-balance">
                Шесть языков.{" "}
                <span className="text-gradient">Один автор.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-muted-foreground text-pretty">
                Я не использую одну палочку на все случаи. Под каждую задачу — свой
                инструмент: TypeScript для типизированного UI, Python для бэкенда,
                CSS и HTML как фундамент, React как архитектурный каркас.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["TSX", "JS", "CSS", "React", "Python", "HTML"].map((l, i) => (
                  <motion.span
                    key={l}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    className="rounded-full border border-black/10 bg-white/80 backdrop-blur-md px-4 py-1.5 font-mono text-[13px] font-medium text-foreground shadow-sm"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 3D Cube */}
          <Reveal delay={0.1}>
            <RotatingCube />
          </Reveal>
        </div>

        {/* Cards grid */}
        <Stagger className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {langs.map((l) => (
            <LangCard key={l.code} lang={l} />
          ))}
        </Stagger>

        {/* Code strip marquee */}
        <Reveal delay={0.2}>
          <div className="mt-20 marquee-pause relative overflow-hidden rounded-3xl border border-black/[0.06] bg-black p-1.5">
            <div className="overflow-hidden rounded-2xl bg-black">
              <div className="flex w-max animate-marquee" style={{ ["--marquee-duration" as string]: "60s" }}>
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex shrink-0 items-center gap-10 px-8 py-4 font-mono text-[13px] text-neutral-400">
                    {[
                      "const MAX = 'designer'",
                      "await secureboot()",
                      "sudo chmod 700 db.sqlite",
                      "import { Shield } from 'crypto'",
                      "SELECT * FROM users WHERE id = $1",
                      "JWT.sign(payload, secret)",
                      "encrypt.e2e(message)",
                      "React.createServer(...)",
                      "tailwind --content .",
                      "python -m venv .venv",
                    ].map((line, i) => (
                      <span key={`${dup}-${i}`} className="flex items-center gap-3">
                        <span className="text-green-400">$</span>
                        <span className="text-white/90">{line}</span>
                        <span className="ml-6 text-neutral-700">|</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
