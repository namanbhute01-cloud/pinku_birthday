import type { TimelineEntry } from "../types/content";

/**
 * The Beginning — a chronological timeline.
 *
 * PREVIEW CONTENT: the entries below use dummy titles, dates and descriptions
 * so the layout can be reviewed with photographs in place. Replace every
 * "Dummy" value with your own. The dates are format placeholders, not real
 * dates. If `image` is omitted, the card uses a designed photograph placeholder.
 */
export const timelineEntries: TimelineEntry[] = [
  {
    id: "timeline-01",
    date: "Month YYYY",
    title: "Dummy first entry",
    description:
      "Dummy timeline text. Replace this entry with the real date, place and story. The photograph can stay, or you can point the image field at a different file.",
    image: "/assets/photos/photo-03.jpg",
    imageAlt:
      "A young woman outdoors wearing animal ears and a blue patterned tie over a light shirt.",
  },
  {
    id: "timeline-02",
    date: "Month YYYY",
    title: "Dummy second entry",
    description:
      "Dummy timeline text for the second milestone. Use this space for the real memory and keep the copy as long or as short as you like.",
    image: "/assets/photos/photo-08.jpg",
    imageAlt:
      "A close-up portrait of a young woman in a yellow top, with one hand near her ear.",
  },
  {
    id: "timeline-03",
    date: "Month YYYY",
    title: "Dummy third entry",
    description:
      "Dummy timeline text. This paragraph is only here to show how a slightly longer entry wraps beside the date and the photograph.",
    image: "/assets/photos/photo-01.jpg",
    imageAlt:
      "A young woman in a striped shirt taking a mirror selfie with her phone.",
  },
  {
    id: "timeline-04",
    date: "Month YYYY",
    title: "Dummy fourth entry",
    description:
      "Dummy timeline text for the most recent placeholder. Replace it with the real ending of this chapter, or add more entries above it.",
    image: "/assets/photos/photo-02.jpg",
    imageAlt:
      "A young woman in a white off-shoulder top taking a mirror selfie with her phone.",
  },
];
