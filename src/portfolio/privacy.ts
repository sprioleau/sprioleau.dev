export const privacyIntro =
  "This is San’Quan Prioleau’s personal portfolio. This page explains how the site handles visits, claps, and messages.";

export const privacySections = [
  {
    heading: "Visits and performance",
    paragraphs: [
      "Vercel hosts this site. The site uses Vercel Web Analytics and Speed Insights to understand which pages people visit and how quickly those pages load. These services report aggregate usage and performance, which can include the page visited, the referring site, general device and browser information, and page load timings. Vercel Web Analytics does not use cookies.",
    ],
    links: [
      { label: "Vercel Web Analytics privacy information", href: "https://vercel.com/docs/analytics/privacy-policy" },
      { label: "Vercel Speed Insights privacy information", href: "https://vercel.com/docs/speed-insights/privacy-policy" },
    ],
  },
  {
    heading: "Claps",
    paragraphs: [
      "When you use the clap button, the site sends an update to the server. The total is stored in Vercel Edge Config and displayed publicly as a single count.",
    ],
  },
  {
    heading: "Email and external links",
    paragraphs: [
      "If you email me, I receive your email address and the information you choose to share so I can respond. Links to other sites, such as project sites and social profiles, take you to services with their own privacy practices. You can reach me through the Contact page with questions about this site or how I handle your information.",
    ],
    links: [{ label: "Contact San’Quan", href: "/contact" }],
  },
];
