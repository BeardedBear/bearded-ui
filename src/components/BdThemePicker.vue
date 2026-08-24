<script setup lang="ts">
import { computed } from "vue";

import { useTheme } from "../composables/useTheme";
import { type BdPreset, type BdPresetGroup, bdPresets } from "../themePresets";

/**
 * Picks the two colors the whole theme is derived from: a base background and
 * an accent. Writes straight into `useTheme().palette`, so the app has nothing
 * to wire — dropping it into a settings page is enough.
 *
 * @example
 * <BdThemePicker />
 * <BdThemePicker :presets="myPresets" accent-label="Couleur d'accent" />
 */
export interface BdThemePickerProps {
  /** Label of the accent color input. */
  accentLabel?: string;
  /** Label of the base color input. */
  baseLabel?: string;
  /** Palettes offered in the grid. Defaults to the library's own. */
  presets?: BdPreset[];
}

const props = withDefaults(defineProps<BdThemePickerProps>(), {
  accentLabel: "Accent",
  baseLabel: "Background",
  presets: () => bdPresets,
});

const { palette } = useTheme();

// Groupes tirés des données, dans leur ordre d'apparition : une app qui passe
// ses propres presets garde le sien, et il n'y a pas de liste à tenir à jour.
const groups = computed<{ group: BdPresetGroup; presets: BdPreset[] }[]>(() =>
  [...new Set(props.presets.map((preset) => preset.group))]
    .map((group) => ({ group, presets: props.presets.filter((p) => p.group === group) })));

// Carries the name so the choice survives a future correction of the preset.
function apply(preset: BdPreset): void {
  palette.value = { accent: preset.accent, base: preset.base, name: preset.name };
}

function isActive(preset: BdPreset): boolean {
  if (palette.value.name) return palette.value.name === preset.name;
  return (
    palette.value.base.toLowerCase() === preset.base.toLowerCase()
    && palette.value.accent.toLowerCase() === preset.accent.toLowerCase()
  );
}

/*
 * Nudging a channel by hand drops the preset name: the palette is now the
 * user's own, and keeping the name would make the next reload snap it back to
 * the preset's colors.
 */
function update(key: "accent" | "base", event: Event): void {
  palette.value = { ...palette.value, [key]: (event.target as HTMLInputElement).value, name: undefined };
}
</script>

<template>
  <div class="bd-theme-picker">
    <div class="bd-theme-picker-inputs">
      <label class="bd-field">
        <span class="bd-field-label bd-font-bold">{{ baseLabel }}</span>
        <span class="bd-theme-picker-control">
          <input :value="palette.base" type="color" @input="update('base', $event)" />
          <code>{{ palette.base }}</code>
        </span>
      </label>

      <label class="bd-field">
        <span class="bd-field-label bd-font-bold">{{ accentLabel }}</span>
        <span class="bd-theme-picker-control">
          <input :value="palette.accent" type="color" @input="update('accent', $event)" />
          <code>{{ palette.accent }}</code>
        </span>
      </label>
    </div>

    <div v-for="entry in groups" :key="entry.group" class="bd-theme-picker-group">
      <h3>{{ entry.group }}</h3>
      <div class="bd-theme-picker-grid">
        <button
          v-for="preset in entry.presets"
          :key="preset.name"
          :aria-pressed="isActive(preset)"
          class="bd-theme-picker-card bd-squircle"
          type="button"
          @click="apply(preset)"
        >
          <span class="bd-theme-picker-swatch bd-squircle" :style="{ background: preset.base }">
            <span :style="{ background: preset.accent }" />
          </span>
          <span class="bd-theme-picker-name">{{ preset.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-theme-picker {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-4);
}

.bd-theme-picker-inputs {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: var(--bd-space-4);
}

.bd-theme-picker-control {
  align-items: center;
  display: flex;
  gap: var(--bd-space-2);

  /* Le champ natif porte sa propre bordure sur chaque OS : on la remplace. */
  & input {
    background: none;
    block-size: var(--bd-control-height-small);
    border: 1px solid var(--bd-border-color);
    border-radius: var(--bd-radius-sm);
    cursor: pointer;
    inline-size: 3rem;
    padding: 2px;
  }

  & code {
    color: var(--bd-font-color-dark);
    font-size: var(--bd-font-size-sm);
  }
}

.bd-theme-picker-group h3 {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-sm);
  letter-spacing: 0.08em;
  margin-bottom: var(--bd-space-2);
  text-transform: uppercase;
}

.bd-theme-picker-grid {
  display: grid;
  gap: var(--bd-space-2);
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
}

/*
 * Pastille et nom sur une ligne, pas empilés : trente presets en trois groupes,
 * une carte en colonne coûtait plus de 5rem de haut chacune et le sélecteur
 * occupait tout l'écran. En ligne elle tient en une hauteur de contrôle, et la
 * grille passe de deux à trois colonnes à largeur égale.
 */
.bd-theme-picker-card {
  align-items: center;
  background: var(--bd-bg-light);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color);
  cursor: pointer;
  display: flex;
  font-size: var(--bd-font-size-sm);
  gap: var(--bd-space-2);
  min-inline-size: 0;
  padding: var(--bd-space-2);
  text-align: left;
  transition: border-color var(--bd-transition);

  &:hover {
    border-color: var(--bd-primary);
  }

  /* L'état actif est déjà porté par aria-pressed : pas de classe en double. */
  &[aria-pressed="true"] {
    border-color: var(--bd-primary);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--bd-primary) 35%, transparent);
  }
}

/*
 * Le nom ne passe jamais à la ligne : un seul preset au libellé long suffirait
 * à faire grandir toute sa rangée, et la grille perdrait son alignement.
 * `min-inline-size: 0` est ce qui autorise un enfant flex à rétrécir sous sa
 * largeur de contenu — sans lui, l'ellipse ne se déclenche jamais.
 */
.bd-theme-picker-name {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bd-theme-picker-swatch {
  block-size: 1.4rem;
  border-radius: var(--bd-radius-sm);
  display: flex;
  flex: none;
  inline-size: 2.1rem;
  justify-content: flex-end;
  overflow: hidden;

  & span {
    inline-size: 33%;
  }
}

</style>
