<script setup lang="ts">
import { provide, toRef } from "vue";

import BdButton from "@/components/BdButton.vue";
import { bdSize } from "@/injection";
import type { BdOption, BdSize } from "@/types";

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
export interface BdButtonGroupProps {
  /** Disables every generated button. Buttons passed through the slot keep their own prop. */
  disabled?: boolean;
  /** Spans the full width, buttons sharing it equally. */
  full?: boolean;
  /** Turns the group into a segmented control bound to `v-model`. Leave empty to pass buttons through the default slot instead. */
  options?: BdOption[];
  /** Height of every button in the group, slot content included. @default "default" */
  size?: BdSize;
}

const props = withDefaults(defineProps<BdButtonGroupProps>(), { options: () => [], size: "default" });

const model = defineModel<string>();

// Les boutons du slot héritent de la taille du groupe, comme ceux générés ici.
provide(bdSize, toRef(props, "size"));
</script>

<template>
  <div class="bd-button-group" :class="{ 'bd-button-group-full': full }" role="group">
    <!-- Slot libre pour un groupe d'actions ; le fallback rend le segmented control. -->
    <slot>
      <BdButton
        v-for="option in options"
        :key="option.value"
        :disabled="disabled"
        :size="size"
        :variant="option.value === model ? 'primary' : 'default'"
        @click="model = option.value"
      >
        {{ option.label }}
      </BdButton>
    </slot>
  </div>
</template>

<style scoped>
.bd-button-group {
  display: inline-flex;
  gap: var(--bd-space-1);
}

/* Wins over the child's own radius: one more class in the scoped selector. */
.bd-button-group > * {
  border-radius: 0;
}

.bd-button-group > *:first-child {
  border-end-start-radius: var(--bd-radius-lg);
  border-start-start-radius: var(--bd-radius-lg);
}

.bd-button-group > *:last-child {
  border-end-end-radius: var(--bd-radius-lg);
  border-start-end-radius: var(--bd-radius-lg);
}

.bd-button-group-full {
  display: flex;
  width: 100%;

  & > * {
    flex: 1;
  }
}
</style>
