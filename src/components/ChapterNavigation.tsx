import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import { getAdjacentChapters } from "../data/chapters";
import { profile } from "../data/profile";
import { cx } from "../utils/cx";

interface ChapterNavigationProps {
  pathname: string;
  onOpenIndex: () => void;
}

/**
 * The bottom edge of the book: a page to turn back on the left, a page to turn
 * forward on the right, and the contents tab resting between them.
 */
export function ChapterNavigation({ pathname, onOpenIndex }: ChapterNavigationProps) {
  const { previous, next } = getAdjacentChapters(pathname);
  const isCover = pathname === "/cover";

  return (
    <nav
      className={cx("chapter-nav", "chapter-nav--scrapbook")}
      aria-label="Chapter navigation"
      aria-describedby="chapter-nav-keys"
    >
      <p id="chapter-nav-keys" className="sr-only">
        Use the left and right arrow keys, the page edges, or these links to turn pages.
      </p>

      <div className="chapter-nav__side chapter-nav__side--first">
        {previous ? (
          <Link
            to={previous.path}
            className="chapter-nav__link chapter-nav__link--prev"
            aria-keyshortcuts="ArrowLeft"
          >
            <span className="chapter-nav__curl" aria-hidden="true">
              <ArrowLeft size={16} strokeWidth={1.7} />
            </span>
            <span className="chapter-nav__words">
              <span className="chapter-nav__eyebrow">Previous page</span>
              <span className="chapter-nav__title">{previous.navTitle}</span>
            </span>
          </Link>
        ) : isCover ? (
          <Link to="/" className="chapter-nav__link chapter-nav__link--prev">
            <span className="chapter-nav__curl" aria-hidden="true">
              <ArrowLeft size={16} strokeWidth={1.7} />
            </span>
            <span className="chapter-nav__words">
              <span className="chapter-nav__eyebrow">The invitation</span>
              <span className="chapter-nav__title">The Invitation</span>
            </span>
          </Link>
        ) : (
          <span className="chapter-nav__placeholder" />
        )}
      </div>

      <div className="chapter-nav__center">
        {isCover ? (
          <span className="chapter-nav__brand">{profile.name}’s archive</span>
        ) : (
          <button
            type="button"
            className="chapter-nav__index"
            onClick={onOpenIndex}
            aria-label="View contents"
            aria-haspopup="dialog"
          >
            <List size={14} strokeWidth={1.7} aria-hidden="true" />
            <span>Contents</span>
          </button>
        )}
        <span className="chapter-nav__keys" aria-hidden="true">
          <kbd>←</kbd>
          <kbd>→</kbd>
          <span>turn pages</span>
        </span>
      </div>

      <div className={cx("chapter-nav__side", "chapter-nav__side--last")}>
        {next ? (
          <Link
            to={next.path}
            className="chapter-nav__link chapter-nav__link--next"
            aria-keyshortcuts="ArrowRight"
          >
            <span className="chapter-nav__words">
              <span className="chapter-nav__eyebrow">Next page</span>
              <span className="chapter-nav__title">{next.navTitle}</span>
            </span>
            <span className="chapter-nav__curl" aria-hidden="true">
              <ArrowRight size={16} strokeWidth={1.7} />
            </span>
          </Link>
        ) : (
          <span className="chapter-nav__placeholder">The last page</span>
        )}
      </div>
    </nav>
  );
}
