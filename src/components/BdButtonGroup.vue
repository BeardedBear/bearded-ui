<script setup lang="ts">
import BdButton from "@/components/BdButton.vue";
import type { BdOption } from "@/types";

export interface BdButtonGroupProps {
  disabled?: boolean;
  /** Le groupe occupe toute la largeur, boutons à parts égales. */
  full?: boolean;
  /** Fournir pour un segmented control ; sinon passer des boutons dans le slot. */
  options?: BdOption[];
  size?: "big" | "default" | "small" | "x-small";
}

withDefaults(defineProps<BdButtonGroupProps>(), { options: () => [], size: "default" });

const model = defineModel<string>();
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
  gap: 2px;
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
