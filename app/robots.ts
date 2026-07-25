import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://shreyaanphysiotherapycenter.in/sitemap.xml",
    host: "https://shreyaanphysiotherapycenter.in",
  };
}
