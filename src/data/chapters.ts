import type { Chapter } from "../types/content";

/**
 * The archive's table of contents.
 *
 * Numbers, titles and neutral descriptors can be edited here. Paths are used
 * for direct, bookmarkable chapter links. The invitation has its own route.
 */
export const chapters: Chapter[] = [
  {
    id: "invitation",
    number: "00",
    title: "The Invitation",
    navTitle: "The Invitation",
    deck: "A sealed envelope, addressed by hand.",
    path: "/",
    tone: "dark",
  },
  {
    id: "cover",
    number: "01",
    title: "The Cover",
    navTitle: "The Cover",
    deck: "The front door of the archive.",
    path: "/cover",
    tone: "paper",
  },
  {
    id: "beginning",
    number: "02",
    title: "The Beginning",
    navTitle: "The Beginning",
    deck: "Dates, places and small beginnings — kept in order.",
    path: "/chapter/beginning",
    tone: "paper",
  },
  {
    id: "chaos",
    number: "03",
    title: "The Chaos Archive",
    navTitle: "The Chaos Archive",
    deck: "Jokes, quotes, screenshots and highly questionable awards.",
    path: "/chapter/chaos-archive",
    tone: "paper",
  },
  {
    id: "polaroids",
    number: "04",
    title: "The Polaroid Wall",
    navTitle: "The Polaroid Wall",
    deck: "Photographs, dates and the stories attached to them.",
    path: "/chapter/polaroid-wall",
    tone: "paper",
  },
  {
    id: "constellation",
    number: "05",
    title: "The Memory Constellation",
    navTitle: "The Constellation",
    deck: "The same memories, seen from a different sky.",
    path: "/chapter/memory-constellation",
    tone: "night",
  },
  {
    id: "little-things",
    number: "06",
    title: "The Little Things",
    navTitle: "The Little Things",
    deck: "Notes that deserve a page of their own.",
    path: "/chapter/little-things",
    tone: "warm",
  },
  {
    id: "soundtrack",
    number: "07",
    title: "The Soundtrack",
    navTitle: "The Soundtrack",
    deck: "The songs that belong to this archive.",
    path: "/chapter/soundtrack",
    tone: "paper",
  },
  {
    id: "open-when",
    number: "08",
    title: "Open When…",
    navTitle: "Open When…",
    deck: "Sealed letters for the days that need them.",
    path: "/chapter/open-when",
    tone: "paper",
  },
  {
    id: "to-be-continued",
    number: "09",
    title: "To Be Continued",
    navTitle: "To Be Continued",
    deck: "Room for everything that hasn't happened yet.",
    path: "/chapter/to-be-continued",
    tone: "paper",
  },
  {
    id: "final-letter",
    number: "10",
    title: "The Final Letter",
    navTitle: "The Final Letter",
    deck: "One last envelope, saved for the end.",
    path: "/chapter/final-letter",
    tone: "paper",
  },
];

/** Chapters 01–10 are the reading sequence; 00 is the entry experience. */
export const readingChapters = chapters.filter((chapter) => chapter.id !== "invitation");

export function getChapterByPath(pathname: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.path === pathname);
}

export function getChapterBySlug(slug: string | undefined): Chapter | undefined {
  if (!slug) return undefined;
  return chapters.find((chapter) => chapter.path === `/chapter/${slug}`);
}

export function getReadingIndex(pathname: string): number {
  return readingChapters.findIndex((chapter) => chapter.path === pathname);
}

export function getAdjacentChapters(pathname: string): {
  previous: Chapter | null;
  next: Chapter | null;
} {
  const index = getReadingIndex(pathname);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? readingChapters[index - 1] : null,
    next: index < readingChapters.length - 1 ? readingChapters[index + 1] : null,
  };
}
