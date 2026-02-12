"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useRef } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSound } from "@/hooks/use-sound";

import { Button } from "./ui/button";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const playClick = useSound("/audio/ui-sounds/click.wav");

  // Use a ref to always read the latest resolvedTheme so rapid clicks
  // don't read a stale closure value and skip a toggle.
  const resolvedThemeRef = useRef(resolvedTheme);
  resolvedThemeRef.current = resolvedTheme;

  const switchTheme = useCallback(() => {
    playClick();
    const current = resolvedThemeRef.current;
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    setMetaColor(
      next === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
    );
  }, [setTheme, setMetaColor, playClick]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={switchTheme}
      className="size-10 sm:size-8"
    >
      <MoonStarIcon className="hidden size-5 sm:size-4 [html.dark_&]:block" />
      <SunIcon className="hidden size-5 sm:size-4 [html.light_&]:block" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
