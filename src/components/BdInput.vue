<script setup lang="ts">
import { ref, useId } from "vue";

import type { BdSize } from "@/types";

/**
 * Text field with its label, helper text and error state. The label is wired
 * to the input through a generated id.
 *
 * Every attribute that isn't a prop (`maxlength`, `autofocus`, `autocomplete`,
 * `@blur`, …) lands on the `<input>`, not on the wrapper — otherwise `focus`
 * and `blur`, which don't bubble, would never reach a listener.
 *
 * @example
 * <BdInput v-model="email" label="Email" type="email" :error="emailError" />
 * <BdInput v-model="code" variant="code" maxlength="6" placeholder="ABC123" />
 * <BdInput v-model="user"><template #prefix>@</template></BdInput>
 */
export interface BdInputProps {
  /** Blocks input and dims the field. */
  disabled?: boolean;
  /** Error state. A string is also rendered below the field, in place of `hint`. */
  error?: boolean | string;
  /** Helper text below the field. */
  hint?: string;
  /** Label above the field, wired to it through a generated id. */
  label?: string;
  /** Placeholder shown while the field is empty. */
  placeholder?: string;
  /**
   * Height of the control, on the same scale as BdButton — so a field and the
   * button next to it line up. @default "default"
   */
  size?: BdSize;
  /** Native input type. @default "text" */
  type?: "email" | "number" | "password" | "search" | "text" | "url";
  /**
   * `code` for a short hand-typed reference (monospace, spaced out, uppercased);
   * `underline` for renaming in place, where the field should read as editable
   * text rather than as a form control. @default "default"
   */
  variant?: "code" | "default" | "underline";
}

const props = withDefaults(defineProps<BdInputProps>(), {
  size: "default",
  type: "text",
  variant: "default",
});

defineOptions({ inheritAttrs: false });

const model = defineModel<number | string>();
const id = useId();
const el = ref<HTMLInputElement>();

// Un `ref` sur <BdInput> se comporte comme un ref sur l'input lui-même.
defineExpose({
  focus: () => el.value?.focus(),
  select: () => el.value?.select(),
});
</script>

<template>
  <div class="bd-field" :class="{ 'has-error': error }">
    <label v-if="label" class="bd-field-label bd-font-bold" :for="id">{{ label }}</label>
    <div class="bd-field-control">
      <span v-if="$slots.prefix" class="bd-field-prefix"><slot name="prefix" /></span>
      <input
        :id="id"
        ref="el"
        v-model="model"
        class="bd-field-input"
        :class="[
          props.variant === 'default' ? '' : `bd-field-input-${props.variant}`,
          props.size === 'default' ? '' : `bd-field-input-${props.size}`,
          { 'has-prefix': $slots.prefix },
        ]"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="type"
        v-bind="$attrs"
      />
    </div>
    <small v-if="typeof error === 'string' || hint" class="bd-field-note">{{ error || hint }}</small>
  </div>
</template>

<style scoped>
/* .bd-field et .bd-field-label viennent de styles/utilities.css. */
.bd-field-control {
  display: flex;
  min-width: 0;
  position: relative;
}

.bd-field-input {
  background-color: var(--bd-bg-dark);
  border: 1px solid var(--bd-border-color);
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color-light);
  height: var(--bd-control-height);
  min-width: 0;
  padding: 0 var(--bd-space-3);
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

  /* Le préfixe est posé par-dessus : la place se prend sur le padding. */
  &.has-prefix {
    padding-left: var(--bd-space-6);
  }
}

.bd-field-input-big {
  font-size: var(--bd-font-size-lg);
  height: var(--bd-control-height-big);
  padding: 0 var(--bd-space-4);
}

.bd-field-input-small {
  font-size: var(--bd-font-size-sm);
  height: var(--bd-control-height-small);
}

.bd-field-input-x-small {
  font-size: var(--bd-font-size-sm);
  height: var(--bd-control-height-x-small);
  padding: 0 var(--bd-space-2);
}

/* Référence courte tapée à la main : chaque caractère doit se distinguer. */
.bd-field-input-code {
  font-family: var(--bd-font-family-mono);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Renommage sur place : du texte éditable, pas un champ de formulaire. */
.bd-field-input-underline {
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid var(--bd-primary);
  border-radius: 0;
  padding: 0;

  &:hover:not(:disabled),
  &:focus {
    border-color: var(--bd-primary-light);
  }
}

.bd-field-prefix {
  align-items: center;
  color: var(--bd-primary);
  display: flex;
  inset-inline-start: var(--bd-space-3);
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  user-select: none;
}

.bd-field-note {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-xs);

  .has-error & {
    color: var(--bd-danger);
  }
}
</style>
