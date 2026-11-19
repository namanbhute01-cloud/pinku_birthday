import type { Profile } from "../types/content";

/**
 * Edit this file to change the recipient details and the cover/intro copy.
 *
 * PREVIEW CONTENT: the message and cover text below are dummy copy. Replace
 * every sentence beginning with "Dummy" with your own words. The cover
 * photograph is already wired to the supplied portrait.
 */
export const profile: Profile = {
  name: "Ruchita",
  nickname: "Pinku",
  pronouns: "she/her",
  birthdayMilestone: 20,

  // Revealed after the wax seal on the opening envelope is opened.
  introMessage:
    "Dummy welcome message. Replace this paragraph with the real invitation when you are ready. It is only here to preview how the opened envelope will read.",

  // The cover looks complete without these. Add your own words when ready.
  coverSubtitle: "Dummy subtitle — replace this line with your own dedication.",
  coverDedication:
    "Dummy cover note. Replace this short paragraph with the real dedication for the inside cover. This text is placeholder scaffolding only.",
  coverDedicationSignoff: "Dummy sign-off",

  // Cover photograph from the supplied set.
  coverPhoto: "/assets/photos/photo-09.jpg",
  coverPhotoAlt:
    "A young woman in a cream and blue saree standing outdoors beside a hedge.",
};
