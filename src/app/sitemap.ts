import type { MetadataRoute } from "next";

import { portfolioPages, SITE_URL } from "@/portfolio/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return portfolioPages.map(({ path }) => ({ url: new URL(path, SITE_URL).href }));
}
