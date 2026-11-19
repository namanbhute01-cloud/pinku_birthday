import type { FinalLetter } from "../types/content";

/**
 * The final letter.
 *
 * PREVIEW CONTENT: the title, paragraphs and sign-off below are dummy copy so
 * the opened finale can be reviewed. Replace all of it with your own letter.
 * Blank lines separate paragraphs. The optional voice message can point to a
 * file in `public/assets/audio/`.
 */
export const finalLetter: FinalLetter = {
  title: "Dummy final letter",
  message:
    "Dummy final letter paragraph one. Replace this with the real opening of your letter.\n\nDummy final letter paragraph two. This is placeholder copy only, here to show how a longer letter is laid out on the final page.\n\nDummy final letter paragraph three. Add the real closing thoughts here when you are ready.",
  signoff: "Dummy sign-off — replace with your name",
  voiceSrc: "",
  voiceLabel: "A voice note for the last page",
};
