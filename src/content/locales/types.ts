/**
 * The shape every locale dictionary must implement.
 * Only human-facing copy lives here — structural data (icons, ids, hrefs,
 * option values) lives in `src/config/*`.
 */

export type TitleBody = { title: string; body: string };

export type ServiceBlock = {
  title: string;
  goal: string;
  services: string[];
  value: string;
};

export type IndustryGroup = {
  title: string;
  examples: string;
  solutions: string;
};

export type FaqItem = { q: string; a: string };

/** The hero demo: one labelled sample enquiry, never a live system. */
export type DemoCopy = {
  label: string;
  sampleNote: string;
  badge: string;
  title: string;
  channel: string;
  message: string;
  thinking: string;
  /** What the workflow does before a person reviews it. */
  activities: string[];
  draftLabel: string;
  awaiting: string;
  draft: string;
  edit: string;
  approve: string;
  approvedLabel: string;
  replay: string;
  disclosure: string;
};

export type PanelAgent = { name: string; status: string; waiting: boolean };
export type PanelRule = { label: string; value: string; asksYou: boolean };

export type ExampleCase = {
  title: string;
  problem: string;
  solution: string;
};

export type AgentProfile = {
  name: string;
  role: string;
  auto: string[];
  ask: string[];
};

export type FormOption = { value: string; label: string };

export type LegalSection = { heading: string; body: string };

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    socialTitle: string;
    socialDescription: string;
    ogImageAlt: string;
  };
  nav: {
    home: string;
    how: string;
    team: string;
    solutions: string;
    examples: string;
    industries: string;
    process: string;
    faq: string;
    contact: string;
  };
  common: {
    ctaPrimary: string;
    /** Short form of the primary CTA, for the header. */
    ctaShort: string;
    bookCall: string;
    mainNavLabel: string;
    languageLabel: string;
    themeToggle: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    backToHome: string;
    cookieRegionLabel: string;
    cookieNotice: string;
    cookieAccept: string;
    cookieDecline: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
    /** Three value points under the hero. */
    values: TitleBody[];
    console: DemoCopy;
  };
  loop: {
    eyebrow: string;
    title: string;
    description: string;
    /** Four steps; the second one is where people set the rules. */
    steps: TitleBody[];
    note: string;
  };
  agents: {
    eyebrow: string;
    title: string;
    description: string;
    autoLabel: string;
    askLabel: string;
    items: AgentProfile[];
  };
  control: {
    eyebrow: string;
    title: string;
    points: TitleBody[];
    closing: string;
    panel: {
      label: string;
      title: string;
      sampleLabel: string;
      today: string;
      agentsTitle: string;
      agents: PanelAgent[];
      queueTitle: string;
      queue: string[];
      approve: string;
      rulesTitle: string;
      rules: PanelRule[];
      switchAgent: string;
      switchLabel: string;
      stopped: string;
      feedTitle: string;
      /** Sample actions that scroll by while the sales agent is on. */
      feed: string[];
    };
  };
  pain: {
    title: string;
    description: string;
    cards: TitleBody[];
    closing: string;
  };
  solution: {
    title: string;
    description: string;
    pillars: TitleBody[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    /** The first block is the lead tile of the bento grid. */
    blocks: ServiceBlock[];
    note: string;
  };
  success: {
    title: string;
    paragraphs: string[];
    points: string[];
    closing: string;
  };
  industries: {
    title: string;
    body: string;
    areasLabel: string;
    items: string[];
  };
  results: {
    title: string;
    description: string;
    cards: TitleBody[];
  };
  ai: {
    title: string;
    paragraphs: string[];
    capabilitiesLabel: string;
    capabilities: string[];
  };
  examples: {
    eyebrow: string;
    title: string;
    intro: string;
    problemLabel: string;
    solutionLabel: string;
    items: ExampleCase[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: TitleBody[];
  };
  trust: {
    title: string;
    description: string;
    cards: TitleBody[];
    security: { title: string; body: string };
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    askCta: string;
    items: FaqItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    directLabel: string;
    form: {
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      nameLabel: string;
      namePlaceholder: string;
      optional: string;
      submit: string;
      submitting: string;
      /** "By sending, you agree to the {privacy policy}." */
      consentBefore: string;
      privacyLinkLabel: string;
      consentAfter: string;
      /** How fast we reply. Empty until the owner sets it; hidden while empty. */
      replyTime: string;
      options: FormOption[];
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
      validation: {
        name: string;
        contact: string;
        email: string;
        phone: string;
        solution: string;
        message: string;
      };
    };
  };
  footer: {
    slogan: string;
    exploreTitle: string;
    contactTitle: string;
    rights: string;
    legal: { privacy: string; terms: string; cookies: string };
  };
  legal: {
    privacy: LegalDoc;
    terms: LegalDoc;
    cookies: LegalDoc;
  };
};
