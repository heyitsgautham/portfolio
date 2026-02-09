import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex flex-col sm:flex-row">
      <div className="shrink-0">
        <div className="flex justify-center p-6 sm:p-8">
          <div className="size-32 overflow-hidden rounded-full border-4 border-border transition-transform select-none hover:scale-105 sm:size-36 md:size-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-[200%] w-full object-cover object-bottom"
              alt={`${USER.displayName}'s avatar`}
              src={USER.avatar}
              fetchPriority="high"
            />
          </div>
        </div>

        <SimpleTooltip content="I'm from India">
          {/* Flag of India */}
          <svg
            className="absolute top-0 -left-px h-8 sm:h-9"
            viewBox="0 0 30 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Saffron stripe */}
            <rect width="30" height="6.67" fill="#FF9933" />
            {/* White stripe */}
            <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
            {/* Green stripe */}
            <rect y="13.33" width="30" height="6.67" fill="#138808" />
            {/* Ashoka Chakra (24-spoked wheel) */}
            <circle
              cx="15"
              cy="10"
              r="3"
              fill="none"
              stroke="#000080"
              strokeWidth="0.5"
            />
            <g stroke="#000080" strokeWidth="0.25">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                const x1 = 15 + 1 * Math.cos(angle);
                const y1 = 10 + 1 * Math.sin(angle);
                const x2 = 15 + 3 * Math.cos(angle);
                const y2 = 10 + 3 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </g>
          </svg>
        </SimpleTooltip>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
        <div>
          <h1 className="flex items-center text-4xl font-bold md:text-5xl">
            {USER.displayName}
            &nbsp;
            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-[0.5em] text-info select-none" />
            </SimpleTooltip>
            {USER.namePronunciationUrl && (
              <>
                &nbsp;
                <PronounceMyName
                  className="scale-75"
                  namePronunciationUrl={USER.namePronunciationUrl}
                />
              </>
            )}
          </h1>

          <div className="mt-3">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
