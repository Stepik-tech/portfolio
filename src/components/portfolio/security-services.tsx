"use client";

import { Reveal, Stagger } from "./reveal";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileLock2,
  Activity,
  Bug,
  Network,
  ScrollText,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Bug,
    title: "Аудит уязвимостей",
    text: "Проверяю сайт на OWASP Top-10: SQL/XSS/CSRF-инъекции, небезопасные сессии, утечки в логах, открытые эндпоинты. Отчёт с приоритетами фиксов.",
  },
  {
    icon: KeyRound,
    title: "JWT-авторизация",
    text: "Внедряю токенную модель с короткими access-токенами и refresh-процедурой. Хранение в httpOnly-cookie, ротация, отзыв скомпрометированных сессий.",
  },
  {
    icon: Lock,
    title: "E2E-шифрование переписки",
    text: "Поднимаю end-to-end шифрование для личных сообщений: генерация ключей на клиенте, обмен через сервер, прямой секрет. Сервер не видит plaintext.",
  },
  {
    icon: FileLock2,
    title: "Шифрование базы данных",
    text: "Шифрую чувствительные поля на уровне приложения (AES-256-GCM), пароли — bcrypt с уникальным salt. Шифрование тома на уровне сервера.",
  },
  {
    icon: Network,
    title: "Анти-парсинг и rate-limit",
    text: "Защищаю контент от массового скрейпинга: rate-limit по IP и пользователю, honeypot-поля, проверка заголовков, динамические токены в формах.",
  },
  {
    icon: Activity,
    title: "WAF и CSP",
    text: "Подключаю Web Application Firewall на границе. Настраиваю Content Security Policy, HSTS, X-Frame-Options, X-Content-Type-Options — заголовки, которые делают атаки дороже.",
  },
  {
    icon: ScrollText,
    title: "Аудит-логи действий",
    text: "Внедряю систему логирования: кто, когда, что изменил. Поиск, фильтры, экспорт, оповещения о подозрительной активности в реальном времени.",
  },
  {
    icon: ShieldCheck,
    title: "Полная защита «под ключ»",
    text: "Собираю всё в единую систему безопасности: аудит → фиксы → мониторинг → регламент реакции. Сайт, который вы можете оставить без присмотра.",
  },
];

export function SecurityServices() {
  return (
    <section id="security" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:gap-20 lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-black/20" />
                <span className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
                  Услуга
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-md px-3 py-1 text-[12px] font-medium text-muted-foreground mb-6">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Безопасность под ваш сайт
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                Я могу{" "}
                <span className="text-gradient-accent">настроить безопасность</span>{" "}
                для вашего сайта.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
                Если у вас уже есть сайт — я приду не «переписать всё с нуля», а
                закрыть дыры. Проведу аудит, внедрю недостающие слои защиты,
                налажу мониторинг и оставлю регламент. Вы получаете не просто
                отчёт, а работающую систему безопасности, которая остаётся с
                сайтом.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-3xl bg-black p-7 text-white shadow-premium">
                <div className="text-[12px] uppercase tracking-[0.2em] text-white/50 mb-3">
                  Что вы получаете
                </div>
                <ul className="space-y-2.5 text-[14.5px]">
                  {[
                    "Аудит-отчёт с приоритетами",
                    "Внедрённые слои защиты (код + инфраструктура)",
                    "Мониторинг и оповещения",
                    "Регламент реакции на инциденты",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[11px]">
                        ✓
                      </span>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://t.me/fcocietyI"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-black transition-all duration-300 hover:gap-3 hover:bg-neutral-200"
                >
                  Обсудить аудит
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative h-full rounded-3xl border border-black/[0.06] bg-white p-6 shadow-apple transition-all duration-500 hover:shadow-premium hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-all duration-500 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-transparent">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-[15.5px] font-semibold tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
