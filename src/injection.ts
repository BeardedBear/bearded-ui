import type { InjectionKey, Ref } from "vue";

import type { BdSize } from "@/types";

/** Fourni par BdDropdown, consommé par BdDropdownItem pour se refermer au clic. */
export const bdDropdownClose: InjectionKey<() => void> = Symbol("bdDropdownClose");

/**
 * Taille héritée par les BdButton d'un conteneur (BdButtonGroup, trigger de
 * BdDropdown). Une prop `size` sur le bouton lui-même reste prioritaire.
 */
export const bdSize: InjectionKey<Readonly<Ref<BdSize>>> = Symbol("bdSize");
