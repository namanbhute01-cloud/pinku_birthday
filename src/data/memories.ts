import type { PhotoMemory } from "../types/content";

/**
 * The Polaroid Wall and The Memory Constellation both read from this file.
 * Add a photo once; it will appear in both chapters.
 *
 * Category must be one of: "funny" | "emotional" | "random" | "favourite".
 * The filter buttons on the wall are generated from whatever categories you use.
 */
export const photoMemories: PhotoMemory[] = [
  {
    id: "memory-01",
    title: "The new-clothes selfie",
    caption: "New clothes, new mirror, same slay.",
    story:
      "The official after-shopping photo. She bought the outfit, found a mirror and gave the camera exactly what it came for. 😂",
    image: "/assets/photos/photo-01.jpg",
    alt: "A young woman in a striped shirt taking a mirror selfie with her phone.",
    date: "2026",
    category: "favourite",
    tags: ["new clothes", "mirror selfie", "slay"],
  },
  {
    id: "memory-02",
    title: "The slayy gurl",
    caption: "White top, zero competition.",
    story:
      "Simple white top, full main-character energy. This is the face that makes every ordinary mirror look like a studio.",
    image: "/assets/photos/photo-02.jpg",
    alt: "A young woman in a white off-shoulder top taking a mirror selfie with her phone.",
    date: "2026",
    category: "funny",
    tags: ["white top", "selfie", "slay"],
  },
  {
    id: "memory-03",
    title: "Foxieee",
    caption: "Showcasing her intellectuality, foxie style.",
    story:
      "The animal ears, the tie and that expression — pure foxie behaviour. No notes, no corrections, just a photo that had to be kept.",
    image: "/assets/photos/photo-03.jpg",
    alt: "A young woman outdoors wearing animal ears and a blue patterned tie over a light shirt.",
    date: "2026",
    category: "random",
    tags: ["foxie", "animal ears", "outdoors"],
  },
  {
    id: "memory-04",
    title: "Pink in the greens",
    caption: "The field had no idea who it was hosting.",
    story:
      "A pink outfit, a field of green and a photo that immediately became a favourite. The trees were lucky to be in the background.",
    image: "/assets/photos/photo-04.jpg",
    alt: "A young woman in a pink outfit standing in a field with trees behind her.",
    date: "2026",
    category: "favourite",
    tags: ["pink", "field", "favourite"],
  },
  {
    id: "memory-05",
    title: "Peace sign, zero peace",
    caption: "Peace on the outside, chaos on the inside.",
    story:
      "The yellow wall, the peace sign and that look. Nothing about this moment is peaceful, and that is exactly why it belongs here.",
    image: "/assets/photos/photo-05.jpg",
    alt: "A young woman in a dark top making a peace sign in front of a yellow wall.",
    date: "2026",
    category: "funny",
    tags: ["yellow wall", "peace sign", "chaos"],
    imagePosition: "center 12%",
  },
  {
    id: "memory-06",
    title: "Formal queen, grass edition",
    caption: "Fully professional, even sitting in the grass.",
    story:
      "Somehow the formal look made sense on the grass. She can switch from traditional to professional to completely sassy without missing a beat.",
    image: "/assets/photos/photo-06.jpg",
    alt: "A young woman crouching on grass in a light shirt, blue tie and maroon trousers.",
    date: "2026",
    category: "random",
    tags: ["formal", "grass", "queen"],
    imagePosition: "center 10%",
  },
  {
    id: "memory-07",
    title: "The white tee era",
    caption: "No filter needed.",
    story:
      "A plain white tee, a lanyard and still the most put-together person in the frame. Some faces just carry everything.",
    image: "/assets/photos/photo-07.jpg",
    alt: "A young woman in a white T-shirt and lanyard taking a mirror photo in a bathroom.",
    date: "2026",
    category: "emotional",
    tags: ["white tee", "everyday", "favourite"],
    imagePosition: "center 10%",
  },
  {
    id: "memory-08",
    title: "Yellowe flower",
    caption: "Glowing like a bright yellow dandelion.",
    story:
      "A close-up from the yellow-top day. This is the face that makes bad days feel a little less bad, even through a phone screen.",
    image: "/assets/photos/photo-08.jpg",
    alt: "A close-up portrait of a young woman in a yellow top, with one hand near her ear.",
    date: "2025",
    category: "emotional",
    tags: ["yellow", "flower", "glow"],
  },
  {
    id: "memory-09",
    title: "Saree, but make it a moment",
    caption: "The cover-photo kind of pretty.",
    story:
      "The saree portrait that ended up on the cover. Calm, glowing and completely unaware of how much this archive needed her face.",
    image: "/assets/photos/photo-09.jpg",
    alt: "A young woman in a cream and blue saree standing outdoors beside a hedge.",
    date: "2026",
    category: "favourite",
    tags: ["saree", "cover photo", "favourite"],
    imagePosition: "center 12%",
  },
];
