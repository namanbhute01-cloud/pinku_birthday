import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Modal } from "./Modal";
import { ProgressIndicator } from "./ProgressIndicator";
import { chapters, readingChapters, getReadingIndex } from "../data/chapters";
import { profile } from "../data/profile";
import { cx } from "../utils/cx";

interface IndexDrawerProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/** The archive's contents, laid out as the centre spread of the book. */
export function IndexDrawer({ open, onClose, pathname }: IndexDrawerProps) {
  const readingIndex = getReadingIndex(pathname);
  const half = Math.ceil(chapters.length / 2);
  const columns = [chapters.slice(0, half), chapters.slice(half)];

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="index-title"
      align="center"
      className="index-folio"
      closeLabel="Close the contents"
    >
      <div className="index-folio__paper">
        <span className="index-folio__tape index-folio__tape--a" aria-hidden="true" />
        <span className="index-folio__tape index-folio__tape--b" aria-hidden="true" />
        <span className="index-folio__stamp" aria-hidden="true">
          <span>BIRTHDAY</span>
          <span>ARCHIVE</span>
        </span>

        <header className="index-folio__head">
          <p className="index-folio__kicker">the contents</p>
          <h2 id="index-title" data-autofocus tabIndex={-1}>
            The Birthday Archive
          </h2>
          <p className="index-folio__inscription">
            kept for <strong>{profile.name}</strong>{" "}
            <span aria-hidden="true">·</span> “{profile.nickname}”
          </p>
          <div className="index-folio__progress">
            <ProgressIndicator
              current={Math.max(readingIndex, 0)}
              total={readingChapters.length}
            />
          </div>
        </header>

        <nav className="index-folio__nav" aria-label="Archive chapters">
          <div className="index-folio__spread">
            {columns.map((column, columnIndex) => (
              <ol className="index-folio__column" key={columnIndex}>
                {column.map((chapter) => {
                  const isCurrent = chapter.path === pathname;
                  return (
                    <li key={chapter.id}>
                      <Link
                        to={chapter.path}
                        className={cx("index-entry", isCurrent && "is-current")}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={onClose}
                      >
                        <span className="index-entry__text">
                          <span className="index-entry__line">
                            <span className="index-entry__title">{chapter.navTitle}</span>
                            <span className="index-entry__leader" aria-hidden="true" />
                            <span className="index-entry__page" aria-hidden="true">
                              {chapter.number}
                            </span>
                          </span>
                          <span className="index-entry__deck">{chapter.deck}</span>
                        </span>
                        {isCurrent ? (
                          <span className="index-entry__here" aria-hidden="true">
                            reading now
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            ))}
          </div>
        </nav>

        <footer className="index-folio__foot">
          <Link to="/cover" className="text-link" onClick={onClose}>
            <Home size={15} strokeWidth={1.7} aria-hidden="true" />
            Back to the cover
          </Link>
          <p>
            {profile.birthdayMilestone}th birthday <span aria-hidden="true">·</span> a
            private edition
          </p>
        </footer>
      </div>
    </Modal>
  );
}
