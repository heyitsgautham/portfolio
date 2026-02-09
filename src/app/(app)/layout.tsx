import dynamic from "next/dynamic";

import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 pt-14 sm:pt-16 md:pt-20">
        <PageTransition>{children}</PageTransition>
      </div>
      <SiteFooter />
      <ScrollTop />
    </div>
  );
}
