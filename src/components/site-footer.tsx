import Link from "next/link";
import { Wordmark } from "./wordmark";
import { Mail, Phone, Pin, Linkedin, Instagram, XSocial } from "./icons";
import { org, nav } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com", Icon: Instagram },
  { label: "X", href: "https://x.com", Icon: XSocial },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule-strong)] bg-paper">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr_0.8fr] lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <Wordmark />
          <p className="measure-tight mt-6 text-[0.9375rem] leading-relaxed text-ink-soft">
            Empowering communities with overdose education, Narcan access, and harm
            reduction. {org.tagline}
          </p>

          <dl className="mt-8 space-y-3 text-[0.9375rem]">
            <div className="flex items-start gap-3">
              <dt className="mt-0.5 text-red">
                <Mail className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a
                  href={`mailto:${org.email}`}
                  className="underline decoration-[var(--rule-strong)] transition-colors hover:decoration-red"
                >
                  {org.email}
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="mt-0.5 text-red">
                <Phone className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Phone</span>
              </dt>
              <dd className="tabular">
                <a
                  href={org.phoneHref}
                  className="underline decoration-[var(--rule-strong)] transition-colors hover:decoration-red"
                >
                  {org.phone}
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="mt-0.5 text-red">
                <Pin className="h-[1.15rem] w-[1.15rem]" />
                <span className="sr-only">Address</span>
              </dt>
              <dd className="text-ink-soft">
                {org.address.city}, {org.address.state} {org.address.zip}
              </dd>
            </div>
          </dl>

          <ul className="mt-8 flex gap-2">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="
                    flex h-11 w-11 items-center justify-center border border-[var(--rule-strong)]
                    text-ink transition-colors duration-200 hover:border-red hover:bg-red hover:text-paper
                  "
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="display-tight text-[1.5rem]">Stay in the loop</h2>
          <p className="measure-tight mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            Training dates, distribution events, and what we learn along the way.
            Nothing else.
          </p>
          <NewsletterForm />
        </div>

        <nav aria-label="Footer">
          <h2 className="label text-slate">Pages</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-ink-soft transition-colors hover:text-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="label mt-10 text-slate">Legal</h2>
          <ul className="mt-5 space-y-3">
            {[
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Accessibility", href: "/accessibility" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-ink-soft transition-colors hover:text-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-[var(--rule)] bg-red text-paper">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-2 px-5 py-5 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="tabular">
            © {new Date().getFullYear()} {org.name} {org.status}. EIN: {org.ein}
          </p>
          <p className="text-paper-on-red">
            If someone is not breathing, call 911 first.
          </p>
        </div>
      </div>
    </footer>
  );
}
