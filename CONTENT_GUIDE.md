# Content Guide

This archive is a **structure waiting for your words**. Everything personal lives in plain TypeScript files under `src/data/`. You do not need to touch the React components to add photos, stories, songs or letters.

> **Preview content:** the archive currently contains the nine supplied photographs and dummy copy that begins with `Dummy`. Search for `Dummy` to find every temporary sentence, and replace the `Month YYYY` date placeholders in `memories.ts` and `timeline.ts`. Removing an entry restores that chapter’s designed empty state.

If you only do one thing, edit the files in this order:

1. `src/data/profile.ts` — names and the two opening messages.
2. `src/data/memories.ts` — the photographs, which power two chapters.
3. `src/data/timeline.ts` — the story in chronological order.
4. `src/data/letters.ts` and `src/data/finale.ts` — the handwritten-style letters.
5. `src/data/playlist.ts` — songs and a voice note.

After an edit, the development server updates automatically. Before sharing, run `npm run build` once to make sure there are no typing mistakes.

> **A note on privacy:** keep photographs and audio inside this project (`public/assets/`) rather than linking to public social posts or random image hosts. The project has no login; anyone with the deployed URL can see whatever you add.

---

## 1. Name, nickname and cover copy

Open `src/data/profile.ts`.

```ts
export const profile: Profile = {
  name: "Ruchita",
  nickname: "Pinku",
  pronouns: "she/her",
  birthdayMilestone: 20,

  introMessage: "Dummy welcome message — replace me.",
  coverSubtitle: "Dummy subtitle — replace me.",
  coverDedication: "Dummy cover note — replace me.",
  coverDedicationSignoff: "Dummy sign-off",

  coverPhoto: "/assets/photos/photo-09.jpg",
  coverPhotoAlt: "A young woman in a cream and blue saree standing outdoors beside a hedge.",
  coverPhotoPosition: "center 50%",
};
```

| Field | Where it appears |
| --- | --- |
| `name` | Envelope, cover identity, footer |
| `nickname` | Envelope, cover, footer and the small brand subtitle |
| `pronouns` | The cover metadata block |
| `birthdayMilestone` | The “20” stamps, cover volume and finale end card |
| `introMessage` | The card revealed after the invitation seal is opened |
| `coverSubtitle` | The line below the recipient’s name on the cover |
| `coverDedication` | The note tucked into the cover collage |
| `coverDedicationSignoff` | Optional sign-off for that note, e.g. your name |
| `coverPhoto` | An optional photograph for the cover collage |
| `coverPhotoAlt` | A written description of that photograph |
| `coverPhotoPosition` | Optional crop focus for the cover image, e.g. `"center 20%"` |

To add a cover photo:

1. Copy the file into `public/assets/photos/`. For example: `public/assets/photos/cover.jpg`.
2. Set:

```ts
coverPhoto: "/assets/photos/cover.jpg",
coverPhotoAlt: "A description of the photograph for screen readers.",
```

Leave a field as `""` to keep the designed writing placeholder. That is intentional, not a bug.

---

## 2. Chapter titles and descriptions

Open `src/data/chapters.ts`. Each chapter has a number, a full title, a shorter navigation title and a neutral one-line description:

```ts
{
  id: "beginning",
  number: "02",
  title: "The Beginning",
  navTitle: "The Beginning",
  deck: "Dates, places and small beginnings — kept in order.",
  path: "/chapter/beginning",
  tone: "paper",
}
```

You can rename chapters and rewrite the deck lines. **Do not change `id` or `path`** unless you also update the routes in `src/app/App.tsx`; keeping them stable preserves links and browser history.

The route for every chapter is also its shareable URL. `src/data/chapters.ts` feeds the cover contents, the contents folio, previous/next navigation, progress numbers and page titles.

---

## 3. Photographs, captions and stories

Open `src/data/memories.ts`.

This single array powers **both** The Polaroid Wall and The Memory Constellation. Add a photo once and it appears in both places.

Each entry looks like this:

```ts
{
  id: "photo-1",
  title: "A short title",
  caption: "A one-line caption written on the Polaroid.",
  story: "The longer story that appears when the photograph is opened.",
  image: "/assets/photos/your-photo.jpg",
  alt: "A written description of what is happening in the photograph.",
  date: "YOUR DATE",
  category: "favourite",
  tags: ["optional", "tags"],
  imagePosition: "center 20%",
}
```

### Adding a photograph

1. Copy the image into `public/assets/photos/`.
2. Use a simple filename with no spaces: `first-trip.jpg`, not `First Trip!.JPG`.
3. Reference it from the site root:

```ts
image: "/assets/photos/first-trip.jpg",
```

4. Write real `alt` text. Describe what a friend would need to know if they could not see the photo. Example: `"Two friends sitting on a wall at dusk."` Do not write “image” or “photo”.

### Categories

`category` must be exactly one of:

- `"funny"`
- `"favourite"`
- `"emotional"`
- `"random"`

The filter buttons on the Polaroid Wall are generated from the categories you actually use. If every photo is `"favourite"`, only All and Favourites appear.

### Fields you can leave out

- `date` is optional.
- `tags` is optional.
- `imagePosition` is optional. It controls which part of a photo survives the square Polaroid crop. Use values such as `"center 15%"` for a portrait where the head is near the top, or `"center 60%"` to favour the lower half.
- `title`, `caption` and `story` may be empty while you are still writing. The lightbox will show a calm writing placeholder.

The constellation assigns each photo a **stable position** based on its order, so it looks the same on every visit. Reordering the array changes the constellation; it never changes randomly.

---

## 4. The Beginning (timeline)

Open `src/data/timeline.ts`.

```ts
export const timelineEntries: TimelineEntry[] = [
  {
    id: "entry-1",
    date: "YOUR DATE",
    title: "Your title here",
    description: "Your story goes here.",
    image: "/assets/photos/your-photo.jpg",
    imageAlt: "A description of the photograph.",
    imagePosition: "center 30%",
  },
];
```

- Entries appear in the order they are written in the file. Put the earliest first.
- `date` is free text, so you can use a full date, a year, “before the internet”, or leave it out.
- `image` and `imageAlt` are optional. Without an image, the card uses a designed photograph placeholder.
- `imagePosition` is optional and works like the same field in `memories.ts`.
- Keep each `id` unique. Duplicate IDs can cause React rendering problems.

---

## 5. The Chaos Archive

Open `src/data/chaos.ts`. It holds five independent collections:

```ts
export const funnyMoments: FunMoment[] = [/* preview items */];
export const iconicQuotes: Quote[] = [/* preview items */];
export const screenshots: Screenshot[] = [/* preview items */];
export const awards: Award[] = [/* preview items */];
export const quizQuestions: QuizQuestion[] = [/* preview items */];
```

The preview file currently contains three dummy entries in each collection, plus two photographs used as exhibit placeholders. Replace or delete them as you write the real chapter.

### Funny moments

```ts
{ id: "moment-1", title: "Your title here", body: "Your story goes here." }
```

### Quotes

```ts
{ id: "quote-1", text: "The exact words.", context: "Where or when it was said." }
```

`context` is optional.

### Screenshots

```ts
{
  id: "shot-1",
  image: "/assets/photos/chat.png",
  alt: "A description of the screenshot.",
  caption: "A short caption.",
}
```

Put screenshots in `public/assets/photos/`. Crop or blur anything you do not want visible. The site cannot blur faces or names automatically.

### Awards

```ts
{
  id: "award-1",
  title: "Award name",
  recipient: "Pinku",
  reason: "The reason for the award.",
}
```

`recipient` and `reason` are optional; the card hides them when they are empty.

### Quiz

The quiz is optional. It is hidden from the chapter when `quizQuestions` is empty.

```ts
{
  id: "question-1",
  question: "Your question?",
  options: ["First option", "Second option", "Third option"],
  answerIndex: 2,
  explanation: "Shown after the reader answers.",
}
```

- `answerIndex` starts at **0**. In the example above, the correct answer is the third option.
- Use at least two options.
- `explanation` is optional.

---

## 6. The Little Things (appreciation notes)

Open `src/data/appreciation.ts`.

```ts
export const appreciationNotes: AppreciationNote[] = [
  {
    id: "note-1",
    heading: "Your heading here",
    body: "Your note goes here.",
  },
];
```

The chapter alternates the notes into a paper stack. Add as many as you like; they flow into a responsive layout. A missing heading or body displays a writing placeholder rather than empty space. The preview file currently contains four dummy notes.

---

## 7. The Soundtrack and voice notes

Open `src/data/playlist.ts`.

### Adding a song

1. Put the audio file in `public/assets/music/`. Use a browser-friendly format such as `.mp3` or `.m4a`.
2. Add an entry:

```ts
{
  id: "track-1",
  title: "Your song title",
  artist: "Artist name",
  audioSrc: "/assets/music/your-file.mp3",
  note: "Why this song belongs in the archive.",
}
```

- Nothing autoplays. The reader presses play.
- The preview file contains four dummy track titles and notes, with no `audioSrc` attached yet.
- If a track has no `audioSrc`, its play button is disabled and labelled “Audio not added”; it never pretends to work.
- The player includes play/pause, seek, elapsed time and volume. All controls are disabled until a playable track is selected.
- Keep files reasonably small. A 3–8 MB MP3 per track is usually plenty. Do not upload a whole album at lossless quality.

### Adding a voice note

The Soundtrack chapter has one optional voice-note slot:

```ts
export const soundtrackVoiceMessage: VoiceMessage = {
  id: "soundtrack-voice",
  label: "A voice note for the archive",
  src: "/assets/audio/your-voice-note.m4a",
  note: "A short line about the recording.",
};
```

Put the file in `public/assets/audio/`. Leaving `src` as `""` shows a designed “not added yet” player state.

---

## 8. Open When… letters

Open `src/data/letters.ts`.

The default envelopes are **suggested titles**, and the preview file fills each message with dummy copy:

```ts
{
  id: "open-when-sad",
  title: "Open when you’re sad",
  message: "Dummy letter — replace me.",
  envelopeStyle: "burgundy",
}
```

- Rename, reorder, remove, or add envelopes freely.
- `title` appears on the outside of the envelope and in the opened letter heading.
- Write the letter in `message`. Use `\n\n` to start a new paragraph; a single `\n` stays within a paragraph.
- `envelopeStyle` accepts `"burgundy"`, `"olive"`, `"brass"` or `"ink"`.
- Keep each `id` unique.
- Empty messages open to a clear “Add your letter here” placeholder, so you can add letters gradually. The preview file currently includes a dummy message for all five envelopes.

The envelope count in the chapter intro is written manually in `src/features/letters/LettersPage.tsx` (`Five envelopes...`). If you add or remove envelopes, update that sentence too.

---

## 9. To Be Continued (future plans)

Open `src/data/futurePlans.ts`.

```ts
export const futurePlans: FuturePlan[] = [
  {
    id: "plan-1",
    title: "Your plan here",
    note: "A little more detail.",
    status: "idea",
  },
];
```

`status` must be one of:

- `"idea"`
- `"planned"`
- `"completed"`

Each status gets its own label and small icon. `note` is optional. The postcard, ticket and map collage on the right is decorative and unchanged by the number of plans. The preview file currently contains four dummy plans.

---

## 10. The Final Letter

Open `src/data/finale.ts`.

```ts
export const finalLetter: FinalLetter = {
  title: "Your final letter title",
  message: "Your letter goes here.\n\nA second paragraph.",
  signoff: "Your sign-off",
  voiceSrc: "/assets/audio/final-voice-note.m4a",
  voiceLabel: "A voice note for the last page",
};
```

- The finale splits `message` on blank lines (`\n\n`) into readable paragraphs.
- The preview file currently contains a three-paragraph dummy letter and a dummy sign-off. Replace both before sharing the archive.
- Leave `voiceSrc` as `""` if there is no recording; the voice-note player shows its designed empty state.
- The “Celebrate 20” button is part of the reveal, not a fake control: it triggers the confetti and the final end card.
- The final end card uses `profile.name`, `profile.nickname` and `profile.birthdayMilestone`, so those stay consistent with the cover.

Put the optional final voice note in `public/assets/audio/`.

---

## 11. Where files go

```text
public/
└── assets/
    ├── photos/       photographs, screenshots, scans
    ├── music/        songs for the vinyl player
    ├── audio/        voice notes and recordings
    ├── backgrounds/  optional background textures
    └── stickers/     optional doodles or scanned stickers
```

Reference everything from the site root:

```ts
image: "/assets/photos/photo-name.jpg"
audioSrc: "/assets/music/song-name.mp3"
voiceSrc: "/assets/audio/voice-name.m4a"
```

### File tips

- Use lowercase names, hyphens instead of spaces, and no punctuation that needs escaping.
- JPG/WebP/PNG work for images. WebP is usually the smallest.
- Resize very large phone photos to around 1600–2000 px on the long edge before adding them. This keeps the gallery fast.
- MP3/M4A are the safest audio choices across phones and laptops.
- Avoid video backgrounds; they are not used by this version.

---

## 12. Editing safely

- Keep every `id` unique within its file.
- Keep commas and quotation marks intact. If you paste text containing a double quote, escape it with `\"`, or use curly quotation marks (“ ”) inside the string.
- Apostrophes are fine inside double-quoted strings: `"You're here."`
- Leave arrays as `[]` if you have nothing to add. Empty collections are designed to render good empty pages.
- Do not put personal text directly into JSX files in `src/features/`; future edits will be much harder. Keep words in `src/data/`.

### Check your edits

```bash
npm run typecheck
npm run lint
npm run build
```

If a build fails, the error usually names the file and line. A missing comma after `}` in a data array is the most common cause.

---

## 13. Quick personalization checklist

- [ ] Edit `profile.ts` (intro, cover subtitle, dedication, cover photo).
- [ ] Add 5–15 photos to `memories.ts` with alt text and captions.
- [ ] Add timeline entries in chronological order.
- [ ] Fill or remove the Open When envelopes.
- [ ] Add songs and (optionally) a voice note.
- [ ] Add as many Little Things notes as you want.
- [ ] Write the final letter and sign-off.
- [ ] Run `npm run build` and open the preview on a phone.
- [ ] Check that no private screenshot accidentally shows names, addresses or phone numbers.
