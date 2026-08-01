<script setup lang="ts">
import { PhCaretDown } from "@phosphor-icons/vue";
import { useId } from "vue";

import type { BdOption } from "@/types";

export interface BdSelectProps {
  disabled?: boolean;
  label?: string;
  options: BdOption[];
  placeholder?: string;
}

defineProps<BdSelectProps>();

const model = defineModel<string>();
const id = useId();

// ponytail: native <select> — free keyboard/a11y/mobile picker. Port beardify's
// CustomSelect.vue here only if a fully styled dropdown list becomes a must.
</script>

<template>
  <div class="bd-field">
    <label v-if="label" class="bd-field-label bd-font-bold" :for="id">{{ label }}</label>
    <div class="bd-select">
      <select :id="id" v-model="model" class="bd-select-control bd-font-bold" :disabled="disabled">
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <PhCaretDown aria-hidden="true" class="bd-select-arrow" size="1.1em" weight="bold" />
    </div>
  </div>
</template>

<style scoped>
.bd-field {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-1);
}

.bd-field-label {
  color: var(--bd-font-color-dark);
  font-size: var(--bd-font-size-sm);
}

.bd-select {
  position: relative;
}

.bd-select-control {
  appearance: none;
  background-color: var(--bd-bg-lighter);
  border: 0;
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color-light);
  cursor: pointer;
  font-size: var(--bd-font-size-sm);
  padding: var(--bd-space-2) var(--bd-space-6) var(--bd-space-2) var(--bd-space-3);
  transition: background-color var(--bd-transition);
  width: 100%;

  &:hover:not(:disabled) {
    background-color: var(--bd-bg-light);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  option {
    background-color: var(--bd-bg-dark);
    color: var(--bd-font-color-light);
  }
}

.bd-select-arrow {
  color: var(--bd-font-color-dark);
  pointer-events: none;
  position: absolute;
  right: var(--bd-space-3);
  top: 50%;
  transform: translateY(-50%);
}
</style>
