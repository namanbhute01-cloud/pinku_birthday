import type { ComponentType } from "react";
import { chapters } from "../data/chapters";
import { NotFoundPage } from "../features/not-found/NotFoundPage";
import type { Chapter } from "../types/content";

export interface ChapterPageProps {
  chapter: Chapter;
}

interface ChapterRouteProps {
  slug: string;
  component: ComponentType<ChapterPageProps>;
}

/**
 * Resolves a chapter's editorial metadata and hands it to the feature page, so
 * chapter numbers, titles and decks stay data-driven.
 */
export function ChapterRoute({ slug, component: Page }: ChapterRouteProps) {
  const chapter = chapters.find((item) => item.path === `/chapter/${slug}`);
  if (!chapter) return <NotFoundPage />;
  return <Page chapter={chapter} />;
}
