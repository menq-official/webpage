import { site } from "./site";
import type { Dictionary } from "@/content/locales/types";

/** Nav items map a dictionary label to a section anchor on the page. */
/** Header and footer "Explore" links, in page order. */
export const navItems: { key: keyof Dictionary["nav"]; anchor: string }[] = [
  { key: "solutions", anchor: site.anchors.solutions },
  { key: "how", anchor: site.anchors.how },
  { key: "examples", anchor: site.anchors.examples },
  { key: "faq", anchor: site.anchors.faq },
];
