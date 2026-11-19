import type { ReactNode } from "react";
import { Feather } from "lucide-react";
import { PaperSheet } from "./PaperSheet";
import { cx } from "../utils/cx";

interface EmptyStateProps {
  kicker?: string;
  title: string;
  children?: ReactNode;
  /** Gently tells the archive owner where the content lives. */
  fileHint?: string;
  className?: string;
}

/** A composed empty page that looks intentional rather than unfinished. */
export function EmptyState({
  kicker = "A blank page, for now",
  title,
  children,
  fileHint,
  className,
}: EmptyStateProps) {
  return (
    <PaperSheet className={cx("empty-state", className)}>
      <span className="empty-state__ornament" aria-hidden="true">
        <Feather size={25} strokeWidth={1.1} />
      </span>
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {children ? <div className="empty-state__copy">{children}</div> : null}
      {fileHint ? (
        <p className="content-hint">
          <span>To add your own content, open</span>
          <code>{fileHint}</code>
        </p>
      ) : null}
    </PaperSheet>
  );
}
