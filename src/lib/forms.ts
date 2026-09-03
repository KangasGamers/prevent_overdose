import { z } from "zod";

/**
 * One schema per public form. The client validates for UX; the API route in
 * `src/app/api/submit/route.ts` re-validates with these before sending anything.
 * `website` is an unused honeypot — real users leave it empty.
 */
// Allowed through parsing so the route can drop it silently (a 422 would tell a
// bot its guess was wrong).
const honeypot = z.string().max(200).optional();

export const formSchemas = {
  "kit-request": z.object({
    contact: z.string().trim().min(1).max(200),
    delivery: z.enum(["pickup", "mail", "training"]),
    name: z.string().trim().max(200).optional(),
    website: honeypot,
  }),
  volunteer: z.object({
    name: z.string().trim().min(1).max(200),
    email: z.email().max(200),
    interests: z.array(z.string().max(120)).max(20).optional(),
    website: honeypot,
  }),
  contact: z.object({
    email: z.email().max(200),
    topic: z.string().trim().max(120),
    message: z.string().trim().min(1).max(5000),
    website: honeypot,
  }),
  newsletter: z.object({
    email: z.email().max(200),
    website: honeypot,
  }),
  "event-notify": z.object({
    email: z.email().max(200),
    event: z.string().trim().max(200),
    website: honeypot,
  }),
} as const;

export type FormKind = keyof typeof formSchemas;

export const formSubjects: Record<FormKind, string> = {
  "kit-request": "Narcan kit request",
  volunteer: "Volunteer application",
  contact: "Contact message",
  newsletter: "Newsletter signup",
  "event-notify": "Event notification signup",
};
