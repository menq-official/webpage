import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "MenQ Studio | Software, Websites and AI Automation",
    description: "MenQ Studio designs and builds websites, business software and AI-assisted workflows. Start with one real process, define the rules and keep people in control.",
    socialTitle: "Practical software and AI automation for your business",
    socialDescription: "From websites and connected workflows to carefully controlled AI automation, MenQ Studio helps turn operational problems into working systems.",
    ogImageAlt: "MenQ Studio — practical software and AI automation for your business",
  },
  nav: {
    home: "Home",
    how: "How we work",
    team: "AI team",
    examples: "Examples",
    solutions: "What we build",
    industries: "Industries",
    process: "Approach",
    faq: "FAQ",
    contact: "Contact",
  },
  common: {
    ctaPrimary: "Request an introductory call",
    ctaShort: "Talk to us",
    bookCall: "Book a call",
    mainNavLabel: "Main navigation",
    languageLabel: "Language",
    themeToggle: "Toggle theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    backToHome: "Back to home",
    cookieRegionLabel: "Cookie consent",
    cookieNotice:
      "We use cookies to improve site functionality and analytics.",
    cookieAccept: "Accept",
    cookieDecline: "Decline",
  },
  hero: {
    eyebrow: "Software · Web · Workflow automation",
    title: "Make everyday work",
    titleAccent: "run more clearly.",
    subtitle: "MenQ Studio designs and builds digital systems around the way your business actually works—from websites and connected processes to AI-assisted automation. We start with one clear problem, agree on the rules, and build a solution your team can understand and control.",
    primaryCta: "Talk through a business problem",
    secondaryCta: "See how we work",
    trust: [
      "Start with one process; expand when it makes sense",
      "People stay responsible for important decisions",
      "Scope, rules and next steps are agreed before implementation",
    ],
    values: [
      {
        title: "Built around your process",
        body: "We map the work, the handoffs and the exceptions before choosing what to automate.",
      },
      {
        title: "Clear human control",
        body: "You decide which actions can follow agreed rules and which require a person to review them.",
      },
      {
        title: "A system your team can follow",
        body: "The goal is not another disconnected tool. It is a clearer process, with ownership and next steps visible to the people doing the work.",
      },
    ],
    console: {
      label: "Demo: an example workflow. This is a sample scenario, not a live customer system.",
      sampleNote: "Demo: an example workflow",
      badge: "Sample",
      title: "Customer enquiry · Sample",
      channel: "Incoming message",
      message: "“Hi, do you have an appointment available tomorrow?”",
      thinking: "Working on the enquiry",
      activities: [
        "Checks the sample availability data",
        "Prepares a suggested reply",
        "Leaves the booking for a person to confirm",
      ],
      draftLabel: "Suggested reply",
      awaiting: "Awaiting review",
      draft: "“There may be openings tomorrow. Please confirm the available times before we book your visit.”",
      edit: "Edit draft",
      approve: "Approve sample",
      approvedLabel: "Sample approved · nothing was sent",
      replay: "Replay demo",
      disclosure: "Illustrative demo only. Availability, integrations and actions depend on the system designed for each project.",
    },
  },
  loop: {
    eyebrow: "Control by design",
    title: "People set the rules. Software follows them.",
    description: "Automation works best when its boundaries are clear. We agree what the system may do, what needs review, and what should stop and ask for help.",
    steps: [
      {
        title: "Understand",
        body: "We learn how the process works today, where time or information gets lost, and what a useful result would look like.",
      },
      {
        title: "Define",
        body: "We agree the scope, responsibilities, data, exceptions and approval points before building.",
      },
      {
        title: "Build and test",
        body: "We implement the agreed solution and test it against realistic examples, including cases that should stop for review.",
      },
      {
        title: "Launch and improve",
        body: "We prepare the team to use the system, review how it performs, and agree any next improvements.",
      },
    ],
    note: "The system’s permissions and approval steps are part of the design—not an afterthought.",
  },
  agents: {
    eyebrow: "AI team",
    title: "Your business's AI team",
    description: "Each agent has its own role. It does the repetitive work itself and asks you about what matters.",
    autoLabel: "Does on its own",
    askLabel: "Asks you",
    items: [
      {
        name: "Sales agent",
        role: "No lost customers",
        auto: [
          "Replies 24/7 on your website, Instagram and Telegram",
          "Logs the request in the CRM",
          "Reminds you about unanswered customers",
        ],
        ask: ["Price offers", "Discounts"],
      },
      {
        name: "Support agent",
        role: "Fast, polite answers",
        auto: ["Answers frequently asked questions", "Checks order status", "Books visits and calls"],
        ask: ["Refunds", "Resolving complaints"],
      },
      {
        name: "Operations agent",
        role: "Internal work, on time",
        auto: ["Assigns tasks to the team", "Fills in documents and spreadsheets", "Warns about delays"],
        ask: ["Confirming an order", "Paying a supplier"],
      },
      {
        name: "Analyst agent",
        role: "The full picture every morning",
        auto: ["Daily and weekly reports", "Finds problems and delays", "Suggests improvements"],
        ask: ["Which suggestion to act on"],
      },
    ],
  },
  control: {
    eyebrow: "One dashboard",
    title: "You're in charge. Always.",
    points: [
      {
        title: "You set the rules",
        body: "What the AI does on its own and what needs your approval.",
      },
      {
        title: "Everything is visible",
        body: "What the AI did and what waits for you, on one screen.",
      },
      {
        title: "Stop it with one click",
        body: "Try the switch on the dashboard.",
      },
      {
        title: "The history is kept",
        body: "Who, when, what: you can always check.",
      },
    ],
    closing: "AI works for you, not instead of you.",
    panel: {
      label: "Sample control dashboard",
      title: "Control dashboard",
      sampleLabel: "Sample",
      today: "Today",
      agentsTitle: "Agents",
      agents: [
        {
          name: "Sales",
          status: "working",
          waiting: false,
        },
        {
          name: "Support",
          status: "working",
          waiting: false,
        },
        {
          name: "Operations",
          status: "waiting",
          waiting: true,
        },
      ],
      queueTitle: "Waiting for you",
      queue: ["Discount for Aram · 10%", "Call-out fee · 8,000 AMD"],
      approve: "Approve",
      rulesTitle: "Rules",
      rules: [
        {
          label: "Discount up to 5%",
          value: "on its own",
          asksYou: false,
        },
        {
          label: "Discount over 5%",
          value: "ask me",
          asksYou: true,
        },
        {
          label: "Refund",
          value: "ask me",
          asksYou: true,
        },
      ],
      switchAgent: "Sales agent",
      switchLabel: "Turn the sales agent on or off",
      stopped: "stopped",
      feedTitle: "Right now",
      feed: [
        "Sales · replied to Ani on Instagram",
        "Support · checked Aram's order",
        "Sales · logged a new request in the CRM",
        "Analyst · prepared today's report",
      ],
    },
  },
  pain: {
    title: "Businesses lose money when processes are not systematized",
    description:
      "Many businesses lose money not only because of weak sales. The real loss often comes from unstructured processes, manual work, delays, errors, and a lack of control.",
    cards: [
      {
        title: "Repetitive manual work",
        body: "Employees repeat the same actions every day — data entry, calculations, follow-ups, status updates, or assembling reports.",
      },
      {
        title: "Scattered data",
        body: "Data lives in spreadsheets, chats, emails, different systems, or in people's memory.",
      },
      {
        title: "Lost sales opportunities",
        body: "Leads are not processed in time, follow-ups are forgotten, and interested customers get lost between stages.",
      },
      {
        title: "Weak visibility",
        body: "Management can't see in real time who is doing what, which work is delayed, and where the bottleneck is.",
      },
      {
        title: "Unnecessary costs",
        body: "Errors, delays, repetitive work, and inefficient processes turn into hidden costs.",
      },
      {
        title: "Dependence on people",
        body: "Processes are kept in the experience or memory of specific employees, not in a controllable system.",
      },
    ],
    closing:
      "If a process is not measured, it is not managed. If it is not automated, it starts to cost the business dearly.",
  },
  solution: {
    title:
      "We build digital systems that make a business fast, controllable, and ready to grow",
    description:
      "We don't just offer a website or a piece of software. We study the real workflows of your business and build solutions that solve a concrete problem — sales, service, management, reporting, automation, control, or customer acquisition.",
    pillars: [
      {
        title: "Software solutions",
        body: "CRM, internal platforms, dashboards, web applications, and management tools.",
      },
      {
        title: "AI automation",
        body: "AI assistants, data analysis, document processing, smart routing, and automated decisions.",
      },
      {
        title: "Web and online presence",
        body: "Corporate websites, landing pages, lead generation pages, online forms, and service pages.",
      },
      {
        title: "Business process automation",
        body: "Workflows, approval logic, task routing, SLA control, notifications, and escalation rules.",
      },
      {
        title: "System integration",
        body: "Connecting CRM, website, accounting, warehouse, email, Telegram/WhatsApp, payment, and Google tools.",
      },
      {
        title: "Analytics and management",
        body: "CEO dashboard, KPI tracking, sales reports, operational visibility, and cost control.",
      },
    ],
  },
  services: {
    eyebrow: "Capabilities",
    title: "The right tools for the work you need done.",
    description: "Projects can combine several of these capabilities. We recommend only the parts that fit the agreed problem and scope.",
    blocks: [
      {
        title: "Websites and digital experiences",
        goal: "Design, build and improve websites that make it easier for customers to understand your offer and take the next step.",
        services: [],
        value: "",
      },
      {
        title: "Business workflows and internal tools",
        goal: "Turn recurring work into clear steps, responsibilities and handoffs—with forms, dashboards or purpose-built tools where useful.",
        services: [],
        value: "",
      },
      {
        title: "AI-assisted workflows",
        goal: "Use AI for suitable tasks such as preparing drafts, organizing information or supporting routine work. Define review and approval requirements around the risks of each action.",
        services: [],
        value: "",
      },
      {
        title: "Integrations and automation",
        goal: "Connect systems and reduce repetitive handoffs where the available interfaces and project requirements allow it.",
        services: [],
        value: "",
      },
      {
        title: "Quality, launch and ongoing improvements",
        goal: "Test the agreed flows, prepare the release and make scoped improvements as the system is used.",
        services: [],
        value: "",
      },
    ],
    note: "Available integrations, automation and support depend on the selected project, third-party services and agreed scope.",
  },
  success: {
    title: "The key to business success is systematized work",
    paragraphs: [
      "A business grows not only thanks to a good product or a good team. A business grows when it has well-built systems.",
      "When sales, service, finance, warehouse, internal tasks, and management all work separately, the business starts to lose speed. When all of it connects into one clear system, the business becomes manageable.",
      "We help you make that transition — from manual, scattered, and disorganized work to a digital, automated, and measurable system.",
    ],
    points: [
      "Every action has an owner.",
      "Every stage has a status.",
      "Every delay is visible.",
      "Every repetitive step can be automated.",
      "Every decision can be based on data.",
      "Management sees the real state on a single screen.",
    ],
    closing:
      "The result: less chaos, lower costs, a faster team, and stronger management.",
  },
  industries: {
    title: "For teams with a process worth improving.",
    body: "We work with businesses that want clearer digital experiences, more reliable internal workflows or practical ways to reduce repetitive work. The first step is understanding the process—not assuming every business needs AI.",
    areasLabel: "Example areas",
    items: [
      "Customer enquiries",
      "Sales handoffs",
      "Scheduling",
      "Service operations",
      "Internal reporting",
      "Website journeys",
    ],
  },
  results: {
    title: "What your business gets",
    description:
      "Our goal is not to show off technology, but to deliver measurable business results.",
    cards: [
      {
        title: "Cost reduction",
        body: "Less manual work, fewer errors, fewer delays, and fewer wasted resources.",
      },
      {
        title: "Time savings",
        body: "Repetitive actions run automatically or semi-automatically, while the team focuses on more important work.",
      },
      {
        title: "New customer acquisition",
        body: "Selling websites, landing pages, CRM, and follow-up automation that help you keep interested customers.",
      },
      {
        title: "Controlled work",
        body: "Management sees who is doing what, what stage the work is in, and where a problem has appeared.",
      },
      {
        title: "Fewer errors",
        body: "Duplicate data entry, forgotten tasks, and miscalculations are reduced.",
      },
      {
        title: "A system ready to scale",
        body: "The business can grow without scaling the same chaos.",
      },
    ],
  },
  ai: {
    title: "We use AI as a business tool, not as a buzzword",
    paragraphs: [
      "AI can play a far more serious role in a business than simply writing text or being a chatbot. Applied correctly, it can analyze data, classify requests, suggest next steps, process documents, detect recurring patterns, and help the team work faster.",
      "We use AI where it delivers real business value — saved time, reduced costs, accelerated work, and better control.",
    ],
    capabilitiesLabel: "AI capabilities",
    capabilities: [
      "Data analysis",
      "Document processing",
      "Request classification",
      "Smart recommendations",
      "Workflow decision support",
      "Automated reporting",
      "Anomaly detection",
      "Internal AI assistants",
    ],
  },
  examples: {
    eyebrow: "Examples",
    title: "Start with a real bottleneck.",
    intro: "The examples below illustrate possible approaches. They are not customer case studies or promises of a particular result.",
    problemLabel: "Challenge",
    solutionLabel: "Possible approach",
    items: [
      {
        title: "Enquiries arriving after hours",
        problem: "The team may not see a new enquiry until the next working period.",
        solution: "Organize incoming requests, prepare a response using approved information, and flag anything that needs a person. Booking or pricing actions can be gated for review.",
      },
      {
        title: "Work spread across messages and spreadsheets",
        problem: "Requests, owners and deadlines can be difficult to track across separate tools.",
        solution: "Define one intake and tracking process, assign clear ownership, and surface overdue work. The exact integrations depend on the tools already in use.",
      },
      {
        title: "Reports assembled manually",
        problem: "People spend time collecting updates before they can discuss what needs attention.",
        solution: "Agree the source data and measures, then automate suitable collection or reporting steps. A person remains responsible for interpreting the results and deciding what to do.",
      },
    ],
  },
  process: {
    eyebrow: "Project approach",
    title: "From a business problem to a working solution.",
    steps: [
      {
        title: "Discovery",
        body: "We discuss the process, users, constraints and desired outcome.",
      },
      {
        title: "Scope and plan",
        body: "We document what is included, what is not, dependencies, responsibilities and acceptance criteria.",
      },
      {
        title: "Design",
        body: "We map the user experience and the workflow, including permissions, exceptions and approval points.",
      },
      {
        title: "Build",
        body: "We implement the agreed solution in reviewable steps.",
      },
      {
        title: "Test and prepare launch",
        body: "We check the agreed scenarios and resolve issues that block acceptance.",
      },
      {
        title: "Support and next steps",
        body: "Any post-launch support, response times and further work are defined in the project agreement.",
      },
    ],
  },
  trust: {
    title: "Why MenQ",
    description: "Trust built on facts, not promises.",
    cards: [
      {
        title: "Working results, not slides",
        body: "We build websites, bots, AI agents and automations for everyday work, and at every stage you see a working result, not a presentation.",
      },
      {
        title: "AI is our everyday tool",
        body: "We work with AI agents every day ourselves, so we know where they help and where they don't.",
      },
      {
        title: "Your business first",
        body: "First we understand your processes, and only then propose a technical solution.",
      },
      {
        title: "Built for your needs",
        body: "We don't force a template — we build around your business.",
      },
      {
        title: "Support after launch",
        body: "The system doesn't end at launch — we keep improving it.",
      },
      {
        title: "Transparent work",
        body: "After every stage you see the result, the timeline and the next step.",
      },
    ],
    security: {
      title: "Your data, under your control",
      body: "We design every system so it is clear who can access which data, what the AI is allowed to do, and which steps require your approval.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    description: "Didn’t find your answer? Write to us.",
    askCta: "Ask a question",
    items: [
      {
        q: "Do we need AI for our project?",
        a: "No. We start with the business problem and the process. A website, workflow change, integration or conventional software may be the better fit.",
      },
      {
        q: "Does AI make important decisions on its own?",
        a: "That depends on the agreed design and permissions. Before launch, we define which actions may follow rules, which need human approval, and what should stop or escalate.",
      },
      {
        q: "Can you work with our current tools?",
        a: "Often, if the tools provide a suitable way to integrate and the project scope supports it. We review the specific systems and access requirements during discovery; compatibility is not assumed in advance.",
      },
      {
        q: "How long does a project take?",
        a: "Timing depends on scope, integrations, available information and review cycles. We provide a schedule after the requirements and dependencies are understood.",
      },
      {
        q: "How do you handle our data?",
        a: "Data access, storage, providers and retention are agreed for each project before implementation. We explain the relevant data flows and safeguards for the proposed solution.",
      },
      {
        q: "What happens after launch?",
        a: "The support arrangement is agreed per project. We can discuss maintenance or further improvements as separate scoped work.",
      },
      {
        q: "Can we start small?",
        a: "Yes. A focused first scope can help test whether the approach is useful before expanding it.",
      },
    ],
  },
  cta: {
    eyebrow: "Let’s talk",
    title: "Bring us the process that is slowing you down.",
    body: "Tell us what happens today, where the friction is, and what you want to improve. We’ll discuss whether a website, workflow, integration or AI-assisted approach is a sensible next step.",
    directLabel: "Or write to us directly",
    form: {
      phoneLabel: "Phone or WhatsApp",
      phonePlaceholder: "+374 ...",
      messageLabel: "What process or problem would you like to improve?",
      messagePlaceholder: "For example: enquiries come in via Instagram and by phone, and we lose track of them",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      optional: "(optional)",
      submit: "Send enquiry",
      submitting: "Sending…",
      consentBefore: "By submitting this form, you agree to the ",
      privacyLinkLabel: "Privacy Policy",
      consentAfter: ".",
      replyTime: "",
      options: [
        { value: "ai_assistant", label: "AI agent / chatbot" },
        { value: "ai_automation", label: "AI automation" },
        { value: "crm", label: "CRM system" },
        { value: "web", label: "Website / landing page" },
        { value: "erp", label: "ERP / internal management system" },
        { value: "dashboard", label: "Dashboard / analytics" },
        { value: "workflow", label: "Process automation" },
        { value: "ecommerce", label: "Online shop" },
        { value: "integration", label: "System integration" },
        { value: "booking", label: "Booking system" },
        { value: "ticketing", label: "Customer support" },
        { value: "inventory", label: "Warehouse management" },
        { value: "mobile", label: "Mobile app" },
        { value: "branding", label: "Branding / design" },
        { value: "consultation", label: "Not sure yet, I want a consultation" },
      ],
      successTitle: "Thank you",
      successBody:
        "Your request has been received. We will contact you as soon as possible.",
      errorTitle: "Couldn't send",
      errorBody:
        "Something went wrong while sending your request. Please try again or reach us through the listed contacts.",
      validation: {
        name: "If you add a name, use at least 2 characters.",
        contact: "Add your phone number so we can reach you.",
        email: "Please enter a valid email address.",
        phone: "Enter a phone number with 7–15 digits. You may start with + and use spaces, hyphens or parentheses.",
        solution: "Choose which solution you're interested in.",
        message: "Briefly describe the process or problem (at least 10 characters).",
      },
    },
  },
  footer: {
    slogan: "MenQ Studio designs and builds software, websites and business workflows.",
    exploreTitle: "Explore",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    legal: {
      privacy: "Privacy policy",
      terms: "Terms of use",
      cookies: "Cookie policy",
    },
  },
  legal: {
    privacy: {
      title: "Privacy policy",
      updated: "Updated: 15.10.2026",
      intro:
        "This policy explains what personal data menqstudio.am collects, why, who receives it and how long we keep it. The site is operated by MenQ Studio, Armenia. Contact: info@menqstudio.am.",
      sections: [
        {
          heading: "Who is responsible",
          body: "MenQ Studio (Armenia) decides how the data collected on this site is used. MenQ Studio is not yet registered as a legal entity; until it is, the person behind MenQ Studio is responsible for this processing. Write to info@menqstudio.am about anything in this policy.",
        },
        {
          heading: "What we collect through the form",
          body: "The name, company, phone, email, the solution you choose and your message; the site language, the page you sent it from, the referring page and UTM tags if the link had them; the time of the request and your IP address.",
        },
        {
          heading: "Why we collect it",
          body: "To answer your request and prepare a consultation or an offer, which you ask for by sending the form. The IP address and the time are kept to protect the form from spam and abuse.",
        },
        {
          heading: "Who receives it",
          body: "Only MenQ Studio's team, each person according to their role. Service providers process data for us: Hetzner (servers in Germany), Cloudflare (delivery and protection of the site; it sees your IP address), Google Workspace (our email) and, when enabled, Telegram (notifications to our team). We do not sell personal data.",
        },
        {
          heading: "Analytics",
          body: "Google Analytics runs only if you allow analytics in the cookie banner, and it is not used to identify you. Without your consent no analytics is loaded.",
        },
        {
          heading: "How long we keep it",
          body: "Requests are kept for up to 24 months after our last contact with you, then deleted, unless you ask us to delete them sooner. Analytics data is kept for 14 months.",
        },
        {
          heading: "Your rights",
          body: "You can ask to see, correct or delete your data, and withdraw your consent to analytics at any time in the cookie banner or by clearing cookies. Write to info@menqstudio.am; we answer within 30 days.",
        },
        {
          heading: "Changes",
          body: "We will update this page when our processing changes. The date at the top shows the latest version.",
        },
      ],
    },
    terms: {
      title: "Terms of use",
      updated: "Updated: 15.10.2026",
      intro:
        "These terms apply to using menqstudio.am, operated by MenQ Studio, Armenia. By using the site you accept them.",
      sections: [
        {
          heading: "The site",
          body: "The site describes MenQ Studio's services in AI agents, automation, websites and software, and lets you send a request for a consultation. Sending a request does not create a contract or an obligation for either side.",
        },
        {
          heading: "Your request",
          body: "Please give accurate contact details and do not send other people's data without their permission. We use your request as described in the Privacy policy.",
        },
        {
          heading: "Information on the site",
          body: "Descriptions, examples and the demo on the site are general information about our services, not a binding offer. The scope, price and timeline of any work are agreed separately in writing.",
        },
        {
          heading: "Intellectual property",
          body: "The texts, design, logo and the MenQ name on this site belong to MenQ Studio. You may link to the site; copying its content needs our permission.",
        },
        {
          heading: "Liability",
          body: "We keep the site accurate and available, but it is provided as is, without a guarantee of uninterrupted operation. MenQ Studio is not liable for losses caused by using the site or by being unable to use it, to the extent the law allows.",
        },
        {
          heading: "Law and changes",
          body: "These terms are governed by the law of the Republic of Armenia. We may update them; the date at the top shows the latest version. Questions: info@menqstudio.am.",
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      updated: "Updated: 15.10.2026",
      intro:
        "This page lists the cookies menqstudio.am uses. Necessary cookies keep the site working; analytics cookies are set only with your consent.",
      sections: [
        {
          heading: "Necessary cookies",
          body: "menq-locale remembers your language (1 year). menq-theme remembers the light or dark theme (1 year). menq-consent remembers your cookie choice (180 days). Cloudflare may set a security cookie such as __cf_bm to protect the site from bots (30 minutes).",
        },
        {
          heading: "Analytics cookies (only with consent)",
          body: "If you allow analytics, Google Analytics sets _ga and _ga_<ID> to count visits without identifying you (up to 2 years). If you decline, they are not set.",
        },
        {
          heading: "Team-only cookies",
          body: "menq_session and menq-admin-locale are set only when a MenQ team member signs in to the admin area; visitors never receive them.",
        },
        {
          heading: "Managing cookies",
          body: "You can change your analytics choice by clearing the menq-consent cookie, after which the banner appears again, or block and delete cookies in your browser settings. Without necessary cookies some settings, such as the language, will not be remembered.",
        },
      ],
    },
  },
};
