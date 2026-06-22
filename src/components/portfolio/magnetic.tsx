"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function Magnetic({
  children,
  className,
  strength = 0.4,
  as = "div",
  href,
  target,
  rel,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx * strength);
    y.set(my * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    ref: ref as never,
    style: { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className,
    onClick,
  };

  if (as === "a") {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    );
  }
  if (as === "button") {
    return (
      <motion.button type="button" {...motionProps}>
        {children}
      </motion.button>
    );
  }
  return <motion.div {...motionProps}>{children}</motion.div>;
}
