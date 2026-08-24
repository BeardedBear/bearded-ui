import { expect, test } from "bun:test";

import { type BdPreset, bdPresets } from "../src/themePresets";

/*
 * These cover the resolution rules useTheme applies on load. They exercise the
 * same matching the composable does, without a DOM: the point is that a stored
 * palette resolves back to a preset by name, or by a value pair the preset used
 * to ship, rather than staying pinned to whatever hex a browser happened to
 * save.
 */
const sameColors = (a: { accent: string; base: string }, b: { accent: string; base: string }): boolean =>
  a.accent.toLowerCase() === b.accent.toLowerCase() && a.base.toLowerCase() === b.base.toLowerCase();

function matchPreset(saved: { accent: string; base: string; name?: string }): BdPreset | undefined {
  if (saved.name) return bdPresets.find((preset) => preset.name === saved.name);
  return bdPresets.find(
    (preset) => sameColors(preset, saved) || preset.legacy?.some((old) => sameColors(old, saved)),
  );
}

test("a palette stored by name resolves to the preset's current colors", () => {
  const teal = bdPresets.find((p) => p.name === "Dark Teal");
  expect(teal).toBeDefined();

  // What an app saved before the preset was harmonised, plus the name.
  const saved = { accent: "#59c4ff", base: "#1a2537", name: "Dark Teal" };
  const resolved = matchPreset(saved);

  expect(resolved?.accent).toBe(teal!.accent);
  expect(resolved?.base).toBe(teal!.base);
  expect(resolved?.accent).not.toBe(saved.accent);
});

/*
 * Every pair superseded by d0b8e65 "Harmonize blue theme presets". Seven
 * presets changed there, not one — an app that picked any of them before the
 * change stored a hex pair no current preset matches, and would stay on the old
 * colors forever without this table.
 */
const SUPERSEDED: [string, string, string][] = [
  ["Deep Ocean", "#0074ba", "#061628"],
  ["Dark Teal", "#59c4ff", "#1a2537"],
  ["Ink Blue", "#4338ca", "#0f172a"],
  ["Abyss", "#1d4ed8", "#070910"],
  ["Cloud White", "#0369a1", "#f8fafc"],
  ["Sky Breeze", "#075985", "#f0f9ff"],
  ["Pale Indigo", "#4338ca", "#eef2ff"],
];

test.each(SUPERSEDED)("a nameless %s palette is recognised and migrated", (name, accent, base) => {
  const resolved = matchPreset({ accent, base });
  expect(resolved?.name).toBe(name);
  // It must resolve to the *current* definition, not echo back what was stored.
  expect(sameColors(resolved!, { accent, base })).toBe(false);
});

test("a nameless palette matching current colors is recognised", () => {
  const espresso = bdPresets.find((p) => p.name === "Espresso")!;
  const resolved = matchPreset({ accent: espresso.accent, base: espresso.base });
  expect(resolved?.name).toBe("Espresso");
});

test("a named palette never falls back to legacy matching", () => {
  /*
   * The invariant the migration's finiteness rests on: once a name is stored,
   * the value table is out of the picture. Here the colors are Dark Teal's
   * superseded pair, but the name says Espresso — the name has to win, or
   * `legacy` would keep influencing storage it has no business touching and
   * could never be retired.
   */
  const resolved = matchPreset({ accent: "#59c4ff", base: "#1a2537", name: "Espresso" });
  expect(resolved?.name).toBe("Espresso");
});

test("a hand-picked palette is left alone", () => {
  expect(matchPreset({ accent: "#abcdef", base: "#123456" })).toBeUndefined();
});

test("every legacy pair is distinct from every current preset pair", () => {
  // A legacy entry colliding with another preset's live colors would silently
  // rename that theme for everyone using it.
  for (const preset of bdPresets) {
    for (const old of preset.legacy ?? []) {
      const collision = bdPresets.find((other) => sameColors(other, old));
      expect(collision).toBeUndefined();
    }
  }
});

test("preset names are unique — resolution is by name", () => {
  const names = bdPresets.map((p) => p.name);
  expect(new Set(names).size).toBe(names.length);
});
