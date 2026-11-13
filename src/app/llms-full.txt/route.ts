import { renderLlmsFull } from "@/portfolio/markdown";

export async function GET() {
  return new Response(await renderLlmsFull(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
