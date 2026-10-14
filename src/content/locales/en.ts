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
    solutions: "Solutions",
    industries: "Industries",
    process: "Approach",
    faq: "FAQ",
    contact: "Contact",
  },
  common: {
    ctaPrimary: "Get a free consultation",
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
    eyebrow: "AI agents • Automation • Business software",
    title: "AI works 24/7.",
    titleAccent: "You make the decisions.",
    subtitle:
      "AI agents answer your customers, process requests, keep your CRM up to date and handle routine work, day and night. Every important step goes through your approval.",
    support:
      "You see everything in one dashboard and can change the rules or pause an agent at any moment.",
    primaryCta: "Get a free consultation",
    secondaryCta: "See what we build",
    trustLine:
      "AI agents • CRM • Websites • Automation • Dashboards • Integrations",
    console: {
      title: "AI agent · Sales",
      badge: "Demo",
      liveLabel: "Working 24/7",
      incomingLabel: "New message",
      thinkingLabel: "AI is analysing the request",
      draftLabel: "Reply drafted by AI",
      approvalPrompt: "Send to the customer?",
      approve: "Approve",
      edit: "Edit",
      approvedLabel: "Approved by you and sent",
      autoLabel: "On its own",
      srSummary:
        "Demo: an AI agent receives a customer message, drafts a reply and sends it only after you approve it.",
      scenarios: [
        {
          channel: "Instagram",
          time: "02:14",
          customer: "Ani",
          message: "Hi, is there a free slot tomorrow for teeth cleaning?",
          draft: "Hi Ani! Tomorrow we have 11:00 and 16:30 available. Which time suits you?",
          autoActions: ["Request logged in the CRM", "Doctor's calendar checked"],
        },
        {
          channel: "Website",
          time: "23:40",
          customer: "Armen",
          message: "I want to open an online shop. Can you give me a rough price?",
          draft: "Hi Armen! The price depends on the number of products and payment methods. Our specialist will call you tomorrow at 10:00 to go through the details.",
          autoActions: ["Request marked as high priority", "Task created for a specialist"],
        },
        {
          channel: "Telegram",
          time: "07:05",
          customer: "Mariam",
          message: "My order still hasn't arrived. What should I do?",
          draft: "Mariam, sorry for the delay. Your order will be delivered today before 14:00. We'll send the tracking link by SMS.",
          autoActions: ["Order No. 2048 found", "Delivery status checked"],
        },
      ],
    },
  },
  agents: {
    eyebrow: "AI team",
    title: "Your business's AI team",
    description:
      "Each agent has its own role. It handles routine work on its own and asks you before any important step.",
    autoLabel: "Does on its own",
    askLabel: "Asks you",
    items: [
      {
        name: "Sales agent",
        role: "Answers every request and never lets a customer slip away.",
        auto: ["Replies 24/7 on your website, Instagram and Telegram", "Logs the request in the CRM", "Reminds you about unanswered customers"],
        ask: ["Sending a price offer", "Giving a discount"],
      },
      {
        name: "Support agent",
        role: "Solves customer questions quickly and politely.",
        auto: ["Answers frequently asked questions", "Checks order status", "Books visits and calls"],
        ask: ["Refunds", "Resolving complaints"],
      },
      {
        name: "Operations agent",
        role: "Keeps internal work organised and on schedule.",
        auto: ["Assigns tasks to the team", "Fills in documents and spreadsheets", "Warns about delays"],
        ask: ["Confirming an order", "Paying a supplier"],
      },
      {
        name: "Analyst agent",
        role: "Shows you every day what is happening in your business.",
        auto: ["Prepares daily and weekly reports", "Finds problems and delays", "Suggests improvements"],
        ask: ["Which suggestion to act on"],
      },
    ],
  },
  control: {
    eyebrow: "Control",
    title: "You are in charge. Always.",
    description:
      "AI is fast and never gets tired, but the final word is yours. That is how we build every system.",
    points: [
      {
        title: "Important steps need your approval",
        body: "You decide what the AI does on its own and what waits for your yes.",
      },
      {
        title: "Everything is visible",
        body: "One dashboard shows what the AI has done, whom it answered and what is waiting for you.",
      },
      {
        title: "Pause with one click",
        body: "Stop an agent or change its rules at any moment.",
      },
      {
        title: "Every action is logged",
        body: "The history is kept, so you can always check who did what and when.",
      },
    ],
    flow: ["AI proposes", "You approve", "The action runs", "Everything is logged"],
    closing: "AI works for you, not instead of you.",
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
    title: "What we build",
    description:
      "We start with one process and grow the system as your business grows.",
    goalLabel: "What it gives you",
    valueLabel: "The result",
    blocks: [
      {
        title: "AI agents and chatbots",
        goal: "AI that answers, sorts and processes requests by your rules and with your approval.",
        services: [
          "Sales and support agents",
          "Chatbots for your website, Instagram and Telegram",
          "Document processing",
          "Automatic reports",
          "Data extraction",
          "Internal AI assistants",
        ],
        value: "Work continues at night while your team focuses on what matters.",
      },
      {
        title: "New customers",
        goal: "Websites and tools that collect requests and make sure none of them get lost.",
        services: [
          "Company websites",
          "Landing pages",
          "Lead forms",
          "CRM systems",
          "Sales automation",
          "Online shops",
        ],
        value: "More requests and no lost customers.",
      },
      {
        title: "Internal management",
        goal: "All internal work in one controllable system.",
        services: [
          "ERP systems",
          "Management dashboards",
          "Task management",
          "Inventory",
          "Bookings and schedules",
          "Admin panels",
        ],
        value: "Less chaos, clear responsibility and faster work.",
      },
      {
        title: "Integrations and support",
        goal: "We connect your tools so data is never copied by hand.",
        services: [
          "Payment systems",
          "Accounting software",
          "SMS and email notifications",
          "API integrations",
          "Servers and hosting",
          "Support and development",
        ],
        value: "All your systems work as one.",
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
    title: "Industries we work with",
    intro:
      "Our solutions fit small and medium businesses that have customers, orders and repetitive work.",
    examplesLabel: "Examples",
    solutionsLabel: "What we can do",
    groups: [
      {
        title: "Sales and customer service",
        examples:
          "Shops, online stores, real estate, restaurants, hotels, tourism, beauty salons, fitness clubs.",
        solutions:
          "AI sales agent, website, CRM, bookings, loyalty programmes and notifications.",
      },
      {
        title: "Field services and service teams",
        examples:
          "Cleaning and security companies, car services, construction, maintenance, internet providers.",
        solutions:
          "Work orders, technician scheduling, request dispatching and status tracking.",
      },
      {
        title: "Education and healthcare",
        examples:
          "Courses, training centres, clinics, dental clinics, laboratories.",
        solutions:
          "Bookings, reminders, client database, documents and payments.",
      },
      {
        title: "Finance and professional services",
        examples:
          "Accounting and law firms, consulting, recruitment agencies.",
        solutions:
          "Document automation, client portals, approval workflows and reports.",
      },
      {
        title: "Manufacturing, warehousing and delivery",
        examples:
          "Manufacturing, logistics, delivery, wholesale, import and export.",
        solutions:
          "Inventory, order management, route tracking and integrations.",
      },
    ],
    closing:
      "If your business has customers, orders or repetitive work, it can be automated without losing control.",
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
  process: {
    title: "How we work",
    description: "Six clear steps from the first conversation to a working system.",
    steps: [
      {
        title: "Getting to know you",
        body: "In a free call we learn about your business, its problems and where time is being lost.",
      },
      {
        title: "Solution plan",
        body: "We decide where you need an AI agent, a CRM, a website or automation, and what the AI will do on its own.",
      },
      {
        title: "Design",
        body: "Together we agree on pages, processes, roles and approval rules.",
      },
      {
        title: "Build",
        body: "We build the system and test it on real examples.",
      },
      {
        title: "Launch",
        body: "We connect it to your tools, train your team and launch together.",
      },
      {
        title: "Support and growth",
        body: "We track the results and keep improving the system as your business grows.",
      },
    ],
  },
  trust: {
    title: "Why MenQ",
    description: "Trust built on facts, not promises.",
    cards: [
      {
        title: "Real, working systems",
        body: "The websites, bots, AI agents and automations we build already run in real businesses, not just in presentations.",
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
        body: "After every stage you see the result, the timeline and the next step — no surprises.",
      },
    ],
    security: {
      title: "Your data, under your control",
      body: "We design every system so it is clear who can access which data, what the AI is allowed to do, and which steps require your approval.",
    },
  },
  faq: {
    title: "Frequently asked questions",
    description: "Answers to the questions we hear most often.",
    items: [
      {
        q: "What kind of businesses are your solutions for?",
        a: "Businesses with a flow of customers, sales, orders, employees, documents or repetitive work.",
      },
      {
        q: "Does the AI make decisions on its own?",
        a: "Only the ones you allow. You decide which steps the AI takes on its own and which require your approval. You can change these rules or pause an agent at any time.",
      },
      {
        q: "Do we have to order a big system?",
        a: "No. You can start with one agent or one automated process and grow step by step.",
      },
      {
        q: "We already have a CRM or other software. Can you work with it?",
        a: "Yes. We can connect AI agents and automations to the tools you already use, without replacing them.",
      },
      {
        q: "How safe is our data?",
        a: "Access is limited by role, the AI sees only the data it needs for its job, and every action is logged.",
      },
      {
        q: "How long does it take to build?",
        a: "It depends on the scope. A simple agent or website is ready sooner, while a CRM or internal system is built in stages. We'll give you an exact timeline after the first call.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. We provide support, updates and new features.",
      },
      {
        q: "Can you also build a mobile app or an online shop?",
        a: "Yes. We build websites, online shops, mobile apps and business systems.",
      },
    ],
  },
  cta: {
    title: "Ready to let AI work for you?",
    body: "Tell us about your business. We'll show you for free which work AI can take over and how you keep control.",
    contactTitle: "Prefer to reach us directly?",
    contactBody: "Message us on a convenient channel and we'll reply as soon as possible.",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      companyLabel: "Company",
      companyPlaceholder: "Company name",
      phoneLabel: "Phone",
      phonePlaceholder: "+374 ...",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      solutionLabel: "What are you interested in?",
      solutionPlaceholder: "Choose a solution",
      messageLabel: "Briefly describe your problem",
      messagePlaceholder:
        "For example: requests come in, but we can't answer everyone in time…",
      consentLabel:
        "By submitting this form, you agree that we may contact you using the provided details and use your information to respond to your request.",
      submit: "Get a free consultation",
      submitting: "Sending…",
      optional: "optional",
      required: "required",
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
      privacyNote:
        "Your data is used only to contact you and answer your request.",
      privacyLinkLabel: "Privacy Policy",
      successTitle: "Thank you",
      successBody:
        "Your request has been received. We will contact you as soon as possible.",
      errorTitle: "Couldn't send",
      errorBody:
        "Something went wrong while sending your request. Please try again or reach us through the listed contacts.",
      validation: {
        name: "Please enter your name (at least 2 characters).",
        contact: "Add at least a phone or email so we can reach you.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number: digits, optionally starting with +.",
        solution: "Choose which solution you're interested in.",
        message: "Briefly describe your problem (at least 10 characters).",
      },
    },
  },
  footer: {
    slogan: "AI agents and automation, under your control.",
    solutionsTitle: "Solutions",
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
      updated: "Updated: 14.10.2026",
      intro:
        "This page describes what data we collect, why, and how we use it.",
      sections: [
        {
          heading: "What data we collect",
          body: "Name, company, phone, email, interested solution, message, language, UTM parameters, referrer, landing page, submission timestamp, and IP address when needed for spam/security.",
        },
        {
          heading: "Why we collect it",
          body: "We collect data solely to respond to your request, contact you, and provide the consultation.",
        },
        {
          heading: "How we use contact data",
          body: "We contact you via the phone or email you provide to process your request. We do not sell your data to third parties.",
        },
        {
          heading: "How long we keep it",
          body: "We keep data for as long as needed to process the request and for business records. The exact retention period will be defined in the final policy.",
        },
        {
          heading: "Who has internal access",
          body: "Only authorized team members can access the data, based on their roles and a need-to-know basis.",
        },
        {
          heading: "Third-party tools",
          body: "We may use notification (email, Telegram) and analytics tools. The list will be specified in the final version.",
        },
        {
          heading: "Your rights",
          body: "You can request correction or deletion of your data by contacting us through the listed contacts.",
        },
        {
          heading: "Contact",
          body: "For privacy questions, reach us through the contacts listed on the page.",
        },
      ],
    },
    terms: {
      title: "Terms of use",
      updated: "Updated: 14.10.2026",
      intro:
        "This page describes the general terms for using the website.",
      sections: [
        {
          heading: "Description of services",
          body: "The website presents our AI, automation, and software solution services and lets you submit a consultation request.",
        },
        {
          heading: "Use of submissions",
          body: "Submitted requests are processed to contact you. Please provide accurate information.",
        },
        {
          heading: "Intellectual property",
          body: "Website content belongs to MenQ unless otherwise stated.",
        },
        {
          heading: "Limitation of liability",
          body: "The website is provided on an 'as is' basis. Final terms will be defined in the updated version.",
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      updated: "Updated: 14.10.2026",
      intro:
        "This page describes how we use cookies.",
      sections: [
        {
          heading: "What cookies are",
          body: "Cookies are small files stored on your device to keep the site working and to enable analytics.",
        },
        {
          heading: "Which cookies we use",
          body: "Essential cookies for site operation (e.g. theme and language preference). Analytics cookies activate only when the corresponding tools are enabled.",
        },
        {
          heading: "Managing cookies",
          body: "You can manage cookies through your browser settings.",
        },
      ],
    },
  },
};
