import type { PlaylistTrack, VoiceMessage } from "../types/content";

/**
 * The Soundtrack.
 *
 * Add local audio files to `public/assets/music/` when you are ready. Nothing
 * autoplays, and rows without audio still show the dedication.
 */
export const playlist: PlaylistTrack[] = [
  {
    id: "track-1",
    title: "Tera Yaar Hoon Main",
    artist: "Arijit Singh",
    note: "Because some songs say \"I'm here\" better than I do.",
  },
  {
    id: "track-2",
    title: "Yeh Dosti",
    artist: "Kishore Kumar & Manna Dey",
    note: "The original friendship anthem. No arguments.",
  },
  {
    id: "track-3",
    title: "Count on Me",
    artist: "Bruno Mars",
    note: "One call away. Literally.",
  },
  {
    id: "track-4",
    title: "Aao Milo Chale",
    artist: "Shaan & K.K.",
    note: "For the no-plan trip we keep talking about.",
  },
];

/**
 * An optional voice message for The Soundtrack chapter. Add a local audio file
 * to `public/assets/audio/` and set `src` to its path.
 */
export const soundtrackVoiceMessage: VoiceMessage = {
  id: "soundtrack-voice",
  label: "A voice note for the archive",
  src: "",
  note: "A little something to hear when you need my voice in the room.",
};
