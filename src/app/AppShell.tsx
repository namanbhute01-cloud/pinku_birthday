import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { List, Menu } from "lucide-react";
import { IndexDrawer } from "../components/IndexDrawer";
import { ChapterNavigation } from "../components/ChapterNavigation";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { getChapterByPath, getReadingIndex, readingChapters } from "../data/chapters";
import { profile } from "../data/profile";
import { cx } from "../utils/cx";

/**
 * Shared application chrome: brand, sticky masthead, index drawer, reading
 * progress, page-turn transitions, chapter navigation and the colophon.
 */
export function AppShell() {
  const location = useLocation();
  const outlet = useOutlet();
  const mainRef = useRef<HTMLElement>(null);
  const hasMountedRef = useRef(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const chapter = getChapterByPath(location.pathname);
  const isIntro = location.pathname === "/";
  const readingIndex = getReadingIndex(location.pathname);
  const isReadingChapter = readingIndex >= 0;
  const progressCount = isReadingChapter
    ? String(readingIndex + 1).padStart(2, "0")
    : null;

  useEffect(() => {
    setIndexOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Jump, don't glide: html has smooth scrolling for in-page anchors, but a
    // new chapter must open at its top edge beneath the page turn.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  useEffect(() => {
    if (chapter) {
      document.title = `${chapter.title} — The Birthday Archive`;
    } else {
      document.title = "The Birthday Archive";
    }
  }, [chapter]);

  return (
    <div className={cx("app-shell", isIntro && "app-shell--intro")}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={cx("site-header", isIntro && "site-header--night")}>
        <div className="site-header__inner">
          <Link to="/cover" className="brand" aria-label="The Birthday Archive — return to the cover">
            <span className="brand__seal" aria-hidden="true">
              P
            </span>
            <span className="brand__words">
              <span className="brand__title">The Birthday Archive</span>
              <span className="brand__sub">
                for {profile.nickname} <span aria-hidden="true">·</span> twenty
              </span>
            </span>
          </Link>

          <div className="site-header__right">
            <p className="site-header__chapter">
              {isIntro ? (
                <span>Invitation</span>
              ) : chapter && progressCount ? (
                <>
                  <motion.span
                    key={progressCount}
                    className="site-header__chapter-number"
                    initial={reduceMotion ? false : { opacity: 0, y: -7 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {progressCount}
                  </motion.span>
                  <span className="site-header__chapter-slash" aria-hidden="true">
                    /
                  </span>
                  <span className="site-header__chapter-total">
                    {String(readingChapters.length).padStart(2, "0")}
                  </span>
                  <span className="site-header__chapter-name">{chapter.navTitle}</span>
                </>
              ) : null}
            </p>
            <button
              type="button"
              className="index-button"
              onClick={() => setIndexOpen(true)}
              aria-haspopup="dialog"
              aria-label="Open the archive contents"
            >
              <Menu size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>Contents</span>
            </button>
          </div>
        </div>
        {isReadingChapter ? (
          <ProgressIndicator
            current={readingIndex}
            total={readingChapters.length}
            compact
            className="site-header__progress"
          />
        ) : (
          <span className="site-header__hairline" aria-hidden="true" />
        )}
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} className="site-main">
        <motion.div
          key={location.pathname}
          className="route-transition"
          initial={
            reduceMotion || !hasMountedRef.current
              ? false
              : { opacity: 0, y: 12, rotateX: 2 }
          }
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.44,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          style={{ transformPerspective: 1400, transformOrigin: "50% 0%" }}
        >
          {outlet}
        </motion.div>
      </main>

      {!isIntro && chapter && isReadingChapter ? (
        <ChapterNavigation pathname={location.pathname} onOpenIndex={() => setIndexOpen(true)} />
      ) : null}

      {!isIntro ? (
        <footer className="site-footer">
          <div className="site-footer__inner">
            <p className="site-footer__mark">
              <span aria-hidden="true">
                <List size={13} strokeWidth={1.7} />
              </span>
              The Birthday Archive <span aria-hidden="true">·</span> a private edition
            </p>
            <p className="site-footer__identity">
              For {profile.name} “{profile.nickname}” <span aria-hidden="true">·</span>{" "}
              {profile.birthdayMilestone} years
            </p>
          </div>
        </footer>
      ) : null}

      <IndexDrawer
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        pathname={location.pathname}
      />
    </div>
  );
}
