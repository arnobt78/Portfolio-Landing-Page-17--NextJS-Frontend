import type { MetadataRoute } from "next";
import { siteMetadata } from "@/app/data/siteMetadata";

/** Generates /robots.txt: allow / and /api/og, disallow community-wall, links, changelog; references sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: ["/community-wall", "/links/", "/changelog"],
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
}
