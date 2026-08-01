/** A choice, shared by every selection component (BdSelect, BdButtonGroup). */
export interface BdOption {
  /** Text shown to the user. */
  label: string;
  /** Value bound through `v-model`. */
  value: string;
}

/**
 * Control size scale, shared by BdButton, BdButtonGroup and BdDropdown: at
 * equal size those three render exactly the same height, driven by the
 * `--bd-control-height*` tokens.
 */
export type BdSize = "big" | "default" | "small" | "x-small";
