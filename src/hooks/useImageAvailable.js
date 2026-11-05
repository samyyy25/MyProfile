import { useEffect, useState } from "react";

const cache = new Map(); // src -> true | false

/**
 * Whether an image URL actually loads: `null` while unknown, then `true` / `false`.
 * Lets the UI hide "View Certificate" instead of offering a broken viewer when the file is missing.
 */
export function useImageAvailable(src) {
  const [known, setKnown] = useState(() => cache.get(src) ?? null);

  useEffect(() => {
    if (!src || cache.has(src)) return undefined;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      cache.set(src, true);
      if (!cancelled) setKnown(true);
    };
    img.onerror = () => {
      cache.set(src, false);
      if (!cancelled) setKnown(false);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return known;
}
