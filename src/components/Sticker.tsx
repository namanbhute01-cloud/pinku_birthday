import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";

interface StickerProps {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "brass" | "burgundy" | "olive";
  /** Rotation in degrees, applied as a decorative flourish. */
  rotate?: number;
  style?: CSSProperties;
}

/** A cut-out paper sticker. Decorative by design, so never interactive. */
export function Sticker({
  children,
  className,
  tone = "paper",
  rotate = -3,
  style,
}: StickerProps) {
  return (
    <span
      className={cx("sticker", `sticker--${tone}`, className)}
      style={{ "--sticker-rotate": `${rotate}deg`, ...style } as CSSProperties}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
