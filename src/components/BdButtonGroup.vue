<script setup lang="ts" generic="T extends number | string = number | string">
import { provide, toRef } from "vue";

import type { BdOption, BdSize } from "@/types";

import BdButton from "@/components/BdButton.vue";
import BdTooltip from "@/components/BdTooltip.vue";
import { bdSize } from "@/injection";

/**
 * Buttons glued together, rounded only at both ends of the group.
 *
 * With `options` it is a segmented control bound to `v-model`; without, the
 * default slot takes arbitrary buttons — which inherit the group's size.
 *
 * @example
 * <BdButtonGroup v-model="view" :options="[{ label: 'List', value: 'list' }]" />
 * <BdButtonGroup size="small">
 *   <BdButton>Prev</BdButton>
 *   <BdButton>Next</BdButton>
 * </BdButtonGroup>
 */
export interface BdButtonGroupProps<T extends number | string = number | string> {
  /** Disables every generated button. Buttons passed through the slot keep their own prop. */
  disabled?: boolean;
  /** Spans the full width, buttons sharing it equally. */
  full?: boolean;
  /**
   * Turns the group into a segmented control bound to `v-model`. Leave empty to
   * pass buttons through the default slot instead.
   */
  options?: BdOption<T>[];
  /** Height of every button in the group, slot content included. @default "default" */
  size?: BdSize;
}

const props = withDefaults(defineProps<BdButtonGroupProps<T>>(), {
  options: () => [],
  size: "default",
});

const model = defineModel<T>();

// Les boutons du slot héritent de la taille du groupe, comme ceux générés ici.
provide(bdSize, toRef(props, "size"));
</script>

<template>
  <div class="bd-button-group" :class="{ 'bd-button-group-full': full }" role="group">
    <!-- Slot libre pour un groupe d'actions ; le fallback rend le segmented control. -->
    <slot>
      <!-- Toujours enveloppé, tooltip ou non : un niveau intercalé sur certaines
           options seulement décalerait les arrondis d'extrémité d'une option à
           l'autre. Sans `content`, BdTooltip ne s'ouvre jamais. -->
      <BdTooltip v-for="option in options" :key="option.value" :content="option.tooltip">
        <BdButton
          :disabled="disabled"
          :size="size"
          :variant="option.value === model ? 'primary' : 'default'"
          @click="model = option.value"
        >
          {{ option.label }}
        </BdButton>
      </BdTooltip>
    </slot>
  </div>
</template>

<style scoped>
.bd-button-group {
  display: inline-flex;
  gap: var(--bd-space-1);
}

/*
 * Wins over the child's own radius: one more class in the scoped selector.
 * Le second sélecteur vise le bouton d'une option à tooltip, où le trigger du
 * tooltip s'intercale entre le groupe et lui. Il nomme le trigger plutôt que
 * `> * > *`, qui attrapait aussi le contenu d'un bouton passé en slot — une
 * icône se retrouvait étirée à toute la largeur du bouton.
 */
.bd-button-group > *,
.bd-button-group > .bd-tooltip-trigger > .bd-button {
  border-radius: 0;
}

.bd-button-group > *:first-child,
.bd-button-group > *:first-child > .bd-button {
  border-end-start-radius: var(--bd-radius-lg);
  border-start-start-radius: var(--bd-radius-lg);
}

.bd-button-group > *:last-child,
.bd-button-group > *:last-child > .bd-button {
  border-end-end-radius: var(--bd-radius-lg);
  border-start-end-radius: var(--bd-radius-lg);
}

.bd-button-group-full {
  display: flex;
  width: 100%;

  & > * {
    flex: 1;
  }

  /* Un trigger de tooltip est inline-flex : sans ça son bouton ne remplirait pas la part. */
  & > .bd-tooltip-trigger > .bd-button {
    width: 100%;
  }
}
</style>
