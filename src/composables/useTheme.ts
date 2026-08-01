import { ref, watchEffect } from "vue";

export type BdTheme = "dark" | "light";
export type BdScheme = "apple" | "blue" | "crimson" | "default" | "orange";

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

export function useTheme(): {
  scheme: typeof scheme;
  theme: typeof theme;
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
