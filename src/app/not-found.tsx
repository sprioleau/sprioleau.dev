import PageSectionLayout from "@/components/PageSectionLayout";
import { portfolioPages } from "@/portfolio/routes";

export default function NotFound() {
  return (
    <PageSectionLayout
      sectionTitle="Page not found"
      headingLevel={1}
    >
      <p>The page you requested could not be found. Visit one of these pages to continue exploring the portfolio.</p>
      <ul>
        {portfolioPages
          .filter(({ path }) => path !== "/")
          .map(({ path, label }) => (
            <li key={path}>
              <a href={path}>{label}</a>
            </li>
          ))}
        <li>
          <a href="/sitemap.xml">Sitemap</a>
        </li>
      </ul>
    </PageSectionLayout>
  );
}
