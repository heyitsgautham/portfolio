"use client";

import dayjs from "dayjs";
import { LoaderIcon } from "lucide-react";
import { use } from "react";

import type { Activity } from "@/components/ui/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GITHUB_USERNAME } from "@/config/site";

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const data = use(contributions);

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center text-sm text-muted-foreground">
        Unable to load contributions right now.
      </div>
    );
  }

  return (
    <ContributionGraph
      className="mx-auto w-full max-w-full"
      data={data}
      blockSize={16}
      blockMargin={4}
      blockRadius={2}
    >
      <ContributionGraphCalendar
        className="no-scrollbar"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </g>
            </TooltipTrigger>

            <TooltipContent className="font-sans" sideOffset={0}>
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                on {dayjs(activity.date).format("DD.MM.YYYY")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-2">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("en")} contributions in {year} on{" "}
              <a
                className="font-medium underline underline-offset-4"
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-[200px] w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}
