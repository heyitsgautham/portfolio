import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CreativeWork, WithContext } from "schema-dts";

import { getIcon } from "@/components/icons";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { SITE_INFO } from "@/config/site";
import { getProjectBySlug, PROJECTS } from "@/features/profile/data/projects";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};

    const title = project.title.split(" - ")[0];
    return {
        title,
        description: project.intro,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: {
            title,
            description: project.intro,
            url: `/projects/${slug}`,
            siteName: SITE_INFO.name,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: project.intro,
        },
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const title = project.title.split(" - ")[0];
    const subtitle = project.title.includes(" - ")
        ? project.title.split(" - ").slice(1).join(" - ")
        : null;

    const jsonLd: WithContext<CreativeWork> = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.intro,
        url: `${SITE_INFO.url}/projects/${slug}`,
        ...(project.image && {
            image: `${SITE_INFO.url}${project.image}`,
        }),
        keywords: project.skills.join(", "),
        creator: {
            "@type": "Person",
            name: SITE_INFO.name,
            url: SITE_INFO.url,
        },
    };

    return (
        <div
            className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
            style={
                project.accentColor
                    ? ({
                        "--project-accent": project.accentColor,
                        "--project-accent-dark":
                            project.accentColorDark ?? project.accentColor,
                    } as React.CSSProperties)
                    : undefined
            }
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />
            {/* Cover image with back link overlaid */}
            {project.image ? (
                <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl border border-border/50">
                    <Image
                        src={project.image}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Back link overlaid on cover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                    <Link
                        href="/projects"
                        className="group/back absolute top-4 left-4 inline-flex items-center rounded-full border border-white/20 bg-black/30 py-1.5 pr-2.5 pl-2.5 font-mono text-sm text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:pr-3 hover:text-white"
                    >
                        <ArrowLeft className="size-3.5 shrink-0 transition-transform group-hover/back:-translate-x-0.5" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/back:ml-1.5 group-hover/back:max-w-xs group-hover/back:opacity-100">
                            Back to Projects
                        </span>
                    </Link>
                </div>
            ) : (
                /* Back link standalone when no cover image */
                <Link
                    href="/projects"
                    className="group/back mb-10 inline-flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-3.5 shrink-0 transition-transform group-hover/back:-translate-x-0.5" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/back:ml-1.5 group-hover/back:max-w-xs group-hover/back:opacity-100">
                        Back to Projects
                    </span>
                </Link>
            )}

            {/* Header card */}
            <div className="mb-8 rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                {/* Title row */}
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h1
                            className={cn(
                                "font-mono text-2xl font-semibold tracking-tight sm:text-3xl",
                                project.accentColor && "project-accent-heading"
                            )}
                        >
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-1 font-mono text-base text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                        <SimpleTooltip content="View on GitHub">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex size-8 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-primary hover:shadow-sm"
                            >
                                <Github className="size-4" />
                            </a>
                        </SimpleTooltip>
                        {project.liveLink && (
                            <SimpleTooltip content="View live demo">
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex size-8 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-primary hover:shadow-sm"
                                >
                                    <ExternalLink className="size-4" />
                                </a>
                            </SimpleTooltip>
                        )}
                    </div>
                </div>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.skills.map((skill) => {
                        const techItem = TECH_STACK.find(
                            (item) =>
                                item.title === skill ||
                                item.displayName === skill ||
                                item.key === skill.toLowerCase()
                        );
                        const iconKey = techItem?.key || skill.toLowerCase();
                        const displayName =
                            techItem?.displayName || techItem?.title || skill;
                        const icon = getIcon(iconKey);

                        return (
                            <Tag key={skill} className="flex items-center gap-1 text-sm">
                                {icon}
                                {displayName}
                            </Tag>
                        );
                    })}
                </div>
            </div>

            {/* Intro */}
            <p className="mb-8 font-mono text-base leading-relaxed text-muted-foreground">
                {project.intro}
            </p>

            {/* Unique Features */}
            <section className="mb-8">
                <h2
                    className={cn(
                        "mb-4 font-mono text-base font-semibold tracking-wider text-foreground/80 uppercase",
                        project.accentColor && "project-accent-heading"
                    )}
                >
                    Unique Features
                </h2>
                <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                    {project.uniqueFeatures.map((feature, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex items-start gap-3 px-4 py-3",
                                i !== 0 && "border-t border-border/30"
                            )}
                        >
                            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/50" />
                            <span className="font-mono text-sm leading-relaxed text-muted-foreground">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack Detail */}
            <section>
                <h2
                    className={cn(
                        "mb-4 font-mono text-base font-semibold tracking-wider text-foreground/80 uppercase",
                        project.accentColor && "project-accent-heading"
                    )}
                >
                    Tech Stack
                </h2>
                <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                    {project.techStackDetail.map((entry, i) => (
                        <div
                            key={entry.label}
                            className={cn(
                                "flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4",
                                i !== 0 && "border-t border-border/30"
                            )}
                        >
                            <span className="shrink-0 font-mono text-sm font-medium text-foreground/80 sm:w-32">
                                {entry.label}
                            </span>
                            <span className="font-mono text-sm text-muted-foreground">
                                {entry.items}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
