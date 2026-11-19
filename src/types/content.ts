/**
 * Shared content models for The Birthday Archive.
 *
 * All fields that hold personal material are empty in `src/data/` until the
 * archive owner adds them. Components render designed placeholders when a
 * field is blank, so the site still feels complete with an empty archive.
 */

export type MemoryCategory = "funny" | "emotional" | "random" | "favourite";

export interface Profile {
  name: string;
  nickname: string;
  pronouns: string;
  birthdayMilestone: number;
  /** Optional welcome message revealed after the invitation is opened. */
  introMessage: string;
  /** Optional subtitle on the cover, e.g. a dedication or one-line note. */
  coverSubtitle: string;
  /** Optional longer dedication on the cover. */
  coverDedication: string;
  /** Optional sign-off for the cover dedication, e.g. the giver's name. */
  coverDedicationSignoff?: string;
  /** Optional cover photograph, referenced from /assets/photos/. */
  coverPhoto?: string;
  coverPhotoAlt?: string;
  /** Optional CSS object-position for the cover crop, e.g. "center 20%". */
  coverPhotoPosition?: string;
}

export type ChapterTone = "dark" | "paper" | "warm" | "night";

export interface Chapter {
  id: string;
  /** Display number, kept as a string so "00" survives. */
  number: string;
  title: string;
  /** Shorter label for the contents drawer and footer navigation. */
  navTitle: string;
  /** A neutral, editable chapter descriptor. Not personal copy. */
  deck: string;
  path: string;
  tone: ChapterTone;
}

export interface TimelineEntry {
  id: string;
  date?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** Optional CSS object-position for the cropped card image, e.g. "center 20%". */
  imagePosition?: string;
}

export interface Memory {
  id: string;
  title: string;
  caption: string;
  story: string;
  image?: string;
  date?: string;
  category: MemoryCategory;
  tags?: string[];
  /** Optional CSS object-position for cropped views, e.g. "center 15%". */
  imagePosition?: string;
}

export interface PhotoMemory extends Memory {
  /** Alt text for the photograph. Describe what is happening in the image. */
  alt: string;
}

export interface FunMoment {
  id: string;
  title: string;
  body: string;
}

export interface Quote {
  id: string;
  text: string;
  context?: string;
}

export interface Screenshot {
  id: string;
  image?: string;
  alt?: string;
  caption?: string;
}

export interface Award {
  id: string;
  title: string;
  recipient?: string;
  reason?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Zero-based index of the correct option. */
  answerIndex: number;
  explanation?: string;
}

export interface AppreciationNote {
  id: string;
  heading: string;
  body: string;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  audioSrc?: string;
  note?: string;
}

export interface VoiceMessage {
  id: string;
  label: string;
  src?: string;
  note?: string;
}

export interface Letter {
  id: string;
  title: string;
  message: string;
  envelopeStyle?: string;
}

export type FuturePlanStatus = "idea" | "planned" | "completed";

export interface FuturePlan {
  id: string;
  title: string;
  note?: string;
  status: FuturePlanStatus;
}

export interface FinalLetter {
  title: string;
  message: string;
  signoff: string;
  voiceSrc?: string;
  voiceLabel?: string;
}
