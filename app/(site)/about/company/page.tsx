import type { Metadata } from "next";
import { CompanyOverviewClient } from "@/components/about/CompanyOverviewClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
  description: `${siteConfig.name}의 주요 실적과 사업 분야(아파트 시행, 전원주택 개발)를 소개합니다.`,
  openGraph: {
    title: `회사소개 | ${siteConfig.name}`,
    description: `${siteConfig.name}의 주요 실적과 사업 분야(아파트 시행, 전원주택 개발)를 소개합니다.`,
  },
};

export default function AboutCompanyPage() {
  return <CompanyOverviewClient />;
}

