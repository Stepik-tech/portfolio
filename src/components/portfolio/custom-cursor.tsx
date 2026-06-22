"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "view">("default");

  const dotX = useSpring(x, { stiffness: 1000, damping: 40, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 40, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 200, damping: 25, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      const viewer = target.closest('[data-cursor="view"]');
      if (viewer) setVariant("view");
      else if (interactive) setVariant("hover");
      else setVariant("default");
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-black"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          scale: variant === "default" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Ring */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-black/30 backdrop-blur-sm"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: variant === "view" ? 80 : variant === "hover" ? 56 : 36,
          height: variant === "view" ? 80 : variant === "hover" ? 56 : 36,
          backgroundColor:
            variant === "view" ? "rgba(0,0,0,0.85)" : variant === "hover" ? "rgba(0,0,0,0.04)" : "transparent",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {variant === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-semibold uppercase tracking-wider text-white"
          >
            Смотреть
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
