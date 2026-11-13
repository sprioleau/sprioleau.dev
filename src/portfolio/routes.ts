export const SITE_URL = "https://www.sprioleau.dev";
export const portfolioOwner = {
  name: "San'Quan Prioleau",
  jobTitle: "Staff Software Engineer",
  gitHubUrl: "https://github.com/sprioleau",
  linkedInUrl: "https://www.linkedin.com/in/sanquanprioleau/",
} as const;

export const aboutPage = {
  slug: "about",
  path: "/about",
  label: "About",
  title: "My Story",
  description: "Meet San'Quan Prioleau, an Atlanta-based software engineer with a background in visual design.",
} as const;

export const experiencePage = {
  slug: "experience",
  path: "/experience",
  label: "Experience",
  title: "Experience",
  description: "Explore San'Quan Prioleau's software engineering roles, work highlights, and career history.",
} as const;

export const workPage = {
  slug: "work",
  path: "/work",
  label: "Work",
  title: "Selected Work",
  description: "Explore featured software projects by San'Quan Prioleau and the technologies behind them.",
} as const;

export const contactPage = {
  slug: "contact",
  path: "/contact",
  label: "Contact",
  title: "Get in Touch",
  description: "Find San'Quan Prioleau's email address and links to his professional profiles.",
} as const;

export const portfolioSections = [aboutPage, experiencePage, workPage, contactPage] as const;

export const homePage = {
  path: "/",
  label: "Home",
  title: `${portfolioOwner.name} - ${portfolioOwner.jobTitle}`,
  description:
    "Portfolio of San'Quan Prioleau, a Staff Software Engineer in Atlanta with a background in visual design.",
} as const;

export const projectsArchivePage = {
  path: "/projects/all",
  label: "All Projects",
  title: "All Projects",
  description: "Browse San'Quan Prioleau's project archive by year, technologies, and project links.",
} as const;

export const privacyPage = {
  path: "/privacy",
  label: "Privacy",
  title: "Privacy",
  description: "Learn how sprioleau.dev handles site analytics, claps, and contact information.",
} as const;

export const portfolioPages = [homePage, ...portfolioSections, projectsArchivePage, privacyPage];
