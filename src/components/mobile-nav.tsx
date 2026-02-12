"use client";

import Link from "next/link";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpen(!open)}
        className={cn(className)}
      >
        <MenuToggleIcon open={open} className="size-5" duration={300} />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div
        className={cn(
          "fixed top-12 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 sm:top-14",
          open ? "block" : "hidden"
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "ease-out data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 data-[slot=open]:animate-in data-[slot=open]:zoom-in-95",
            "flex h-full w-full flex-col justify-between gap-y-2 p-4"
          )}
        >
          <div className="grid gap-y-2">
            {items.map((link) => (
              <Link
                key={link.href}
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "justify-start text-base transition-all duration-200 hover:translate-x-1 hover:bg-accent",
                })}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
