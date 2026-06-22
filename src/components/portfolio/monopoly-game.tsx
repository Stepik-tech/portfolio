"use client";

import { Reveal, Stagger } from "./reveal";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Database,
  ShieldCheck,
  Key,
  Lock,
  Eye,
  Fingerprint,
  Server,
  Gamepad2,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Newspaper,
  Trophy,
  Users,
  Flag,
  Dices,
  Crown,
  Sparkles,
  Clock,
} from "lucide-react";
import { BrowserFrame } from "./browser-frame";

const terms = [
  {
    icon: ShieldCheck,
    term: "Защита от SQL-инъекций",
    short: "Параметризованные запросы",
    text: "SQL-инъекция — атака, при которой злоумышленник подмешивает SQL-код в данные, отправляемые на сервер. Я закрываю это параметризованными запросами и ORM-слоем: данные никогда не интерполируются в SQL-строку, а передаются как параметры драйверу.",
  },
  {
    icon: Eye,
    term: "Защита от парсинга сайта",
    short: "Анти-скрейпинг",
    text: "Парсинг — автоматический сбор страниц роботами. Я добавляю rate-limiting по IP, проверяю заголовки и поведение клиента, использую динамические токены в формах и honeypot-поля — это делает массовый парсинг экономически невыгодным.",
  },
  {
    icon: Key,
    term: "JWT-токен",
    short: "JSON Web Token",
    text: "JWT — подписанный токен авторизации. После логина сервер выдаёт JWT клиенту, и тот прикладывает его к каждому запросу. Подпись гарантирует, что токен не подделан. У меня JWT имеет короткий срок жизни и обновляется через refresh-токен.",
  },
  {
    icon: Lock,
    term: "End-to-End шифрование",
    short: "E2E-шифрование",
    text: "E2E — это шифрование, при котором сообщение читают только отправитель и получатель. Сервер видит шифр-текст, но не может его расшифровать. Ключи генерируются на устройствах, закрытые — никогда не покидают клиент. Даже при утечке базы сообщения останутся нерасшифрованными.",
  },
  {
    icon: Database,
    term: "Шифрование базы данных",
    short: "Encrypted at rest",
    text: "Шифрование БД — защита данных «в покое». Даже если атакующий получит дамп, он увидит только шифр-текст. У меня шифруются чувствительные поля на уровне приложения (пароли — bcrypt, персональные данные — AES-256-GCM), плюс шифрование тома на сервере.",
  },
  {
    icon: Server,
    term: "Шифрование сайта (HTTPS / TLS)",
    short: "Transport Layer Security",
    text: "TLS шифрует трафик между браузером и сервером. Я использую HTTPS с современными шифрами (TLS 1.3), HSTS-заголовок и автоматическое обновление сертификатов. Сайт и его API всегда доступны только по зашифрованному каналу.",
  },
  {
    icon: Fingerprint,
    term: "Доп. слои защиты",
    short: "CSP, CSRF, XSS, WAF",
    text: "CSP запрещает сторонние скрипты. CSRF-токены защищают формы. Экранирование вывода и валидация входов защищают от XSS. WAF на границе отсекает шаблоны атак ещё до приложения. Это не «один щит», а слоёная оборона.",
  },
];

const features = [
  {
    icon: User,
    title: "Профиль с лентой",
    text: "Профиль игрока с баннером и аватаркой — поддерживается любой формат, включая видео. Лента активности, статистика игр, побед, поражений и рейтинг.",
    points: ["Видео-баннер", "Аватар-видео", "Статистика и рейтинг"],
  },
  {
    icon: Newspaper,
    title: "Система постов",
    text: "Любой игрок может посмотреть ленту постов и опубликовать свой. Посты видны публично, поддерживают скриншоты и форматирование. Отдельный бейдж «РАЗРАБОТЧИК» для официальных аккаунтов.",
    points: ["Публичная лента", "Скриншоты к постам", "Бейджи авторов"],
  },
  {
    icon: Trophy,
    title: "Battle Pass: бесплатный и платный",
    text: "Дорожка наград двух уровней — бесплатная и платная. 30 уровней, награды обновляются каждый день в 11:00. Задания генерируются алгоритмом — каждый день уникальные, повторений нет.",
    points: ["Free + Premium", "30 уровней", "Ежедневный алгоритм заданий"],
  },
  {
    icon: Users,
    title: "Друзья и личные сообщения",
    text: "Полноценная система друзей: статусы онлайн, уровни, поиск. Личные сообщения с end-to-end шифрованием — даже сервер не видит содержимое переписки.",
    points: ["Список друзей", "Онлайн-статусы", "E2E-шифрование переписки"],
  },
  {
    icon: Flag,
    title: "Система жалоб",
    text: "Игроки подают жалобы с указанием причины (спам, нарушение правил и т.д.). Каждая жалоба попадает в очередь модераторов админ-панели и разбирается вручную.",
    points: ["Категории жалоб", "Очередь модерации", "Связь с админ-панелью"],
  },
  {
    icon: Dices,
    title: "Игровое поле",
    text: "Полноценная игра в Монополию: кубики, ходы, чат в реальном времени, информация о текущем ходе. Игровая механика написана с нуля, синхронизация через WebSocket.",
    points: ["Кубики и ходы", "Чат в реальном времени", "WebSocket-синхронизация"],
  },
  {
    icon: Crown,
    title: "Экран окончания игры",
    text: "После выбывания игрока — экран с рейтингом, полученным опытом, наградами и финальной таблицей игроков. Данные сразу пишутся в профиль и статистику.",
    points: ["Финальный рейтинг", "Опыт и награды", "Таблица игроков"],
  },
];

const shots = [
  { src: "/mono-1-profile.png", title: "Профиль", subtitle: "Лента, баннер и аватар (видео поддерживается)", icon: User, url: "monopoly.maxim.app/profile", width: 1086, height: 669 },
  { src: "/mono-2-posts.png", title: "Посты", subtitle: "Публичная лента постов любого игрока", icon: Newspaper, url: "monopoly.maxim.app/feed", width: 1101, height: 526 },
  { src: "/mono-3-bp.png", title: "Battle Pass", subtitle: "Free + Premium · 30 уровней · награды в 11:00", icon: Trophy, url: "monopoly.maxim.app/battlepass", width: 1600, height: 879 },
  { src: "/mono-4-friends.png", title: "Друзья + E2E", subtitle: "Личные сообщения с end-to-end шифрованием", icon: Users, url: "monopoly.maxim.app/friends", width: 1232, height: 990 },
  { src: "/mono-5-reports.png", title: "Жалобы", subtitle: "Очередь модерации через админ-панель", icon: Flag, url: "monopoly.maxim.app/reports", width: 475, height: 689 },
  { src: "/mono-6-game.png", title: "Игра", subtitle: "Игровое поле, кубики, чат в реальном времени", icon: Dices, url: "monopoly.maxim.app/game", width: 1600, height: 833 },
  { src: "/mono-7-end.png", title: "Финал", subtitle: "Рейтинг, опыт, награды, таблица игроков", icon: Crown, url: "monopoly.maxim.app/results", width: 548, height: 903 },
];

function ScreenshotShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y0 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
        {/* Profile */}
        <motion.div
          style={{ y: y0 }}
          className="col-span-2 md:col-span-7"
        >
          <Reveal y={60}>
            <div data-cursor="view" onClick={() => setActive(0)}>
              <BrowserFrame
                src={shots[0].src}
                alt={shots[0].subtitle}
                url={shots[0].url}
                width={shots[0].width}
                height={shots[0].height}
                tilt
                glow="rgba(249, 115, 22, 0.20)"
                variant="dark"
                caption={shots[0].subtitle}
                title={shots[0].title}
              />
            </div>
          </Reveal>
        </motion.div>

        {/* Posts */}
        <motion.div
          style={{ y: y1 }}
          className="col-span-2 md:col-span-5"
        >
          <Reveal y={60} delay={0.1}>
            <div data-cursor="view" onClick={() => setActive(1)}>
              <BrowserFrame
                src={shots[1].src}
                alt={shots[1].subtitle}
                url={shots[1].url}
                width={shots[1].width}
                height={shots[1].height}
                tilt
                glow="rgba(249, 115, 22, 0.20)"
                variant="dark"
                caption={shots[1].subtitle}
                title={shots[1].title}
              />
            </div>
          </Reveal>
        </motion.div>

        {/* BP - full width */}
        <motion.div
          style={{ y: y2 }}
          className="col-span-2 md:col-span-12"
        >
          <Reveal y={60}>
            <div data-cursor="view" onClick={() => setActive(2)}>
              <BrowserFrame
                src={shots[2].src}
                alt={shots[2].subtitle}
                url={shots[2].url}
                width={shots[2].width}
                height={shots[2].height}
                tilt
                glow="rgba(249, 115, 22, 0.22)"
                variant="dark"
                caption={shots[2].subtitle}
                title={shots[2].title}
                maxHeight={560}
              />
            </div>
          </Reveal>
        </motion.div>

        {/* Friends + Reports + End */}
        <motion.div
          style={{ y: y3 }}
          className="col-span-2 md:col-span-5"
        >
          <Reveal y={60}>
            <div data-cursor="view" onClick={() => setActive(3)}>
              <BrowserFrame
                src={shots[3].src}
                alt={shots[3].subtitle}
                url={shots[3].url}
                width={shots[3].width}
                height={shots[3].height}
                tilt
                glow="rgba(249, 115, 22, 0.20)"
                variant="dark"
                caption={shots[3].subtitle}
                title={shots[3].title}
                maxHeight={500}
              />
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          style={{ y: y1 }}
          className="col-span-1 md:col-span-3"
        >
          <Reveal y={60} delay={0.1}>
            <div data-cursor="view" onClick={() => setActive(4)}>
              <BrowserFrame
                src={shots[4].src}
                alt={shots[4].subtitle}
                url={shots[4].url}
                width={shots[4].width}
                height={shots[4].height}
                tilt
                glow="rgba(249, 115, 22, 0.20)"
                variant="dark"
                caption={shots[4].subtitle}
                title={shots[4].title}
              />
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          style={{ y: y0 }}
          className="col-span-1 md:col-span-4"
        >
          <Reveal y={60} delay={0.15}>
            <div data-cursor="view" onClick={() => setActive(6)}>
              <BrowserFrame
                src={shots[6].src}
                alt={shots[6].subtitle}
                url={shots[6].url}
                width={shots[6].width}
                height={shots[6].height}
                tilt
                glow="rgba(249, 115, 22, 0.20)"
                variant="dark"
                caption={shots[6].subtitle}
                title={shots[6].title}
              />
            </div>
          </Reveal>
        </motion.div>

        {/* Game - full width */}
        <motion.div
          style={{ y: y2 }}
          className="col-span-2 md:col-span-12"
        >
          <Reveal y={60}>
            <div data-cursor="view" onClick={() => setActive(5)}>
              <BrowserFrame
                src={shots[5].src}
                alt={shots[5].subtitle}
                url={shots[5].url}
                width={shots[5].width}
                height={shots[5].height}
                tilt
                glow="rgba(249, 115, 22, 0.22)"
                variant="dark"
                caption={shots[5].subtitle}
                title={shots[5].title}
                maxHeight={560}
              />
            </div>
          </Reveal>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            index={active}
            onClose={() => setActive(null)}
            onNav={(dir) =>
              setActive((i) =>
                i === null ? i : (i + dir + shots.length) % shots.length
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  const shot = shots[index];
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
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        aria-label="Предыдущее"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
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
          <img
            src={shot.src}
            alt={shot.subtitle}
            className="max-h-[80vh] w-full object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
              <shot.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                {shot.title}
              </div>
              <div className="text-[16px] font-semibold">{shot.subtitle}</div>
            </div>
          </div>
          <div className="text-[12px] font-mono text-white/50">
            {index + 1} / {shots.length}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MonopolyGame() {
  return (
    <section id="monopoly" className="relative py-28 md:py-40 bg-secondary/40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-black/20" />
            <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
              Проект · 02
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-md px-3 py-1 text-[12px] font-medium text-muted-foreground mb-6">
            <Gamepad2 className="h-3.5 w-3.5 text-orange-500" />
            Игра-сайт «Монополия»
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance max-w-4xl">
            Игра-сайт «Монополия» с{" "}
            <span className="text-gradient-accent">максимальной защитой</span> и
            социальной экосистемой.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-3xl text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
            Полноценный игровой веб-проект: профиль с лентой и видео-баннером,
            посты, платный и бесплатный Battle Pass с ежедневными алгоритмическими
            заданиями, друзья с E2E-шифрованной перепиской, система жалоб,
            игровое поле и экран финала. Я написал игру с нуля и заложил под неё
            многослойную безопасность.
          </p>
        </Reveal>

        {/* Daily algorithm highlight */}
        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white shadow-premium hover-lift">
              <Clock className="h-6 w-6 mb-3" />
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1">
                Ежедневно
              </div>
              <div className="text-[18px] font-semibold leading-tight">
                Задания обновляются в 11:00
              </div>
              <div className="mt-2 text-[13px] text-white/80">
                Алгоритм каждый день генерирует уникальный набор — повторений нет
              </div>
            </div>
            <div className="rounded-3xl bg-black p-6 text-white shadow-premium hover-lift">
              <Lock className="h-6 w-6 mb-3 text-emerald-400" />
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-1">
                Переписка
              </div>
              <div className="text-[18px] font-semibold leading-tight">
                End-to-End шифрование
              </div>
              <div className="mt-2 text-[13px] text-white/60">
                Сервер видит только шифр-текст, ключи — на устройствах
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 text-foreground border border-black/[0.06] shadow-apple hover-lift">
              <Trophy className="h-6 w-6 mb-3 text-orange-500" />
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Battle Pass
              </div>
              <div className="text-[18px] font-semibold leading-tight">
                Free + Premium · 30 уровней
              </div>
              <div className="mt-2 text-[13px] text-muted-foreground">
                Дорожки наград для всех и для Premium-игроков
              </div>
            </div>
          </div>
        </Reveal>

        {/* Screenshot showcase */}
        <Reveal delay={0.1}>
          <div className="mt-16 mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Скриншоты проекта
              </div>
              <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-semibold tracking-[-0.02em]">
                Семь экранов одной игры
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[12px] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Кликни — откроется в полный экран
            </div>
          </div>
        </Reveal>

        <ScreenshotShowcase />

        {/* Features */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-black/20" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
                Возможности
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] mb-10">
              Не просто игра — целая социальная платформа
            </h3>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-apple transition-all duration-500 hover:shadow-premium hover:-translate-y-1"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/0 to-amber-500/0 transition-all duration-700 group-hover:from-orange-500/10 group-hover:to-amber-500/10" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 ring-1 ring-orange-100 transition-all duration-500 group-hover:from-orange-600 group-hover:to-amber-500 group-hover:text-white group-hover:ring-transparent">
                    <f.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-[15.5px] font-semibold tracking-tight mb-2">
                    {f.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-muted-foreground mb-3">
                    {f.text}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.points.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>

        {/* Security terms */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-black/20" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
                Безопасность
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] mb-10">
              Семь слоёв защиты — простым языком
            </h3>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
            {terms.map((t) => (
              <div
                key={t.term}
                className="group relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-apple transition-all duration-500 hover:shadow-premium"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100 transition-all duration-500 group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:ring-transparent">
                    <t.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1.5">
                      <h4 className="text-[16px] font-semibold tracking-tight">
                        {t.term}
                      </h4>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {t.short}
                      </span>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                      {t.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Хочу так же защитить свой сайт
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
