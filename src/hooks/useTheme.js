import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "theme";
const META_COLOR = { dark: "#090A0C", light: "#F8F8F5" };

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLOR[theme]);
}

/**
 * Dark/light theme. The initial value is set before first paint by the inline script in
 * index.html (stored choice, else system preference), so this hook only has to read it back.
 * Until the visitor picks a theme explicitly, changes to the system preference are followed.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      setTheme(event.matches ? "light" : "dark");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /** `origin` (the toggle button's centre) seeds the circular reveal where supported. */
  const toggle = useCallback(
    (origin) => {
      const next = theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable (private mode): the choice just won't persist */
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const commit = () => flushSync(() => setTheme(next));

      if (document.startViewTransition && !reduced) {
        const root = document.documentElement;
        root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth - 40}px`);
        root.style.setProperty("--vt-y", `${origin?.y ?? 40}px`);
        document.startViewTransition(() => {
          applyTheme(next);
          commit();
        });
        return;
      }

      // Fallback: a short, restrained cross-fade of colours.
      const root = document.documentElement;
      if (!reduced) {
        root.classList.add("theme-fade");
        window.setTimeout(() => root.classList.remove("theme-fade"), 600);
      }
      applyTheme(next);
      setTheme(next);
    },
    [theme],
  );

  return { theme, toggle };
}
