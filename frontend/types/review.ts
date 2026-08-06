export interface Reviewer {
  displayName: string;
  profilePhotoUrl?: string;
  isAnonymous?: boolean;
}

export interface ReviewReply {
  comment: string;
  updateTime: string;
}

export interface GoogleReview {
  reviewId: string;
  reviewer: Reviewer;
  starRating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createTime: string;
  relativeTime: string;
  updateTime?: string;
  reviewReply?: ReviewReply;
  verified: boolean;
}

export interface GoogleReviewSummary {
  averageRating: number;
  totalReviewCount: number;
  writeReviewUrl: string;
  readAllReviewsUrl: string;
}

export interface GoogleReviewsApiResponse {
  success: boolean;
  summary: GoogleReviewSummary;
  reviews: GoogleReview[];
  cachedAt?: string;
  isFallback?: boolean;
  error?: string;
}

export interface GoogleOAuthTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
  error?: string;
  error_description?: string;
}
