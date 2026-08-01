<script setup lang="ts">
import { useId } from "vue";

export interface BdInputProps {
  disabled?: boolean;
  error?: string;
  hint?: string;
  label?: string;
  placeholder?: string;
  type?: "email" | "number" | "password" | "search" | "text" | "url";
}

withDefaults(defineProps<BdInputProps>(), { type: "text" });

const model = defineModel<number | string>();
const id = useId();
</script>

<template>
  <div class="bd-field" :class="{ 'has-error': error }">
    <label v-if="label" class="bd-field-label bd-font-bold" :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      class="bd-field-input"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
    />
    <small v-if="error || hint" class="bd-field-note">{{ error || hint }}</small>
  </div>
</template>

<style scoped>
/* .bd-field et .bd-field-label viennent de styles/utilities.css. */
.bd-field-input {
  background-color: var(--bd-bg-dark);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color-light);
  padding: var(--bd-space-2) var(--bd-space-3);
  transition:
    border-color var(--bd-transition-fast),
    background-color var(--bd-transition-fast);
  width: 100%;

  &::placeholder {
    color: var(--bd-font-color-darker);
  }

  &:hover:not(:disabled) {
    border-color: var(--bd-bg-lighter);
  }

  &:focus {
    border-color: var(--bd-primary);
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .has-error & {
    border-color: var(--bd-danger);
  }
}

.bd-field-note {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-xs);

  .has-error & {
    color: var(--bd-danger);
  }
}
</style>
