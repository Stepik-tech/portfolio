"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "./magnetic";
import { ParticleField } from "./particle-field";

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const orbX1 = useSpring(useTransform(mx, [-0.5, 0.5], [-30, 30]), { stiffness: 50, damping: 20 });
  const orbY1 = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 20 });
  const orbX2 = useSpring(useTransform(mx, [-0.5, 0.5], [40, -40]), { stiffness: 60, damping: 20 });
  const orbY2 = useSpring(useTransform(my, [-0.5, 0.5], [25, -25]), { stiffness: 60, damping: 20 });
  const titleX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 20 });
  const titleY = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 20 });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yLead = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full overflow-hidden pt-32 pb-20 flex items-center"
    >
      {/* Background layers */}
      <div className="absolute inset-0 aurora-bg" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <ParticleField count={70} color="blue" interactive />

      {/* Floating decorative orbs with mouse parallax */}
      <motion.div
        aria-hidden
        style={{ x: orbX1, y: orbY1 }}
        className="absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
      >
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,113,227,0.18) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: orbX2, y: orbY2 }}
        className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full blur-3xl"
      >
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,199,255,0.14) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Subtle noise overlay */}
      <motion.div
        aria-hidden
        style={{ x: titleX, y: titleY }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <motion.h1
          style={{ y: yTitle, opacity, scale, x: titleX }}
          className="text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-balance"
        >
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeApple, delay: 0.2 }}
            className="block text-gradient"
          >
            Дизайн.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeApple, delay: 0.35 }}
            className="block"
          >
            Код.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeApple, delay: 0.5 }}
            className="block text-gradient-accent"
          >
            Безопасность.
          </motion.span>
        </motion.h1>

        <motion.div
          style={{ y: yLead, opacity }}
          className="mt-10 grid gap-6 md:grid-cols-[1.2fr,0.8fr] md:items-end"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeApple, delay: 0.7 }}
            className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-muted-foreground max-w-2xl text-pretty"
          >
            Меня зовут{" "}
            <span className="font-semibold text-foreground">Максим</span>. Я
            проектирую интерфейсы, пишу{" "}
            <span className="font-semibold text-foreground">
              React, TypeScript, Python
            </span>{" "}
            и собираю приложения, которым доверяют — с защитой от SQL-инъекций,
            JWT-авторизацией и end-to-end шифрованием.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeApple, delay: 0.85 }}
            className="flex flex-col items-start gap-4 md:items-end"
          >
            <div className="flex flex-wrap gap-2 md:justify-end">
              {[
                { label: "Опыт", value: "есть" },
                { label: "Стек", value: "6 языков" },
                { label: "Проекты", value: "Live" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-md px-4 py-2.5 text-sm shadow-sm"
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="text-[15px] font-semibold text-foreground">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            <Magnetic
              as="a"
              href="https://t.me/fcocietyI"
              target="_blank"
              rel="noreferrer"
              strength={0.3}
              className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[14.5px] font-medium text-white shadow-premium transition-all duration-500 hover:shadow-premium-lg"
            >
              Написать в Telegram
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Скролл</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
