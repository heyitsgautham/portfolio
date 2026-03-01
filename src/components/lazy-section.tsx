"use client";

import { useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Defers rendering of children until the component scrolls into
 * (or near) the viewport.  Once mounted, children stay mounted.
 *
 * `rootMargin` controls how far *before* the viewport the trigger fires;
 * the default 200 px means content starts loading before the user scrolls to it.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  height = "h-48",
}: {
  children: React.ReactNode;
  /** CSS margin string passed to IntersectionObserver. */
  rootMargin?: string;
  /** Tailwind height class for the placeholder skeleton. */
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (visible) return <>{children}</>;

  return (
    <div ref={ref} className={`${height} w-full`}>
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
}
