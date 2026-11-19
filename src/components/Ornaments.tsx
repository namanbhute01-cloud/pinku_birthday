import { cx } from "../utils/cx";

/** A quiet ink botanical used as a non-essential margin ornament. */
export function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      className={cx("botanical", className)}
      viewBox="0 0 160 260"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M79 250c-4-61 2-120 23-174 7-18 14-36 19-60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M101 76c-20 4-34-4-43-17 19-7 34-1 43 17ZM94 112c-21 0-34-9-40-24 21-3 35 4 40 24ZM87 151c-21-1-33-11-38-27 21-2 35 6 38 27ZM81 190c-20 0-32-10-36-25 20-2 33 6 36 25Z"
        fill="currentColor"
        fillOpacity=".13"
        stroke="currentColor"
        strokeWidth=".8"
        strokeLinejoin="round"
      />
      <path
        d="M116 71c17 1 28-7 34-20-17-3-28 3-34 20ZM107 108c18-2 31-11 37-25-18-2-30 5-37 25ZM99 146c18-1 30-10 35-25-18-1-30 6-35 25ZM92 187c17-1 29-9 34-23-17-2-29 5-34 23Z"
        fill="currentColor"
        fillOpacity=".09"
        stroke="currentColor"
        strokeWidth=".8"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="23" r="3.5" fill="currentColor" fillOpacity=".35" />
      <circle cx="63" cy="220" r="2.5" fill="currentColor" fillOpacity=".25" />
    </svg>
  );
}

/** A tiny four-point ink star. */
export function InkStar({ className }: { className?: string }) {
  return (
    <svg
      className={cx("ink-star", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 1.5c.8 6.9 3.6 9.7 10.5 10.5-6.9.8-9.7 3.6-10.5 10.5C11.2 15.6 8.4 12.8 1.5 12 8.4 11.2 11.2 8.4 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A soft double-circle mark used as a section divider. */
export function CircleMark({ className }: { className?: string }) {
  return (
    <svg className={cx("circle-mark", className)} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth=".75" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth=".5" strokeDasharray="1 4" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}
