import Link from "next/link";
import React from "react";
import { FaTerminal } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";

import { getIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";

export function TechStack() {
  // Split into 2 rows
  const half = Math.ceil(TECH_STACK.length / 2);
  const firstRow = TECH_STACK.slice(0, half);
  const secondRow = TECH_STACK.slice(half);

  const renderTechItem = (tech: (typeof TECH_STACK)[number]) => {
    const icon = getIcon(tech.key, 48); // Increase from 24px to 48px
    const displayName = tech.displayName || tech.title;

    // Icons that are dark and need white background in dark mode
    const needsWhiteBgInDark = ['flask', 'github'].includes(tech.key);

    // Icons that are light and need dark background in light mode
    const needsBlackBgInLight: string[] = ['ollama', 'lambda', 'v0', 'notebooklm', 'aistudio', 'mcp', 'cursor', 'githubcopilot', 'notion'];

    return (
      <li key={tech.key} className="flex">
        <SimpleTooltip content={displayName}>
          <a
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={displayName}
            className="flex items-center justify-center transition-transform hover:scale-110"
          >
            <div className={cn(
              "transition-opacity hover:opacity-80 flex items-center justify-center",
              needsWhiteBgInDark && "dark:bg-white rounded-lg p-2",
              needsBlackBgInLight.includes(tech.key) && "bg-zinc-900 dark:bg-transparent rounded-lg p-2"
            )}>
              {icon || <FaTerminal className="h-12 w-12" />}
            </div>
            <span className="sr-only">{displayName}</span>
          </a>
        </SimpleTooltip>
      </li>
    );
  };

  return (
    <section id="stack" className="relative flex flex-col gap-8 py-8">
      <div className="relative flex flex-col gap-4 overflow-hidden">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <Marquee className="[--duration:60s] [--gap:4rem]" pauseOnHover repeat={4}>
          <ul className="flex gap-4 select-none py-2">
            {firstRow.map(renderTechItem)}
          </ul>
        </Marquee>

        <Marquee className="[--duration:60s] [--gap:4rem]" reverse pauseOnHover repeat={4}>
          <ul className="flex gap-4 select-none py-2">
            {secondRow.map(renderTechItem)}
          </ul>
        </Marquee>
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline" className="group rounded-full px-6">
          <Link href="/tech-stack">
            Checkout all
            <LuArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
