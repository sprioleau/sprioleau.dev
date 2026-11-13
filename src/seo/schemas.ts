import { homePage, portfolioOwner, SITE_URL } from "@/portfolio/routes";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: portfolioOwner.name,
  url: SITE_URL,
  description: homePage.description,
  jobTitle: portfolioOwner.jobTitle,
  sameAs: [portfolioOwner.gitHubUrl, portfolioOwner.linkedInUrl],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: portfolioOwner.name,
  url: SITE_URL,
  description: homePage.description,
  creator: { "@id": personSchema["@id"] },
};
