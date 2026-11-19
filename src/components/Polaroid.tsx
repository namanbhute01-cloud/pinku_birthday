import type { CSSProperties } from "react";
import { ArchiveImage } from "./ArchiveImage";
import { Placeholder } from "./Placeholder";
import { WashiTape } from "./WashiTape";
import { cx } from "../utils/cx";
import type { PhotoMemory } from "../types/content";

const TILTS = [-2.4, 1.8, -1.1, 2.6, -1.8, 1.2, 2.2, -0.8, 1.5, -2, 0.9, -1.4];

interface PolaroidProps {
  memory: PhotoMemory;
  index?: number;
  onOpen?: () => void;
  className?: string;
  eager?: boolean;
}

/**
 * A Polaroid frame that becomes a button when an onOpen handler is supplied.
 * The photo frame is the same in both cases, so the wall and any static
 * Polaroid share one visual language.
 */
export function Polaroid({ memory, index = 0, onOpen, className, eager = false }: PolaroidProps) {
  const tilt = TILTS[index % TILTS.length];
  const label = memory.title || "Untitled memory";
  const style = { "--tilt": `${tilt}deg` } as CSSProperties;

  const inner = (
    <>
      <WashiTape
        className="polaroid__tape"
        tone={index % 3 === 0 ? "brass" : index % 3 === 1 ? "olive" : "burgundy"}
        style={{ transform: `rotate(${index % 2 === 0 ? -5 : 4}deg)` }}
      />
      <span className="polaroid__photo">
        <ArchiveImage
          src={memory.image}
          alt={memory.alt || memory.title}
          label="Photograph"
          eager={eager}
          objectPosition={memory.imagePosition}
        />
      </span>
      <span className="polaroid__caption">
        {memory.title ? memory.title : <Placeholder>Add a memory title</Placeholder>}
      </span>
      {memory.date ? (
        <span className="polaroid__date">{memory.date}</span>
      ) : (
        <span className="polaroid__date polaroid__date--empty">date</span>
      )}
      <div className="polaroid__decor">
        <div className="polaroid__stitched"></div>
        <div className="polaroid__washi-accent"></div>
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button
        type="button"
        className={cx("polaroid", "polaroid--interactive", className)}
        style={style}
        onClick={onOpen}
        aria-label={`Open memory: ${label}`}
      >
        {inner}
      </button>
    );
  }

  return (
    <figure className={cx("polaroid", className)} style={style}>
      {inner}
    </figure>
  );
}
