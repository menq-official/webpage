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

/** One business tab of the hero console. Names, prices and times are samples. */
export type ConsoleScenario = {
  /** Tab label: the kind of business. */
  tab: string;
  /** Which agent is answering. */
  agent: string;
  channel: string;
  customer: string;
  time: string;
  message: string;
  /** What the agent already did on its own. */
  autoActions: string[];
  draftLabel: string;
  draft: string;
  /** What waits for the owner's yes. */
  waiting: string;
};

export type Fact = { value: string; label: string };

export type PanelAgent = { name: string; status: string; waiting: boolean };
export type PanelRule = { label: string; value: string; asksYou: boolean };

export type ExampleCase = {
  tag: string;
  problem: string;
  solution: string;
  outcome: string;
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
    ogImageAlt: string;
  };
  nav: {
    home: string;
    how: string;
    team: string;
    solutions: string;
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
    facts: Fact[];
    console: {
      label: string;
      sampleNote: string;
      liveLabel: string;
      tabsLabel: string;
      autoPrefix: string;
      approve: string;
      edit: string;
      approvedLabel: string;
      footnote: string;
      thinking: string;
      pause: string;
      play: string;
      scenarios: ConsoleScenario[];
    };
  };
  loop: {
    eyebrow: string;
    title: string;
    description: string;
    /** Four steps; the second one is the owner's approval. */
    steps: TitleBody[];
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
  };
  success: {
    title: string;
    paragraphs: string[];
    points: string[];
    closing: string;
  };
  industries: {
    title: string;
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
    problemLabel: string;
    solutionLabel: string;
    items: ExampleCase[];
  };
  process: {
    eyebrow: string;
    title: string;
    /** Marks the first step as free of charge. */
    freeLabel: string;
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
    solutionsTitle: string;
    solutionsLinks: string[];
    companyTitle: string;
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
