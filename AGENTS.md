# The Birthday Archive — OpenCode Project Instructions

## Project identity
- Project name: **The Birthday Archive**
- Recipient: **Ruchita**, affectionately called **Pinku**
- Occasion: her **20th birthday**
- Pronouns: **she/her**
- Relationship context: she is the user's best friend
- Visual direction: **vintage scrapbook + cinematic**
- Emotional balance: the experience must support both funny/chaotic memories and heartfelt moments.
- Target devices: phones and laptops/desktops.

## Non-negotiable content rule
The user will write and add all personal wording later. Do not invent or generate personal birthday wishes, friendship stories, captions, jokes, compliments, emotional letters, inside jokes, song choices, dates, locations, or events. Build the complete structure with empty, clearly named editable placeholders. Generic interface labels such as `OPEN`, `NEXT CHAPTER`, `PLAY`, and `BACK TO INDEX` are allowed. Use placeholders such as `[Add your message]` only in preview states; keep the data fields empty by default.

Do not invent photographs, audio recordings, or personal history. Do not fetch random stock photos to impersonate the friends. Build attractive CSS/SVG placeholders until the user supplies real assets.

## Working style
- Inspect the existing repository before changing anything. Preserve useful existing code and conventions.
- If the repository is empty, scaffold the project using the specification in `OPENCODE_BUILD_PROMPT.md`.
- Implement the project in small, testable modules. Do not put the entire application in one component.
- Do not stop after producing a plan. Implement the working application, run the available checks, fix issues, and document anything that remains incomplete.
- Do not ask the user for content while building. Use placeholders and continue.
- Do not delete user files or run destructive commands without explicit approval.
- Never expose API keys, tokens, or secrets. This project should not need any API keys.

## Preferred stack
Use the existing stack if the repository already has one. Otherwise use:
- React + TypeScript + Vite
- React Router for chapter navigation (or a similarly simple URL-addressable navigation approach)
- Framer Motion for restrained transitions, if compatible with the installed React version
- lucide-react for interface icons
- CSS variables and modular CSS for the scrapbook visual system

Avoid adding a backend, database, authentication, analytics, or external API unless the user later requests it. The first version should be a static frontend that can be deployed to Vercel or Netlify.

## Architecture and code quality
- Keep chapter content/data separate from presentation components.
- Use typed content models for memories, timeline entries, photos, letters, playlist items, quiz questions, and future plans.
- Keep shared visual elements reusable: paper sheet, Polaroid, washi tape, sticker, handwritten note, envelope, chapter navigation, and modal/lightbox.
- Keep components focused and reasonably small.
- Use semantic HTML, accessible names, keyboard support, and visible focus states.
- Respect `prefers-reduced-motion` and provide a reduced-motion mode.
- Do not rely on hover for essential interactions; touch users must have equivalent controls.
- Make layouts responsive from small phones up to wide desktop screens.
- Lazy-load gallery images and avoid unnecessary heavy dependencies.
- Do not put personal content directly inside JSX where it should belong in data files.

## Visual design rules
- Palette: warm paper `#F0E5D2`, ink `#30272A`, burgundy `#813F48`, muted olive `#7A8066`, aged brass `#B99561`.
- Typography direction: Cormorant Garamond (editorial headings), DM Sans (body/UI), Caveat (handwritten annotations), with robust fallback fonts.
- Use subtle paper grain, torn edges, paper layers, Polaroid frames, washi tape, date stamps, ink marks, and restrained film-grain effects.
- The result should feel like a curated physical memory archive, not a generic birthday landing-page template.
- Keep the interface legible. Decorative effects must not reduce contrast or make text difficult to read.
- Avoid excessive animations, random floating decorations, and overuse of gradients.

## Responsive behaviour
- Desktop: use a book/spread-like layout where useful, with a persistent or collapsible chapter index and generous whitespace.
- Mobile: use a single-column reading experience, comfortable touch targets, compact navigation, and no horizontal overflow.
- All important interactions must work using touch, mouse, and keyboard.

## Verification
After implementation or meaningful changes:
1. Run the project's typecheck/build scripts where available.
2. Run lint/tests if configured.
3. Fix errors rather than merely reporting them.
4. Check for missing routes, broken image paths, empty-state problems, and console errors.
5. Verify responsive layouts at approximately 360px, 390px, 768px, and 1440px widths if browser tooling is available.
6. Summarize what was built, commands run, test outcomes, and any remaining limitations.

## Source of truth
`OPENCODE_BUILD_PROMPT.md` contains the full product brief, page structure, interactions, data model, implementation phases, and acceptance criteria. Follow it together with these project instructions.
