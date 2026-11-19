# MASTER BUILD PROMPT — THE BIRTHDAY ARCHIVE

You are the lead product designer and senior frontend engineer for this project. Build a polished, complete, responsive, interactive birthday website. Do not merely describe how to build it: inspect the repository, plan briefly, implement the application, run checks, fix issues, and document the result.

The project should feel considered, cinematic, handmade, personal, and technically solid. It must not look like a generic birthday template.

---

# 1. PROJECT CONTEXT

## Recipient and occasion
- Recipient's full name: **Ruchita**
- Her nickname: **Pinku**
- Occasion: **her 20th birthday**
- Pronouns: **she/her**
- Relationship: **the user's best friend**
- Working project title: **The Birthday Archive**
- Working subtitle/description: treat as a design placeholder; the user will supply final wording.

## Creative concept
Create an interactive digital scrapbook / memory archive. It should combine:
1. The tactile feeling of a vintage scrapbook, journal, Polaroid album, letters, postcards, paper textures, stickers and washi tape.
2. The pacing and transitions of a small cinematic experience.
3. Two emotional modes: playful/chaotic/funny memories and warm/meaningful/emotional memories.

The website is a gift Ruchita can explore on either a phone or a laptop. It should be enjoyable to revisit after the birthday, not just a one-time animation.

## Most important content constraint
**The user will add all personal wording later. Build structure only.**

Do NOT write the actual birthday message, personal introduction, emotional appreciation text, friendship history, inside jokes, funny captions, quiz answers, letters, song recommendations, voice-message transcript, dates, locations, or invented memories. Do not invent details about how the friends met or what they have done together.

Instead:
- Create clearly named, editable data placeholders.
- Keep personal text fields empty (`""`) by default.
- Keep content collections empty by default where the user must add entries.
- Show a tasteful neutral placeholder in the interface only when a field is empty, e.g. `Add a memory caption`, `Your story will go here`, `Add your letter here`.
- Generic UI labels are allowed: `OPEN`, `NEXT`, `PREVIOUS`, `BACK TO INDEX`, `PLAY`, `PAUSE`, `EXPLORE`, `CHAPTER 01`.
- Use `Ruchita` and `Pinku` where the recipient identity is needed. Do not create wording that assumes a particular tone or event.
- Do not add fake sample photos, stock pictures, AI-generated portraits, random music, or fabricated audio. Use beautiful CSS/SVG content placeholders until real files are supplied.

This constraint is deliberate. The user wants to write the personal words themselves later.

---

# 2. PRODUCT EXPERIENCE AND INFORMATION ARCHITECTURE

Build a chapter-based single-page application with URL-addressable chapter navigation. Each chapter should be an independent feature/module, with a shared application shell, chapter index, progress indicator, and previous/next navigation.

Recommended chapter sequence:

## 00 — The Invitation (opening experience)
Purpose: create a cinematic first impression.
- Full-viewport intro screen.
- Warm charcoal / burgundy backdrop with subtle paper grain.
- A centred vintage envelope addressed to Ruchita / Pinku.
- Wax-seal-like button or seal interaction.
- Clicking/tapping the seal triggers a restrained envelope-opening animation.
- The letter/card slides out and reveals a neutral editable welcome-message placeholder.
- A clear `ENTER THE ARCHIVE` action takes the visitor to the cover.
- Include a `SKIP INTRO` control for returning visitors and reduced-motion users.
- The interaction must work on touch, mouse and keyboard.

## 01 — The Cover / Archive Index
Purpose: introduce the digital scrapbook and provide navigation.
- A cover-like composition with title `The Birthday Archive`.
- Recipient name `Ruchita` and nickname `Pinku` may appear as editable identity labels.
- Show the 20th-birthday occasion as metadata, not as a long generated birthday message.
- A visual table of contents with chapter tabs/cards.
- Each chapter card navigates to its chapter.
- `START READING` action.
- Allow direct chapter selection; do not force the visitor to replay the opening.

## 02 — The Beginning (friendship timeline)
Purpose: hold the origin story and chronological memories.
- A vertical timeline on mobile and a more spacious timeline/spread on desktop.
- Each timeline entry can contain optional date, short title, image, caption and story.
- Use blank entries / an empty state until the user adds real details.
- Do not generate a pretend meeting date or origin story.
- Provide a content file where timeline entries can be added later.

## 03 — The Chaos Archive (funny chapter)
Purpose: support inside jokes, funny incidents, screenshots, quotes and playful awards.
- Playful scrapbook treatment: tilted notes, cut-out labels, doodle-like decorative shapes, stamps and collage layouts.
- Sections/components for funny moments, iconic quotes, screenshots and mock awards.
- Optional mini-quiz component, but no prewritten questions or answers.
- If no content has been added, show a neat empty state and/or editable placeholder cards.
- No invented jokes or descriptions about Pinku.

## 04 — The Polaroid Wall (photo gallery)
Purpose: showcase real photographs with stories.
- Irregular Polaroid/collage layout on desktop; responsive grid or staggered single-column layout on mobile.
- Each item supports image, optional date, caption, category and story.
- Clicking/tapping opens an accessible lightbox or memory-detail modal.
- Add optional category filters: `ALL`, `FUNNY`, `FAVOURITES`, `RANDOM` (filters should derive from data, not fabricate content).
- Support keyboard close with Escape, focus management, and clear close button.
- Do not use remote stock images. Use local placeholders that clearly indicate where the user's images go.

## 05 — The Memory Constellation (special interactive chapter)
Purpose: a distinctive visual alternative to a standard gallery.
- A night-sky / ink-blue canvas that still fits the archive's vintage palette.
- Render memory nodes as stars using SVG or CSS; connect them with delicate lines where appropriate.
- Each star corresponds to a real memory entry from the content data.
- Selecting a star opens that memory's image, caption and story.
- Empty state should explain that stars appear after memories have been added.
- Provide a list-based accessible alternative; do not make the star map the only way to reach memories.
- Node positions may be assigned from stable deterministic layout logic, not random on each render.

## 06 — The Little Things (appreciation chapter)
Purpose: hold sincere appreciation notes written by the user.
- Warm paper background, slower transitions, calmer layout.
- A set of reusable note/cards, each with optional heading and body.
- Use blank content fields; do not create compliments or emotional statements.
- The chapter should look complete even before the text is added, using layout and decorative elements rather than fake copy.

## 07 — The Soundtrack
Purpose: a personal music and audio area.
- Vintage vinyl / cassette-inspired visual music player.
- Playlist entries support title, artist, audio file path and optional reason/note.
- User-controlled playback only; **do not autoplay**.
- Play/pause, seek, elapsed time and volume controls if practical.
- Provide empty playlist state until the user adds real songs.
- Add an optional voice-message player component for a future local audio file.
- No random songs or generated voice recordings.

## 08 — Open When... (interactive letters)
Purpose: a collection of sealed envelopes with messages for different moods or situations.
- Display a set of interactive envelope cards.
- Suggested editable envelope categories (titles only; do not write their contents):
  - `OPEN WHEN YOU'RE SAD`
  - `OPEN WHEN YOU MISS ME`
  - `OPEN WHEN YOU NEED MOTIVATION`
  - `OPEN WHEN YOU NEED A LAUGH`
  - `OPEN WHEN YOU NEED A REMINDER`
- The title list must live in content data so the user can rename or remove any category.
- Clicking an envelope opens a letter view with an empty message field / clear add-message placeholder.
- Animate opening and closing, with reduced-motion fallback.
- Optional hidden/secret envelope state, but do not hide content in inaccessible controls.

## 09 — To Be Continued (future plans)
Purpose: reserve space for future adventures and unfinished plans.
- Collage of empty postcards, ticket stubs, map fragments and Polaroid frames.
- Editable future-plan list/cards with optional status (idea / planned / completed).
- Do not invent destinations, plans or promises.
- Keep this chapter light and forward-looking, but all personal wording remains blank.

## 10 — The Final Letter (finale)
Purpose: provide a clear final chapter for the user to fill in.
- A cinematic letter-opening sequence.
- Large readable letter layout with empty body field.
- Optional voice-message player.
- Birthday confetti / subtle celebratory effect after the visitor activates a final reveal button.
- A final end-card showing the archive title and recipient name.
- Avoid generating the letter itself. Use an obvious placeholder for the user's own wording.
- Provide `RETURN TO COVER` and `EXPLORE AGAIN` navigation.

---

# 3. GLOBAL NAVIGATION AND INTERACTION DESIGN

Build a shared application shell that works across every chapter.

Required shared controls:
- Chapter index / contents drawer.
- Current chapter name and number.
- Overall reading progress indicator.
- Previous chapter and next chapter controls.
- Return-to-cover control.
- Optional sound toggle only if sound effects are actually implemented.
- A small `PINKU'S ARCHIVE` or `THE BIRTHDAY ARCHIVE` brand mark.

Navigation behaviour:
- Direct navigation from the index to any chapter.
- Browser back/forward should work sensibly.
- Chapter transitions should feel like turning a page, sliding a paper sheet, or moving through an archive.
- Avoid making transitions slow or blocking navigation.
- The visitor must be able to skip animations and reach content immediately.
- Keep current chapter in the URL so a link can open a particular chapter.

Interaction details:
- Polaroids open a lightbox/detail view.
- Stickers and decorative objects should not look clickable unless they are interactive.
- Any clickable decorative object needs an accessible label and keyboard operation.
- Hidden interactions must have an accessible alternative and should not be required to complete the site.
- Do not use hover-only reveals.
- Use a consistent motion system: restrained, short transitions; no constant distracting movement.

---

# 4. VISUAL DESIGN SYSTEM

## Art direction
Vintage scrapbook + cinematic editorial design. It should evoke a handmade archive assembled from paper, film, letters, photos and keepsakes.

## Core colour tokens
Use CSS variables:
- Paper: `#F0E5D2`
- Ink: `#30272A`
- Burgundy: `#813F48`
- Muted olive: `#7A8066`
- Aged brass: `#B99561`
- Optional dark background: `#252126`
- Optional warm-white highlight: `#F8F1E6`

Do not apply every colour everywhere. Use paper/ink as the base, burgundy for strong accents, olive for secondary notes and brass for tiny details.

## Typography
Preferred directions:
- Editorial/display serif: Cormorant Garamond.
- Body/UI: DM Sans.
- Handwritten annotations: Caveat.

Use robust local/system fallback stacks. If using Google Fonts, the app must still render well if those fonts fail to load.

## Texture and materials
Implement lightweight CSS/SVG treatments for:
- paper grain / subtle noise,
- layered paper edges,
- torn-paper masks or CSS approximations,
- Polaroid frames,
- washi tape strips,
- stamps and handwritten date labels,
- subtle film grain / vignette for selected cinematic screens,
- small ink marks or doodle-like SVG ornaments.

Do not make the whole site look dirty, low contrast or overly distressed. Decorative layers must not block text or interactions.

## Layout and composition
- Vary the page composition. Do not use the same card grid on every chapter.
- Use generous spacing, layered visual hierarchy, imperfect but intentional rotations, and asymmetry.
- Keep actual content readable and avoid excessive decoration behind body text.
- Make the archive feel like a designed collection, not a dashboard.

---

# 5. RESPONSIVE DESIGN REQUIREMENTS

## Desktop / laptop
- Use a book-spread, two-column, or editorial composition where suitable.
- A chapter index may remain visible as a side rail or open from a control.
- Use layered collages with enough room for photographs and notes.
- Set a sensible max content width and avoid excessively long lines.

## Mobile
- Single-column reading layout.
- No horizontal page overflow.
- Replace desktop spreads with stacked pages/cards.
- Use touch-friendly buttons and controls (aim for at least 44px touch targets).
- Keep navigation accessible at the top or bottom without covering the content.
- Polaroid arrangements must reflow cleanly.
- Modals/lightboxes must fit small screens and allow scrolling.

Test targets: approximately 360px, 390px, 768px, 1024px and 1440px widths.

---

# 6. TECHNICAL ARCHITECTURE

## Preferred stack
If the repo is empty, use:
- React
- TypeScript
- Vite
- React Router (or an equally maintainable route-based approach)
- Framer Motion if compatible with the installed React version
- lucide-react for interface icons
- CSS variables and well-organised CSS files

Do not add a backend or database in this first version. Do not add API keys, analytics, login, cloud storage, or third-party tracking. Use a local/static content model so the user can edit the content directly.

## Suggested source structure
Adapt to the existing repo if it already has a clear structure. For a new repo, use something close to:

```text
birthday-archive/
├── public/
│   └── assets/
│       ├── photos/
│       ├── backgrounds/
│       ├── stickers/
│       ├── music/
│       └── audio/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── AppShell.tsx
│   │   └── routes.tsx
│   ├── features/
│   │   ├── intro/
│   │   ├── cover/
│   │   ├── timeline/
│   │   ├── chaos-archive/
│   │   ├── gallery/
│   │   ├── constellation/
│   │   ├── appreciation/
│   │   ├── soundtrack/
│   │   ├── letters/
│   │   ├── future-plans/
│   │   └── finale/
│   ├── components/
│   │   ├── PaperSheet.tsx
│   │   ├── Polaroid.tsx
│   │   ├── Sticker.tsx
│   │   ├── WashiTape.tsx
│   │   ├── HandwrittenNote.tsx
│   │   ├── Envelope.tsx
│   │   ├── ChapterNavigation.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── Lightbox.tsx
│   ├── data/
│   │   ├── profile.ts
│   │   ├── chapters.ts
│   │   ├── timeline.ts
│   │   ├── memories.ts
│   │   ├── appreciation.ts
│   │   ├── playlist.ts
│   │   ├── letters.ts
│   │   └── futurePlans.ts
│   ├── types/
│   │   └── content.ts
│   ├── styles/
│   │   ├── global.css
│   │   ├── theme.css
│   │   ├── scrapbook.css
│   │   └── animations.css
│   └── main.tsx
├── AGENTS.md
├── OPENCODE_BUILD_PROMPT.md
├── CONTENT_GUIDE.md
└── README.md
```

## Data model requirements
Create TypeScript interfaces for at least:
- `Profile`
- `Chapter`
- `TimelineEntry`
- `Memory`
- `PhotoMemory`
- `AppreciationNote`
- `PlaylistTrack`
- `Letter`
- `FuturePlan`
- `QuizQuestion`

Keep personal text and asset paths in `src/data/` rather than hardcoding them in components.

Example data shapes (use these as a starting point and improve them where sensible):

```ts
export interface Profile {
  name: string;
  nickname: string;
  pronouns: string;
  birthdayMilestone: number;
}

export interface Memory {
  id: string;
  title: string;
  caption: string;
  story: string;
  image?: string;
  date?: string;
  category: "funny" | "emotional" | "random" | "favourite";
  tags?: string[];
}

export interface TimelineEntry {
  id: string;
  date?: string;
  title: string;
  description: string;
  image?: string;
}

export interface Letter {
  id: string;
  title: string;
  message: string;
  envelopeStyle?: string;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  audioSrc?: string;
  note: string;
}
```

Populate profile identity with only confirmed details:
- name `Ruchita`
- nickname `Pinku`
- pronouns `she/her`
- birthday milestone `20`

Keep all unknown personal fields empty or optional. Do not infer a date of birth or birthday date.

## Content editing experience
Create `CONTENT_GUIDE.md` explaining exactly:
- which file controls the name/nickname,
- where to put photographs and how to reference their paths,
- how to add timeline events,
- how to add memories and tags,
- how to add appreciation notes,
- how to add playlist audio files,
- how to add letter titles and messages,
- how to add future plans,
- how to replace the final birthday letter placeholder.

The guide should be written for a beginner and include small examples, but its examples must use neutral placeholder text and must not invent Ruchita's personal memories or messages.

---

# 7. ACCESSIBILITY, PERFORMANCE AND QUALITY

Accessibility:
- Semantic headings and landmarks.
- Keyboard navigation for every interaction.
- Visible focus states.
- Accessible labels for icon-only controls.
- Modal focus handling and Escape-to-close.
- Alt text support for every real photograph.
- Sufficient text/background contrast.
- `prefers-reduced-motion` support; disable or simplify page-turn, envelope and decorative animations when requested.
- Never communicate meaning through colour alone.

Performance:
- Lazy-load below-the-fold photos.
- Avoid loading large media until needed.
- Use responsive image sizing where practical.
- Keep decorative textures lightweight.
- Avoid unnecessary packages.
- No autoplay audio or video.

Quality:
- No TypeScript errors.
- No broken routes.
- No missing-asset console spam.
- Empty data arrays must render intentional empty states, not errors or blank broken components.
- No horizontal overflow at mobile widths.
- All buttons must perform a real action or be clearly disabled; no fake controls.
- No placeholder links to `#` that jump to the top.
- No unfinished “TODO” UI visible to the visitor except the intentional add-content placeholders.

---

# 8. IMPLEMENTATION PHASES

Build in this order. Keep the project runnable after each phase.

## Phase 1 — Inspect and scaffold
1. Inspect the repository and current scripts.
2. Identify existing framework, package manager and conventions.
3. If empty, scaffold React + TypeScript + Vite.
4. Create/update `AGENTS.md` with project instructions.
5. Install only necessary dependencies.
6. Establish theme tokens, typography, reset and responsive base styles.
7. Create the application shell and chapter route configuration.
8. Run the initial build/typecheck.

## Phase 2 — Shared scrapbook components
Implement and test:
- PaperSheet
- Polaroid
- Sticker
- WashiTape
- HandwrittenNote
- Envelope
- ChapterNavigation
- ProgressIndicator
- Lightbox / memory detail modal

Build these as real reusable components, not one-off decorative markup.

## Phase 3 — Core reading experience
Implement:
- Invitation / envelope opening
- Cover / archive index
- Chapter route transitions
- Previous/next controls
- Direct chapter navigation
- Responsive desktop and mobile shells

## Phase 4 — Chapters
Implement the timeline, chaos archive, Polaroid gallery, memory constellation, appreciation cards, soundtrack, open-when letters, future plans and finale. Each chapter should use typed data and good empty states.

## Phase 5 — Content guide and polish
- Write `CONTENT_GUIDE.md`.
- Write/finish `README.md` with install, dev, build and deploy instructions.
- Polish animations and transitions.
- Add metadata and favicon treatment if appropriate.
- Confirm there are no invented personal messages or fake memories.

## Phase 6 — Verification
Run all existing checks, at minimum:
- `npm run build`
- TypeScript check if separately available
- lint/test scripts if configured

Fix errors. Inspect the app at phone and desktop viewport sizes using available browser tooling. If browser tooling is not available, state that limitation and still run build/type checks.

---

# 9. ACCEPTANCE CRITERIA

The build is complete only when all of the following are true:

1. The app starts locally using documented commands.
2. The intro envelope opens and can be skipped.
3. The cover/index links to all chapters.
4. Every chapter route loads independently.
5. Previous/next navigation and progress indicator work.
6. The desktop layout feels like a curated scrapbook/book spread.
7. The mobile layout is intentionally designed, readable and touch-friendly.
8. Polaroid cards and their lightbox/detail view work with supplied local assets; empty states work without assets.
9. The timeline, chaos archive, constellation, appreciation, soundtrack, letters, future plans and finale all have real component structures.
10. Empty content collections do not break the page.
11. Personal content is data-driven and ready for the user to fill in.
12. No invented personal wording, memories, photos, dates, songs or voice recordings appear.
13. Keyboard navigation, visible focus and reduced-motion support are present.
14. Build/type checks pass.
15. `README.md` and `CONTENT_GUIDE.md` explain how to run and personalise the project.

---

# 10. HOW TO WORK ON THIS TASK

Start by inspecting the workspace. Then provide a short implementation plan and immediately begin building. Do not stop to ask for birthday wording, photographs, dates, songs or memory details; those will be added by the user later.

If a technical choice is uncertain, choose the simplest maintainable solution that meets the requirements. If the existing repository already has a working stack, preserve it unless there is a strong technical reason to change it.

At the end, report:
- what you implemented,
- the main files/folders created,
- commands to run the app,
- checks run and whether they passed,
- where the user should put photos/audio,
- which data files the user should edit to add personal wording,
- any remaining limitations.

**Now inspect the project and build The Birthday Archive.**
