/**
 * The two colors the whole interface is derived from — the only thing an app
 * ever picks. Backgrounds, text, borders and accent states all follow.
 */
export interface BdPalette {
  /** Accent, everything interactive. Any CSS color the browser can parse. */
  accent: string;
  /** Background the light/dark ladder is built on. Its luminance picks the theme. */
  base: string;
  /**
   * Name of the preset this palette came from, when it came from one.
   *
   * Persisted alongside the colors so a stored theme keeps its identity: on the
   * next load the preset is looked up again and its *current* colors win.
   * Without it, correcting a preset never reached anyone who had already picked
   * it — each app stayed pinned to whatever hex pair it happened to save.
   *
   * Undefined for a hand-picked palette, which is never re-resolved.
   */
  name?: string;
}

/** Palette of the library itself. Same values as the CSS defaults in themes.css. */
export const bdDefaultPalette: BdPalette = { accent: "#9064ff", base: "#16181d", name: "Bearded" };
