import { useMemo, useState } from "react";
import { Camera, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { EmptyState } from "../../components/EmptyState";
import { Lightbox } from "../../components/Lightbox";
import { Polaroid } from "../../components/Polaroid";
import { WashiTape } from "../../components/WashiTape";
import { photoMemories } from "../../data/memories";
import type { ChapterPageProps } from "../../app/ChapterRoute";
import type { MemoryCategory } from "../../types/content";

const CATEGORY_ORDER: MemoryCategory[] = ["funny", "favourite", "emotional", "random"];
const CATEGORY_LABELS: Record<MemoryCategory, string> = {
  funny: "Funny",
  favourite: "Favourites",
  emotional: "Emotional",
  random: "Random",
};

/** Chapter 04 — a filterable wall of photographs with an accessible lightbox. */
export function GalleryPage({ chapter }: ChapterPageProps) {
  const availableCategories = useMemo(
    () =>
      CATEGORY_ORDER.filter((category) =>
        photoMemories.some((memory) => memory.category === category),
      ),
    [],
  );
  const [filter, setFilter] = useState<"all" | MemoryCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleMemories = useMemo(
    () =>
      filter === "all"
        ? photoMemories
        : photoMemories.filter((memory) => memory.category === filter),
    [filter],
  );

  const chooseFilter = (next: "all" | MemoryCategory) => {
    setFilter(next);
    setActiveIndex(null);
  };

  return (
    <div className="chapter-page gallery-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="Photographs & stories"
        title={chapter.title}
        deck={chapter.deck}
      >
        {photoMemories.length > 0 ? (
          <p className="page-header__aside">
            <Camera size={15} strokeWidth={1.5} aria-hidden="true" />
            Open a Polaroid to read what is written behind it.
          </p>
        ) : null}
      </PageHeader>

      {photoMemories.length === 0 ? (
        <div className="gallery-empty">
          <EmptyState
            kicker="The wall is bare"
            title="Photographs will hang here."
            fileHint="src/data/memories.ts"
          >
            <p>
              Add your photographs to <code>public/assets/photos/</code>, then link
              them from the memories file. Every picture can carry a date, a caption
              and the longer story behind it.
            </p>
          </EmptyState>
          <div className="gallery-ghosts" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <div className="polaroid polaroid--ghost" key={index}>
                <WashiTape
                  className="polaroid__tape"
                  tone={index === 1 ? "olive" : "brass"}
                />
                <span className="polaroid__photo polaroid--ghost__photo">
                  <span className="gallery-ghost__mark" />
                </span>
                <span className="ghost-line ghost-line--title" />
                <span className="ghost-line ghost-line--short" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="gallery-toolbar">
            <div className="gallery-filters" role="group" aria-label="Filter photographs">
              <span className="gallery-filters__label">
                <SlidersHorizontal size={14} strokeWidth={1.6} aria-hidden="true" />
                Filter
              </span>
              <button
                type="button"
                className="filter-button"
                aria-pressed={filter === "all"}
                onClick={() => chooseFilter("all")}
              >
                All <span>{photoMemories.length}</span>
              </button>
              {availableCategories.map((category) => {
                const count = photoMemories.filter(
                  (memory) => memory.category === category,
                ).length;
                return (
                  <button
                    key={category}
                    type="button"
                    className="filter-button"
                    aria-pressed={filter === category}
                    onClick={() => chooseFilter(category)}
                  >
                    {CATEGORY_LABELS[category]} <span>{count}</span>
                  </button>
                );
              })}
            </div>
            <p className="gallery-count" aria-live="polite">
              {visibleMemories.length}{" "}
              {visibleMemories.length === 1 ? "memory" : "memories"}
            </p>
          </div>

          <div className="polaroid-wall">
            {visibleMemories.map((memory, index) => (
              <Polaroid
                key={memory.id}
                memory={memory}
                index={index}
                onOpen={() => setActiveIndex(index)}
                eager={index < 2}
              />
            ))}
          </div>
        </>
      )}

      <Lightbox
        memories={visibleMemories}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
