import type { InjectionKey, Ref } from "vue";

import type { BdSize } from "@/types";

/** Provided by BdDropdown, consumed by BdDropdownItem to close on click. */
export const bdDropdownClose: InjectionKey<() => void> = Symbol("bdDropdownClose");

/**
 * Size handed down by a container (BdButtonGroup, BdDropdown trigger) to the
 * BdButtons it holds, slot content included. A `size` prop set on the button
 * itself always wins.
 */
export const bdSize: InjectionKey<Readonly<Ref<BdSize>>> = Symbol("bdSize");
