import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { EmptyState } from "../../components/EmptyState";
import { Modal } from "../../components/Modal";
import { Placeholder } from "../../components/Placeholder";
import { letters } from "../../data/letters";
import type { ChapterPageProps } from "../../app/ChapterRoute";
import type { Letter } from "../../types/content";

/** Chapter 08 — sealed envelopes that open into data-driven letters. */
export function LettersPage({ chapter }: ChapterPageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const selectedLetter = letters.find((letter) => letter.id === selectedId) ?? null;
  const selectedIndex = selectedLetter
    ? letters.findIndex((letter) => letter.id === selectedLetter.id)
    : -1;
  const hasAnyMessage = letters.some((letter) => letter.message);

  const openLetter = (letter: Letter) => setSelectedId(letter.id);
  const closeLetter = () => setSelectedId(null);

  return (
    <div className="chapter-page letters-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="Choose with care"
        title={chapter.title}
        deck={chapter.deck}
      >
        <div className="letters-intro">
          <Mail size={18} strokeWidth={1.3} aria-hidden="true" />
          <p>Five envelopes. Open the one that matches the moment.</p>
        </div>
      </PageHeader>

      {letters.length === 0 ? (
        <EmptyState
          kicker="No envelopes in the drawer"
          title="These letters haven’t been written yet."
          fileHint="src/data/letters.ts"
        >
          <p>
            Add the moments you want to write for, then tuck a message inside each
            envelope. You can rename or remove any of the suggested titles.
          </p>
        </EmptyState>
      ) : (
        <>
          <ul className="letter-grid" aria-label="Open-when letters">
            {letters.map((letter, index) => (
              <li key={letter.id}>
                <button
                  type="button"
                  className="letter-envelope"
                  data-tone={letter.envelopeStyle ?? "burgundy"}
                  onClick={() => openLetter(letter)}
                  aria-label={`Open letter: ${letter.title}`}
                >
                  <span className="letter-envelope__body">
                    <span className="letter-envelope__flap" aria-hidden="true" />
                    <span className="letter-envelope__seal" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="letter-envelope__kicker">A letter for later</span>
                    <span className="letter-envelope__title">{letter.title}</span>
                    <span className="letter-envelope__open">
                      Open
                      <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {!hasAnyMessage ? (
            <p className="content-hint content-hint--center">
              <span>These envelopes are sealed but empty. Add your letters in</span>
              <code>src/data/letters.ts</code>
            </p>
          ) : null}
        </>
      )}

      <Modal
        open={Boolean(selectedLetter)}
        onClose={closeLetter}
        labelledBy="open-letter-title"
        className="letter-modal"
        closeLabel="Close letter"
      >
        {selectedLetter ? (
          <motion.div
            className="letter-modal__inner"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.1 }}
          >
            <motion.span
              className="letter-modal__flap"
              aria-hidden="true"
              initial={false}
              animate={reduceMotion ? undefined : { rotateX: -150 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <div className="letter-modal__content">
              <p className="eyebrow">
                Letter {String(selectedIndex + 1).padStart(2, "0")} · open when
              </p>
              <h2 id="open-letter-title" data-autofocus tabIndex={-1}>
                {selectedLetter.title}
              </h2>
              <span className="letter-modal__rule" aria-hidden="true" />
              {selectedLetter.message ? (
                <p className="letter-modal__message">{selectedLetter.message}</p>
              ) : (
                <p className="letter-modal__message">
                  <Placeholder>Add your letter here.</Placeholder>
                </p>
              )}
              <p className="letter-modal__signoff">
                {selectedLetter.message
                  ? "For whenever you need it."
                  : "Your words for this envelope will appear here."}
              </p>
              <p className="content-hint">
                <span>Edit this envelope in</span>
                <code>src/data/letters.ts</code>
              </p>
            </div>
          </motion.div>
        ) : null}
      </Modal>
    </div>
  );
}
