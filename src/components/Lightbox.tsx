import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "./Modal";
import { ArchiveImage } from "./ArchiveImage";
import { Placeholder } from "./Placeholder";
import type { PhotoMemory } from "../types/content";

type PhotoTurn = "forward" | "backward";

interface LightboxProps {
  memories: PhotoMemory[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const CATEGORY_LABELS: Record<PhotoMemory["category"], string> = {
  funny: "Funny",
  emotional: "Emotional",
  random: "Random",
  favourite: "Favourite",
};

/**
 * Memory detail view with keyboard arrow navigation. All real content comes
 * from `src/data/memories.ts`; empty fields show writing placeholders.
 */
export function Lightbox({ memories, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < memories.length;
  const memory = isOpen ? memories[activeIndex] : null;
  const safeIndex = activeIndex ?? 0;
  const hasPrevious = isOpen && safeIndex > 0;
  const hasNext = isOpen && safeIndex < memories.length - 1;
  const reduceMotion = useReducedMotion();
  const [turn, setTurn] = useState<PhotoTurn>("forward");

  const navigateTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= memories.length || index === safeIndex) return;
      setTurn(index > safeIndex ? "forward" : "backward");
      onNavigate(index);
    },
    [memories.length, onNavigate, safeIndex],
  );

  useEffect(() => {
    if (!isOpen) setTurn("forward");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleArrow = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && hasPrevious) {
        navigateTo(safeIndex - 1);
      } else if (event.key === "ArrowRight" && hasNext) {
        navigateTo(safeIndex + 1);
      }
    };
    document.addEventListener("keydown", handleArrow);
    return () => document.removeEventListener("keydown", handleArrow);
  }, [hasNext, hasPrevious, isOpen, navigateTo, safeIndex]);

  const pageInitial = reduceMotion
    ? false
    : {
        opacity: 0.35,
        x: turn === "forward" ? 28 : -28,
        rotateY: turn === "forward" ? -13 : 13,
      };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      labelledBy="memory-dialog-title"
      className="memory-modal"
      closeLabel="Close memory"
    >
      {memory ? (
        <div className="memory-modal__layout">
          <motion.div
            key={`photo-${memory.id}`}
            className="memory-modal__photo"
            initial={pageInitial}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              transformPerspective: 1500,
              transformOrigin: turn === "forward" ? "left center" : "right center",
            }}
          >
            <ArchiveImage
              src={memory.image}
              alt={memory.alt || memory.title || "Archived photograph"}
              label="Photograph"
              eager
              objectPosition={memory.imagePosition}
            />
            <div className="photo-frame">
              <div className="photo-frame__matte"></div>
              <div className="photo-frame__stitched"></div>
              <div className="photo-frame__washi"></div>
            </div>
          </motion.div>
          <div className="memory-modal__content" data-autofocus tabIndex={-1}>
            <motion.div
              key={`copy-${memory.id}`}
              className="memory-modal__copy"
              initial={reduceMotion ? false : { opacity: 0.55, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.34,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <p className="eyebrow">
                <span>{CATEGORY_LABELS[memory.category]}</span>
                {memory.date ? <span className="eyebrow__separator"> · </span> : null}
                {memory.date ? <span>{memory.date}</span> : null}
              </p>
              <h2 id="memory-dialog-title">
                {memory.title || <Placeholder>Add a memory title</Placeholder>}
              </h2>
              {memory.caption ? (
                <p className="memory-modal__caption">{memory.caption}</p>
              ) : (
                <p className="memory-modal__caption">
                  <Placeholder>Add a short caption</Placeholder>
                </p>
              )}
              <div className="memory-modal__rule" aria-hidden="true" />
              {memory.story ? (
                <p className="memory-modal__story">{memory.story}</p>
              ) : (
                <p className="memory-modal__story">
                  <Placeholder>Your story will go here.</Placeholder>
                </p>
              )}
              {memory.tags && memory.tags.length > 0 ? (
                <ul className="tag-list" aria-label="Memory tags">
                  {memory.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
            <div className="memory-modal__nav">
              <button
                type="button"
                className="icon-button"
                onClick={() => navigateTo(safeIndex - 1)}
                disabled={!hasPrevious}
                aria-label="Previous memory"
                aria-keyshortcuts="ArrowLeft"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span className="memory-modal__count" aria-live="polite">
                {safeIndex + 1} / {memories.length}
              </span>
              <button
                type="button"
                className="icon-button"
                onClick={() => navigateTo(safeIndex + 1)}
                disabled={!hasNext}
                aria-label="Next memory"
                aria-keyshortcuts="ArrowRight"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
