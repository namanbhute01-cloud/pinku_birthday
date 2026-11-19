import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAdjacentChapters,
  getChapterByPath,
  getReadingIndex,
  readingChapters,
} from "../data/chapters";
import type { Chapter } from "../types/content";
import { cx } from "../utils/cx";

type PageDirection = "forward" | "backward";

interface TurnState {
  id: number;
  from: Chapter;
  to: Chapter;
  direction: PageDirection;
}

/** A real page takes its time: lift, swing past the spine, settle. */
const FLIP_DURATION = 0.96;
const FLIP_CLEANUP_MS = 1080;

const SHOW_EDGE_CONTROLS = true;

/**
 * Turns every internal chapter link into a physical page-turn transition.
 * The current chapter is laid over the screen as a two-sided paper leaf, then
 * swings around the spine to reveal the destination page underneath. The URL
 * changes immediately, so navigation and focus management are never delayed.
 *
 * Pages can be turned four ways: chapter links, the arrow keys, the visible
 * page edges on wide screens, and the footer's previous/next entries. Reduced
 * motion users navigate instantly without the leaf.
 */
export function PageTurnProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [turn, setTurn] = useState<TurnState | null>(null);
  const turningRef = useRef(false);
  const cleanupTimerRef = useRef<number | null>(null);
  const turnIdRef = useRef(0);

  const clearCleanupTimer = useCallback(() => {
    if (cleanupTimerRef.current !== null) {
      window.clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
  }, []);

  const beginTurn = useCallback(
    (destination: string) => {
      if (turningRef.current) return;

      const url = new URL(destination, window.location.origin);
      const from = getChapterByPath(location.pathname);
      const to = getChapterByPath(url.pathname);
      const fromIndex = getReadingIndex(location.pathname);
      const toIndex = getReadingIndex(url.pathname);

      // Only the bound reading chapters turn like a book. The intro, 404 and
      // non-chapter links keep their normal immediate navigation.
      if (!from || !to || fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        navigate(destination);
        return;
      }

      if (reduceMotion) {
        navigate(destination);
        return;
      }

      turningRef.current = true;
      clearCleanupTimer();
      setTurn({
        id: ++turnIdRef.current,
        from,
        to,
        direction: toIndex > fromIndex ? "forward" : "backward",
      });
      navigate(destination);

      cleanupTimerRef.current = window.setTimeout(() => {
        setTurn(null);
        turningRef.current = false;
        cleanupTimerRef.current = null;
      }, FLIP_CLEANUP_MS);
    },
    [clearCleanupTimer, location.pathname, navigate, reduceMotion],
  );

  useEffect(() => () => clearCleanupTimer(), [clearCleanupTimer]);

  // Capture-phase interception runs before React Router's own link handler.
  // Modifier-clicking and middle-clicking still open tabs normally.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.dataset.pageTurn === "off") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        getReadingIndex(location.pathname) < 0 ||
        getReadingIndex(url.pathname) < 0 ||
        url.pathname === location.pathname
      ) {
        return;
      }

      event.preventDefault();
      beginTurn(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [beginTurn, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.key !== "ArrowLeft" && event.key !== "ArrowRight" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      // Never steal arrow keys from a dialog, form field, media control or slider.
      if (document.querySelector(".modal-overlay")) return;
      if (
        event.target instanceof Element &&
        event.target.closest(
          'input, textarea, select, audio, video, [contenteditable="true"], [role="slider"], [role="textbox"], [role="dialog"]',
        )
      ) {
        return;
      }

      if (getReadingIndex(location.pathname) < 0) return;
      const { previous, next } = getAdjacentChapters(location.pathname);
      const destination = event.key === "ArrowRight" ? next : previous;
      if (!destination) return;

      event.preventDefault();
      beginTurn(destination.path);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [beginTurn, location.pathname]);

  const isReadingChapter = getReadingIndex(location.pathname) >= 0;
  const { previous, next } = getAdjacentChapters(location.pathname);

  return (
    <>
      {children}

      {SHOW_EDGE_CONTROLS && isReadingChapter ? (
        <PageEdges previous={previous} next={next} />
      ) : null}

      {turn ? <PageTurnSheet key={turn.id} turn={turn} /> : null}
    </>
  );
}

/**
 * Paper edges at the left and right margins. They are ordinary links, so the
 * capture-phase handler above animates them exactly like a chapter link, and
 * keyboard users can reach them with Tab.
 */
function PageEdges({
  previous,
  next,
}: {
  previous: Chapter | null;
  next: Chapter | null;
}) {
  return (
    <nav className="page-edges" aria-label="Turn pages">
      {previous ? (
        <Link
          to={previous.path}
          className="page-edge page-edge--prev"
          aria-label={`Turn back to ${previous.navTitle}`}
        >
          <span className="page-edge__stack" aria-hidden="true" />
          <span className="page-edge__curl" aria-hidden="true">
            <ChevronLeft size={16} strokeWidth={1.7} />
          </span>
          <span className="page-edge__note" aria-hidden="true">
            <span className="page-edge__note-kicker">previous</span>
            <span className="page-edge__note-title">{previous.navTitle}</span>
          </span>
        </Link>
      ) : null}

      {next ? (
        <Link
          to={next.path}
          className="page-edge page-edge--next"
          aria-label={`Turn to ${next.navTitle}`}
        >
          <span className="page-edge__stack" aria-hidden="true" />
          <span className="page-edge__curl" aria-hidden="true">
            <ChevronRight size={16} strokeWidth={1.7} />
          </span>
          <span className="page-edge__note" aria-hidden="true">
            <span className="page-edge__note-kicker">next</span>
            <span className="page-edge__note-title">{next.navTitle}</span>
          </span>
        </Link>
      ) : null}
    </nav>
  );
}

function PageTurnSheet({ turn }: { turn: TurnState }) {
  const { from, to, direction } = turn;
  const isForward = direction === "forward";
  const total = String(readingChapters.length).padStart(2, "0");

  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: FLIP_DURATION,
      // Slow lift, quick pass through the spine, gentle settle.
      ease: [0.42, 0.02, 0.22, 1],
    });
    return () => controls.stop();
  }, [progress]);

  const rotateY = useTransform(
    progress,
    [0, 0.74, 1],
    [0, isForward ? -90 : 90, isForward ? -180 : 180],
  );
  const rotateZ = useTransform(
    progress,
    [0, 0.42, 0.74, 1],
    [0, isForward ? 0.9 : -0.9, isForward ? 0.4 : -0.4, isForward ? 0.2 : -0.2],
  );
  const lift = useTransform(progress, [0, 0.36, 0.7, 1], [0, 24, 46, 0]);

  const frontShade = useTransform(
    progress,
    [0, 0.22, 0.5, 0.72, 1],
    [0, 0.14, 0.4, 0.55, 0.55],
  );
  const backShade = useTransform(progress, [0, 0.7, 1], [0.62, 0.3, 0.06]);
  const wash = useTransform(progress, [0, 0.5, 0.74, 1], [0.62, 0.5, 0.24, 0]);
  const spineShade = useTransform(
    progress,
    [0, 0.45, 0.74, 1],
    [0.18, 0.5, 0.42, 0.14],
  );
  const castPos = useTransform(
    progress,
    [0, 0.74],
    isForward ? ["100%", "0%"] : ["0%", "100%"],
  );
  const castOpacity = useTransform(progress, [0, 0.18, 0.5, 0.74, 1], [0, 0.4, 0.32, 0.18, 0]);

  return (
    <div
      className={cx(
        "page-turn",
        `page-turn--${direction}`,
        `page-turn--tone-${from.tone}`,
      )}
      aria-hidden="true"
    >
      {/* The revealed chapter, warmed by the light of the turning leaf. */}
      <motion.div className="page-turn__wash" style={{ opacity: wash }} />
      <motion.span
        className="page-turn__spine-shade"
        style={{ opacity: spineShade }}
      />
      <motion.span
        className="page-turn__cast"
        style={{ left: castPos, opacity: castOpacity }}
      />

      <div className="page-turn__deck" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <motion.div
        className="page-turn__sheet"
        style={{
          rotateY,
          rotateZ,
          z: lift,
          transformPerspective: 2400,
          transformOrigin: isForward ? "left center" : "right center",
        }}
      >
        <div className="page-turn__side page-turn__front">
          <span className="page-turn__ghost-number">{from.number}</span>

          <div className="page-turn__face">
            <div className="page-turn__masthead">
              <span>The Birthday Archive</span>
              <span>Chapter {from.number}</span>
            </div>

            <div className="page-turn__center">
              <p className="page-turn__kicker">
                {isForward ? "turn the page" : "back to an earlier page"}
              </p>
              <h2>{from.title}</h2>
              <p className="page-turn__deck-copy">{from.deck}</p>
            </div>

            <div className="page-turn__foot">
              <span className="page-turn__direction">
                {isForward ? "Next page" : "Previous page"} <span aria-hidden="true">·</span>{" "}
                {to.navTitle}
              </span>
              <span className="page-turn__rule" aria-hidden="true" />
              <span className="page-turn__folio">
                {from.number} <span aria-hidden="true">/</span> {total}
              </span>
            </div>
          </div>

          <span className="page-turn__fold" aria-hidden="true" />
          <motion.span
            className="page-turn__front-shade"
            style={{ opacity: frontShade }}
          />
        </div>

        <div className="page-turn__side page-turn__back">
          <span className="page-turn__back-number">{from.number}</span>

          <div className="page-turn__back-face">
            <span className="page-turn__back-kicker">
              {isForward ? "on the next page" : "on the previous page"}
            </span>
            <span className="page-turn__back-title">{to.navTitle}</span>
            <span className="page-turn__back-lines" aria-hidden="true">
              {Array.from({ length: 7 }, (_, index) => (
                <span
                  key={index}
                  style={{ width: `${88 - ((index * 13) % 34)}%` }}
                />
              ))}
            </span>
            <span className="page-turn__back-folio">
              {to.number} <span aria-hidden="true">/</span> {total}
            </span>
          </div>

          <motion.span
            className="page-turn__back-shade"
            style={{ opacity: backShade }}
          />
        </div>
      </motion.div>
    </div>
  );
}
