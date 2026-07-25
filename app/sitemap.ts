import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://shreyaan-physiotherapy.vercel.app";

  return [
    "",
    "/#about",
    "/#services",
    "/#gallery",
    "/#testimonials",
    "/#faq",
    "/#contact",
  ].map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
