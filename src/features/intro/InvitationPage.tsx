import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Feather } from "lucide-react";
import { Envelope } from "../../components/Envelope";
import { Placeholder } from "../../components/Placeholder";
import { BotanicalSprig, InkStar } from "../../components/Ornaments";
import { profile } from "../../data/profile";
import { cx } from "../../utils/cx";

/**
 * The invitation: a dark, cinematic first page that opens with a wax seal.
 * Welcome copy is deliberately empty in `src/data/profile.ts`.
 */
export function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!opened) return;
    const letter = letterRef.current;
    if (!letter) return;
    const rect = letter.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      letter.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    }
    letter.focus({ preventScroll: true });
  }, [opened, reduceMotion]);

  return (
    <div className="intro-page">
      <div className="intro-page__light" aria-hidden="true" />
      <div className="intro-page__grain" aria-hidden="true" />
      <BotanicalSprig className="intro-page__botanical" />
      <InkStar className="intro-page__star intro-page__star--one" />
      <InkStar className="intro-page__star intro-page__star--two" />

      <div className="intro-page__grid">
        <div className="intro-page__copy">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__mark" aria-hidden="true" />
            A private invitation
          </p>
          <h1 className="intro-page__title">
            The Birthday{" "}
            <span>Archive</span>
          </h1>
          <div className="intro-page__identity">
            <p>For {profile.name}</p>
            <p className="hand">“{profile.nickname}”</p>
          </div>
          <p className="intro-page__edition">
            Twentieth birthday <span aria-hidden="true">·</span> a private edition
          </p>
          <p className="intro-page__aside">
            <Feather size={15} strokeWidth={1.4} aria-hidden="true" />
            <span>Open the envelope, or slip straight inside.</span>
          </p>
          <Link to="/cover" className="intro-page__skip">
            Skip the opening
            <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>

        <div className={cx("intro-page__stage", opened && "is-open")}>
          <Envelope
            recipient={profile.name}
            nickname={profile.nickname}
            stampLabel={String(profile.birthdayMilestone)}
            actionLabel="Break the wax seal and open the invitation"
            open={opened}
            onOpen={() => setOpened(true)}
          />

          {!opened ? (
            <motion.p
              className="intro-page__instruction"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="intro-page__instruction-rule" />
              press the seal
              <span className="intro-page__instruction-rule" />
            </motion.p>
          ) : null}

          <div aria-live="polite" className="sr-only">
            {opened ? "Invitation opened. Enter the archive whenever you are ready." : ""}
          </div>

          {opened ? (
            <motion.div
              ref={letterRef}
              className="intro-letter"
              tabIndex={-1}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.15 }}
            >
              <span className="intro-letter__clip" aria-hidden="true" />
              <p className="eyebrow">From the archive</p>
              <h2>An invitation</h2>
              {profile.introMessage ? (
                <p className="intro-letter__message">{profile.introMessage}</p>
              ) : (
                <p className="intro-letter__message">
                  <Placeholder>Your welcome message will go here.</Placeholder>
                </p>
              )}
              <div className="intro-letter__foot">
                <span className="intro-letter__stamp" aria-hidden="true">
                  {profile.birthdayMilestone}
                </span>
                <Link to="/cover" className="button button--primary">
                  Enter the archive
                  <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>

      <p className="intro-page__folio" aria-hidden="true">
        00 <span>/</span> The Invitation
      </p>
    </div>
  );
}
