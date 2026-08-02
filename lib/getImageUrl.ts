export function getImageUrl(url: string | undefined | null): string {
  if (!url) return "/images/blog/default.jpg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    return `${baseUrl}${url}`;
  }
  return url;
}
