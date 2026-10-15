import { site } from "./site";
import type { Dictionary } from "@/content/locales/types";

/** Nav items map a dictionary label to a section anchor on the page. */
export const navItems: { key: keyof Dictionary["nav"]; anchor: string }[] = [
  { key: "how", anchor: site.anchors.how },
  { key: "team", anchor: site.anchors.team },
  { key: "solutions", anchor: site.anchors.solutions },
  { key: "faq", anchor: site.anchors.faq },
];

/** Footer "Company" column: the main sections plus contact. */
export const companyNavItems: { key: keyof Dictionary["nav"]; anchor: string }[] = [
  { key: "how", anchor: site.anchors.how },
  { key: "team", anchor: site.anchors.team },
  { key: "faq", anchor: site.anchors.faq },
  { key: "contact", anchor: site.anchors.contact },
];
