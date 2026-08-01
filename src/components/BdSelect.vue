<script setup lang="ts">
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
      <span aria-hidden="true" class="bd-select-arrow" />
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
  border-bottom: 2px solid currentcolor;
  border-left: 2px solid currentcolor;
  color: var(--bd-font-color-dark);
  height: 0.45rem;
  pointer-events: none;
  position: absolute;
  right: var(--bd-space-3);
  top: 50%;
  transform: translateY(-70%) rotate(-45deg);
  width: 0.45rem;
}
</style>
