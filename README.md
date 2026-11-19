# The Birthday Archive

A private, interactive scrapbook for **Ruchita (“Pinku”)’s 20th birthday**. It is built as a small, cinematic reading experience: an invitation in a wax-sealed envelope, a cover and table of contents, ten chapters of memories and keepsakes, and a final letter saved for last.

The site now ships with **preview content**: the supplied photographs and clearly labelled dummy copy fill every chapter so the layout can be reviewed before the real wording is written. Everything personal still lives in plain TypeScript files under `src/data/`. Search for `Dummy` to find and replace the temporary copy; the designed empty states return automatically if you remove an entry.

---

## Replacing the preview content

1. Search the whole project for `Dummy` (or open each file in `src/data/`) and replace the preview sentences with your own words.
2. Replace every `Month YYYY` date placeholder in `src/data/timeline.ts` and `src/data/memories.ts` with a real date, or delete the `date` field.
3. The nine supplied photographs are already wired into the archive as `public/assets/photos/photo-01.jpg`–`photo-09.jpg`. Replace the files with your own photographs of the same names, or update the `image` paths in `src/data/memories.ts`, `src/data/timeline.ts` and `src/data/profile.ts`.
4. If a square Polaroid crop cuts off part of a face, adjust that photo's optional `imagePosition` value (for example `"center 15%"`) in `src/data/memories.ts`.
5. No music or voice recordings are included. Add audio files to `public/assets/music/` or `public/assets/audio/`, then set `audioSrc` or `src` in `src/data/playlist.ts` and `src/data/finale.ts`.

---

## Run it locally

Requirements: Node.js 18 or newer, and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Check TypeScript without writing a build |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

---

## The experience

- **00 — The Invitation** (`/`): a dark, cinematic envelope opening with an accessible wax-seal button and a skip control.
- **01 — The Cover** (`/cover`): a keepsake collage, recipient details and a visual table of contents for every chapter.
- **02 — The Beginning** (`/chapter/beginning`): an editorial friendship timeline.
- **03 — The Chaos Archive** (`/chapter/chaos-archive`): playful notes, quotes, screenshots, mock awards and an optional quiz.
- **04 — The Polaroid Wall** (`/chapter/polaroid-wall`): a filterable wall of photographs with an accessible detail lightbox.
- **05 — The Memory Constellation** (`/chapter/memory-constellation`): the same photographs plotted as a stable night sky, with a list-based alternative.
- **06 — The Little Things** (`/chapter/little-things`): a quiet stack of appreciation notes.
- **07 — The Soundtrack** (`/chapter/soundtrack`): a vinyl-inspired, user-controlled audio player and voice-note slot.
- **08 — Open When…** (`/chapter/open-when`): sealed envelopes that open into full letter views.
- **09 — To Be Continued** (`/chapter/to-be-continued`): a postcard-and-ticket collage for future plans.
- **10 — The Final Letter** (`/chapter/final-letter`): a second envelope, the final letter, confetti and an end card.

Every chapter opens by direct URL. The shared shell provides the contents folio, current chapter number, reading progress, previous/next navigation and a return-to-cover route. Browser back and forward work normally.

### Book-style page turning

- **Chapter navigation**: Chapter-to-chapter links, the footer’s previous/next entries, and the arrow keys (←/→) turn a two-sided paper leaf around the spine. The leaf lifts, casts a moving shadow and settles to reveal the destination. The URL changes immediately, so the animation never delays navigation or focus.
- **Turn eligibility**: Only the ten reading chapters (01–10) participate in the book turn. The invitation (`/`), 404 page, and any link with `data-page-turn="off"` or modifier keys bypass the animation and navigate immediately.
- **Page edges for the mouse**: On pointer devices at least 1024px wide, slim paper page edges sit at both viewport margins. Click the forward or backward edge to turn; hovering shows the destination chapter on a small paper note. They are hidden on touch and narrow screens, which keep the printed footer controls.
- **Arrow key guards**: Left/Right page turning is blocked while any open modal, dialog, form control, input, textarea, select, slider, or other interactive element has focus. Reduced-motion users (`prefers-reduced-motion`) navigate immediately without the sheet.
- **Opens at the top**: Every chapter change resets the scroll position instantly beneath the leaf, so the destination never inherits the previous page’s scroll position.
- **Navigation sources**: Page turns work from footer links, the cover’s contents sheet, the brand mark, the contents folio entries, and the page edges. All immediately update the URL and clean up the overlay after the animation.
- **Contents folio**: The header’s Contents tab opens a centred paper folio with two columns, dotted leaders, chapter numbers, reading progress and a handwritten “reading now” marker. On phones it becomes a single scrollable column inside the same paper sheet.

### Arrow-key controls

- Press **ArrowRight** to turn forward to the next reading chapter, and **ArrowLeft** to turn backward. These work anywhere in the app except inside open modals, dialogs, form controls (inputs, textareas, selects, sliders), media controls, and sliders.
- The chapter navigation footer shows `← → turn pages` with `aria-keyshortcuts` metadata for screen readers.
- Focus returns naturally after each turn; the header chapter number animates in on route change.

---

## Project structure

```text
birthday-archive/
├── public/
│   └── assets/
│       ├── photos/        personal photographs
│       ├── music/         songs for the soundtrack
│       ├── audio/         voice notes
│       ├── backgrounds/   optional background images
│       └── stickers/      optional scan/doodle assets
├── src/
│   ├── app/               routes, app shell, chapter route resolver
│   ├── components/        reusable scrapbook, modal and navigation parts
│   ├── data/              all editable content and identity details
│   ├── features/          one folder per chapter
│   ├── styles/            theme tokens, global, scrapbook, chapters, motion
│   ├── types/             shared TypeScript content models
│   ├── utils/             small helpers
│   └── main.tsx
├── AGENTS.md
├── CONTENT_GUIDE.md
├── OPENCODE_BUILD_PROMPT.md
├── eslint.config.js
├── vercel.json
└── vite.config.ts
```

All personal content lives in `src/data/`. The components only decide how it looks.

---

## Add your own content

Read **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** for beginner-friendly instructions and copy-paste examples.

Quick reference:

| What you want to change | File |
| --- | --- |
| Name, nickname, pronouns, intro/cover messages | `src/data/profile.ts` |
| Chapter titles and descriptors | `src/data/chapters.ts` |
| Timeline entries | `src/data/timeline.ts` |
| Photos, captions and stories (used twice) | `src/data/memories.ts` |
| Funny moments, quotes, screenshots, awards, quiz | `src/data/chaos.ts` |
| Appreciation notes | `src/data/appreciation.ts` |
| Songs and voice note | `src/data/playlist.ts` |
| Open When envelopes and messages | `src/data/letters.ts` |
| Future plans | `src/data/futurePlans.ts` |
| Final letter and sign-off | `src/data/finale.ts` |

Put photo files in `public/assets/photos/` and reference them as `/assets/photos/your-file.jpg`. Put audio in `public/assets/music/` or `public/assets/audio/`. Files placed in `public/` are served from the site root in development and production.

> Do not upload personal media through a random image host. Keep the files local so the archive remains private and portable.

---

## Design and accessibility

- Warm paper, burgundy, olive and aged-brass palette with a restrained cinematic night-sky chapter.
- Locally bundled Cormorant Garamond, DM Sans and Caveat fonts (no Google Fonts request at runtime).
- Paper grain, torn edges, washi tape, stickers and Polaroid frames are lightweight CSS/SVG treatments.
- Semantic landmarks and headings, visible focus rings, labelled icon controls, keyboard-operable envelopes and star nodes, and a focus-trapped modal with Escape-to-close.
- All photographs have an `alt` field. Add a real description whenever you add an image.
- The opening, page transitions, envelopes, vinyl spin and confetti respect `prefers-reduced-motion`. Confetti is disabled entirely when reduced motion is requested.
- Empty collections always render intentional empty states, not broken grids.
- No autoplay audio, no tracking, no accounts, no backend.

The layout has been checked at 360, 390, 768, 1024 and 1440 px widths. The responsive system stacks spreads, turns the contents folio into a single scrollable column, and keeps navigation above the footer.

---

## Deploy

The output is a static site.

**Vercel**

Import the repository, keep the default Vite settings (`npm run build`, output `dist`), and deploy. `vercel.json` contains the SPA rewrite so chapter URLs open directly.

**Netlify**

Build command: `npm run build`. Publish directory: `dist`. `public/_redirects` handles SPA fallback automatically. Add the same rule if you deploy elsewhere:

```text
/*    /index.html   200
```

**Any static host**

Run `npm run build` and upload `dist/`. Configure the host to serve `index.html` for unknown paths; otherwise direct links such as `/chapter/soundtrack` will return a 404 after a refresh.

---

## Verification

The project is expected to pass:

```bash
npm run typecheck
npm run lint
npm run build
```

A temporary Playwright verification pass exercised the populated cover, the nine-photo Polaroid Wall, category filters, lightbox keyboard navigation (arrows and Escape), the constellation stars and index, the populated timeline, every Chaos Archive section and the quiz, the Little Things notes, the soundtrack track list and empty audio states, the Open When letters, future plans, the finale reveal and celebration, and the invitation at mobile and desktop widths. It also checked for horizontal overflow at 360, 390, 768 and 1440 px and found no console or page errors.

The audited pages were checked with axe-core against the WCAG A/AA rules; the final pass reported no violations.

---

## Notes and limitations

- The archive is a static frontend. It does not upload, store or moderate photos; media must be optimized and committed (or deployed) by you.
- The audio player supports standard browser formats such as MP3, M4A/AAC, OGG and WAV. The best choice is an MP3 or M4A for size and compatibility.
- Every photograph in the archive was supplied by the archive owner. The dummy preview copy does not invent personal stories, dates, locations or songs: dates use `Month YYYY` placeholders, and no music or voice recordings are attached yet.
- Decorative artwork that is not a supplied photograph is CSS/SVG. No stock photographs or generated images are included.
- The invitation’s dark stage is intentionally an experience; returning visitors can always use **Skip the opening**, the brand mark, or the **Contents** tab.
