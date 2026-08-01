import { bdDefaultPalette } from "./composables/useTheme";

/**
 * Ready-made palettes for the two colors a custom theme needs. `group` only
 * drives how a picker sorts them — the light/dark switch itself is deduced
 * from the luminance of `base`, never from this field.
 */
export interface BdPreset {
  /** Accent color, `#rrggbb`. */
  accent: string;
  /** Background the whole palette is derived from, `#rrggbb`. */
  base: string;
  group: BdPresetGroup;
  /** Display name, in English — presets are not translated. */
  name: string;
}

export type BdPresetGroup = "dark" | "darker" | "light";

/**
 * Every preset, in display order. Accents are picked to clear WCAG AA (≥ 4.5:1)
 * against white text, so `--bd-on-primary` stays readable on a filled button.
 */
export const bdPresets: BdPreset[] = [
  // La palette par défaut, épinglée en tête : le picker la montre donc active
  // tant que rien n'a été choisi. Les hex vivent dans useTheme, pas ici.
  { ...bdDefaultPalette, group: "dark", name: "Bearded" },
  { accent: "#0074ba", base: "#061628", group: "dark", name: "Deep Ocean" },
  { accent: "#8343de", base: "#100a1c", group: "dark", name: "Midnight Purple" },
  { accent: "#289154", base: "#0e1412", group: "dark", name: "Forest Night" },
  { accent: "#21adae", base: "#131415", group: "dark", name: "Slate Storm" },
  { accent: "#be123c", base: "#1c1917", group: "dark", name: "Charcoal Rose" },
  { accent: "#59c4ff", base: "#1a2537", group: "dark", name: "Dark Teal" },
  { accent: "#c2410c", base: "#1a120b", group: "dark", name: "Espresso" },
  { accent: "#4338ca", base: "#0f172a", group: "dark", name: "Ink Blue" },
  { accent: "#047857", base: "#14181c", group: "dark", name: "Emerald Shadow" },

  { accent: "#1d4ed8", base: "#070910", group: "darker", name: "Abyss" },
  { accent: "#6d28d9", base: "#0a0710", group: "darker", name: "Void Black" },
  { accent: "#9a3412", base: "#0a0a0a", group: "darker", name: "Obsidian" },
  { accent: "#b91c1c", base: "#0c0404", group: "darker", name: "Pitch Ember" },
  { accent: "#047857", base: "#040d08", group: "darker", name: "Shadow Jade" },
  { accent: "#7e22ce", base: "#0c0813", group: "darker", name: "Onyx Violet" },
  { accent: "#71717a", base: "#0e0e10", group: "darker", name: "Carbon" },
  { accent: "#1e40af", base: "#020617", group: "darker", name: "Deep Space" },
  { accent: "#b45309", base: "#0c0a05", group: "darker", name: "Black Amber" },
  { accent: "#be185d", base: "#0a0507", group: "darker", name: "Noir Rose" },

  { accent: "#0369a1", base: "#f8fafc", group: "light", name: "Cloud White" },
  { accent: "#c2410c", base: "#fef3e2", group: "light", name: "Warm Cream" },
  { accent: "#047857", base: "#f0fdf4", group: "light", name: "Soft Mint" },
  { accent: "#7c3aed", base: "#f5f3ff", group: "light", name: "Lavender Mist" },
  { accent: "#dc2626", base: "#fef5f0", group: "light", name: "Peachy Beige" },
  { accent: "#075985", base: "#f0f9ff", group: "light", name: "Sky Breeze" },
  { accent: "#e11d48", base: "#fff1f2", group: "light", name: "Blush Ivory" },
  { accent: "#15803d", base: "#f7f9f5", group: "light", name: "Sage Linen" },
  { accent: "#4338ca", base: "#eef2ff", group: "light", name: "Pale Indigo" },
  { accent: "#4b5563", base: "#f9fafb", group: "light", name: "Pearl Gray" },
];
