import type { PlaylistTrack, VoiceMessage } from "../types/content";

/**
 * The Soundtrack.
 *
 * PREVIEW CONTENT: the track titles and notes below are dummy copy. No audio
 * files are attached yet, so every row will read "Audio not added". Replace the
 * details and add local files to `public/assets/music/` when you are ready.
 * Nothing autoplays.
 */
export const playlist: PlaylistTrack[] = [
  {
    id: "track-1",
    title: "Dummy track one",
    artist: "Dummy artist",
    note: "Dummy note. Replace with why this song belongs here.",
  },
  {
    id: "track-2",
    title: "Dummy track two",
    artist: "Dummy artist",
    note: "Dummy note for the second track. Add the real dedication later.",
  },
  {
    id: "track-3",
    title: "Dummy track three",
    artist: "Dummy artist",
    note: "Dummy note. This is placeholder copy only.",
  },
  {
    id: "track-4",
    title: "Dummy track four",
    artist: "Dummy artist",
    note: "Dummy note for the final track in the preview list.",
  },
];

/**
 * An optional voice message for The Soundtrack chapter. Add a local audio file
 * to `public/assets/audio/` and set `src` to its path. Leave `src` empty to show
 * the built-in "not added yet" state.
 */
export const soundtrackVoiceMessage: VoiceMessage = {
  id: "soundtrack-voice",
  label: "A voice note for the archive",
  src: "",
  note: "Dummy note about this voice message. Replace it with your own when the recording is added.",
};
