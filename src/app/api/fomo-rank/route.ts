import { NextResponse } from "next/server";

const APP_ID = "6741115427";
const APPLE_FINANCE_CHART_URL =
  "https://itunes.apple.com/es/rss/topfreeapplications/limit=200/genre=6015/json";

type AppleChart = {
  feed?: {
    entry?: Array<{
      id?: {
        attributes?: {
          "im:id"?: string;
        };
      };
    }>;
  };
};

export async function GET() {
  try {
    const response = await fetch(APPLE_FINANCE_CHART_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error("Apple chart request failed");
    }

    const chart = (await response.json()) as AppleChart;
    const entries = chart.feed?.entry ?? [];
    const rank = entries.findIndex(
      (app) => app.id?.attributes?.["im:id"] === APP_ID,
    ) + 1;

    if (rank < 1) {
      return NextResponse.json(
        { available: false, updatedAt: new Date().toISOString() },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        available: true,
        rank,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { available: false },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}