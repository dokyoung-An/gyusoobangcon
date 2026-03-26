import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FooterNoticeSection } from "@/components/layout/FooterNoticeSection";
import { MobileFloatingActions } from "@/components/layout/MobileFloatingActions";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <MobileFloatingActions />
      <FooterNoticeSection />
      <Footer />
    </>
  );
}
