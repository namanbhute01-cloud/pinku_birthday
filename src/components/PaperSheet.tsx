import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";

interface PaperSheetProps {
  children: ReactNode;
  className?: string;
  variant?: "plain" | "ruled" | "kraft";
  as?: "div" | "section" | "article" | "aside";
  style?: CSSProperties;
}

/** A layered sheet of paper with a soft deckled edge and paper shadow. */
export function PaperSheet({
  children,
  className,
  variant = "plain",
  as: Tag = "div",
  style,
}: PaperSheetProps) {
  return (
    <Tag className={cx("paper-sheet", `paper-sheet--${variant}`, className)} style={style}>
      {children}
    </Tag>
  );
}
