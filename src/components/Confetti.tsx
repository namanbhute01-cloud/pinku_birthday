import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

const COLORS = ["#813f48", "#b99561", "#7a8066", "#e7d4b7", "#f8f1e6", "#a4625f"];
const PIECE_COUNT = 54;

// Deterministic pieces so the effect is the same on every visit.
const pieces = Array.from({ length: PIECE_COUNT }, (_, index) => {
  const rand = (seed: number) => {
    const value = Math.sin(seed * 124.71 + 17.3) * 43758.5453;
    return value - Math.floor(value);
  };
  return {
    left: 4 + rand(index + 1) * 92,
    delay: rand(index + 10) * 1.8,
    duration: 3.8 + rand(index + 20) * 2.8,
    drift: (rand(index + 30) - 0.5) * 240,
    rotate: rand(index + 40) * 900 - 450,
    size: 6 + rand(index + 50) * 7,
    color: COLORS[index % COLORS.length],
    round: index % 4 === 0,
  };
});

/** Lightweight, decorative celebratory confetti. No audio, no dependencies. */
export function Confetti({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  if (!active || reduceMotion) return null;

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className={`confetti__piece${piece.round ? " confetti__piece--round" : ""}`}
          style={
            {
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: `${piece.size * (piece.round ? 1 : 1.8)}px`,
              background: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              "--drift": `${piece.drift}px`,
              "--spin": `${piece.rotate}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
