"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const prev = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  // Pause auto-slide when off-screen
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-slide when the carousel is visible and not hovered
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (images.length <= 1) return;

    if (!hovered && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hovered, isVisible, images.length]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-md">
      <div
        className="relative aspect-video w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={images[current]}
          alt={`Image ${current + 1} of ${images.length}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="size-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
            aria-label="Next image"
          >
            <ChevronRightIcon className="size-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`size-2 rounded-full transition-all ${
                  i === current
                    ? "bg-white scale-110 shadow-sm"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
