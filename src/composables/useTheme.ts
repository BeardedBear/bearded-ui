import { computed, type ComputedRef, ref, type Ref, watchEffect } from "vue";

import { isLightColor } from "../utils/color";

/**
 * The two colors the whole interface is derived from — the only thing an app
 * ever picks. Backgrounds, text, borders and accent states all follow.
 */
export interface BdPalette {
  /** Accent, everything interactive. Any CSS color the browser can parse. */
  accent: string;
  /** Background the light/dark ladder is built on. Its luminance picks the theme. */
  base: string;
}

/** Whether the palette reads dark or light — deduced, never chosen. */
export type BdTheme = "dark" | "light";

/** Palette of the library itself. Same values as the CSS defaults in themes.css. */
export const bdDefaultPalette: BdPalette = { accent: "#9064ff", base: "#16181d" };

const STORAGE_KEY = "bearded-ui-theme";

function stored(): BdPalette {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return saved?.accent && saved?.base ? saved : bdDefaultPalette;
  } catch {
    return bdDefaultPalette;
  }
}

const palette = ref<BdPalette>(bdDefaultPalette);

/*
 * Déduit, jamais choisi : un fond clair impose un texte sombre, sans quoi une
 * palette claire hériterait du contraste du thème sombre.
 */
const theme = computed<BdTheme>(() => (isLightColor(palette.value.base) ? "light" : "dark"));

/*
 * Rien ne démarre à l'import du module, ni la relecture du localStorage ni
 * l'effet : importer un simple BdButton ne doit ni toucher au DOM, ni payer une
 * lecture de stockage, ni planter en SSR. Tout attend le premier useTheme().
 */
let started = false;
/**
 * Reads and writes the theme. Assign to `palette` and every `--bd-*` token
 * follows, along with the `bearded-ui-theme` entry in `localStorage`. State is
 * module-level, so every caller shares the same theme.
 *
 * The DOM effect starts on the first call, never at import time — importing a
 * component alone neither touches the DOM nor breaks under SSR.
 *
 * @example
 * const { palette, theme } = useTheme();
 * palette.value = { accent: "#8343de", base: "#100a1c" };
 * palette.value = bdDefaultPalette;
 */
export function useTheme(): {
  /** The base and accent everything is derived from. */
  palette: Ref<BdPalette>;
  /** Dark or light, from the luminance of `palette.base`. Read-only by design. */
  theme: ComputedRef<BdTheme>;
} {
  start();

  return { palette, theme };
}

function start(): void {
  if (started || typeof document === "undefined") return;
  started = true;
  palette.value = stored();

  watchEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = theme.value;
    root.style.setProperty("--bd-palette-base", palette.value.base);
    root.style.setProperty("--bd-palette-accent", palette.value.accent);
    /*
     * Le texte posé sur l'accent : le seul token que CSS ne peut pas déduire,
     * color-mix ne sachant pas comparer deux luminances.
     */
    root.style.setProperty("--bd-on-primary", isLightColor(palette.value.accent) ? "#111" : "#fff");

    localStorage.setItem(STORAGE_KEY, JSON.stringify(palette.value));
  });
}
