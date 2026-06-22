"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setVisible(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white text-2xl font-semibold">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                М
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-500"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
            <div className="mt-6 text-[12px] uppercase tracking-[0.3em] text-muted-foreground">
              Максим · Портфолио
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-100">
            <motion.div
              className="h-full bg-black"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
