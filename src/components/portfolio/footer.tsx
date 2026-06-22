export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
              М
            </span>
            <div>
              <div className="text-[14px] font-semibold tracking-tight">
                Максим
              </div>
              <div className="text-[12.5px] text-muted-foreground">
                Веб-дизайн · Fullstack · Безопасность
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted-foreground">
            <a href="#about" className="transition-colors hover:text-foreground">Обо мне</a>
            <a href="#stack" className="transition-colors hover:text-foreground">Стек</a>
            <a href="#admin" className="transition-colors hover:text-foreground">Админ-панель</a>
            <a href="#monopoly" className="transition-colors hover:text-foreground">Монополия</a>
            <a href="#security" className="transition-colors hover:text-foreground">Безопасность</a>
            <a href="#gallery" className="transition-colors hover:text-foreground">Работы</a>
          </nav>

          <a
            href="https://t.me/fcocietyI"
            target="_blank"
            rel="noreferrer"
            className="text-[13.5px] font-medium text-foreground transition-colors hover:text-blue-600"
          >
            @fcocietyI ↗
          </a>
        </div>

        <div className="mt-10 border-t border-black/[0.05] pt-6 flex flex-col items-start justify-between gap-2 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Максим. Все права защищены.</div>
          <div className="font-mono">
            Сделано вручную · React · TypeScript · Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
