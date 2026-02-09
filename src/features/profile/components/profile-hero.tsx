import { FileTextIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { getIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/registry/flip-sentences";

import { VerifiedIcon } from "./verified-icon";

export function ProfileHero() {
  const TechPill = ({
    name,
    iconKey,
    className,
    url,
  }: {
    name: string;
    iconKey: string;
    className?: string;
    url: string;
  }) => {
    const icon = getIcon(iconKey, 14);
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-0.5 align-middle text-sm font-medium text-foreground transition-colors hover:bg-muted",
          className
        )}
      >
        {icon}
        {name}
      </a>
    );
  };

  return (
    <section className="flex flex-col gap-3 py-2 sm:flex-row">
      {/* Profile Picture & Status */}
      <div className="shrink-0">
        <div className="relative flex justify-center p-1 sm:p-2">
          <div className="relative size-32 overflow-hidden rounded-full border-4 border-border shadow-xl sm:size-36 md:size-44">
            <Image
              src={USER.avatar}
              alt={USER.displayName}
              fill
              className="object-cover object-[center_15%]"
              priority
            />
          </div>
          <div className="absolute right-3 bottom-3 size-6 rounded-full border-4 border-background bg-green-500 shadow-sm sm:right-4 sm:bottom-4 sm:size-7" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center gap-3 p-1 sm:p-2">
        <div>
          <h1 className="flex items-center text-4xl font-bold md:text-5xl">
            {USER.displayName}
            &nbsp;
            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-[0.5em] text-info select-none" />
            </SimpleTooltip>
          </h1>

          <div className="mt-3">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>

        <div className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          <p>
            I build AI agentic automations for business to help reduce the
            everyday tedious tasks with{" "}
            <TechPill
              name="n8n"
              iconKey="n8n"
              className="border-[#EA4B71]/20 bg-[#EA4B71]/10 text-[#EA4B71]"
              url="https://n8n.io"
            />
            ,{" "}
            <TechPill
              name="LangChain"
              iconKey="langchain-color"
              className="text-foreground"
              url="https://www.langchain.com"
            />{" "}
            and{" "}
            <TechPill
              name="Python"
              iconKey="python"
              className="border-[#3776AB]/20 bg-[#3776AB]/10 text-[#3776AB]"
              url="https://www.python.org"
            />
            . Enthusiastic about RAG and{" "}
            <TechPill
              name="MCP tools"
              iconKey="mcp"
              className="text-foreground"
              url="https://modelcontextprotocol.io"
            />
            , currently learning{" "}
            <TechPill
              name="PostgreSQL"
              iconKey="postgresql"
              className="border-[#336791]/20 bg-[#336791]/10 text-[#336791]"
              url="https://www.postgresql.org"
            />{" "}
            and{" "}
            <TechPill
              name="Redis"
              iconKey="redis"
              className="border-[#DC382D]/20 bg-[#DC382D]/10 text-[#DC382D]"
              url="https://redis.io"
            />
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <a
              href="https://github.com/heyitsgautham/resumes/raw/main/GK_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileTextIcon className="mr-2 size-4" />
              Resume / CV
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-full px-8"
          >
            <a href={`mailto:${atob(USER.email)}`}>
              <MailIcon className="mr-2 size-4" />
              Get in touch
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link, index) => {
            const IconComponent =
              typeof link.icon === "function" ? link.icon : null;

            return (
              <SimpleTooltip key={index} content={link.title}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {IconComponent && <IconComponent className="size-5" />}
                  <span className="sr-only">{link.title}</span>
                </a>
              </SimpleTooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}
