/** Option partagée par les composants à choix (BdSelect, BdButtonGroup). */
export interface BdOption {
  label: string;
  value: string;
}

/**
 * Échelle de taille des contrôles. Partagée par BdButton, BdButtonGroup et
 * BdDropdown : à taille égale, les trois font exactement la même hauteur.
 */
export type BdSize = "big" | "default" | "small" | "x-small";
