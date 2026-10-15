import { CalendarDays } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { AnalyticsEvent } from "@/lib/analytics/analytics";
import { Kicker, Lead } from "./SectionHead";
import { LeadForm } from "./LeadForm";
import { site } from "@/config/site";
import { contact } from "@/config/contact";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export async function CTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const cta = await getSectionData("cta", locale, dict.cta);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const direct = [
    contact.whatsapp ? { ...contact.whatsapp, method: "whatsapp" } : null,
    contact.telegram ? { ...contact.telegram, method: "telegram" } : null,
  ].filter((channel) => channel !== null);
  return (
    <Section id={site.anchors.contact} labelledBy="contact-title" variant="contrast" spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="flex flex-col gap-5">
            <Kicker>{cta.eyebrow}</Kicker>
            <h2 id="contact-title" className="text-balance font-display text-4xl font-bold leading-tight tracking-tightest sm:text-5xl">{cta.title}</h2>
            <Lead>{cta.body}</Lead>
            <div className="flex flex-col gap-3 pt-2">
              <p className="text-sm text-content-muted">{cta.directLabel}</p>
              <div className="flex flex-wrap gap-2.5">
                {direct.map((channel) => (
                  <TrackedLink
                    key={channel.method}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    event={AnalyticsEvent.contactButtonClick}
                    eventProps={{ method: channel.method }}
                    className={buttonClasses("outline", "sm")}
                  >
                    {channel.label}
                  </TrackedLink>
                ))}
                {calendlyUrl ? (
                  <TrackedLink
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    event={AnalyticsEvent.bookingClick}
                    eventProps={{ provider: "calendly" }}
                    className={buttonClasses("outline", "sm")}
                  >
                    <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
                    {dict.common.bookCall}
                  </TrackedLink>
                ) : null}
              </div>
              <p className="text-content-secondary">
                <TrackedLink href={contact.phone.href} event={AnalyticsEvent.contactButtonClick} eventProps={{ method: "phone" }} className="hover:text-accent">
                  {contact.phone.label}
                </TrackedLink>
                {contact.email ? (
                  <>
                    {" · "}
                    <TrackedLink href={contact.email.href} event={AnalyticsEvent.contactButtonClick} eventProps={{ method: "email" }} className="hover:text-accent">
                      {contact.email.label}
                    </TrackedLink>
                  </>
                ) : null}
              </p>
            </div>
          </Reveal>
          <Reveal delay={140} className="w-full">
            <LeadForm form={cta.form} locale={locale} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
