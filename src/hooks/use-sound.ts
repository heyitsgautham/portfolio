import { useCallback, useRef } from "react";

/**
 * Custom React hook to load and play a sound from a given URL using the Web Audio API.
 *
 * This hook lazily fetches and decodes the audio file on first play,
 * avoiding unnecessary network requests and AudioContext creation on mount.
 *
 * @param url - The URL of the audio file to load and play.
 * @returns A function that, when called, plays the loaded sound.
 *
 * @remarks
 * - If the Web Audio API is not supported in the browser, a warning is logged and playback is disabled.
 * - The audio context and buffer are managed internally using React refs.
 * - Errors during fetching or decoding the audio are logged to the console.
 *
 * @example
 * ```tsx
 * const playClick = useSound('/sounds/click.mp3');
 * // Later in an event handler:
 * playClick();
 * ```
 */
export function useSound(url: string) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const loadingRef = useRef<Promise<void> | null>(null);

  const ensureLoaded = useCallback(() => {
    if (loadingRef.current) return loadingRef.current;

    loadingRef.current = (async () => {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) {
        console.warn("Web Audio API is not supported in this browser.");
        return;
      }

      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      try {
        const res = await fetch(url);
        const data = await res.arrayBuffer();
        bufferRef.current = await audioCtx.decodeAudioData(data);
      } catch (err) {
        console.log(`Failed to load click sound from ${url}:`, err);
      }
    })();

    return loadingRef.current;
  }, [url]);

  const play = useCallback(async () => {
    await ensureLoaded();

    if (audioCtxRef.current && bufferRef.current) {
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = bufferRef.current;
      source.connect(audioCtxRef.current.destination);
      source.start(0);
    }
  }, [ensureLoaded]);

  return play;
}
