import { markdownResponse, renderPortfolioMarkdown } from "@/portfolio/markdown";
import { SITE_URL } from "@/portfolio/routes";

export async function GET(_request: Request, { params }: { params: Promise<{ segments?: string[] }> }) {
  const { segments = [] } = await params;
  const path = `/${segments.join("/")}`;
  const body = await renderPortfolioMarkdown(path);
  if (body === null) return new Response(null, { status: 404 });
  return markdownResponse(body, `${SITE_URL}${path}`);
}
