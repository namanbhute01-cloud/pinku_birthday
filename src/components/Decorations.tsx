import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";

interface StickerClusterProps {
  children: ReactNode;
  className?: string;
}

/** A small, deliberately imperfect group of cut-out stickers. */
export function StickerCluster({ children, className }: StickerClusterProps) {
  return (
    <span className={cx("sticker-cluster", className)} aria-hidden="true">
      {children}
    </span>
  );
}

interface PaperClipProps {
  className?: string;
  rotate?: number;
}

/** A wire paper clip, used to fasten loose pages to the scrapbook. */
export function PaperClip({ className, rotate = 0 }: PaperClipProps) {
  return (
    <span
      className={cx("paper-clip", className)}
      style={{ "--clip-rotate": `${rotate}deg` } as CSSProperties}
      aria-hidden="true"
    />
  );
}

/** A loose, hand-drawn heart. */
export function HeartDoodle({ className }: { className?: string }) {
  return (
    <svg
      className={cx("doodle", "heart-doodle", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.2 20.4C9.1 18.3 3.2 14 2.4 9.9 1.7 6.2 4 4 6.6 4c2.1 0 3.9 1.3 5.1 3.1C12.8 5 14.6 3.9 16.6 4c3.1.1 4.7 2.9 3.7 6.2-1 3.6-5.2 7.6-8.1 10.2Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6 19.7c2.8-2.4 6.3-6 7.1-9.1.8-2.7-.4-4.9-2.8-5.2"
        stroke="currentColor"
        strokeWidth=".7"
        strokeLinecap="round"
        opacity=".45"
      />
    </svg>
  );
}

/** A looping hand-drawn arrow for margin notes and "look here" moments. */
export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg
      className={cx("doodle", "arrow-doodle", className)}
      viewBox="0 0 38 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 28c5.8-10.8 14.1-17.4 26.4-19.8"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
      <path
        d="m22.7 4.2 7.2 3.6-5.7 5.5"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Three quick pen strokes, like a scrapbooker marking a favourite. */
export function SparkDoodle({ className }: { className?: string }) {
  return (
    <svg
      className={cx("doodle", "spark-doodle", className)}
      viewBox="0 0 34 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 8 5M12 19l1.6-9M18 18l2-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M25 4v7M27.5 5.5h-5" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
    </svg>
  );
}
