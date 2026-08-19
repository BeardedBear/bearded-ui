<script setup lang="ts">
import { PhCaretDown } from "@phosphor-icons/vue";
import { useId } from "vue";

import type { BdOption } from "@/types";

/**
 * Single choice among `options`, on a styled native `<select>` — keyboard
 * support and the mobile picker come free. For a fully styled panel, an icon
 * per entry or arbitrary content, use BdDropdown instead.
 *
 * @example
 * <BdSelect v-model="fruit" label="Fruit" :options="fruits" placeholder="Pick one" />
 */
export interface BdSelectProps {
  /** Blocks selection and dims the control. */
  disabled?: boolean;
  /** Label above the control, wired to it through a generated id. */
  label?: string;
  /** Choices to render. */
  options: BdOption[];
  /** Disabled first entry, shown while `v-model` is empty. */
  placeholder?: string;
}

defineProps<BdSelectProps>();

const model = defineModel<number | string>();
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
/* .bd-field et .bd-field-label viennent de styles/utilities.css. */
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
