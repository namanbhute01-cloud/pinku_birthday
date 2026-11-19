import {
  CalendarDays,
  CheckCircle2,
  Map,
  Sparkles,
  Ticket,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { EmptyState } from "../../components/EmptyState";
import { Placeholder } from "../../components/Placeholder";
import {
  HeartDoodle,
  PaperClip,
  StickerCluster,
} from "../../components/Decorations";
import { Sticker } from "../../components/Sticker";
import { InkStar } from "../../components/Ornaments";
import { WashiTape } from "../../components/WashiTape";
import { futurePlans } from "../../data/futurePlans";
import type { ChapterPageProps } from "../../app/ChapterRoute";
import type { FuturePlanStatus } from "../../types/content";

const STATUS_META: Record<
  FuturePlanStatus,
  { label: string; icon: typeof Sparkles }
> = {
  idea: { label: "Idea", icon: Sparkles },
  planned: { label: "Planned", icon: CalendarDays },
  completed: { label: "Completed", icon: CheckCircle2 },
};

/** Chapter 09 — a collage of blank postcards and a future-plan ledger. */
export function FuturePlansPage({ chapter }: ChapterPageProps) {
  return (
    <div className="chapter-page future-page">
      <PageHeader
        chapterNumber={chapter.number}
        eyebrow="The next page is blank"
        title={chapter.title}
        deck={chapter.deck}
        decor={
          <StickerCluster>
            <Sticker tone="brass" rotate={-4}>
              someday
            </Sticker>
            <Sticker tone="paper" rotate={3}>
              not yet
            </Sticker>
            <InkStar />
          </StickerCluster>
        }
      />

      <div className="future-layout">
        <div className="future-content">
          {futurePlans.length > 0 ? (
            <ol className="plan-list">
              {futurePlans.map((plan, index) => {
                const status = STATUS_META[plan.status];
                const StatusIcon = status.icon;
                return (
                  <li className="plan-card" key={plan.id}>
                    <span className="plan-card__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="plan-card__body">
                      <span className="plan-status" data-status={plan.status}>
                        <StatusIcon size={13} strokeWidth={1.8} aria-hidden="true" />
                        {status.label}
                      </span>
                      <h2>
                        {plan.title ? (
                          plan.title
                        ) : (
                          <Placeholder>Add a future plan</Placeholder>
                        )}
                      </h2>
                      {plan.note ? (
                        <p>{plan.note}</p>
                      ) : (
                        <p>
                          <Placeholder>A little more detail will go here.</Placeholder>
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <EmptyState
              kicker="Reserved for later"
              title="Nothing has been planned yet."
              fileHint="src/data/futurePlans.ts"
            >
              <p>
                This chapter is a place for ideas, half-made plans and things already
                done. The postcards are waiting for their first destination.
              </p>
            </EmptyState>
          )}

          <p className="future-footnote hand">
            the rest of the story is still unwritten
            <HeartDoodle className="future-content__heart" />
          </p>
        </div>

        <aside className="future-collage" aria-hidden="true">
          <Sticker className="future-collage__sticker" tone="olive" rotate={-7}>
            someday
          </Sticker>
          <div className="future-postcard">
            <Sticker className="future-postcard__sticker" tone="paper" rotate={-4}>
              one day
            </Sticker>
            <span className="future-postcard__stamp">
              <span>XX</span>
            </span>
            <div className="future-postcard__lines">
              <span className="future-postcard__kicker">POSTCARD</span>
              <span className="future-postcard__rule" />
              <span className="future-postcard__rule" />
              <span className="future-postcard__rule future-postcard__rule--short" />
            </div>
            <span className="future-postcard__caption hand">somewhere, later</span>
            <WashiTape className="future-postcard__tape" tone="brass" />
          </div>

          <div className="future-ticket">
            <span className="future-ticket__edge" />
            <Ticket size={17} strokeWidth={1.2} />
            <span className="future-ticket__title">ADMIT ONE</span>
            <span className="future-ticket__rule" />
            <span className="future-ticket__small">A FUTURE ADVENTURE</span>
            <span className="future-ticket__number">Nº ____</span>
          </div>

          <div className="future-map">
            <PaperClip className="future-map__clip" rotate={7} />
            <Map size={20} strokeWidth={1.1} />
            <svg viewBox="0 0 220 100" fill="none">
              <path
                d="M8 78c32-51 61 16 90-15 24-26 56-11 62-44"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 5"
                strokeLinecap="round"
              />
              <circle cx="8" cy="78" r="3" fill="currentColor" />
              <circle cx="160" cy="19" r="3.5" fill="none" stroke="currentColor" />
            </svg>
            <span className="future-map__caption">the route so far</span>
          </div>

          <span className="future-collage__note hand">
            to be continued
            <span aria-hidden="true">↗</span>
          </span>
        </aside>
      </div>
    </div>
  );
}
