/**
 * Online Narcan certification course.
 *
 * DRAFT CONTENT — the module titles/summaries and every quiz question below are
 * placeholders written from public harm-reduction guidance. Replace them with
 * PreventOverdose's own vetted curriculum before launch. Nothing here is
 * medical advice as written.
 *
 * `muxPlaybackId` is blank until each module video is uploaded to Mux (use a
 * PUBLIC playback policy, then paste the playback ID here).
 */

/**
 * Master switch. While the module videos are still being produced, set this to
 * `false`: the course/quiz/submit routes show a "coming soon" state instead of
 * a broken player, and the /training landing CTA reflects it. Flip to `true`
 * once every module in `modules` has a real `muxPlaybackId`.
 */
export const trainingLive = false;

export const course = {
  title: "Narcan Certification",
  tagline:
    "Learn to recognize and reverse an opioid overdose — watch the modules, pass the quiz, submit a demonstration, get certified by PreventOverdose.",
  passThreshold: 0.8,
  estMinutes: 45,
  /** A module counts as watched once the learner has reached this fraction. */
  moduleCompleteAt: 0.95,
  /**
   * People trained to date — in person and online, combined. Update this after
   * each workshop. It's shown on /training as a live figure; keep it honest.
   */
  peopleTrained: 0,
} as const;

export type Module = {
  id: string;
  title: string;
  summary: string;
  muxPlaybackId: string;
  estSeconds: number;
};

export const modules: Module[] = [
  {
    id: "why-naloxone",
    title: "The crisis, and why naloxone",
    summary:
      "How the overdose epidemic changed with fentanyl, what naloxone does in the body, and why putting it in the hands of bystanders is the single most direct intervention.",
    muxPlaybackId: "",
    estSeconds: 480,
  },
  {
    id: "recognize",
    title: "Recognizing an overdose",
    summary:
      "Blue or grey lips and fingertips, slow or stopped breathing, a limp body, gurgling or choking sounds, and no response to a shout or a hard knuckle rub on the sternum.",
    muxPlaybackId: "",
    estSeconds: 420,
  },
  {
    id: "call-911",
    title: "Calling for help",
    summary:
      "What to say to the dispatcher, why you call even when you have naloxone, and how Connecticut's Good Samaritan law protects you from arrest for drug possession when you call for help at an overdose.",
    muxPlaybackId: "",
    estSeconds: 300,
  },
  {
    id: "give-narcan",
    title: "Giving nasal naloxone",
    summary:
      "Tilt the head back, insert the nozzle into one nostril until your fingers touch the nose, and press the plunger firmly. One full device per nostril. It cannot harm someone who is not overdosing.",
    muxPlaybackId: "",
    estSeconds: 360,
  },
  {
    id: "aftercare",
    title: "Rescue breathing and aftercare",
    summary:
      "One breath every five seconds while you wait, a second dose after two to three minutes if there is no response, the recovery position, and why you stay until help arrives.",
    muxPlaybackId: "",
    estSeconds: 420,
  },
];

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
};

export const quiz: QuizQuestion[] = [
  {
    id: "signs",
    prompt: "Which of these is a sign of an opioid overdose?",
    choices: [
      "Fast, heavy breathing and a flushed face",
      "Blue or grey lips and fingertips with slow or stopped breathing",
      "Sweating and shivering with a rapid pulse",
      "Repeated sneezing and watery eyes",
    ],
    answer: 1,
  },
  {
    id: "harm",
    prompt: "Can naloxone harm someone who has not taken opioids?",
    choices: [
      "Yes, it can stop their breathing",
      "Yes, it can cause a dangerous heart rhythm",
      "No — it has no effect on someone without opioids in their system",
      "Only if more than one dose is given",
    ],
    answer: 2,
  },
  {
    id: "onset",
    prompt: "How long does naloxone usually take to work?",
    choices: [
      "Immediately",
      "Two to three minutes",
      "Fifteen to twenty minutes",
      "About an hour",
    ],
    answer: 1,
  },
  {
    id: "good-samaritan",
    prompt: "Connecticut's Good Samaritan law protects a person who calls 911 at an overdose from:",
    choices: [
      "Any criminal charge of any kind",
      "Arrest for drug possession when they call for help at an overdose",
      "Being named in a news report",
      "Paying the ambulance bill",
    ],
    answer: 1,
  },
  {
    id: "administer",
    prompt: "How is nasal naloxone given?",
    choices: [
      "Spray a little into each nostril and wait",
      "Insert the nozzle into one nostril until your fingers touch the nose, then press the plunger firmly",
      "Have the person inhale it like an asthma inhaler",
      "Place it under the tongue",
    ],
    answer: 1,
  },
  {
    id: "breathing",
    prompt: "While you wait for naloxone to take effect, the most important thing keeping the person alive is:",
    choices: [
      "Keeping them warm",
      "Getting them to walk around",
      "Rescue breathing — one breath every five seconds",
      "Giving them water",
    ],
    answer: 2,
  },
  {
    id: "second-dose",
    prompt: "There is no response two to three minutes after the first dose. You should:",
    choices: [
      "Wait another ten minutes before doing anything",
      "Give a second full dose in the other nostril",
      "Assume naloxone will not work and stop",
      "Give them food",
    ],
    answer: 1,
  },
  {
    id: "after-waking",
    prompt: "After someone wakes up from an overdose reversal, you should:",
    choices: [
      "Leave once they are talking — the danger has passed",
      "Stay with them: naloxone wears off before many opioids do and they can stop breathing again",
      "Give them another dose right away to be safe",
      "Have them take a cold shower",
    ],
    answer: 1,
  },
];
