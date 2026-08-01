import { expect, test } from "bun:test";

import { bdPresets } from "../src/themePresets";
import { isLightColor, parseColor } from "../src/utils/color";

test("parses the three color notations, rejects the rest", () => {
  expect(parseColor("#fff")).toEqual([255, 255, 255]);
  expect(parseColor("#0074ba")).toEqual([0, 116, 186]);
  expect(parseColor("rgba(15, 23, 42, 0.5)")).toEqual([15, 23, 42]);
  expect(parseColor("chartreuse")).toBeNull();
});

test("light/dark split of a base color", () => {
  expect(isLightColor("#ffffff")).toBe(true);
  expect(isLightColor("#000000")).toBe(false);
  // An unparseable color assumes a blank page: light, so text stays dark.
  expect(isLightColor("nope")).toBe(true);
});

test("every preset lands in the theme its group announces", () => {
  for (const preset of bdPresets) {
    expect({ light: isLightColor(preset.base), name: preset.name })
      .toEqual({ light: preset.group === "light", name: preset.name });
  }
});
