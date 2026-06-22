"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  src: string;
  alt: string;
  title?: string;
  url?: string;
  badge?: ReactNode;
  className?: string;
  /** Natural width/height to compute aspect ratio */
  width: number;
  height: number;
  /** Max height in px to prevent very tall screenshots */
  maxHeight?: number;
  /** Enable 3D tilt on hover */
  tilt?: boolean;
  /** Glow color behind the frame */
  glow?: string;
  /** Dark or light frame */
  variant?: "dark" | "light";
  /** Click handler */
  onClick?: () => void;
  /** Show bottom caption inside frame */
  caption?: string;
}

export function BrowserFrame({
  src,
  alt,
  title,
  url = "monopoly.maxim.app",
  badge,
  className,
  width,
  height,
  maxHeight,
  tilt = true,
  glow = "rgba(0, 113, 227, 0.18)",
  variant = "dark",
  onClick,
  caption,
}: BrowserFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);

  const sRx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sRy = useSpring(ry, { stiffness: 200, damping: 20 });
  const sGx = useSpring(gx, { stiffness: 150, damping: 20 });
  const sGy = useSpring(gy, { stiffness: 150, damping: 20 });

  const glowX = useTransform(sGx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sGy, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: MouseEvent) => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 8);
    gx.set(px);
    gy.set(py);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(0);
    gy.set(0);
  };

  const aspectRatio = `${width} / ${height}`;
  const isDark = variant === "dark";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        rotateX: tilt ? sRx : 0,
        rotateY: tilt ? sRy : 0,
        transformPerspective: 1200,
      }}
      className={cn(
        "group relative rounded-2xl transition-shadow duration-500",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Glow behind */}
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, ${glow} 0%, transparent 65%)`
          ),
        }}
      />

      {/* Frame */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border shadow-premium-lg",
          isDark
            ? "bg-neutral-950 border-white/[0.08]"
            : "bg-white border-black/[0.08]"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center gap-2 border-b px-4 py-2.5",
            isDark
              ? "border-white/10 bg-neutral-900"
              : "border-black/[0.06] bg-neutral-50"
          )}
        >
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div
            className={cn(
              "ml-2 flex-1 truncate rounded-md px-3 py-1 text-[11px] font-mono",
              isDark
                ? "bg-neutral-800 text-neutral-400"
                : "bg-white text-muted-foreground"
            )}
          >
            {url}
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        {/* Image — natural aspect ratio, no cropping */}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            isDark ? "bg-black" : "bg-neutral-50"
          )}
          style={{
            aspectRatio,
            maxHeight: maxHeight ? `${maxHeight}px` : undefined,
          }}
        >
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
            style={{
              transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          {/* Hover zoom via group-hover */}
          <style>{`
            .group:hover img { transform: scale(1.03); }
          `}</style>

          {/* Caption overlay */}
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-12">
              <div className="text-[13px] sm:text-[14px] font-semibold text-white leading-tight">
                {caption}
              </div>
            </div>
          )}

          {title && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                {title}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
