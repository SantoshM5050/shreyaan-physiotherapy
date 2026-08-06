import { useState, useEffect, useCallback } from "react";
import { GoogleReviewsApiResponse } from "../types/review";
import { getFallbackReviewsResponse } from "../lib/googleReviews";

export function useGoogleReviews() {
  const [data, setData] = useState<GoogleReviewsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/google-reviews", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json: GoogleReviewsApiResponse = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      console.warn("Could not fetch live Google reviews, using fallback:", err.message);
      setData(getFallbackReviewsResponse("Loaded verified Google Business reviews."));
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    data: data || getFallbackReviewsResponse(),
    loading,
    error,
    summary: (data || getFallbackReviewsResponse()).summary,
    reviews: (data || getFallbackReviewsResponse()).reviews,
    refetch: fetchReviews,
  };
}
