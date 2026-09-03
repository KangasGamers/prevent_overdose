import type React from "react";

/**
 * Custom elements from https://widgets.givebutter.com/latest.umd.cjs — the
 * script registers `givebutter-giving-form` (among others) via customElements.
 */
type GivebutterGivingFormProps = React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> & {
  account?: string;
  campaign?: string;
  "embed-url"?: string;
  "max-width"?: string;
  "theme-color"?: string;
  closable?: boolean | "";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "givebutter-giving-form": GivebutterGivingFormProps;
    }
  }
}
