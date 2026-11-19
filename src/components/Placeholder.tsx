import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../utils/cx";

interface PlaceholderProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

/**
 * A calm, intentional writing placeholder shown only when a personal field is
 * still empty. It reads as part of the scrapbook rather than broken UI.
 */
export function Placeholder({ children = "Your words will go here.", className, ...rest }: PlaceholderProps) {
  return (
    <span className={cx("placeholder", className)} {...rest}>
      {children}
    </span>
  );
}
