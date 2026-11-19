import type { FuturePlan } from "../types/content";

/**
 * To Be Continued — future plans, ideas and completed adventures.
 *
 * Status must be "idea", "planned" or "completed". Edit these whenever the
 * next plan becomes a memory.
 */
export const futurePlans: FuturePlan[] = [
  {
    id: "plan-1",
    title: "A no-plan trip",
    note: "No itinerary, no fixed places. Just leave and figure it out on the way.",
    status: "idea",
  },
  {
    id: "plan-2",
    title: "One more late-night food run",
    note: "The kind where we order too much and regret absolutely nothing.",
    status: "planned",
  },
  {
    id: "plan-3",
    title: "The Birthday Archive",
    note: "Planned, written, decorated and finally finished. This one is already done.",
    status: "completed",
  },
  {
    id: "plan-4",
    title: "A photoshoot with all nine photos",
    note: "Pick the outfits, find the light and take the photos we keep talking about.",
    status: "idea",
  },
];
