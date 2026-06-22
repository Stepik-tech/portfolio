"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface CubeFace {
  glyph: ReactNode;
  label: string;
  color: string;
  bg: string;
}

const faces: CubeFace[] = [
  {
    glyph: (
      <span className="font-mono text-5xl font-bold">
        <span className="text-blue-600">TS</span>
        <span className="text-orange-500">X</span>
      </span>
    ),
    label: "TypeScript + JSX",
    color: "#3178C6",
    bg: "linear-gradient(135deg, rgba(49,120,198,0.12) 0%, rgba(49,120,198,0.02) 100%)",
  },
  {
    glyph: <span className="font-mono text-5xl font-bold text-yellow-500">JS</span>,
    label: "JavaScript",
    color: "#F7DF1E",
    bg: "linear-gradient(135deg, rgba(247,223,30,0.20) 0%, rgba(247,223,30,0.02) 100%)",
  },
  {
    glyph: <span className="font-mono text-5xl font-bold text-blue-500">CSS</span>,
    label: "CSS3 / Tailwind",
    color: "#1572B6",
    bg: "linear-gradient(135deg, rgba(21,114,182,0.12) 0%, rgba(21,114,182,0.02) 100%)",
  },
  {
    glyph: <span className="font-mono text-6xl font-bold text-cyan-500">⚛</span>,
    label: "React 19",
    color: "#61DAFB",
    bg: "linear-gradient(135deg, rgba(97,218,251,0.18) 0%, rgba(97,218,251,0.02) 100%)",
  },
  {
    glyph: (
      <span className="font-mono text-5xl font-bold">
        <span className="text-blue-500">py</span>
      </span>
    ),
    label: "Python 3",
    color: "#3776AB",
    bg: "linear-gradient(135deg, rgba(55,118,171,0.12) 0%, rgba(255,212,59,0.06) 100%)",
  },
  {
    glyph: <span className="font-mono text-4xl font-bold text-orange-600">&lt;/&gt;</span>,
    label: "HTML5",
    color: "#E34F26",
    bg: "linear-gradient(135deg, rgba(227,79,38,0.14) 0%, rgba(227,79,38,0.02) 100%)",
  },
];

export function RotatingCube() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Rotate the cube based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const size = 200; // px
  const half = size / 2;

  // 6 faces positions for a cube
  const faceTransforms = [
    { transform: `rotateY(0deg) translateZ(${half}px)` }, // front
    { transform: `rotateY(90deg) translateZ(${half}px)` }, // right
    { transform: `rotateY(180deg) translateZ(${half}px)` }, // back
    { transform: `rotateY(-90deg) translateZ(${half}px)` }, // left
    { transform: `rotateX(90deg) translateZ(${half}px)` }, // top
    { transform: `rotateX(-90deg) translateZ(${half}px)` }, // bottom
  ];

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ height: 360, perspective: 1200 }}
    >
      {/* Glow behind cube */}
      <div
        aria-hidden
        className="absolute h-72 w-72 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(0,113,227,0.20) 0%, rgba(0,199,255,0.12) 50%, transparent 70%)",
        }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: size,
          height: size,
        }}
        className="relative"
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-black/[0.08] bg-white/90 backdrop-blur-md shadow-premium"
            style={{
              transform: faceTransforms[i].transform,
              background: face.bg,
            }}
          >
            <div className="mb-3">{face.glyph}</div>
            <div
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: face.color }}
            >
              {face.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Hint */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Скролл — куб вращается
      </div>
    </div>
  );
}
