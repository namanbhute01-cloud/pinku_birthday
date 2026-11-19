import { useEffect, useState, type CSSProperties } from "react";
import { cx } from "../utils/cx";

interface ArchiveImageProps {
  src?: string;
  alt?: string;
  className?: string;
  /** Small caption shown inside the placeholder, e.g. "PHOTOGRAPH". */
  label?: string;
  eager?: boolean;
  style?: CSSProperties;
  /** CSS object-position used when the frame crops the photograph. */
  objectPosition?: string;
}

/**
 * A local photograph that degrades gracefully. Missing files, empty paths and
 * load errors all become a designed archive placeholder — never a broken image.
 */
export function ArchiveImage({
  src,
  alt,
  className,
  label = "Photograph",
  eager = false,
  style,
  objectPosition,
}: ArchiveImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    const accessibleLabel = alt
      ? `${alt} — photograph not added yet`
      : "Photograph placeholder";

    return (
      <span
        className={cx("archive-image", "archive-image--empty", className)}
        role="img"
        aria-label={accessibleLabel}
        style={style}
      >
        <svg className="archive-image__art" viewBox="0 0 240 180" aria-hidden="true">
          <circle cx="120" cy="78" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="120" cy="78" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path
            d="M18 146c28-23 49-18 69-6 22 13 44 10 64-3 20-14 42-17 71 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M120 8v18M120 130v16M73 78H55M185 78h-18M86 44 74 32M154 112l12 12M154 44l12-12M86 112l-12 12"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="archive-image__label">{failed ? "Image not found" : label}</span>
      </span>
    );
  }

  return (
    <span className={cx("archive-image", className)} style={style}>
      <img
        src={src}
        alt={alt ?? ""}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
