"use client";

import { Reveal, Stagger } from "./reveal";
import { CountUp } from "./count-up";

const stats = [
  { value: 6, suffix: "", label: "Языков в стеке", sub: "TSX · JS · CSS · React · Python · HTML" },
  { value: 5, suffix: "", label: "Слоёв безопасности", sub: "SQL · JWT · E2E · TLS · WAF" },
  { value: 2, suffix: "", label: "Крупных проекта", sub: "Админ-панель · Монополия" },
  { value: 100, suffix: "%", label: "Под контроль", sub: "Дизайн → код → деплой → аудит" },
];

export function Stats() {
  return (
    <section className="relative py-20 md:py-24 border-y border-black/[0.06] bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <Stagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4"
          stagger={0.1}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-[clamp(2.4rem,5vw,3.6rem)] font-semibold tracking-[-0.04em] leading-none text-gradient">
                <CountUp to={s.value} suffix={s.suffix} duration={2.2} />
              </div>
              <div className="mt-3 text-[14.5px] font-semibold text-foreground">
                {s.label}
              </div>
              <div className="mt-1 text-[12.5px] text-muted-foreground leading-snug">
                {s.sub}
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
