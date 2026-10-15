import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "./Chip";
import { site } from "@/config/site";
import { getPublishedIndustryGroups } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

/** Who we work with: one chip per industry (published ones from the admin win). */
export async function Industries({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { industries } = dict;
  const published = await getPublishedIndustryGroups(locale);
  const items = published ? published.map((group) => group.title) : industries.items;
  return (
    <Reveal className="mt-10 flex flex-col gap-3.5">
      <h3 id={site.anchors.industries} className="scroll-mt-header font-semibold text-content-secondary">{industries.title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => <Chip key={item} as="li">{item}</Chip>)}
      </ul>
    </Reveal>
  );
}
