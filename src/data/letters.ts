import type { Letter } from "../types/content";

/**
 * Open When… — the envelope titles are listed here with preview messages.
 *
 * PREVIEW CONTENT: each message below is dummy copy, written only to show how
 * an opened letter fills the modal. Replace every message with your own words.
 * Rename, reorder or remove any envelope.
 */
export const letters: Letter[] = [
  {
    id: "open-when-sad",
    title: "Open when you’re sad",
    message:
      "Dummy letter for this envelope. Replace this paragraph with the real words you want to leave for the day this letter is opened. It is only here so the finished layout can be previewed.",
    envelopeStyle: "burgundy",
  },
  {
    id: "open-when-miss-me",
    title: "Open when you miss me",
    message:
      "Dummy letter for this envelope. Add the real message here when you are ready — a few sentences are enough, and the page will make room for more.",
    envelopeStyle: "olive",
  },
  {
    id: "open-when-motivation",
    title: "Open when you need motivation",
    message:
      "Dummy letter for this envelope. This placeholder shows how a slightly longer note sits inside the letter page. Replace it with your own words before the archive is shared.",
    envelopeStyle: "brass",
  },
  {
    id: "open-when-laugh",
    title: "Open when you need a laugh",
    message:
      "Dummy letter for this envelope. Replace this with the real message, the remembered line, or the story that needs to be retold here.",
    envelopeStyle: "ink",
  },
  {
    id: "open-when-reminder",
    title: "Open when you need a reminder",
    message:
      "Dummy letter for this envelope. Add the real reminder here. This preview text can be deleted completely once the letter is written.",
    envelopeStyle: "burgundy",
  },
];
