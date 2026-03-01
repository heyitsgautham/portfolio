import type { Metadata } from "next";
import React from "react";
import { FaTerminal } from "react-icons/fa";

import { getIcon } from "@/components/icons";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Tech Stack",
    description: "A comprehensive list of technologies I use and love.",
    alternates: { canonical: "/tech-stack" },
    openGraph: {
        title: "Tech Stack",
        description: "A comprehensive list of technologies I use and love.",
        url: "/tech-stack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tech Stack",
        description: "A comprehensive list of technologies I use and love.",
    },
};

const CATEGORY_META: Record<string, { subtitle: string }> = {
    Languages: {
        subtitle: "The foundation everything is built on.",
    },
    "AI & Data": {
        subtitle: "Machine learning, computer vision, and agentic frameworks.",
    },
    "App Development": {
        subtitle: "Frontend, mobile, and desktop - from pixel to product.",
    },
    "Backend & Infrastructure": {
        subtitle:
            "Cloud, DevOps, databases, and the services that keep things running.",
    },
};

const CATEGORY_ORDER = [
    "Languages",
    "AI & Data",
    "App Development",
    "Backend & Infrastructure",
];

// Icons that need special background treatment
const NEEDS_WHITE_BG_IN_DARK = new Set(["flask"]);
const NEEDS_BLACK_BG_IN_LIGHT = new Set([
    "ollama",
    "lambda",
    "notebooklm",
    "aistudio",
    "mcp",
    "notion",
]);

export default function TechStackPage() {
    const groupedStack = TECH_STACK.reduce(
        (acc, tech) => {
            const category = tech.categories[0] || "Other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(tech);
            return acc;
        },
        {} as Record<string, typeof TECH_STACK>
    );

    const categories = CATEGORY_ORDER.filter((c) => groupedStack[c]);

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Tech Stack
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Tools, languages, and frameworks I work with.
                </p>
            </div>

            <div className="space-y-16">
                {categories.map((category) => {
                    const meta = CATEGORY_META[category];
                    return (
                        <div key={category}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    {category}
                                </h2>
                                {meta?.subtitle && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {meta.subtitle}
                                    </p>
                                )}
                            </div>
                            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {groupedStack[category].map((tech) => {
                                    const icon = getIcon(tech.key, 32);
                                    const displayName = tech.displayName || tech.title;

                                    return (
                                        <li key={tech.key}>
                                            <SimpleTooltip content={displayName}>
                                                <a
                                                    href={tech.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={cn(
                                                        "group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-md",
                                                        "dark:bg-zinc-900/50 dark:backdrop-blur-sm"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-center transition-colors group-hover:text-primary",
                                                            !icon && "text-muted-foreground",
                                                            NEEDS_WHITE_BG_IN_DARK.has(tech.key) &&
                                                            "rounded-lg p-1 dark:bg-white",
                                                            NEEDS_BLACK_BG_IN_LIGHT.has(tech.key) &&
                                                            "rounded-lg bg-zinc-900 p-1 dark:bg-transparent"
                                                        )}
                                                    >
                                                        {icon || <FaTerminal className="h-8 w-8" />}
                                                    </div>
                                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                                        {displayName}
                                                    </span>
                                                </a>
                                            </SimpleTooltip>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
