import type { Metadata } from "next";
import { League_Spartan, Archivo } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { org } from "@/lib/site";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-league-spartan",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PreventOverdose",
    template: "%s · PreventOverdose",
  },
  description:
    "A 501(c)(3) nonprofit distributing free Narcan, running harm reduction training, and advocating for overdose prevention. One dose can save a life.",
  openGraph: {
    title: "PreventOverdose",
    description: org.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PreventOverdose",
    description: org.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${archivo.variable}`}>
      <body className="min-h-svh [--header-h:4.25rem]">
        <a
          href="#main"
          className="
            sr-only rounded-none bg-ink px-4 py-3 text-paper
            focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
          "
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
