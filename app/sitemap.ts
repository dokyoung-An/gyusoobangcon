import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const base = siteConfig.url.replace(/\/$/, "");

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

/** 공개 페이지 경로 (admin 제외) */
const PUBLIC_PATHS: {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/home", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about/company", changeFrequency: "monthly", priority: 0.9 },
  { path: "/location", changeFrequency: "monthly", priority: 0.9 },
  { path: "/location/danji-layout", changeFrequency: "monthly", priority: 0.8 },
  { path: "/location/dongho-layout", changeFrequency: "monthly", priority: 0.8 },
  { path: "/location/premium", changeFrequency: "monthly", priority: 0.8 },
  { path: "/location/system", changeFrequency: "monthly", priority: 0.8 },
  { path: "/floorplan", changeFrequency: "monthly", priority: 0.9 },
  { path: "/floorplan/interior", changeFrequency: "monthly", priority: 0.85 },
  { path: "/modelhouse", changeFrequency: "monthly", priority: 0.85 },
  { path: "/promotion-video", changeFrequency: "monthly", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.95 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
