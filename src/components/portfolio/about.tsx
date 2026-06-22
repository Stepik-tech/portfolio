"use client";

import { Reveal } from "./reveal";
import { ShieldCheck, Layers, Cpu, Lock } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "От идеи до релиза",
    text: "Беру проект на себя: прототип в Figma, дизайн-система, фронтенд на React/Next.js, бэкенд на Python, деплой и поддержка.",
  },
  {
    icon: Cpu,
    title: "Полный стек",
    text: "Пишу на TSX, JS, CSS, React, Python, HTML. Под каждый слой задачи — свой инструмент, без лишних абстракций.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность по умолчанию",
    text: "Защищаю сайты от SQL-инъекций, парсинга и угонщиков сессий. JWT, E2E-шифрование, шифрование БД — стандартный набор моих проектов.",
  },
  {
    icon: Lock,
    title: "Готов настроить защиту",
    text: "Если у вас уже есть сайт — проведу аудит, закрою уязвимости и внедрю недостающие слои безопасности под вашу нагрузку.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-black/20" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
              О себе
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] max-w-4xl text-balance">
            Я не верстаю страницы. Я собираю{" "}
            <span className="text-gradient">продукты</span>, которые работают и
            защищены.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-muted-foreground text-pretty">
            Меня зовут Максим. Я веб-дизайнер и fullstack-разработчик. За плечами
            — завершённые проекты разной сложности: от лендингов до
            администраторских панелей с ролями и тикетами, от игровой механики
            до полноценной криптографии данных. Я одинаково внимательно отношусь
            к типографике на экране и к тому, как запрос уходит в базу. Дизайн
            без безопасности — это картинка. Безопасность без дизайна — никто не
            будет пользоваться. Я делаю и то, и другое.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i}>
              <div className="group relative h-full rounded-3xl border border-black/[0.06] bg-white p-7 shadow-apple transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1.5">
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 text-foreground ring-1 ring-black/5 transition-all duration-500 group-hover:from-black group-hover:to-neutral-800 group-hover:text-white">
                  <p.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
