import { useMemo, useState } from "react";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Lightbox } from "../../components/Lightbox";
import { photoMemories } from "../../data/memories";
import type { ChapterPageProps } from "../../app/ChapterRoute";

interface StarPosition {
  x: number;
  y: number;
}

/** Stable golden-angle positions keep the sky consistent on every visit. */
function getMemoryPositions(count: number): StarPosition[] {
  if (count === 1) return [{ x: 50, y: 50 }];
  return Array.from({ length: count }, (_, index) => {
    const angle = ((-90 + index * 137.508) * Math.PI) / 180;
    const radius = 14 + 30 * Math.sqrt((index + 0.6) / count);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle) * 0.84;
    return {
      x: Math.min(91, Math.max(9, x)),
      y: Math.min(88, Math.max(12, y)),
    };
  });
}

function seeded(index: number): number {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const SKY_STARS = Array.from({ length: 74 }, (_, index) => ({
  x: seeded(index + 1) * 100,
  y: seeded(index + 80) * 100,
  size: 1 + seeded(index + 140) * 1.7,
  opacity: 0.16 + seeded(index + 220) * 0.5,
}));

/** Chapter 05 — the same photographs, laid out as a deterministic night sky. */
export function ConstellationPage({ chapter }: ChapterPageProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const positions = useMemo(() => getMemoryPositions(photoMemories.length), []);

  return (
    <div className="chapter-page constellation-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="A second way to see"
        title={chapter.title}
        deck={chapter.deck}
      />

      <section className="constellation-panel" aria-labelledby="constellation-heading">
        <div className="constellation-panel__head">
          <p className="eyebrow eyebrow--light">The night index</p>
          <h2 id="constellation-heading">
            {photoMemories.length > 0
              ? "A sky made of memories."
              : "A sky waiting to be filled."}
          </h2>
          <p>
            {photoMemories.length > 0
              ? "Every light below belongs to a photograph from the wall. Choose one, or use the index underneath."
              : "When photographs are added to the archive, each one becomes a star here too."}
          </p>
        </div>

        <div className="star-map" role="group" aria-label="Memory constellation">
          <div className="star-map__sky" aria-hidden="true">
            {SKY_STARS.map((star, index) => (
              <span
                key={index}
                className="sky-star"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>

          <div className="star-map__constellation" aria-hidden="true">
            <span className="constellation-line constellation-line--one" />
            <span className="constellation-line constellation-line--two" />
            <span className="constellation-line constellation-line--three" />
          </div>

          {photoMemories.length > 0 ? (
            <svg
              className="constellation-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {positions.slice(1).map((position, index) => {
                const previous = positions[index];
                return (
                  <line
                    key={index}
                    x1={previous.x}
                    y1={previous.y}
                    x2={position.x}
                    y2={position.y}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
          ) : null}

          {photoMemories.length > 0 ? (
            photoMemories.map((memory, index) => (
              <button
                key={memory.id}
                type="button"
                className="star-node"
                style={{
                  left: `${positions[index].x}%`,
                  top: `${positions[index].y}%`,
                  ["--star-delay" as string]: `${index * 0.35}s`,
                }}
                onClick={() => setActiveIndex(index)}
                aria-label={`Open memory: ${memory.title || `memory ${index + 1}`}`}
              >
                <span className="star-node__halo" aria-hidden="true" />
                <span className="star-node__core" aria-hidden="true" />
                <span className="star-node__label" aria-hidden="true">
                  {memory.title || `Memory ${String(index + 1).padStart(2, "0")}`}
                </span>
              </button>
            ))
          ) : (
            <div className="constellation-empty">
              <p className="eyebrow eyebrow--light">Nothing plotted yet</p>
              <h3>These stars are still unnamed.</h3>
              <p>
                Add photographs and their stories in{" "}
                <code>src/data/memories.ts</code>. Each memory will appear here as a
                point of light.
              </p>
              <span className="constellation-empty__mark" aria-hidden="true">
                <MousePointer2 size={18} strokeWidth={1.2} />
              </span>
            </div>
          )}
        </div>

        <div className="star-index">
          <div className="star-index__head">
            <div>
              <p className="eyebrow eyebrow--light">The same sky, indexed</p>
              <h3>Or browse the memories by list</h3>
            </div>
            {photoMemories.length > 0 ? (
              <p>{photoMemories.length} in the archive</p>
            ) : null}
          </div>

          {photoMemories.length > 0 ? (
            <ol className="star-index__list">
              {photoMemories.map((memory, index) => (
                <li key={memory.id}>
                  <button
                    type="button"
                    className="star-index__item"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="star-index__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="star-index__body">
                      <span className="star-index__title">
                        {memory.title || "Untitled memory"}
                      </span>
                      <span className="star-index__caption">
                        {memory.caption || memory.date || "A memory from the archive"}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="star-index__arrow"
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="star-index__empty">
              The list will fill up alongside the sky. Nothing is hidden in the stars
              that is not also available here.
            </p>
          )}
        </div>
      </section>

      <Lightbox
        memories={photoMemories}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
