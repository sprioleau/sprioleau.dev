import { acceptsMarkdown, applyMarkdownHeaders, createNotFoundResponse } from "@vercel/agent-readability";
import { NextRequest, NextResponse } from "next/server";
import { markdownPath } from "@/portfolio/markdown-path";
import { portfolioPages, SITE_URL } from "@/portfolio/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isReadRequest = request.method === "GET" || request.method === "HEAD";
  if (!isReadRequest) return NextResponse.next();

  const isMarkdownPath = pathname.endsWith(".md");
  const page = portfolioPages.find(({ path }) => (isMarkdownPath ? markdownPath(path) : path) === pathname);

  if (isMarkdownPath || acceptsMarkdown(request)) {
    if (!page) {
      return createNotFoundResponse(pathname, {
        markdown: `# Page not found\n\nThe requested portfolio page could not be found. Browse the [portfolio index](${SITE_URL}/llms.txt), [sitemap](${SITE_URL}/sitemap.xml), or [homepage](${SITE_URL}/).\n`,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const url = request.nextUrl.clone();
    url.pathname = `/portfolio-markdown${page.path === "/" ? "" : page.path}`;
    url.search = "";
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  if (page) {
    applyMarkdownHeaders(response.headers);
    response.headers.append("Link", `<${SITE_URL}${markdownPath(page.path)}>; rel="alternate"; type="text/markdown"`);
    response.headers.append("Link", `<${SITE_URL}/llms.txt>; rel="describedby"`);
  }
  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next(?:/|$)|api(?:/|$)|claps(?:/|$)|portfolio-markdown(?:/|$)|images(?:/|$)|fonts(?:/|$)|\\.well-known(?:/|$)|favicon(?:[._]|$)|manifest\\.json$|robots\\.txt$|sitemap\\.xml$|llms(?:-full)?\\.txt$).+)",
  ],
};
