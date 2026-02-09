import React from "react";
import { FaTerminal } from "react-icons/fa";

import { getIcon } from "@/components/icons";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Tech Stack",
    description: "A comprehensive list of technologies I use and love.",
};

export default function TechStackPage() {
    // Group by category
    const groupedStack = TECH_STACK.reduce((acc, tech) => {
        const category = tech.categories[0] || "Other";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tech);
        return acc;
    }, {} as Record<string, typeof TECH_STACK>);

    // Sort categories alphabetically or by a custom order if needed
    const categories = Object.keys(groupedStack).sort();

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tech Stack</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Tools, languages, and frameworks I work with.
                </p>
            </div>

            <div className="space-y-12">
                {categories.map((category) => (
                    <div key={category}>
                        <h2 className="mb-6 text-2xl font-semibold tracking-tight">{category}</h2>
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
                                                    "group flex flex-col items-center justify-center gap-3 rounded-2xl bg-card p-6 border border-border/50 shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:shadow-md",
                                                    "dark:bg-zinc-900/50 dark:backdrop-blur-sm"
                                                )}
                                            >
                                                <div className={cn("transition-colors group-hover:text-primary", !icon && "text-muted-foreground")}>
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
                ))}
            </div>
        </div>
    );
}
