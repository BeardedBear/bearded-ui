<script setup lang="ts">
import { computed } from "vue";

import { useTheme } from "../composables/useTheme";
import { type BdPreset, type BdPresetGroup, bdPresets } from "../themePresets";
import BdTooltip from "./BdTooltip.vue";

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
    <label class="bd-theme-picker-row">
      <span class="bd-font-bold">{{ baseLabel }}</span>
      <input :value="palette.base" type="color" @input="update('base', $event)" />
    </label>
    <label class="bd-theme-picker-row">
      <span class="bd-font-bold">{{ accentLabel }}</span>
      <input :value="palette.accent" type="color" @input="update('accent', $event)" />
    </label>

    <hr class="bd-theme-picker-divider" />

    <div v-for="entry in groups" :key="entry.group" class="bd-theme-picker-group">
      <h3>{{ entry.group }}</h3>
      <div class="bd-theme-picker-grid">
        <!--
          Swatch only: thirty presets with their names spelled out turned the
          picker into a page of its own. The name is the accessible name and the
          tooltip, so nothing is lost to a screen reader or to a pointer — only
          to the vertical space it was costing. `bare`: the button stays the
          grid item.
        -->
        <BdTooltip v-for="preset in entry.presets" :key="preset.name" bare :content="preset.name">
          <button
            :aria-label="preset.name"
            :aria-pressed="isActive(preset)"
            class="bd-theme-picker-swatch"
            type="button"
            @click="apply(preset)"
          >
            <span class="bd-theme-picker-swatch-base" :style="{ background: preset.base }" />
            <span class="bd-theme-picker-swatch-accent" :style="{ background: preset.accent }" />
          </button>
        </BdTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-theme-picker {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-3);
}

.bd-theme-picker-row {
  align-items: center;
  color: var(--bd-font-color-dark);
  cursor: pointer;
  display: flex;
  font-size: var(--bd-font-size-sm);
  gap: var(--bd-space-4);
  justify-content: space-between;
  white-space: nowrap;

  /* Le champ natif porte sa propre bordure sur chaque OS : on la remplace. */
  & input {
    background: transparent;
    block-size: 1.75rem;
    border: 1px solid var(--bd-border-color);
    border-radius: var(--bd-radius-sm);
    cursor: pointer;
    inline-size: 1.75rem;
    padding: 2px;
  }
}

.bd-theme-picker-divider {
  background: var(--bd-border-color);
  block-size: 1px;
  border: 0;
  margin: 0;
}

.bd-theme-picker-group h3 {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-xs);
  letter-spacing: 0.08em;
  margin-bottom: var(--bd-space-2);
  text-transform: uppercase;
}

/*
 * Pistes de largeur fixe plutôt que des fractions : la pastille garde la même
 * taille dans un popup de barre de titre comme dans un panneau de réglages
 * large, et c'est le nombre de colonnes qui s'adapte.
 */
.bd-theme-picker-grid {
  display: grid;
  gap: var(--bd-space-1);
  grid-template-columns: repeat(auto-fill, 2rem);
}

.bd-theme-picker-swatch {
  background: transparent;
  block-size: 1.25rem;
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-sm);
  cursor: pointer;
  display: flex;
  inline-size: 2rem;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition:
    border-color var(--bd-transition),
    transform var(--bd-transition);

  &:hover {
    /* z-index pour que l'agrandissement passe au-dessus de ses voisines. */
    border-color: var(--bd-primary);
    transform: scale(1.15);
    z-index: 1;
  }

  /* L'état actif est déjà porté par aria-pressed : pas de classe en double. */
  &[aria-pressed="true"] {
    border-color: var(--bd-primary);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--bd-primary) 35%, transparent);
    z-index: 1;
  }
}

.bd-theme-picker-swatch-base {
  display: block;
  flex: 2;
}

.bd-theme-picker-swatch-accent {
  display: block;
  flex: 1;
}
</style>
