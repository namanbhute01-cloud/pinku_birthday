import type { ReactNode } from "react";
import { cx } from "../utils/cx";

interface HandwrittenNoteProps {
  children: ReactNode;
  className?: string;
  signature?: ReactNode;
}

/** A small piece of handwritten marginalia, used as a non-essential aside. */
export function HandwrittenNote({ children, className, signature }: HandwrittenNoteProps) {
  return (
    <div className={cx("hand-note", className)}>
      <span className="hand-note__rule" aria-hidden="true" />
      <p className="hand-note__copy">{children}</p>
      {signature ? <p className="hand-note__signature">{signature}</p> : null}
    </div>
  );
}
