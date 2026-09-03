/**
 * Authored icon set. One family, 24px grid, 1.6 stroke, round caps and joins.
 * No emoji, no unicode glyphs standing in for drawn marks.
 */

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className,
});

export const ArrowRight = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowDown = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 4v15" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

/** Nasal spray device — the organization's own object. */
export const NasalSpray = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M10 3h4v3h-4z" />
    <path d="M9 6h6v4a3 3 0 0 1-.6 1.8L13 14v6a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-6l-1.4-2.2A3 3 0 0 1 9 10z" />
    <path d="M12 1v2" />
  </svg>
);

export const Phone = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M5 3h3.5l1.8 4.4-2.2 1.3a12 12 0 0 0 5.2 5.2l1.3-2.2L19 13.5V17a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
  </svg>
);

export const Mail = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Pin = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Clock = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const Heart = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.3 12 20 12 20z" />
  </svg>
);

export const Users = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16.5 5.6a3.2 3.2 0 0 1 0 6.3" />
    <path d="M18 14.6A6 6 0 0 1 21.5 20" />
  </svg>
);

export const User = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

export const Shield = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 21c4.5-1.9 7-5.4 7-9.6V5.6L12 3 5 5.6v5.8c0 4.2 2.5 7.7 7 9.6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);

export const Check = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const Plus = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Menu = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Linkedin = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7.5 10.5V17" />
    <circle cx="7.5" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
    <path d="M11.5 10.5V17" />
  </svg>
);

export const Instagram = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const XSocial = ({ className, strokeWidth = 1.6 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m4 4 7.5 9.8L4.6 20" />
    <path d="M20 4h-2.6l-3.9 4.4" />
    <path d="M20 20 8.6 4" />
  </svg>
);
