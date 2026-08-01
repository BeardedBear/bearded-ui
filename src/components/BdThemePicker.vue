<script setup lang="ts">
import { computed } from "vue";

import { type BdPalette, useTheme } from "../composables/useTheme";
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

function apply(preset: BdPreset): void {
  palette.value = { accent: preset.accent, base: preset.base };
}

function isActive(preset: BdPreset): boolean {
  return (
    palette.value.base.toLowerCase() === preset.base.toLowerCase()
    && palette.value.accent.toLowerCase() === preset.accent.toLowerCase()
  );
}

function update(key: keyof BdPalette, event: Event): void {
  palette.value = { ...palette.value, [key]: (event.target as HTMLInputElement).value };
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
          {{ preset.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-theme-picker {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-5);
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
  margin-bottom: var(--bd-space-3);
  text-transform: uppercase;
}

.bd-theme-picker-grid {
  display: grid;
  gap: var(--bd-space-3);
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}

.bd-theme-picker-card {
  background: var(--bd-bg-light);
  border: 2px solid var(--bd-border-color);
  border-radius: var(--bd-radius-md);
  color: var(--bd-font-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: var(--bd-font-size-sm);
  gap: var(--bd-space-2);
  padding: var(--bd-space-3);
  transition: border-color var(--bd-transition), transform var(--bd-transition);

  &:hover {
    border-color: var(--bd-primary);
    transform: translateY(-2px);
  }

  /* L'état actif est déjà porté par aria-pressed : pas de classe en double. */
  &[aria-pressed="true"] {
    border-color: var(--bd-primary);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--bd-primary) 35%, transparent);
  }
}

.bd-theme-picker-swatch {
  block-size: 2.5rem;
  border-radius: var(--bd-radius-sm);
  display: flex;
  justify-content: flex-end;
  overflow: hidden;

  & span {
    inline-size: 33%;
  }
}
</style>
