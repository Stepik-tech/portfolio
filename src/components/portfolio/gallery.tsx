"use client";

import { Reveal } from "./reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { BrowserFrame } from "./browser-frame";

interface Shot {
  src: string;
  title: string;
  subtitle: string;
  category: "Админ-панель" | "Монополия";
  url: string;
  width: number;
  height: number;
}

const adminShots: Shot[] = [
  { src: "/rErK3kC.png", title: "Главная", subtitle: "Дашборд администратора", category: "Админ-панель", url: "admin.maxim.app/dashboard", width: 1600, height: 915 },
  { src: "/Ccih1z0.png", title: "Группы", subtitle: "Групповые чаты и сообщества", category: "Админ-панель", url: "admin.maxim.app/groups", width: 1600, height: 793 },
  { src: "/LCzK2Jz.png", title: "Личные сообщения", subtitle: "Диалоги 1-на-1", category: "Админ-панель", url: "admin.maxim.app/messages", width: 1503, height: 770 },
  { src: "/ZN5Xc6Z.png", title: "Тикеты", subtitle: "Система тикетов + чат с пользователем", category: "Админ-панель", url: "admin.maxim.app/tickets", width: 623, height: 515 },
  { src: "/affwX95.png", title: "Логи", subtitle: "Система логов · аудит действий", category: "Админ-панель", url: "admin.maxim.app/logs", width: 1536, height: 1010 },
];

const monopolyShots: Shot[] = [
  { src: "/mono-1-profile.png", title: "Профиль", subtitle: "Лента, видео-баннер и аватар", category: "Монополия", url: "monopoly.maxim.app/profile", width: 1086, height: 669 },
  { src: "/mono-2-posts.png", title: "Посты", subtitle: "Публичная лента постов", category: "Монополия", url: "monopoly.maxim.app/feed", width: 1101, height: 526 },
  { src: "/mono-3-bp.png", title: "Battle Pass", subtitle: "Free + Premium, 30 уровней", category: "Монополия", url: "monopoly.maxim.app/battlepass", width: 1600, height: 879 },
  { src: "/mono-4-friends.png", title: "Друзья + E2E", subtitle: "E2E-шифрованные сообщения", category: "Монополия", url: "monopoly.maxim.app/friends", width: 1232, height: 990 },
  { src: "/mono-5-reports.png", title: "Жалобы", subtitle: "Очередь модерации", category: "Монополия", url: "monopoly.maxim.app/reports", width: 475, height: 689 },
  { src: "/mono-6-game.png", title: "Игра", subtitle: "Игровое поле, кубики, ходы", category: "Монополия", url: "monopoly.maxim.app/game", width: 1600, height: 833 },
  { src: "/mono-7-end.png", title: "Финал", subtitle: "Рейтинг, опыт, награды", category: "Монополия", url: "monopoly.maxim.app/results", width: 548, height: 903 },
];

const allShots: Shot[] = [...adminShots, ...monopolyShots];

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const shot = allShots[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Предыдущее"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Следующее"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
      >
        <ChevronRight className="h-6 w-6" />
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
          <img src={shot.src} alt={shot.subtitle} className="max-h-[80vh] w-full object-contain" />
        </div>
        <div className="mt-4 flex items-center justify-between text-white">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
              {shot.category} · {shot.title}
            </div>
            <div className="text-[16px] font-semibold">{shot.subtitle}</div>
          </div>
          <div className="text-[12px] font-mono text-white/50">
            {index + 1} / {allShots.length}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const nav = useCallback(
    (dir: number) => {
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + allShots.length) % allShots.length
      );
    },
    []
  );

  return (
    <section id="gallery" className="relative py-28 md:py-40 bg-black text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-white/30" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-white/50">
              Работы
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] max-w-3xl text-balance">
            Все скриншоты проектов —{" "}
            <span className="text-gradient-accent">без ИИ-стиля</span>, как
            они есть в проде.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/60 text-pretty">
            {allShots.length} кадров двух проектов: административная панель и
            игра-сайт «Монополия». Настоящие снимки, без нейросетевой обработки.
            Кликните — откроется в полный экран.
          </p>
        </Reveal>
      </div>

      {/* Marquee row 1 */}
      <div className="marquee-pause relative overflow-hidden mb-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="flex w-max animate-marquee gap-5" style={{ ["--marquee-duration" as string]: "75s" }}>
          {[...allShots, ...allShots].map((s, i) => (
            <MarqueeCard key={`r1-${i}`} shot={s} onClick={() => setOpen(i % allShots.length)} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 */}
      <div className="marquee-pause relative overflow-hidden mb-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="flex w-max animate-marquee-reverse gap-5" style={{ ["--marquee-duration" as string]: "90s" }}>
          {[...allShots.slice().reverse(), ...allShots.slice().reverse()].map((s, i) => (
            <MarqueeCard key={`r2-${i}`} shot={s} small onClick={() => setOpen((allShots.length - 1 - (i % allShots.length)))} />
          ))}
        </div>
      </div>

      {/* Grid view — natural aspect ratios, no cropping */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {allShots.map((s, i) => (
            <motion.div
              key={s.src + i}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="view"
              className="mb-4 break-inside-avoid"
            >
              <BrowserFrame
                src={s.src}
                alt={s.subtitle}
                url={s.url}
                width={s.width}
                height={s.height}
                tilt
                glow={s.category === "Монополия" ? "rgba(249, 115, 22, 0.18)" : "rgba(0, 113, 227, 0.18)"}
                variant="dark"
                caption={s.subtitle}
                title={s.category}
              />
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-white/60">
              <Images className="h-3.5 w-3.5" />
              {allShots.length} работ · обновляется по мере релизов
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={() => setOpen(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </section>
  );
}

function MarqueeCard({
  shot,
  small,
  onClick,
}: {
  shot: Shot;
  small?: boolean;
  onClick: () => void;
}) {
  // Calculate aspect ratio to size the card properly
  const aspect = shot.width / shot.height;
  const width = small ? 300 : 440;
  const height = width / aspect;

  return (
    <button
      onClick={onClick}
      data-cursor="view"
      className={`group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-all duration-500 hover:border-white/30`}
      style={{ width, height }}
    >
      <img
        src={shot.src}
        alt={shot.subtitle}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute top-2 left-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white">
          {shot.category}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <div className={`font-semibold text-white leading-tight ${small ? "text-[12.5px]" : "text-[14px]"}`}>
          {shot.subtitle}
        </div>
      </div>
    </button>
  );
}
