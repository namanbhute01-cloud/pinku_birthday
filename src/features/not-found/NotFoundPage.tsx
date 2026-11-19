import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { PaperSheet } from "../../components/PaperSheet";

/** A gentle dead end for mistyped or retired URLs. */
export function NotFoundPage() {
  return (
    <div className="not-found chapter-page">
      <PaperSheet className="not-found__sheet">
        <p className="eyebrow">404 · a loose page</p>
        <h1>This page slipped out of the archive.</h1>
        <p className="not-found__copy">
          The link may have moved, or the page may still be waiting to be written.
        </p>
        <div className="button-row">
          <Link className="button button--primary" to="/cover">
            <Compass size={17} strokeWidth={1.7} aria-hidden="true" />
            Return to the cover
          </Link>
          <Link className="button button--ghost" to="/chapter/beginning">
            <ArrowLeft size={17} strokeWidth={1.7} aria-hidden="true" />
            Start at the beginning
          </Link>
        </div>
      </PaperSheet>
    </div>
  );
}
