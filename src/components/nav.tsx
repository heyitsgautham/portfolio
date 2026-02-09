import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function Nav({
  items,
  activeId,
  className,
}: {
  items: NavItem[];
  activeId?: string;
  className?: string;
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn(
        "flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2",
        className
      )}
    >
      {items.map(({ title, href }) => {
        const active =
          activeId === href ||
          (href === "/" // Home page
            ? ["/", "/index"].includes(activeId || "")
            : activeId?.startsWith(href));

        return (
          <NavItem key={href} href={href} active={active}>
            {title}
          </NavItem>
        );
      })}
    </nav>
  );
}

export function NavItem({
  active,
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
}) {
  return (
    <Link
      className={cn(
        "group relative px-2 py-2 font-mono text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors duration-300 sm:px-2.5 sm:text-sm md:px-3",
        "hover:text-foreground",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300 after:ease-out",
        "hover:after:w-full",
        active && "text-foreground after:w-full"
      )}
      {...props}
    />
  );
}
