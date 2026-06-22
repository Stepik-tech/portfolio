"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const springX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    // Only enable on devices with fine pointer (desktops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );
      setIsPointer(Boolean(interactive));
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          x: springX,
          y: springY,
          background:
            "radial-gradient(circle, rgba(0,113,227,0.10) 0%, rgba(0,199,255,0.06) 30%, transparent 70%)",
          scale: isPointer ? 1.15 : 1,
          transition: "scale 0.3s ease",
        }}
      />
    </motion.div>
  );
}
