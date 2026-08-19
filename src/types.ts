/**
 * A choice, shared by every selection component (BdSelect, BdButtonGroup).
 * Generic over its value so a caller's own union (`"text" | "drawing"`, a count)
 * survives all the way to the `v-model` instead of widening to `number | string`.
 */
export interface BdOption<T extends number | string = number | string> {
  /** Text shown to the user. */
  label: string;
  /** Hint shown on hover. Rendered as a BdTooltip by BdButtonGroup only — a native <select> can't hold one. */
  tooltip?: string;
  /** Value bound through `v-model`. Numbers are as common as strings here: a count, a duration, a rank. */
  value: T;
}

/**
 * Control size scale, shared by BdButton, BdButtonGroup and BdDropdown: at
 * equal size those three render exactly the same height, driven by the
 * `--bd-control-height*` tokens.
 */
export type BdSize = "big" | "default" | "small" | "x-small";
