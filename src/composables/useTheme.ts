import { computed, type ComputedRef, ref, type Ref, watchEffect } from "vue";

import type { BdPreset } from "../themePresets";

import { bdDefaultPalette, type BdPalette } from "../palette";
import { bdPresets } from "../themePresets";
import { isLightColor } from "../utils/color";

export { bdDefaultPalette, type BdPalette } from "../palette";

/** Whether the palette reads dark or light — deduced, never chosen. */
export type BdTheme = "dark" | "light";

const STORAGE_KEY = "bearded-ui-theme";

const sameColors = (a: { accent: string; base: string }, b: { accent: string; base: string }): boolean =>
  a.accent.toLowerCase() === b.accent.toLowerCase() && a.base.toLowerCase() === b.base.toLowerCase();

/**
 * Finds the preset a stored palette belongs to.
 *
 * Name first: that is the durable path, and the only one that runs once an app
 * has loaded since named persistence shipped.
 *
 * The value-matching branch below is the migration, and it is self-retiring.
 * It only runs for a palette with no name — storage written before names
 * existed — and `start()` immediately writes the resolved palette back *with*
 * its name, so any given browser takes that branch exactly once. A later
 * change to a preset's colors therefore needs nothing added to `legacy`.
 *
 * A hand-picked palette that happens to equal a preset is adopted by it. The
 * colors are identical either way, and it starts following that preset's
 * updates — which is the behaviour someone who matched a preset by hand almost
 * certainly wanted.
 */
function matchPreset(saved: BdPalette): BdPreset | undefined {
  if (saved.name) return bdPresets.find((preset) => preset.name === saved.name);
  return bdPresets.find(
    (preset) => sameColors(preset, saved) || preset.legacy?.some((old) => sameColors(old, saved)),
  );
}

function stored(): BdPalette {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!saved?.accent || !saved?.base) return bdDefaultPalette;

    // A known preset always resolves to its current definition, never to the
    // snapshot that happens to be in this browser's storage.
    const preset = matchPreset(saved);
    return preset ? { accent: preset.accent, base: preset.base, name: preset.name } : saved;
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
