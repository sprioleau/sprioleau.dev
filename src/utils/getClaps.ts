export default async function getClaps() {
  const id = process.env.EDGE_CONFIG_ID;
  const token = process.env.EDGE_CONFIG_TOKEN;
  if (!id || !token) return { data: null, error: null };

  const url = new URL(`https://edge-config.vercel.com/${id}/item/claps`);
  url.searchParams.set("token", token);

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`Could not read claps (${response.status})`);

    const data: unknown = await response.json();
    return { data: typeof data === "number" && Number.isFinite(data) ? data : null, error: null };
  } catch (caughtError) {
    return { data: null, error: caughtError as Error };
  }
}
