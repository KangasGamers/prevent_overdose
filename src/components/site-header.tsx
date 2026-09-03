"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./wordmark";
import { Menu, Close } from "./icons";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)] border-b border-[var(--rule-strong)] bg-paper">
      <div className="flex h-full items-stretch">
        <Link
          href="/"
          className="flex items-center gap-3 pl-5 pr-6 text-ink lg:pl-8"
          aria-label="PreventOverdose home"
        >
          <Wordmark markClassName="text-red" />
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-stretch lg:flex"
        >
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  relative flex items-center px-4 text-[0.9375rem] font-medium
                  transition-colors duration-200
                  ${active ? "text-red" : "text-ink-soft hover:text-ink"}
                `}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`
                    absolute inset-x-4 bottom-0 h-[2px] bg-red
                    transition-transform duration-300 ease-[var(--ease-out-expo)]
                    ${active ? "scale-x-100" : "scale-x-0"}
                  `}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/donate"
          className="
            ml-auto hidden items-center border-l border-[var(--rule-strong)] bg-red px-7
            text-paper transition-colors duration-200 hover:bg-red-deep lg:ml-0 lg:flex
          "
        >
          <span className="display-tight text-[1.05rem]">Donate</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ml-auto flex items-center border-l border-[var(--rule-strong)] px-5 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <Close className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="
          fixed inset-x-0 top-[var(--header-h)] z-40 h-[calc(100svh-var(--header-h))]
          overflow-y-auto border-t border-[var(--rule-strong)] bg-paper lg:hidden
        "
      >
        <nav aria-label="Primary mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                border-b border-[var(--rule)] px-6 py-5
                display-tight text-[1.6rem] text-ink
              "
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="bg-red px-6 py-6 display-tight text-[1.6rem] text-paper"
          >
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}
