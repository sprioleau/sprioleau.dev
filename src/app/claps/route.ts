import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const newClapsTotal = body?.newClapsTotal;

  if (!Number.isSafeInteger(newClapsTotal) || newClapsTotal < 0) {
    return Response.json({ data: null, error: "Invalid clap total" }, {
      status: 400,
    });
  }

  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "update",
          key: "claps",
          value: newClapsTotal,
        },
      ],
    }),
    next: { revalidate: 0 },
  };

  try {
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
      requestOptions
    );
    if (!response.ok) {
      console.error("Edge Config rejected the clap update", response.status);
      return Response.json({ data: null, error: "Could not save claps" }, { status: 502 });
    }

    return Response.json({ data: await response.json(), error: null });
  } catch (caughtError) {
    console.error(caughtError);

    return Response.json({ data: null, error: "Internal server error" }, {
      status: 500,
    });
  }
}
