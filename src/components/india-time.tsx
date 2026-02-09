"use client";

import { useEffect, useState } from "react";

// Pre-calculated spoke coordinates for Ashoka Chakra to avoid hydration mismatch
// Each spoke has [x1, y1, x2, y2] calculated from angle = i * 15° (24 spokes)
const CHAKRA_SPOKES = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i * 15 * Math.PI) / 180;
  return {
    x1: (15 + 1 * Math.cos(angle)).toFixed(6),
    y1: (10 + 1 * Math.sin(angle)).toFixed(6),
    x2: (15 + 3 * Math.cos(angle)).toFixed(6),
    y2: (10 + 3 * Math.sin(angle)).toFixed(6),
  };
});

export function IndiaTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const indiaTime = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(indiaTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:gap-1.5 md:flex">
      {/* India Flag */}
      <svg
        className="h-3 w-5 flex-shrink-0"
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
          {CHAKRA_SPOKES.map((spoke, i) => (
            <line
              key={i}
              x1={spoke.x1}
              y1={spoke.y1}
              x2={spoke.x2}
              y2={spoke.y2}
            />
          ))}
        </g>
      </svg>
      <span className="font-mono whitespace-nowrap tabular-nums">
        {time || "--:--:--"}
      </span>
    </div>
  );
}
