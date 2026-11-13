export type ContributionsData = {
  contributions: number;
};

export async function fetchContributions(): Promise<ContributionsData> {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  if (!accessToken) return { contributions: 0 };

  const uri = "https://api.github.com/graphql";

  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(date.getUTCFullYear() - 1);
  const dateISOString = date.toISOString();

  let data = null;
  let contributions = 0;

  try {
    const json = await fetch(uri, {
      next: {
        revalidate: 60,
      },
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `
        {
          user(login: "sprioleau") {
            contributionsCollection(from: "${dateISOString}") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
        `,
      }),
    }).then((response) => response.json());

    data = json.data;
  } catch (caughtError) {
    console.error(caughtError);
  }

  if (data) {
    contributions = data.user.contributionsCollection.contributionCalendar.totalContributions;
  }

  return { contributions };
}
