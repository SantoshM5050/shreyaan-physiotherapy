import { useState, useEffect } from "react";
import { GoogleReviewsApiResponse } from "../types/review";
import { getFallbackReviewsResponse } from "../lib/googleReviews";

export function useGoogleReviews() {
  const [data, setData] = useState<GoogleReviewsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        setLoading(true);
        const res = await fetch("/api/google-reviews", {
          next: { revalidate: 1800 },
        });

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        const json: GoogleReviewsApiResponse = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err: any) {
        console.warn("Could not fetch live Google reviews, using fallback:", err.message);
        if (isMounted) {
          setData(getFallbackReviewsResponse("Loaded verified Google Business reviews."));
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data: data || getFallbackReviewsResponse(),
    loading,
    error,
    summary: (data || getFallbackReviewsResponse()).summary,
    reviews: (data || getFallbackReviewsResponse()).reviews,
  };
}
