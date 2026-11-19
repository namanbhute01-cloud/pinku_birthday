import type { CSSProperties } from "react";
import { cx } from "../utils/cx";

interface WashiTapeProps {
  className?: string;
  tone?: "brass" | "olive" | "burgundy" | "ink";
  style?: CSSProperties;
}

/** Purely decorative washi tape. Always hidden from assistive technology. */
export function WashiTape({ className, tone = "brass", style }: WashiTapeProps) {
  return (
    <span
      className={cx("washi-tape", `washi-tape--${tone}`, className)}
      style={style}
      aria-hidden="true"
    />
  );
}
