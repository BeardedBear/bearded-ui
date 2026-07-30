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

// Module-level state: every caller shares the same theme, and the effect runs once.
watchEffect(() => {
  const root = document.documentElement;
  root.dataset.theme = theme.value;
  root.dataset.scheme = scheme.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ scheme: scheme.value, theme: theme.value }));
});

export function useTheme(): {
  scheme: typeof scheme;
  theme: typeof theme;
  toggleTheme: () => void;
} {
  return {
    scheme,
    theme,
    toggleTheme: (): void => {
      theme.value = theme.value === "dark" ? "light" : "dark";
    },
  };
}
