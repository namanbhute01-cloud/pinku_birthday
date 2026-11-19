import type { ReactNode } from "react";
import { cx } from "../utils/cx";

interface PageHeaderProps {
  chapterNumber: string;
  eyebrow?: string;
  title: string;
  deck?: string;
  children?: ReactNode;
  className?: string;
}

/** The editorial masthead shared by the content chapters. */
export function PageHeader({
  chapterNumber,
  eyebrow,
  title,
  deck,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cx("page-header", className)}>
      <p className="page-header__index">
        <span>Chapter {chapterNumber}</span>
        <span className="page-header__rule" aria-hidden="true" />
        {eyebrow ? <span>{eyebrow}</span> : null}
      </p>
      <div className="page-header__grid">
        <h1>{title}</h1>
        {deck ? <p className="page-header__deck">{deck}</p> : null}
      </div>
      {children}
    </header>
  );
}
