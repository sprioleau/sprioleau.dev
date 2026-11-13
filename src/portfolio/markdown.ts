import { portableTextToMarkdown } from "@portabletext/markdown";
import { applyMarkdownHeaders } from "@vercel/agent-readability";
import { client, queries, urlFor } from "@/libs/sanity";
import type { AboutData, BodyContent, ContactData, Experience, FooterData, HeroData, LinksObject, Project, SiteDetails } from "@/schemas/types";
import formatIsoDate from "@/utils/formatIsoDate";
import { markdownPath } from "./markdown-path";
import { privacyIntro, privacySections } from "./privacy";
import { homePage, portfolioOwner, portfolioPages, portfolioSections, privacyPage, projectsArchivePage, SITE_URL } from "./routes";

function document(...blocks: (string | undefined)[]) {
  return `${blocks.map((block) => block?.trim()).filter(Boolean).join("\n\n")}\n`;
}

function richText(blocks: BodyContent[] = []) {
  return portableTextToMarkdown(blocks, {
    marks: { internalProjectReference: () => "" },
  }).trim();
}

function link(label: string, href: string) {
  const url = URL.parse(href, SITE_URL);
  if (!url || !["https:", "http:", "mailto:"].includes(url.protocol)) return label;
  const target = url.href.replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `[${label.replace(/[\\[\]]/g, "\\$&")}](${target})`;
}

async function renderHero() {
  const { heading, subHeading, brief, cta } = await client.fetch<HeroData>(queries.hero);
  return document(`# ${heading}`, `**${subHeading}**`, richText(brief), link(cta.label, `/#${cta.linkTarget}`));
}

async function renderAbout() {
  const { body, mainImage } = await client.fetch<AboutData>(queries.about);
  const image = mainImage && urlFor(mainImage).width(350).height(350).format("webp").url();
  return document(richText(body), image ? `![${portfolioOwner.name} headshot](<${image}>)` : undefined);
}

async function renderExperience(headingPrefix: string) {
  const experience = await client.fetch<Experience[]>(queries.experience);
  return document(...experience.map(({ jobTitle, employer, fromDate, toDate, currentlyInRole, workHighlights }) => {
    const employerName = employer?.webAddress ? link(employer.name, employer.webAddress) : employer?.name;
    const dates = [formatIsoDate(fromDate), toDate ? formatIsoDate(toDate) : currentlyInRole ? "Present" : null];
    return document(
      `${headingPrefix} ${[jobTitle, employerName].filter(Boolean).join(" at ")}`,
      dates.filter(Boolean).join(" – "),
      richText(workHighlights),
    );
  }));
}

const projectLinkLabels: Record<keyof LinksObject, string> = {
  deployedUrl: "Visit project",
  gitHubUrl: "GitHub",
  vsCodeUrl: "Open in VS Code",
  figmaUrl: "Figma",
};

function projectLinks(links: LinksObject | undefined) {
  if (!links) return "";
  return (Object.keys(projectLinkLabels) as (keyof LinksObject)[])
    .filter((key) => links[key])
    .map((key) => link(projectLinkLabels[key], links[key]))
    .join(" · ");
}

async function renderWork(headingPrefix: string) {
  const projects = await client.fetch<Project[]>(queries.featuredProjects);
  return document(...projects.map(({ title, description, tags, links }) => document(
    `${headingPrefix} ${title}`,
    richText(description),
    tags?.map(({ name }) => name).join(", "),
    projectLinks(links),
  )), link(projectsArchivePage.label, projectsArchivePage.path));
}

async function renderContact() {
  const [{ email, overline }, { creator }] = await Promise.all([
    client.fetch<ContactData>(queries.contact),
    client.fetch<SiteDetails>(queries.siteDetails),
  ]);
  return document(overline, link(email, `mailto:${email}`), [
    link("GitHub", creator.links.gitHubUrl),
    link("LinkedIn", creator.links.linkedInUrl || portfolioOwner.linkedInUrl),
  ].join(" · "));
}

async function renderArchive(headingPrefix: string) {
  const projects = await client.fetch<Project[]>(queries.allProjects);
  return document(...projects.map(({ title, yearBuilt, builtFor, builtWith, links }) => document(
    `${headingPrefix} ${title}`,
    [formatIsoDate(yearBuilt, "YYYY"), builtFor?.name, builtWith?.map(({ name }) => name).join(", ")]
      .filter(Boolean).join(" · "),
    projectLinks(links),
  )));
}

function renderPrivacy(headingPrefix: string) {
  return document(privacyIntro, ...privacySections.map(({ heading, paragraphs, links }) => document(
    `${headingPrefix} ${heading}`,
    ...paragraphs,
    links?.map(({ label, href }) => `- ${link(label, href)}`).join("\n"),
  )));
}

const renderSections = {
  about: renderAbout,
  experience: renderExperience,
  work: renderWork,
  contact: renderContact,
};

async function renderHome() {
  const [hero, sections, footer] = await Promise.all([
    renderHero(),
    Promise.all(portfolioSections.map(async ({ slug, title }) => document(`## ${title}`, await renderSections[slug]("###")))),
    client.fetch<FooterData>(queries.footer),
  ]);
  return document(hero, ...sections, richText(footer.body), link(privacyPage.label, privacyPage.path));
}

export async function renderPortfolioMarkdown(path: string) {
  const section = portfolioSections.find(({ slug }) => path === `/${slug}`);
  if (section) return document(`# ${section.title}`, await renderSections[section.slug]("##"));
  if (path === homePage.path) return renderHome();
  if (path === projectsArchivePage.path) return document(`# ${projectsArchivePage.title}`, await renderArchive("##"));
  if (path === privacyPage.path) return document(`# ${privacyPage.title}`, renderPrivacy("##"));
  return null;
}

export function renderLlmsIndex() {
  return document(
    `# ${portfolioOwner.name}`,
    `> ${homePage.description}`,
    "## When to use this site",
    "Use this portfolio to learn about San'Quan’s background, software engineering experience, projects, and professional contact information. Follow a Markdown link for a specific topic or read the complete portfolio in one file.",
    "## Portfolio",
    portfolioPages.map(({ path, label, description }) => `- ${link(label, markdownPath(path))}: ${description}`).join("\n"),
    "## Optional",
    `- ${link("Complete portfolio", "/llms-full.txt")}: Use for a single-file copy of the homepage, project archive, and privacy policy.`,
  );
}

export async function renderLlmsFull() {
  const [home, archive] = await Promise.all([renderHome(), renderArchive("###")]);
  return document(home, `## ${projectsArchivePage.title}`, archive, `## ${privacyPage.title}`, renderPrivacy("###"));
}

export function markdownResponse(body: string, canonicalUrl: string) {
  const headers = new Headers({ "Content-Type": "text/markdown; charset=utf-8" });
  applyMarkdownHeaders(headers, { canonicalUrl });
  return new Response(body, { headers });
}
