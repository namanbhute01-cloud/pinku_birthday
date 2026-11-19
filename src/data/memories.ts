import type { PhotoMemory } from "../types/content";

/**
 * The Polaroid Wall and The Memory Constellation both read from this file.
 * Add a photo once; it will appear in both chapters.
 *
 * PREVIEW CONTENT: every value below is dummy copy, kept short enough to test
 * the layout. Replace the titles, captions, stories, dates and tags with your
 * own words. The alt text describes the supplied photograph and should be
 * updated if you swap the image.
 *
 * Category must be one of: "funny" | "emotional" | "random" | "favourite".
 * The filter buttons on the wall are generated from whatever categories you use.
 */
export const photoMemories: PhotoMemory[] = [
  {
    id: "memory-01",
    title: "Dummy — striped shirt",
    caption: "Dummy caption for the striped-shirt mirror selfie.",
    story:
      "Dummy story text. Replace this paragraph with the real memory behind the photograph — what happened, who was there, and why it belongs in the archive.",
    image: "/assets/photos/photo-01.jpg",
    alt: "A young woman in a striped shirt taking a mirror selfie with her phone.",
    date: "Month YYYY",
    category: "favourite",
    tags: ["Dummy tag", "Replace me"],
  },
  {
    id: "memory-02",
    title: "Dummy — white top",
    caption: "Dummy caption for the white off-shoulder selfie.",
    story:
      "Dummy story text for this page. Swap it for the real account later; for now it only shows how a short memory sits inside the layout.",
    image: "/assets/photos/photo-02.jpg",
    alt: "A young woman in a white off-shoulder top taking a mirror selfie with her phone.",
    date: "Month YYYY",
    category: "funny",
    tags: ["Dummy tag"],
  },
  {
    id: "memory-03",
    title: "Dummy — animal ears",
    caption: "Dummy caption for the outdoor portrait with animal ears.",
    story:
      "Dummy story text. Add the real story here when you are ready. This placeholder can be as long or as short as the memory needs, and it will reflow inside the opened Polaroid.",
    image: "/assets/photos/photo-03.jpg",
    alt: "A young woman outdoors wearing animal ears and a blue patterned tie over a light shirt.",
    date: "Month YYYY",
    category: "random",
    tags: ["Dummy tag", "Replace me"],
  },
  {
    id: "memory-04",
    title: "Dummy — pink outfit",
    caption: "Dummy caption for the pink outfit in the field.",
    story:
      "Dummy story text. Replace this paragraph with the real memory — where the photograph was taken, what happened before or after, and the detail you want to keep.",
    image: "/assets/photos/photo-04.jpg",
    alt: "A young woman in a pink outfit standing in a field with trees behind her.",
    date: "Month YYYY",
    category: "favourite",
    tags: ["Dummy tag"],
  },
  {
    id: "memory-05",
    title: "Dummy — peace sign",
    caption: "Dummy caption for the peace sign against the yellow wall.",
    story:
      "Dummy story text. This placeholder shows how two or three sentences will look behind the Polaroid. Replace it with your own recollection.",
    image: "/assets/photos/photo-05.jpg",
    alt: "A young woman in a dark top making a peace sign in front of a yellow wall.",
    date: "Month YYYY",
    category: "funny",
    tags: ["Dummy tag", "Replace me"],
    imagePosition: "center 12%",
  },
  {
    id: "memory-06",
    title: "Dummy — grass and tie",
    caption: "Dummy caption for the photograph in the grass.",
    story:
      "Dummy story text. Use this space for the real story, then remove the dummy wording. Nothing here is meant to be kept as final copy.",
    image: "/assets/photos/photo-06.jpg",
    alt: "A young woman crouching on grass in a light shirt, blue tie and maroon trousers.",
    date: "Month YYYY",
    category: "random",
    tags: ["Dummy tag"],
    imagePosition: "center 10%",
  },
  {
    id: "memory-07",
    title: "Dummy — white tee",
    caption: "Dummy caption for the white T-shirt mirror photo.",
    story:
      "Dummy story text. Replace this paragraph with the real memory. It is only here to preview how the caption, rule and story stack together.",
    image: "/assets/photos/photo-07.jpg",
    alt: "A young woman in a white T-shirt and lanyard taking a mirror photo in a bathroom.",
    date: "Month YYYY",
    category: "emotional",
    tags: ["Dummy tag", "Replace me"],
    imagePosition: "center 10%",
  },
  {
    id: "memory-08",
    title: "Dummy — close-up",
    caption: "Dummy caption for the close-up portrait.",
    story:
      "Dummy story text for this photograph. Add the real memory later — a sentence about the day, the conversation, or the reason this frame was saved.",
    image: "/assets/photos/photo-08.jpg",
    alt: "A close-up portrait of a young woman in a yellow top, with one hand near her ear.",
    date: "Month YYYY",
    category: "emotional",
    tags: ["Dummy tag"],
  },
  {
    id: "memory-09",
    title: "Dummy — saree",
    caption: "Dummy caption for the saree portrait outdoors.",
    story:
      "Dummy story text. This is placeholder copy for the final photograph in the wall. Replace it with the real story before sharing the archive.",
    image: "/assets/photos/photo-09.jpg",
    alt: "A young woman in a cream and blue saree standing outdoors beside a hedge.",
    date: "Month YYYY",
    category: "favourite",
    tags: ["Dummy tag", "Replace me"],
    imagePosition: "center 12%",
  },
];
