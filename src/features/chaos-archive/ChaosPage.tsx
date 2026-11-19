import {
  HelpCircle,
  ImageIcon,
  Quote as QuoteIcon,
  Sparkles,
  Trophy,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { PaperSheet } from "../../components/PaperSheet";
import { SectionTitle } from "../../components/SectionTitle";
import { WashiTape } from "../../components/WashiTape";
import { Sticker } from "../../components/Sticker";
import { StickerCluster } from "../../components/Decorations";
import { InkStar } from "../../components/Ornaments";
import { Placeholder } from "../../components/Placeholder";
import { ArchiveImage } from "../../components/ArchiveImage";
import { Quiz } from "../../components/Quiz";
import {
  awards,
  funnyMoments,
  iconicQuotes,
  quizQuestions,
  screenshots,
} from "../../data/chaos";
import type { ChapterPageProps } from "../../app/ChapterRoute";

const isChaosEmpty =
  funnyMoments.length === 0 &&
  iconicQuotes.length === 0 &&
  screenshots.length === 0 &&
  awards.length === 0 &&
  quizQuestions.length === 0;

/** Chapter 03 — the loud, playful side of the archive. */
export function ChaosPage({ chapter }: ChapterPageProps) {
  return (
    <div className="chapter-page chaos-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="Handle with laughter"
        title={chapter.title}
        deck={chapter.deck}
        decor={
          <StickerCluster>
            <Sticker tone="brass" rotate={-6}>
              chaos dept.
            </Sticker>
            <Sticker tone="burgundy" rotate={4}>
              est. 20
            </Sticker>
            <Sticker tone="olive" rotate={-2}>
              no seriousness
            </Sticker>
            <InkStar />
          </StickerCluster>
        }
      />

      <section className="scrap-section" aria-labelledby="chaos-moments-heading">
        <SectionTitle index="I" title="The wall of chaos" id="chaos-moments-heading">
          The moments that need no explanation — or need all of it.
        </SectionTitle>

        {funnyMoments.length > 0 ? (
          <div className="chaos-notes">
            {funnyMoments.map((moment, index) => (
              <PaperSheet
                as="article"
                variant={index % 2 === 0 ? "kraft" : "plain"}
                className="chaos-note"
                key={moment.id}
                style={{
                  transform: `rotate(${[-1.8, 1.4, -0.8, 2][index % 4]}deg)`,
                }}
              >
                <WashiTape
                  className="chaos-note__tape"
                  tone={index % 2 === 0 ? "brass" : "burgundy"}
                />
                <p className="chaos-note__index">
                  Moment {String(index + 1).padStart(2, "0")}
                </p>
                <h3>
                  {moment.title ? moment.title : <Placeholder>Add a moment</Placeholder>}
                </h3>
                {moment.body ? (
                  <p>{moment.body}</p>
                ) : (
                  <p>
                    <Placeholder>What happened will go here.</Placeholder>
                  </p>
                )}
              </PaperSheet>
            ))}
          </div>
        ) : (
          <div className="chaos-notes chaos-notes--ghost">
            {[0, 1, 2].map((index) => (
              <div className="chaos-note chaos-note--ghost" key={index} aria-hidden="true">
                <WashiTape tone={index === 1 ? "olive" : "brass"} />
                <span className="ghost-label">MOMENT 0{index + 1}</span>
                <span className="ghost-line ghost-line--title" />
                <span className="ghost-line" />
                <span className="ghost-line ghost-line--short" />
              </div>
            ))}
            <p className="section-empty-copy">
              Funny moments, notes and cut-out scraps will be pinned here.
            </p>
          </div>
        )}
      </section>

      <section className="scrap-section scrap-section--quotes" aria-labelledby="chaos-quotes-heading">
        <SectionTitle index="II" title="Iconic quotes" id="chaos-quotes-heading">
          For the things that get said on repeat.
        </SectionTitle>

        {iconicQuotes.length > 0 ? (
          <div className="quote-grid">
            <Sticker className="quote-grid__sticker" tone="burgundy" rotate={5}>
              no context
            </Sticker>
            <WashiTape className="quote-grid__tape" tone="olive" />
            {iconicQuotes.map((quote) => (
              <figure className="quote-slip" key={quote.id}>
                <QuoteIcon size={19} strokeWidth={1.3} aria-hidden="true" />
                <blockquote>
                  {quote.text ? quote.text : <Placeholder>A quote goes here.</Placeholder>}
                </blockquote>
                {quote.context ? <figcaption>{quote.context}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : (
          <figure className="quote-slip quote-slip--empty">
            <QuoteIcon size={19} strokeWidth={1.3} aria-hidden="true" />
            <blockquote>
              <Placeholder>A quote will be tucked here.</Placeholder>
            </blockquote>
            <figcaption>Add a quote in src/data/chaos.ts</figcaption>
          </figure>
        )}
      </section>

      <section className="scrap-section" aria-labelledby="chaos-screenshots-heading">
        <SectionTitle index="III" title="Exhibit A" id="chaos-screenshots-heading">
          Screenshots, receipts and evidence.
        </SectionTitle>

        {screenshots.length > 0 ? (
          <div className="screenshot-grid">
            {screenshots.map((screenshot, index) => (
              <figure className="screenshot-card" key={screenshot.id}>
                <span className="screenshot-card__clip" aria-hidden="true" />
                <div className="screenshot-card__image">
                  <ArchiveImage
                    src={screenshot.image}
                    alt={screenshot.alt || screenshot.caption || "Archived screenshot"}
                    label="Screenshot"
                  />
                </div>
                <figcaption>
                  <span className="eyebrow">Exhibit {String(index + 1).padStart(2, "0")}</span>
                  {screenshot.caption ? (
                    screenshot.caption
                  ) : (
                    <Placeholder>Add a caption</Placeholder>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="screenshot-grid screenshot-grid--ghost" aria-hidden="true">
            {[0, 1].map((index) => (
              <div className="screenshot-card screenshot-card--ghost" key={index}>
                <div className="screenshot-card__image">
                  <ImageIcon size={22} strokeWidth={1.1} />
                </div>
                <span className="ghost-line" />
              </div>
            ))}
            <p className="section-empty-copy">
              Screenshots will be clipped in here, with the story attached.
            </p>
          </div>
        )}
      </section>

      <section className="scrap-section" aria-labelledby="chaos-awards-heading">
        <SectionTitle index="IV" title="The not-so-serious awards" id="chaos-awards-heading">
          Highly official. Barely scientific.
        </SectionTitle>

        {awards.length > 0 ? (
          <div className="award-grid">
            {awards.map((award) => (
              <article className="award-card" key={award.id}>
                <span className="award-card__medal" aria-hidden="true">
                  <Trophy size={20} strokeWidth={1.3} />
                </span>
                <p className="eyebrow">Award</p>
                <h3>{award.title ? award.title : <Placeholder>Award name</Placeholder>}</h3>
                {award.recipient ? (
                  <p className="award-card__recipient">Goes to {award.recipient}</p>
                ) : (
                  <p className="award-card__recipient">
                    <Placeholder>Who receives it</Placeholder>
                  </p>
                )}
                {award.reason ? (
                  <p className="award-card__reason">{award.reason}</p>
                ) : (
                  <p className="award-card__reason">
                    <Placeholder>The reason will go here.</Placeholder>
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="award-grid award-grid--ghost" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <div className="award-card award-card--ghost" key={index}>
                <span className="award-card__medal">
                  <Sparkles size={18} strokeWidth={1.3} />
                </span>
                <span className="ghost-label">AWARD 0{index + 1}</span>
                <span className="ghost-line ghost-line--title" />
                <span className="ghost-line ghost-line--short" />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="scrap-section scrap-section--quiz" aria-labelledby="chaos-quiz-heading">
        <SectionTitle index="V" title="The completely unscientific quiz" id="chaos-quiz-heading">
          A very serious investigation into Pinku lore. Choose carefully.
        </SectionTitle>

        {quizQuestions.length > 0 ? (
          <Quiz questions={quizQuestions} />
        ) : (
          <div className="quiz-empty">
            <HelpCircle size={28} strokeWidth={1.1} aria-hidden="true" />
            <div>
              <h3>The quiz is still sealed.</h3>
              <p>Questions, options and answers can be added whenever you like.</p>
            </div>
          </div>
        )}
      </section>

      {isChaosEmpty ? (
        <p className="content-hint content-hint--center">
          <span>This chapter is ready to be filled. Add its content in</span>
          <code>src/data/chaos.ts</code>
        </p>
      ) : null}
    </div>
  );
}
