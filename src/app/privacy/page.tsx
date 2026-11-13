import { PageSectionLayout } from "@/components";
import { privacyIntro, privacySections } from "@/portfolio/privacy";
import { privacyPage } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const metadata = getPortfolioMetadata(privacyPage);
export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  return (
    <PageSectionLayout sectionId="privacy" sectionTitle="Privacy" headingLevel={1}>
      <p>{privacyIntro}</p>
      {privacySections.map(({ heading, paragraphs, links }) => (
        <section key={heading}>
          <h2>{heading}</h2>
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {links && (
            <ul>
              {links.map(({ label, href }) => (
                <li key={href}><a className="a" href={href}>{label}</a></li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </PageSectionLayout>
  );
}
