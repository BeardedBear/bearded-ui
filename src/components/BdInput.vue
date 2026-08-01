<script setup lang="ts">
import { useId } from "vue";

/**
 * Text field with its label, helper text and error state. The label is wired
 * to the input through a generated id.
 *
 * @example
 * <BdInput v-model="email" label="Email" type="email" :error="emailError" />
 */
export interface BdInputProps {
  /** Blocks input and dims the field. */
  disabled?: boolean;
  /** Error message below the field. Also turns the border red. Takes precedence over `hint`. */
  error?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Label above the field, wired to it through a generated id. */
  label?: string;
  /** Placeholder shown while the field is empty. */
  placeholder?: string;
  /** Native input type. @default "text" */
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
