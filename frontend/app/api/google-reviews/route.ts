import { NextRequest, NextResponse } from "next/server";
import { fetchGoogleReviews } from "../../../lib/googleReviews";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const syncParam = searchParams.get("sync") || searchParams.get("refresh");
    const forceRefresh = syncParam === "true" || syncParam === "1";

    const data = await fetchGoogleReviews(forceRefresh);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": forceRefresh
          ? "no-store, max-age=0"
          : "public, max-age=0, s-maxage=1800, stale-while-revalidate=3600",
        "CDN-Cache-Control": forceRefresh ? "no-store" : "public, s-maxage=1800",
      },
    });
  } catch (error) {
    console.error("API Route /api/google-reviews error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load latest Google reviews at this time.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
