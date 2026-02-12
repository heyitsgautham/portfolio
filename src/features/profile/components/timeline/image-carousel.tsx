"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = React.useState(0);

  if (images.length === 0) return null;

  const prev = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full overflow-hidden rounded-md">
      <div className="relative aspect-video w-full">
        <Image
          src={images[current]}
          alt={`Image ${current + 1} of ${images.length}`}
          fill
          className="object-cover"
          unoptimized
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
                    ? "bg-primary scale-110"
                    : "bg-background/60 hover:bg-background/80"
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
