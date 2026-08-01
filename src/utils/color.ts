/** Parsed sRGB channels, 0–255. */
export type BdRgb = [number, number, number];

/**
 * Whether a color reads as light — i.e. whether dark text belongs on top of it.
 * Accepts `#abc`, `#aabbcc` and `rgb()/rgba()`. Anything unparseable counts as
 * light, the same assumption a blank page makes.
 */
export function isLightColor(value: string): boolean {
  const rgb = parseColor(value);
  return rgb ? relativeLuminance(...rgb) > 0.4 : true;
}

/** `#abc`, `#aabbcc` or `rgb()/rgba()` → channels, or `null` if unparseable. */
export function parseColor(value: string): BdRgb | null {
  const hex = value.trim().replace("#", "");
  const expanded = hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex;

  if (/^[\da-f]{6}$/i.test(expanded)) {
    return [
      parseInt(expanded.slice(0, 2), 16),
      parseInt(expanded.slice(2, 4), 16),
      parseInt(expanded.slice(4, 6), 16),
    ];
  }

  const rgb = value.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  return rgb ? [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] : null;
}

/** Relative luminance (WCAG 2.1), 0 (black) → 1 (white). */
export function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
