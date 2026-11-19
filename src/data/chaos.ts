import type {
  Award,
  FunMoment,
  Quote,
  QuizQuestion,
  Screenshot,
} from "../types/content";

/**
 * The Chaos Archive.
 *
 * The moments, quotes, evidence and awards that belong to Pinku. Edit anything,
 * anytime — especially the quiz answers if the lore changes.
 */
export const funnyMoments: FunMoment[] = [
  {
    id: "moment-1",
    title: " dumb moments",
    body: "🤣️moments doesnt need to be dumnb when we both are  dumb in real😭️🤣️.. every moment is laughter and memorable.",
  },
  {
    id: "moment-2",
    title: "cute moments",
    body: "Like when somehow ,sometime we turn out soo emotional about each other🤣️(which lasts for 2 sec then we start quarreling 🤣️as if we are hardcore enemies🤣️) .",
  },
  {
    id: "moment-3",
    title: "memorable moments",
    body: "Every moment with you for me memorable  no moments such as  we can consider which arent fun!! every moment is funn and filled wiht joy and laughter and 😊️.. such relief.. .",
  },
];

export const iconicQuotes: Quote[] = [
  {
    id: "quote-1",
    text: "Calling me gay..!!!",
    context: "SAYS EACH AND EVERYTIME!!🔪️.",
  },
  {
    id: "quote-2",
    text: "FRUSTRATED PINKU",
    context: "IM TOTTALLYY DONE WITH THE PEOPLE!!.",
  },
 
];

export const screenshots: Screenshot[] = [
  {
    id: "shot-1",
    image: "/assets/photos/photo-01.jpg",
    alt: "A young woman in a striped shirt taking a mirror selfie with her phone.",
    caption: "HEHE those  snaps of her aftr buying new clothes😂️.",
  },
  {
    id: "shot-2",
    image: "/assets/photos/photo-02.jpg",
    alt: "A young woman in a white off-shoulder top taking a mirror selfie with her phone.",
    caption: "THE slayy gurl.",
  },
];

export const awards: Award[] = [
  {
    id: "award-1",
    title: "patience award",
    recipient: "goes to uh ",
    reason: "for listening to all my bakwas,nonsence.. talks, and behaviour.",
  },
  {
    id: "award-2",
    title: "best person",
    recipient: "OBV YOU",
    reason: "for being my back and holding and teaching me most of the things .",
  },
  {
    id: "award-3",
    title: "DUMB AWARD",
    recipient: "you",
    reason: "for being mean and dumb sometimes.",
  },
];

/**
 * Optional quiz. Each question needs at least two options and the zero-based
 * index of the correct one.
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "quiz-1",
    question: "What happens two seconds after we get emotional?",
    options: [
      "We start quarrelling again",
      "We start crying properly",
      "We forget why we were emotional",
    ],
    answerIndex: 0,
    explanation: "Two seconds of softness, then the hardcore-enemies era returns. 🤣",
  },
  {
    id: "quiz-2",
    question: "What does Pinku say every single time?",
    options: ["Calling me gay..!!!", "I'm hungry", "Let's study"],
    answerIndex: 0,
    explanation: "Says each and every time. 🔪",
  },
  {
    id: "quiz-3",
    question: "Which award is Pinku actually winning?",
    options: ["Patience award", "Dumb award", "Both, obviously"],
    answerIndex: 2,
    explanation:
      "Patience for listening to all my bakwas, and dumb award for being mean sometimes. Both deserved.",
  },
];
