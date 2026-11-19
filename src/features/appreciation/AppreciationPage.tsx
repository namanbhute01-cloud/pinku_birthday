import { PageHeader } from "../../components/PageHeader";
import { EmptyState } from "../../components/EmptyState";
import { PaperSheet } from "../../components/PaperSheet";
import { WashiTape } from "../../components/WashiTape";
import { Placeholder } from "../../components/Placeholder";
import { StickerCluster } from "../../components/Decorations";
import { Sticker } from "../../components/Sticker";
import { BotanicalSprig, InkStar } from "../../components/Ornaments";
import { appreciationNotes } from "../../data/appreciation";
import type { ChapterPageProps } from "../../app/ChapterRoute";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/** Chapter 06 — a slower, warmer set of notes. */
export function AppreciationPage({ chapter }: ChapterPageProps) {
  return (
    <div className="chapter-page appreciation-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="Read slowly"
        title={chapter.title}
        deck={chapter.deck}
        decor={
          <StickerCluster>
            <BotanicalSprig className="decor-botanical" />
            <Sticker tone="olive" rotate={-4}>
              read slowly
            </Sticker>
            <Sticker tone="paper" rotate={3}>
              for you
            </Sticker>
            <InkStar />
          </StickerCluster>
        }
      />

      {appreciationNotes.length === 0 ? (
        <div className="appreciation-empty">
          <EmptyState
            kicker="Kept for a quiet moment"
            title="These pages are waiting for your words."
            fileHint="src/data/appreciation.ts"
          >
            <p>
              This chapter has room for the small, specific things that deserve more
              than a passing mention. Each note gets its own sheet of paper.
            </p>
          </EmptyState>

          <div className="appreciation-ghosts" aria-hidden="true">
            {[0, 1].map((index) => (
              <div className="note-sheet note-sheet--ghost" key={index}>
                <WashiTape tone={index === 0 ? "olive" : "brass"} />
                <span className="note-sheet__numeral">{ROMAN[index]}</span>
                <span className="ghost-line ghost-line--title" />
                <span className="ghost-line" />
                <span className="ghost-line" />
                <span className="ghost-line ghost-line--short" />
              </div>
            ))}
            <span className="appreciation-ghosts__script hand">one thing at a time</span>
          </div>
        </div>
      ) : (
        <div className="note-stack">
          {appreciationNotes.map((note, index) => (
            <PaperSheet
              as="article"
              variant="ruled"
              className="note-sheet"
              key={note.id}
              style={{ transform: `rotate(${[-0.8, 0.7, -0.5, 0.9][index % 4]}deg)` }}
            >
              <WashiTape
                className="note-sheet__tape"
                tone={index % 3 === 0 ? "olive" : index % 3 === 1 ? "brass" : "burgundy"}
              />
              <span className="note-sheet__numeral" aria-hidden="true">
                {ROMAN[index] ?? String(index + 1)}
              </span>
              <h2>
                {note.heading ? (
                  note.heading
                ) : (
                  <Placeholder>A heading for this note</Placeholder>
                )}
              </h2>
              {note.body ? (
                <p className="note-sheet__body">{note.body}</p>
              ) : (
                <p className="note-sheet__body">
                  <Placeholder>Your note will go here.</Placeholder>
                </p>
              )}
            </PaperSheet>
          ))}
          <div className="note-stack__end" aria-hidden="true">
            <Sticker tone="olive" rotate={-3}>
              a few of many
            </Sticker>
            <InkStar />
          </div>
        </div>
      )}
    </div>
  );
}
