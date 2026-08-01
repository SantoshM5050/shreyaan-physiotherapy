import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "../../../lib/googleReviews";

export const revalidate = 1800; // Revalidate every 30 minutes (1800s)

export async function GET() {
  try {
    const data = await fetchGoogleReviews();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=1800, stale-while-revalidate=3600",
        "CDN-Cache-Control": "public, s-maxage=1800",
        "Vercel-CDN-Cache-Control": "public, s-maxage=1800",
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
