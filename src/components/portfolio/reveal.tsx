"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: easeApple }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeApple },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.div>
  );
}

export { easeApple };
