/** A choice, shared by every selection component (BdSelect, BdButtonGroup). */
export interface BdOption {
  /** Text shown to the user. */
  label: string;
  /** Hint shown on hover. Rendered as a BdTooltip by BdButtonGroup only — a native <select> can't hold one. */
  tooltip?: string;
  /** Value bound through `v-model`. Numbers are as common as strings here: a count, a duration, a rank. */
  value: number | string;
}

/**
 * Control size scale, shared by BdButton, BdButtonGroup and BdDropdown: at
 * equal size those three render exactly the same height, driven by the
 * `--bd-control-height*` tokens.
 */
export type BdSize = "big" | "default" | "small" | "x-small";
