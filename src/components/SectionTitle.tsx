import type { ReactNode } from "react";

interface SectionTitleProps {
  index: string;
  title: string;
  id?: string;
  children?: ReactNode;
}

/** A small numbered heading used inside the scrapbook chapters. */
export function SectionTitle({ index, title, id, children }: SectionTitleProps) {
  return (
    <div className="section-title">
      <span className="section-title__index" aria-hidden="true">
        {index}
      </span>
      <div>
        <h2 id={id}>{title}</h2>
        {children ? <p className="section-title__note">{children}</p> : null}
      </div>
    </div>
  );
}
