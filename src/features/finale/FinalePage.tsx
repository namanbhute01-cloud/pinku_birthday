import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Envelope } from "../../components/Envelope";
import { Confetti } from "../../components/Confetti";
import { Placeholder } from "../../components/Placeholder";
import { VoiceNote } from "../../components/VoiceNote";
import { finalLetter } from "../../data/finale";
import { profile } from "../../data/profile";
import type { ChapterPageProps } from "../../app/ChapterRoute";

/** Chapter 10 — a sealed finale that opens into a blank letter and end card. */
export function FinalePage({ chapter }: ChapterPageProps) {
  const [opened, setOpened] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const letterRef = useRef<HTMLElement>(null);
  const endCardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!opened) return;
    letterRef.current?.focus({ preventScroll: true });
  }, [opened]);

  useEffect(() => {
    if (!celebrated) return;
    setConfettiActive(true);
    const focusTimer = window.setTimeout(() => {
      endCardRef.current?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 450);
    const confettiTimer = window.setTimeout(() => setConfettiActive(false), 9000);
    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(confettiTimer);
    };
  }, [celebrated, reduceMotion]);

  const paragraphs = finalLetter.message
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const voice = {
    id: "finale-voice",
    label: finalLetter.voiceLabel || "A voice note for the last page",
    src: finalLetter.voiceSrc,
  };

  return (
    <div className="chapter-page finale-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="Save this one for last"
        title={chapter.title}
        deck={chapter.deck}
      />

      <section className="finale-stage" aria-live="polite">
        {!opened ? (
          <div className="finale-sealed">
            <p className="finale-instruction">
              When you’re ready, break the seal.
            </p>
            <Envelope
              recipient={profile.name}
              nickname={profile.nickname}
              stampLabel={String(profile.birthdayMilestone)}
              actionLabel="Break the seal and open the final letter"
              open={false}
              onOpen={() => setOpened(true)}
            />
            <p className="finale-whisper hand">one last envelope</p>
          </div>
        ) : (
          <>
            <div className="finale-envelope-mark" aria-hidden="true">
              <Envelope
                recipient={profile.name}
                nickname={profile.nickname}
                stampLabel={String(profile.birthdayMilestone)}
                actionLabel=""
                open
                onOpen={() => undefined}
              />
            </div>

            <motion.article
              ref={letterRef}
              className="final-letter"
              tabIndex={-1}
              aria-labelledby="final-letter-title"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : 0.15,
              }}
            >
              <span className="final-letter__pin" aria-hidden="true" />
              <p className="eyebrow">The last page</p>
              <h2 id="final-letter-title">
                {finalLetter.title ? (
                  finalLetter.title
                ) : (
                  <Placeholder>Add a title for your final letter</Placeholder>
                )}
              </h2>
              <span className="final-letter__rule" aria-hidden="true" />
              <div className="final-letter__body">
                {paragraphs.length > 0 ? (
                  paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>
                    <Placeholder>Your final letter will go here.</Placeholder>
                  </p>
                )}
              </div>
              <p className="final-letter__signoff">
                {finalLetter.signoff ? (
                  finalLetter.signoff
                ) : (
                  <Placeholder>Your sign-off will go here.</Placeholder>
                )}
              </p>

              <div className="finale-actions">
                {!celebrated ? (
                  <button
                    type="button"
                    className="button button--primary"
                    onClick={() => setCelebrated(true)}
                  >
                    <Sparkles size={17} strokeWidth={1.7} aria-hidden="true" />
                    Celebrate {profile.birthdayMilestone}
                  </button>
                ) : null}
                <Link className="text-link" to="/cover">
                  <ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" />
                  Return to cover
                </Link>
              </div>

              <VoiceNote voice={voice} fileHint="src/data/finale.ts" />
            </motion.article>

            {celebrated ? (
              <motion.section
                ref={endCardRef}
                className="finale-endcard"
                tabIndex={-1}
                aria-labelledby="endcard-title"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.55 }}
              >
                <p className="eyebrow eyebrow--light">End of the archive</p>
                <span className="finale-endcard__seal" aria-hidden="true">
                  P
                </span>
                <h2 id="endcard-title">The Birthday Archive</h2>
                <p className="finale-endcard__identity">
                  For {profile.name} “{profile.nickname}” <span aria-hidden="true">·</span>{" "}
                  {profile.birthdayMilestone}
                </p>
                <div className="finale-endcard__actions">
                  <Link className="button button--light" to="/cover">
                    Return to cover
                  </Link>
                  <Link className="button button--outline-light" to="/chapter/beginning">
                    Explore again
                  </Link>
                </div>
                <p className="finale-endcard__foot">
                  A private edition <span aria-hidden="true">·</span> one of one
                </p>
              </motion.section>
            ) : null}
          </>
        )}
      </section>

      <Confetti active={confettiActive} />
    </div>
  );
}
