"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { IndiaTime } from "@/components/india-time";
import { ToggleTheme } from "@/components/toggle-theme";
import { MAIN_NAV } from "@/config/site";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

import { SiteHeaderMark } from "./site-header-mark";
import { SiteHeaderWrapper } from "./site-header-wrapper";

const BrandContextMenu = dynamic(() =>
  import("@/components/brand-context-menu").then((mod) => mod.BrandContextMenu)
);

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
);

export function SiteHeader() {
  const scrolled = useScroll(10);

  return (
    <SiteHeaderWrapper
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-out",
        {
          "bg-background/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60":
            scrolled,
        }
      )}
    >
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-4 sm:h-14 sm:px-6">
        <div className="flex items-center gap-6">
          <BrandContextMenu>
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center transition-transform duration-200 hover:scale-105 [&_svg]:h-6 sm:[&_svg]:h-7"
            >
              <SiteHeaderMark />
            </Link>
          </BrandContextMenu>

          <DesktopNav items={MAIN_NAV} />
        </div>

        <div className="flex items-center gap-3">
          <IndiaTime />
          <ToggleTheme />
          <MobileNav className="md:hidden" items={MAIN_NAV} />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
