import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://orionone.com.pk";
  const now = new Date();

  const routes: Array<{
    url: string;
    priority: number;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
  }> = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${baseUrl}/residences`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/residence`, priority: 0.9, changeFrequency: "weekly" },
    {
      url: `${baseUrl}/residence/1-bedroom`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/residence/2-bedroom`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/residence/3-bedroom`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/residence/private-pool`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { url: `${baseUrl}/commercial`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/amenities`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/lakeside`, priority: 0.8, changeFrequency: "monthly" },
    {
      url: `${baseUrl}/lakeside-experience`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { url: `${baseUrl}/location`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/orion-one`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/details`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/listing`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/blogs`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/events`, priority: 0.7, changeFrequency: "weekly" },
  ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
