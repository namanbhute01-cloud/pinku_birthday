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
 * PREVIEW CONTENT: every item below is dummy copy, included so the sections
 * render with something in them. Replace the "Dummy" values with your own
 * moments, quotes, captions, awards and quiz answers.
 */
export const funnyMoments: FunMoment[] = [
  {
    id: "moment-1",
    title: "Dummy moment one",
    body: "Dummy story for this moment. Replace it with the real one — the setup, the chaos, and the line that still gets quoted.",
  },
  {
    id: "moment-2",
    title: "Dummy moment two",
    body: "Dummy story text. Add the actual memory here, then delete this placeholder. It can be one line or a whole paragraph.",
  },
  {
    id: "moment-3",
    title: "Dummy moment three",
    body: "Dummy story for the third card. Keep it here only long enough to check the layout, then swap in the real version.",
  },
];

export const iconicQuotes: Quote[] = [
  {
    id: "quote-1",
    text: "Dummy quote one. Replace this with the exact words.",
    context: "Dummy context — where it was said.",
  },
  {
    id: "quote-2",
    text: "Dummy quote two. Replace this with the line that gets repeated.",
    context: "Dummy context — who keeps saying it.",
  },
  {
    id: "quote-3",
    text: "Dummy quote three. Replace this with something only you two would know.",
    context: "Dummy context — the story behind it.",
  },
];

export const screenshots: Screenshot[] = [
  {
    id: "shot-1",
    image: "/assets/photos/photo-01.jpg",
    alt: "A young woman in a striped shirt taking a mirror selfie with her phone.",
    caption: "Dummy exhibit one — replace with a screenshot or photograph.",
  },
  {
    id: "shot-2",
    image: "/assets/photos/photo-02.jpg",
    alt: "A young woman in a white off-shoulder top taking a mirror selfie with her phone.",
    caption: "Dummy exhibit two — replace with a screenshot or photograph.",
  },
];

export const awards: Award[] = [
  {
    id: "award-1",
    title: "Dummy award one",
    recipient: "Dummy recipient",
    reason: "Dummy reason. Replace this with the real, entirely unserious citation.",
  },
  {
    id: "award-2",
    title: "Dummy award two",
    recipient: "Dummy recipient",
    reason: "Dummy reason for the second award. Add the real story behind it later.",
  },
  {
    id: "award-3",
    title: "Dummy award three",
    recipient: "Dummy recipient",
    reason: "Dummy reason for the third award. This is placeholder copy only.",
  },
];

/**
 * Optional quiz. Each question needs at least two options and the zero-based
 * index of the correct one. The questions below are preview-only dummies.
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "quiz-1",
    question: "Dummy question one. Replace this with a real question.",
    options: ["Dummy option A", "Dummy option B", "Dummy option C"],
    answerIndex: 0,
    explanation: "Dummy explanation. Replace it with the note you want to show after answering.",
  },
  {
    id: "quiz-2",
    question: "Dummy question two. Replace this with another question.",
    options: ["Dummy option A", "Dummy option B"],
    answerIndex: 1,
    explanation: "Dummy explanation for the second question. Add the real one when you edit the quiz.",
  },
  {
    id: "quiz-3",
    question: "Dummy question three. Replace this with the final question.",
    options: ["Dummy option A", "Dummy option B", "Dummy option C"],
    answerIndex: 2,
    explanation: "Dummy explanation for the third question. This text exists only to preview the result state.",
  },
];
