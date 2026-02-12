"use client";

import { useEffect, useRef, useState } from "react";

export function SiteHeaderWrapper(props: React.ComponentProps<"header">) {
  const [affix, setAffix] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setAffix(window.scrollY >= 8);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-px w-full" />
      <header data-affix={affix} {...props} />
    </>
  );
}
