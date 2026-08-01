import { ref, watchEffect } from "vue";

/** Accent palette, applied as `data-scheme` on `<html>`. Independent from the theme. */
export type BdScheme = "apple" | "blue" | "crimson" | "default" | "orange";

/** Background and text palette, applied as `data-theme` on `<html>`. */
export type BdTheme = "dark" | "light";

/** Every accent scheme, in display order — for building a picker. */
export const bdSchemes: BdScheme[] = ["default", "blue", "crimson", "apple", "orange"];

const STORAGE_KEY = "bearded-ui-theme";

function stored(): { scheme?: BdScheme; theme?: BdTheme } {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const theme = ref<BdTheme>(stored().theme ?? "dark");
const scheme = ref<BdScheme>(stored().scheme ?? "default");

/*
 * L'effet démarre au premier useTheme(), pas à l'import du module : importer
 * un simple BdButton ne doit ni toucher au DOM ni planter en SSR.
 */
let started = false;
/**
 * Reads and writes the two theme axes. Both are refs: assign to them and the
 * `data-theme` / `data-scheme` attributes on `<html>` follow, along with the
 * `bearded-ui-theme` entry in `localStorage`. State is module-level, so every
 * caller shares the same theme.
 *
 * The DOM effect starts on the first call, never at import time — importing a
 * component alone neither touches the DOM nor breaks under SSR.
 *
 * @example
 * const { scheme, theme, toggleTheme } = useTheme();
 * theme.value = "light";
 * scheme.value = "crimson";
 */
export function useTheme(): {
  scheme: typeof scheme;
  theme: typeof theme;
  /** Switches between dark and light. */
  toggleTheme: () => void;
} {
  start();

  return {
    scheme,
    theme,
    toggleTheme: (): void => {
      theme.value = theme.value === "dark" ? "light" : "dark";
    },
  };
}

function start(): void {
  if (started || typeof document === "undefined") return;
  started = true;

  watchEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme.value;
    root.dataset.scheme = scheme.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ scheme: scheme.value, theme: theme.value }));
  });
}
