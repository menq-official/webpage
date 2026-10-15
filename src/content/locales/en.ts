import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "MenQ — AI agents for business, under your control",
    description:
      "AI agents that answer customers 24/7, process requests and automate routine work, while every important decision stays with you. Websites, CRM and automation.",
    ogImageAlt: "MenQ — AI agents that work with your approval",
  },
  nav: {
    home: "Home",
    how: "How it works",
    team: "AI team",
    solutions: "Solutions",
    industries: "Industries",
    process: "Approach",
    faq: "FAQ",
    contact: "Contact",
  },
  common: {
    ctaPrimary: "Book a free call",
    ctaShort: "Free call",
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
    eyebrow: "AI agents · CRM · Automation",
    title: "AI works 24/7.",
    titleAccent: "You make the decisions.",
    subtitle: "AI agents answer your customers, keep your CRM up to date and handle repetitive work. Every important step waits for your yes.",
    primaryCta: "Book a free call",
    secondaryCta: "How it works",
    trust: ["No commitment", "Հայերեն, English, русский", "Your data stays under your control"],
    facts: [
      {
        value: "24/7",
        label: "Replies day and night on your website, Instagram and Telegram",
      },
      {
        value: "Your yes",
        label: "Prices, discounts, payments and refunds only with your approval",
      },
      {
        value: "1 dashboard",
        label: "Everything is visible, and the rules can change at any moment",
      },
    ],
    console: {
      label: "Demo: an AI agent waiting for your approval",
      sampleNote: "Sample · try clicking",
      liveLabel: "Working",
      tabsLabel: "Type of business",
      autoPrefix: "On its own: ",
      approve: "Approve",
      edit: "Edit",
      approvedLabel: "Approved · sent and logged",
      footnote: "Every action is logged · stop an agent with one click",
      thinking: "Working on the request",
      pause: "Pause the demo",
      play: "Play the demo",
      scenarios: [
        {
          tab: "Clinic",
          agent: "Sales agent",
          channel: "Instagram",
          customer: "Ani",
          time: "02:14",
          message: "Hi, is there a free slot tomorrow for teeth cleaning?",
          autoActions: ["checked the doctor's calendar", "logged the request in the CRM"],
          draftLabel: "Reply ready",
          draft: "Hi Ani! Tomorrow we're free at 11:00 and 16:30. Which time suits you?",
          waiting: "Waiting for your yes",
        },
        {
          tab: "Shop",
          agent: "Support agent",
          channel: "Website",
          customer: "Aram",
          time: "23:40",
          message: "When will my order arrive? If I take a second one, is there a discount?",
          autoActions: ["the order is on its way, arriving tomorrow before 14:00"],
          draftLabel: "Offer",
          draft: "We're offering 10% off the second item.",
          waiting: "The discount waits for you",
        },
        {
          tab: "Service",
          agent: "Operations agent",
          channel: "Telegram",
          customer: "Lusine",
          time: "07:05",
          message: "The air conditioner is dripping water. Can you send a technician?",
          autoActions: ["opened a job and assigned a free technician"],
          draftLabel: "Price for the customer",
          draft: "The call-out fee is 8,000 AMD; the technician will arrive between 10:00 and 12:00.",
          waiting: "The price waits for you",
        },
      ],
    },
  },
  loop: {
    eyebrow: "Control",
    title: "AI proposes. You decide.",
    description: "You set what the AI does on its own and what waits for you. AI works for you, not instead of you.",
    steps: [
      {
        title: "AI proposes",
        body: "Drafts a reply, a price offer or the next step.",
      },
      {
        title: "You approve",
        body: "Important things wait for your yes; the rest follows your rules.",
      },
      {
        title: "It gets done",
        body: "Sent to the customer, logged in the CRM, the team notified.",
      },
      {
        title: "It goes on record",
        body: "Who did what, and when: the history can always be checked.",
      },
    ],
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
    eyebrow: "Solutions",
    title: "What we build",
    description: "We start with one process and grow the system with your business.",
    blocks: [
      {
        title: "AI agents and chatbots",
        goal: "Agents that work by your rules and with your approval, day and night.",
        services: [
          "Sales and support",
          "Website, Instagram, Telegram",
          "Document processing",
          "Automatic reports",
          "Internal AI assistant",
        ],
        value: "Work goes on at night too, and the team focuses on what matters.",
      },
      {
        title: "New customers",
        goal: "Websites, lead forms, CRM, sales automation, online shops.",
        services: [],
        value: "More requests, no lost customers",
      },
      {
        title: "Internal management",
        goal: "ERP, dashboards, tasks, inventory, bookings.",
        services: [],
        value: "Less chaos, clear responsibility",
      },
      {
        title: "Integrations",
        goal: "Payment systems, accounting, SMS and email, APIs.",
        services: [],
        value: "All your systems working as one",
      },
      {
        title: "Support",
        goal: "Hosting, updates and growing the system after launch.",
        services: [],
        value: "The system doesn't stop at launch",
      },
    ],
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
    title: "Who we work with",
    items: [
      "Shops and online stores",
      "Restaurants and hotels",
      "Beauty salons and fitness",
      "Clinics and dental practices",
      "Education centres",
      "Service teams",
      "Internet providers",
      "Accounting and law firms",
      "Logistics and delivery",
      "Manufacturing",
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
    title: "Problems we solve",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    items: [
      {
        tag: "Clinic",
        problem: "Questions that come in at night go unanswered until morning.",
        solution: "An Instagram agent offers free slots; the admin confirms the booking.",
        outcome: "No request gets lost overnight",
      },
      {
        tag: "Service team",
        problem: "Requests come by phone, WhatsApp and Excel, and some get lost.",
        solution: "One CRM, automatic assignment of jobs to technicians, delay alerts.",
        outcome: "Every request has an owner and a deadline",
      },
      {
        tag: "Online shop",
        problem: "The owner doesn't know what's happening until the end of the month.",
        solution: "A daily report in Telegram and one control dashboard.",
        outcome: "Decisions the same day",
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "From the first call to a working system",
    freeLabel: "free",
    steps: [
      {
        title: "Discovery",
        body: "We learn your business and where time gets lost.",
      },
      {
        title: "Solution plan",
        body: "What we build, what the AI does on its own, the timeline.",
      },
      {
        title: "Design",
        body: "Pages, processes, roles, approval rules.",
      },
      {
        title: "Build and test",
        body: "We test with your real examples.",
      },
      {
        title: "Launch",
        body: "We switch it on and train your team.",
      },
      {
        title: "Support",
        body: "We track the results and keep improving.",
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
    eyebrow: "Questions",
    title: "Frequently asked questions",
    description: "Didn't find your answer? Write to us and we'll reply.",
    askCta: "Ask a question",
    items: [
      {
        q: "Does the AI make decisions on its own?",
        a: "No. You decide which actions the AI takes on its own and which wait for your approval. The rules can be changed at any moment.",
      },
      {
        q: "What kinds of businesses are your solutions for?",
        a: "Businesses with a flow of customers, sales, orders, employees, documents or repetitive work.",
      },
      {
        q: "We already have a CRM. Can you work with it?",
        a: "Yes. We can connect AI agents and automations to the tools you already use, without replacing them.",
      },
      {
        q: "How long does it take to build?",
        a: "It depends on the scope. A simple agent or website is ready sooner, while a CRM or internal systems are built in stages. We'll give you an exact timeline after our first conversation.",
      },
      {
        q: "How safe is our data?",
        a: "Your data stays under your control. We agree in advance who has access to what and which steps require your approval.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. We track the results and improve the system together with your business.",
      },
    ],
  },
  cta: {
    eyebrow: "Free consultation",
    title: "Ready for AI to work for you?",
    body: "Tell us about your business. We'll show you, free of charge, which work AI can take on and how you keep control.",
    directLabel: "Or write to us directly",
    form: {
      phoneLabel: "Phone or WhatsApp",
      phonePlaceholder: "+374 ...",
      messageLabel: "What would you like the AI to do?",
      messagePlaceholder: "For example: answer Instagram questions and put the request into the CRM",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      optional: "(optional)",
      submit: "Book a free call",
      submitting: "Sending…",
      consentBefore: "By sending, you agree to our ",
      privacyLinkLabel: "privacy policy",
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
        message: "Briefly tell us what you'd like the AI to do (at least 10 characters).",
      },
    },
  },
  footer: {
    slogan: "AI agents and automation, under your control.",
    solutionsTitle: "Solutions",
    solutionsLinks: ["AI agents", "Websites and CRM", "Internal management", "Integrations"],
    companyTitle: "Company",
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
