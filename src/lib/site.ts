/**
 * Organization facts. Everything here is real and carried from the live site,
 * except values explicitly typed as Placeholder — those render with visible
 * placeholder treatment and must never be presented as verified.
 */

export type Placeholder<T> = { value: T; placeholder: true; note: string };

export const isPlaceholder = <T,>(v: T | Placeholder<T>): v is Placeholder<T> =>
  typeof v === "object" && v !== null && "placeholder" in v;

export const org = {
  name: "PreventOverdose",
  tagline: "One dose can save a life.",
  mission:
    "Our mission is to save lives by providing free Narcan, empowering communities with harm reduction education, and advocating for policies that support overdose prevention and addiction treatment.",
  vision:
    "We envision a world where every person has access to life-saving resources, where stigma is replaced with support, and where preventable overdose deaths are eliminated through comprehensive public health strategies.",
  values:
    "We believe in the power of education, compassion, and community support. Every life is valuable, and together, we can create a world where overdose tragedies are preventable, and individuals struggling with addiction are met with understanding and effective resources.",
  email: "leadership@preventoverdose.co",
  phone: "860-751-8658",
  phoneHref: "tel:+18607518658",
  address: {
    city: "Avon",
    state: "CT",
    zip: "06001",
  },
  ein: "39-2213650",
  status: "501(c)(3)",
  /** Givebutter account. `preventoverdose` is the public Giving Hub;
   *  `preventoverdoses` (with an s) is the underlying campaign that money
   *  actually lands in — confirmed via
   *  givebutter.com/elements/api/v2/<acct>/campaigns/preventoverdoses. */
  donateAccountId: "X9ZOzRGfpykvBkQ2",
  donateUrl: "https://givebutter.com/preventoverdose",
  /** Iframe-embeddable donation form for the campaign, resized by
   *  https://givebutter.com/js/widget.js against `iframe[name="givebutter"]`.
   *  Accepts `?amount=` to pre-fill. */
  donateEmbedUrl: "https://givebutter.com/embed/c/preventoverdoses",
} as const;

export const nav = [
  { label: "Get Narcan", href: "/get-narcan" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Board", href: "/board" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * The board roles. A seat with a `name`/`photo` is filled; the rest are open and
 * render as headshot placeholders.
 */
export const boardRoles = [
  {
    role: "Executive Director",
    remit:
      "Sets program direction, owns partnerships with health departments and schools, and represents the organization publicly.",
  },
  {
    role: "Vice President",
    name: "Tanmay Tarigonda",
    photo: "/board/vice-president.jpg",
    remit:
      "Deputizes for the director, chairs program review, and leads the training curriculum.",
  },
  {
    role: "Secretary",
    remit:
      "Keeps the record: minutes, filings, governance calendar, and the organization's compliance obligations.",
  },
  {
    role: "Treasurer",
    remit:
      "Owns the books, the annual filing, and the public reporting of how every donated dollar is spent.",
  },
  {
    role: "Outreach Chair",
    remit:
      "Runs distribution events, recruits volunteers, and maintains relationships with community partners.",
  },
] as const;

export const boardApplication = {
  requirements: [
    "A resume or CV",
    "A 300–500 word response on why you would be a good fit",
  ],
  email: org.email,
} as const;

/** Four real articles from the live site. Bodies are summaries, not reprints. */
export const articles = [
  {
    slug: "the-dangers-of-fentanyl",
    title: "The Dangers of Fentanyl",
    date: "2025-05-27",
    readingTime: "1 min read",
    summary:
      "Fentanyl is roughly fifty times more potent than heroin, and it now appears in counterfeit pills and powders that were never sold as opioids at all. Understanding the potency is the first step to understanding why reversal medication has to be everywhere.",
  },
  {
    slug: "the-science-behind-an-overdose",
    title: "The Science Behind an Overdose",
    date: "2025-05-25",
    readingTime: "3 min read",
    summary:
      "An overdose occurs when a person consumes a harmful amount of a substance, leading to serious health consequences or even death. Opioids bind to receptors in the brainstem that regulate breathing — which is what naloxone interrupts.",
  },
  {
    slug: "narcan-distribution-as-a-vital-strategy",
    title: "Narcan Distribution as a Vital Strategy in Addressing Opioid Overdoses",
    date: "2025-05-25",
    readingTime: "4 min read",
    summary:
      "The opioid crisis is a major challenge affecting communities across the United States and beyond. Putting naloxone directly into the hands of the people most likely to witness an overdose is among the most direct interventions available.",
  },
  {
    slug: "understanding-rising-trends-of-opioid-overdose-deaths",
    title: "Understanding the Rising Trends of Opioid Overdose Deaths in America",
    date: "2025-05-25",
    readingTime: "4 min read",
    summary:
      "The opioid crisis is one of the most critical public health issues facing the United States. Over the past few years the shape of the epidemic has changed, and the response has had to change with it.",
  },
] as const;

/**
 * One real event. Its date is genuinely undecided, and the schema says so
 * rather than inventing a timestamp.
 */
export const events = [
  {
    slug: "launch-party",
    title: "Launch Party",
    kind: "community" as const,
    startsAt: null,
    locationName: "Avon, CT",
    locationAddr: "Avon, Connecticut, USA",
    capacity: null,
    description:
      "The first official PreventOverdose event. Meet the team, learn how Narcan works, and leave knowing how to reverse an overdose.",
  },
] as const;

/** Steps of an overdose response. Public-health guidance, not org claims. */
export const responseSteps = [
  {
    action: "Recognize",
    detail:
      "Blue or grey lips and fingertips, slow or stopped breathing, a limp body, choking or gurgling sounds, and no response when you shout their name or rub your knuckles hard on their sternum.",
  },
  {
    action: "Call 911",
    detail:
      "Say the person is not breathing and give your exact location. Connecticut's Good Samaritan law protects you from arrest for drug possession when you call for help at an overdose.",
  },
  {
    action: "Give Narcan",
    detail:
      "Tilt the head back, insert the nozzle into one nostril until your fingers touch the nose, and press the plunger firmly. One full device per nostril. It cannot harm someone who is not overdosing.",
  },
  {
    action: "Rescue breathing",
    detail:
      "Tilt the chin up, pinch the nose, and give one breath every five seconds. Naloxone takes two to three minutes to work, and breathing is what keeps the brain alive until it does.",
  },
  {
    action: "Stay",
    detail:
      "Give a second dose after two to three minutes if there is no response. Naloxone wears off before many opioids do, so the person can stop breathing again. Stay until help arrives.",
  },
] as const;

export const volunteerInterests = [
  "Distribution events",
  "Training facilitation",
  "Community outreach",
  "Administration & grants",
  "Design & communications",
] as const;
