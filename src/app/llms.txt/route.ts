import { renderLlmsIndex } from "@/portfolio/markdown";

export function GET() {
  return new Response(renderLlmsIndex(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
