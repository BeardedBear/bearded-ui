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
    <div v-for="entry in groups" :key="entry.group" class="bd-theme-picker-group">
      <h3>{{ entry.group }}</h3>
      <div class="bd-theme-picker-grid">
        <!--
          Mini aperçu plutôt que le nom : trente presets nommés faisaient du
          picker une page à part. Le nom reste le nom accessible et l'infobulle.
          `bare` : le bouton reste l'élément de grille.
        -->
        <BdTooltip v-for="preset in entry.presets" :key="preset.name" bare :content="preset.name">
          <button
            :aria-label="preset.name"
            :aria-pressed="isActive(preset)"
            class="bd-theme-picker-swatch"
            :style="{ '--bd-swatch-accent': preset.accent, '--bd-swatch-base': preset.base }"
            type="button"
            @click="apply(preset)"
          >
            <span class="bd-theme-picker-swatch-dot" />
            <span class="bd-theme-picker-swatch-bar" />
          </button>
        </BdTooltip>
      </div>
    </div>

    <div class="bd-theme-picker-custom">
      <label class="bd-theme-picker-chip">
        <input :value="palette.base" type="color" @input="update('base', $event)" />
        <span class="bd-theme-picker-chip-text">
          <span class="bd-font-bold">{{ baseLabel }}</span>
          <span class="bd-theme-picker-chip-hex">{{ palette.base }}</span>
        </span>
      </label>
      <label class="bd-theme-picker-chip">
        <input :value="palette.accent" type="color" @input="update('accent', $event)" />
        <span class="bd-theme-picker-chip-text">
          <span class="bd-font-bold">{{ accentLabel }}</span>
          <span class="bd-theme-picker-chip-hex">{{ palette.accent }}</span>
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.bd-theme-picker {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-4);
}

.bd-theme-picker-group h3 {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-xs);
  letter-spacing: 0.08em;
  margin-bottom: var(--bd-space-2);
  text-transform: uppercase;
}

/*
 * Cinq colonnes fixes : les groupes livrés comptent dix presets, donc deux
 * lignes pleines sans pastille orpheline. La largeur max évite des vignettes
 * démesurées dans un panneau large.
 */
.bd-theme-picker-grid {
  display: grid;
  gap: var(--bd-space-2);
  grid-template-columns: repeat(5, 1fr);
  max-inline-size: 24rem;
}

.bd-theme-picker-swatch {
  align-items: flex-end;
  aspect-ratio: 3 / 2;
  background: var(--bd-swatch-base);
  border: 1px solid color-mix(in oklab, var(--bd-swatch-accent) 25%, var(--bd-border-color));
  border-radius: var(--bd-radius-md);
  cursor: pointer;
  display: flex;
  gap: 4px;
  inline-size: 100%;
  padding: 6px;
  transition:
    outline-color var(--bd-transition),
    translate var(--bd-transition);

  /* Contour transparent toujours présent : seule sa couleur s'anime. */
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:hover {
    translate: 0 -2px;
  }

  &:focus-visible {
    outline-color: var(--bd-font-color-dark);
  }

  /* L'état actif est déjà porté par aria-pressed : pas de classe en double. */
  &[aria-pressed="true"] {
    outline-color: var(--bd-primary);
  }
}

.bd-theme-picker-swatch-dot {
  aspect-ratio: 1;
  background: var(--bd-swatch-accent);
  border-radius: 50%;
  inline-size: 0.7rem;
}

.bd-theme-picker-swatch-bar {
  background: color-mix(in oklab, var(--bd-swatch-accent) 45%, transparent);
  block-size: 3px;
  border-radius: 999px;
  flex: 1;
  margin-block-end: 0.25rem;
}

.bd-theme-picker-custom {
  border-block-start: 1px solid var(--bd-border-color);
  display: grid;
  gap: var(--bd-space-2);
  grid-template-columns: 1fr 1fr;
  padding-block-start: var(--bd-space-4);
}

.bd-theme-picker-chip {
  align-items: center;
  background: var(--bd-bg-darker);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-md);
  cursor: pointer;
  display: flex;
  gap: var(--bd-space-2);
  padding: var(--bd-space-2);
  transition: border-color var(--bd-transition);

  &:hover,
  &:focus-within {
    border-color: var(--bd-font-color-darker);
  }

  /* Le champ natif porte son propre cadre sur chaque OS : réduit à un disque. */
  & input {
    background: transparent;
    block-size: 1.75rem;
    border: 0;
    cursor: pointer;
    flex-shrink: 0;
    inline-size: 1.75rem;
    padding: 0;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &::-webkit-color-swatch {
      border: 1px solid var(--bd-border-color);
      border-radius: 50%;
    }

    &::-moz-color-swatch {
      border: 1px solid var(--bd-border-color);
      border-radius: 50%;
    }
  }
}

.bd-theme-picker-chip-text {
  display: flex;
  flex-direction: column;
  font-size: var(--bd-font-size-sm);
  line-height: 1.2;
  min-inline-size: 0;
}

.bd-theme-picker-chip-hex {
  color: var(--bd-font-color-dark);
  font-family: ui-monospace, monospace;
  font-size: var(--bd-font-size-xs);
  text-transform: uppercase;
}
</style>
