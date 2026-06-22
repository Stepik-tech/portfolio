"use client";

import { Reveal, Stagger } from "./reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Users,
  Shield,
  MessagesSquare,
  Ticket,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  Lock,
  LayoutDashboard,
  X,
} from "lucide-react";
import { BrowserFrame } from "./browser-frame";

const features = [
  {
    icon: Shield,
    title: "Система прав и уровней",
    text: "Гибкая ролевая модель: root, администратор, модератор, поддержка, пользователь. На каждом уровне — свой набор разрешений, свой дашборд, своя область видимости.",
    points: ["Роли и разрешения", "Уровни доступа", "Контекстный UI"],
  },
  {
    icon: MessagesSquare,
    title: "Личные сообщения и группы",
    text: "Внутренний мессенджер: 1-на-1 диалоги и групповые чаты. Статусы прочтения, индикатор «печатает», история переписки с пагинацией и поиском.",
    points: ["Диалоги 1-на-1", "Групповые чаты", "Поиск по истории"],
  },
  {
    icon: Ticket,
    title: "Система тикетов",
    text: "Полноценный helpdesk внутри панели: очереди, приоритеты, статусы, эскалация, прикрепления. Прямой чат с пользователем прямо из тикета — поддержка видит проблему и решает её в одном окне.",
    points: ["Очереди и приоритеты", "Чат из тикета", "Вложения"],
  },
  {
    icon: ScrollText,
    title: "Система логирования",
    text: "Каждое действие администратора фиксируется: кто, когда, что изменил. Поиск по аудит-логу, экспорт, фильтры по типу события и объекту.",
    points: ["Аудит действий", "Фильтры и поиск", "Экспорт логов"],
  },
  {
    icon: Users,
    title: "Управление пользователями",
    text: "CRUD по пользователям: создание, блокировка, смена роли, сброс пароля, просмотр сессий и устройств. Массовые операции и импорт.",
    points: ["CRUD + блокировки", "Сессии и устройства", "Массовые операции"],
  },
];

const shots = [
  {
    src: "/rErK3kC.png",
    title: "Главная",
    subtitle: "Дашборд администратора",
    icon: LayoutDashboard,
    url: "admin.maxim.app/dashboard",
    width: 1600,
    height: 915,
  },
  {
    src: "/Ccih1z0.png",
    title: "Группы",
    subtitle: "Групповые чаты и сообщества",
    icon: Users,
    url: "admin.maxim.app/groups",
    width: 1600,
    height: 793,
  },
  {
    src: "/LCzK2Jz.png",
    title: "Личные сообщения",
    subtitle: "Диалоги 1-на-1",
    icon: MessagesSquare,
    url: "admin.maxim.app/messages",
    width: 1503,
    height: 770,
  },
  {
    src: "/ZN5Xc6Z.png",
    title: "Тикеты",
    subtitle: "Система тикетов + чат с пользователем",
    icon: Ticket,
    url: "admin.maxim.app/tickets",
    width: 623,
    height: 515,
  },
  {
    src: "/affwX95.png",
    title: "Логи",
    subtitle: "Система логов · аудит действий",
    icon: ScrollText,
    url: "admin.maxim.app/logs",
    width: 1536,
    height: 1010,
  },
];

function ShotCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused || lightbox) return;
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % shots.length);
    }, 5000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, lightbox]);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + shots.length) % shots.length);
  };

  const current = shots[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative" data-cursor="view" onClick={() => setLightbox(true)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -20, clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserFrame
              src={current.src}
              alt={current.subtitle}
              url={current.url}
              width={current.width}
              height={current.height}
              maxHeight={520}
              tilt={false}
              glow="rgba(0, 113, 227, 0.20)"
              variant="dark"
              caption={current.subtitle}
              badge={
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <Lock className="h-3 w-3" />
                  E2E
                </div>
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating index badge */}
        <div className="absolute top-4 right-4 z-10 rounded-full bg-black/70 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono text-white">
          {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-4">
        {/* Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto thin-scroll flex-1">
          {shots.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              aria-label={s.title}
              className={`group relative shrink-0 overflow-hidden rounded-lg transition-all duration-500 ${
                i === index
                  ? "ring-2 ring-black w-20 h-12"
                  : "opacity-50 hover:opacity-100 w-14 h-9 ring-1 ring-black/10"
              }`}
            >
              <img
                src={s.src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Предыдущий"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-foreground transition-all hover:bg-black hover:text-white hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Следующий"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-foreground transition-all hover:bg-black hover:text-white hover:scale-105"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Закрыть"
              className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-premium-lg">
                <img
                  src={current.src}
                  alt={current.subtitle}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                    <current.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                      {current.title}
                    </div>
                    <div className="text-[16px] font-semibold">
                      {current.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdminApp() {
  return (
    <section id="admin" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-black/20" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
                  Проект · 01
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-md px-3 py-1 text-[12px] font-medium text-muted-foreground mb-6">
                <Shield className="h-3.5 w-3.5 text-blue-500" />
                Административная панель
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                Панель администратора с{" "}
                <span className="text-gradient-accent">ролями</span>,{" "}
                <span className="text-gradient">тикетами</span> и логами.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
                Внутренний продукт для управления платформой. Я спроектировал
                архитектуру безопасности, спроектировал интерфейс и реализовал
                серверную часть. Панель выдерживает ролевую модель любой сложности
                и пишет аудит-лог на каждое действие — нет «невидимых»
                администраторов.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <ShotCarousel />
              </div>
            </Reveal>
          </div>

          <div>
            <Stagger className="space-y-4" stagger={0.08}>
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-apple transition-all duration-500 hover:shadow-premium hover:-translate-y-0.5"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/0 to-cyan-500/0 transition-all duration-700 group-hover:from-blue-500/10 group-hover:to-cyan-500/10" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 text-foreground ring-1 ring-black/5 transition-all duration-500 group-hover:from-black group-hover:to-neutral-800 group-hover:text-white">
                      <f.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[16.5px] font-semibold tracking-tight mb-1.5">
                        {f.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-muted-foreground mb-3">
                        {f.text}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.points.map((p) => (
                          <span
                            key={p}
                            className="rounded-full bg-secondary px-2.5 py-0.5 text-[11.5px] font-medium text-muted-foreground"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
