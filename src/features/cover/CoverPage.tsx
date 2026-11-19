import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ArchiveImage } from "../../components/ArchiveImage";
import { BotanicalSprig, InkStar } from "../../components/Ornaments";
import { Placeholder } from "../../components/Placeholder";
import { Sticker } from "../../components/Sticker";
import { WashiTape } from "../../components/WashiTape";
import { chapters } from "../../data/chapters";
import { profile } from "../../data/profile";

const contents = chapters.filter(
  (chapter) => chapter.id !== "invitation" && chapter.id !== "cover",
);

/**
 * The cover and archive index. It behaves like the front matter of a book:
 * a large title, a kept object collage, and a designed table of contents.
 */
export function CoverPage() {
  return (
    <div className="cover-page">
      <section className="cover-hero" aria-labelledby="cover-title">
        <div className="cover-hero__copy">
          <p className="eyebrow">
            <span className="eyebrow__mark" aria-hidden="true" />
            Volume {profile.birthdayMilestone} <span aria-hidden="true">·</span> private edition
          </p>
          <h1 id="cover-title" className="cover-title">
            <span>The Birthday</span>{" "}
            <span className="cover-title__italic">Archive</span>
          </h1>

          <div className="cover-identity">
            <p className="cover-identity__label">Compiled for</p>
            <p className="cover-identity__name">{profile.name}</p>
            <p className="cover-identity__nickname hand">“{profile.nickname}”</p>
          </div>

          {profile.coverSubtitle ? (
            <p className="cover-subtitle">{profile.coverSubtitle}</p>
          ) : (
            <p className="cover-subtitle">
              <Placeholder>Add a cover subtitle or one-line dedication.</Placeholder>
            </p>
          )}

          <div className="cover-actions">
            <Link className="button button--primary" to="/chapter/beginning">
              Start reading
              <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" />
            </Link>
            <a className="button button--ghost" href="#contents">
              Browse the contents
            </a>
          </div>

          <dl className="cover-meta">
            <div>
              <dt>Occasion</dt>
              <dd>{profile.birthdayMilestone}th birthday</dd>
            </div>
            <div>
              <dt>Recipient</dt>
              <dd>{profile.pronouns}</dd>
            </div>
            <div>
              <dt>Edition</dt>
              <dd>One of one</dd>
            </div>
          </dl>
        </div>

        <div className="cover-collage" aria-label="Archive keepsakes">
          <span className="cover-collage__script hand">the twentieth edition</span>
          <WashiTape className="cover-collage__tape" tone="brass" />
          <figure className="cover-photo">
            <span className="cover-photo__pin" aria-hidden="true" />
            <ArchiveImage
              src={profile.coverPhoto}
              alt={profile.coverPhotoAlt || "Cover photograph"}
              label="Cover photograph"
              className="cover-photo__image"
              eager
              objectPosition={profile.coverPhotoPosition}
            />
            <figcaption>
              {profile.coverPhoto ? (
                "Cover photograph"
              ) : (
                <Placeholder>Add a photograph for the cover</Placeholder>
              )}
            </figcaption>
          </figure>

          <div className="cover-dedication">
            <span className="eyebrow">A note inside the cover</span>
            {profile.coverDedication ? (
              <p className="cover-dedication__copy">{profile.coverDedication}</p>
            ) : (
              <p className="cover-dedication__copy">
                <Placeholder>Your dedication will live here.</Placeholder>
              </p>
            )}
            <span className="cover-dedication__sign hand">
              — {profile.coverDedicationSignoff || profile.nickname}
            </span>
            <WashiTape className="cover-dedication__tape" tone="olive" />
          </div>

          <div className="cover-stamp" aria-hidden="true">
            <span className="cover-stamp__small">THE BIRTHDAY ARCHIVE</span>
            <span className="cover-stamp__number">{profile.birthdayMilestone}</span>
            <span className="cover-stamp__small">PRIVATE EDITION</span>
          </div>

          <Sticker className="cover-collage__sticker" tone="burgundy" rotate={-7}>
            keep forever
          </Sticker>

          <InkStar className="cover-collage__star" />
          <BotanicalSprig className="cover-collage__botanical" />
        </div>
      </section>

      <section className="contents" id="contents" aria-labelledby="contents-heading">
        <div className="contents__sheet">
          <WashiTape className="contents__tape" tone="brass" />
          <span className="contents__stitch" aria-hidden="true" />

          <div className="contents__head">
            <p className="eyebrow">The table of contents</p>
            <h2 id="contents-heading">Contents</h2>
            <p className="contents__note">
              Nine chapters, kept between these covers. Pick a page, or begin at the
              beginning.
            </p>
          </div>

          <ol className="contents-list">
            {contents.map((chapter) => (
              <li key={chapter.id}>
                <Link to={chapter.path} className="contents-card">
                  <span className="contents-card__line">
                    <span className="contents-card__title">{chapter.title}</span>
                    <span className="contents-card__leader" aria-hidden="true" />
                    <span className="contents-card__page" aria-hidden="true">
                      {chapter.number}
                    </span>
                  </span>
                  <span className="contents-card__deck">{chapter.deck}</span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="contents__foot">
            <span className="contents__folio" aria-hidden="true">
              iii
            </span>
            <p>
              The Birthday Archive <span aria-hidden="true">·</span> contents
            </p>
            <Link to="/chapter/final-letter" className="text-link">
              Jump to the final letter
              <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
