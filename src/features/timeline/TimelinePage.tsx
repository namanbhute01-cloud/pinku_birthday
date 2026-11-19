import { PageHeader } from "../../components/PageHeader";
import { EmptyState } from "../../components/EmptyState";
import { Placeholder } from "../../components/Placeholder";
import { ArchiveImage } from "../../components/ArchiveImage";
import { Sticker } from "../../components/Sticker";
import { StickerCluster } from "../../components/Decorations";
import { InkStar } from "../../components/Ornaments";
import { WashiTape } from "../../components/WashiTape";
import { timelineEntries } from "../../data/timeline";
import type { ChapterPageProps } from "../../app/ChapterRoute";

/** Chapter 02 — a chronological, non-interactive timeline. */
export function TimelinePage({ chapter }: ChapterPageProps) {
  return (
    <div className="chapter-page timeline-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="A life, in order"
        title={chapter.title}
        deck={chapter.deck}
        decor={
          <StickerCluster>
            <Sticker tone="brass" rotate={-5}>
              the first page
            </Sticker>
            <Sticker tone="paper" rotate={3.5}>
              in order
            </Sticker>
            <InkStar />
          </StickerCluster>
        }
      />

      {timelineEntries.length === 0 ? (
        <div className="timeline-empty">
          <div className="timeline-empty__visual" aria-hidden="true">
            <span className="timeline-empty__axis" />
            {[0, 1, 2].map((index) => (
              <div className="timeline-ghost" key={index}>
                <span className="timeline-ghost__node" />
                <div className="timeline-ghost__sheet">
                  <span className="timeline-ghost__date" />
                  <span className="timeline-ghost__title" />
                  <span className="timeline-ghost__line" />
                  <span className="timeline-ghost__line timeline-ghost__line--short" />
                </div>
              </div>
            ))}
            <span className="timeline-empty__caption hand">the story starts here</span>
          </div>

          <EmptyState
            kicker="The first blank page"
            title="Your story will go here."
            fileHint="src/data/timeline.ts"
          >
            <p>
              This timeline is ready for dates, places and the small beginnings that
              belong to it. Add the first entry when you’re ready.
            </p>
          </EmptyState>
        </div>
      ) : (
        <ol className="timeline">
          {timelineEntries.map((entry, index) => (
            <li className="timeline__entry" key={entry.id}>
              <div className="timeline__date">
                {entry.date ? (
                  <span>{entry.date}</span>
                ) : (
                  <Placeholder>Add a date</Placeholder>
                )}
              </div>
              <span className="timeline__node" aria-hidden="true">
                <span />
              </span>
              <article className="timeline-card">
                <WashiTape
                  className="timeline-card__tape"
                  tone={index % 2 === 0 ? "brass" : "olive"}
                  style={{ transform: `rotate(${index % 2 === 0 ? -3 : 2}deg)` }}
                />
                {index === 0 ? (
                  <Sticker className="timeline-card__sticker" tone="olive" rotate={4}>
                    kept
                  </Sticker>
                ) : null}
                {entry.image ? (
                  <div className="timeline-card__image">
                    <ArchiveImage
                      src={entry.image}
                      alt={entry.imageAlt || entry.title || "Timeline photograph"}
                      label="Photograph"
                      objectPosition={entry.imagePosition}
                    />
                  </div>
                ) : null}
                <p className="eyebrow">Entry {String(index + 1).padStart(2, "0")}</p>
                <h2>
                  {entry.title ? entry.title : <Placeholder>Add a title</Placeholder>}
                </h2>
                {entry.description ? (
                  <p className="timeline-card__copy">{entry.description}</p>
                ) : (
                  <p className="timeline-card__copy">
                    <Placeholder>Your story will go here.</Placeholder>
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}

      {timelineEntries.length > 0 ? (
        <div className="timeline-end" aria-hidden="true">
          <Sticker tone="olive" rotate={-4}>
            more to come
          </Sticker>
          <InkStar />
        </div>
      ) : null}
    </div>
  );
}
