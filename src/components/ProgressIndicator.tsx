import { cx } from "../utils/cx";

interface ProgressIndicatorProps {
  /** Zero-based index in the reading sequence. */
  current: number;
  total: number;
  className?: string;
  /** Hide the numeral and show only the bar. */
  compact?: boolean;
}

/** Shared reading progress: a visible bar plus an accessible current value. */
export function ProgressIndicator({ current, total, className, compact = false }: ProgressIndicatorProps) {
  const safeCurrent = Math.max(0, Math.min(current, total - 1));
  const percentage = total > 0 ? ((safeCurrent + 1) / total) * 100 : 0;
  const label = `Reading progress: chapter ${safeCurrent + 1} of ${total}`;

  return (
    <div
      className={cx("progress", compact && "progress--compact", className)}
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={safeCurrent + 1}
    >
      <span className="progress__track" aria-hidden="true">
        <span className="progress__fill" style={{ width: `${percentage}%` }} />
        <span className="progress__ticks" />
      </span>
      {!compact ? (
        <span className="progress__count" aria-hidden="true">
          {String(safeCurrent + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      ) : null}
    </div>
  );
}
