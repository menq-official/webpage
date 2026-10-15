import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Hero } from "@/components/landing/Hero";
import { ControlLoop } from "@/components/landing/ControlLoop";
import { ServiceBlocks } from "@/components/landing/ServiceBlocks";
import { Industries } from "@/components/landing/Industries";
import { Examples } from "@/components/landing/Examples";
import { HowWeWork } from "@/components/landing/HowWeWork";
import { Faq } from "@/components/landing/Faq";
import { CTA } from "@/components/landing/CTA";
import { MobileStickyCTA } from "@/components/landing/MobileStickyCTA";
import { RevealController } from "@/components/ui/RevealController";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <>
      <SkipLink label={dict.common.skipToContent} />

      <Header dict={{ nav: dict.nav, common: dict.common }} locale={locale} />

      <main id="main">
        <Hero dict={dict} locale={locale} />
        <ControlLoop dict={dict} />
        <ServiceBlocks dict={dict} locale={locale} />
        <Industries dict={dict} />
        <Examples dict={dict} />
        <HowWeWork dict={dict} locale={locale} />
        <Faq faq={dict.faq} />
        <CTA dict={dict} locale={locale} />
      </main>

      <Footer dict={dict} locale={locale} year={year} />
      {/* Keeps the mobile sticky CTA from covering the end of the footer. */}
      <div className="h-sticky-cta lg:hidden" aria-hidden="true" />

      <MobileStickyCTA
        href={`/${locale}#${site.anchors.contact}`}
        label={dict.common.ctaPrimary}
        targetId={site.anchors.contact}
      />

      <RevealController />
      <JsonLd dict={dict} locale={locale} />
    </>
  );
}
