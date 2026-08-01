<script setup lang="ts">
import { type Component, inject } from "vue";

import { bdDropdownClose } from "@/injection";

/**
 * Entry of a BdDropdown. Closes the menu on click unless `keepOpen` is set.
 *
 * @example
 * <BdDropdownItem :icon="PhCopy" @click="duplicate">Duplicate</BdDropdownItem>
 * <BdDropdownItem :active="sort === 'date'" keep-open @click="sort = 'date'">By date</BdDropdownItem>
 */
export interface BdDropdownItemProps {
  /** Marks the item as the current choice (primary background). */
  active?: boolean;
  /** Destructive action styling. */
  danger?: boolean;
  /** Blocks the click and dims the item. */
  disabled?: boolean;
  /** Icon component, typically a `Ph*` from `@phosphor-icons/vue`. Use the `icon` slot for anything else. */
  icon?: Component;
  /** Keeps the menu open after the click — for toggles and multi-select filters. */
  keepOpen?: boolean;
}

const props = defineProps<BdDropdownItemProps>();

const close = inject(bdDropdownClose, () => {});

function onClick(): void {
  if (!props.keepOpen) close();
}
</script>

<template>
  <button
    class="bd-dropdown-item bd-squircle"
    :class="{ 'is-active': active, 'is-danger': danger }"
    :disabled="disabled"
    role="menuitem"
    type="button"
    @click="onClick"
  >
    <span v-if="icon || $slots.icon" class="bd-dropdown-item-icon">
      <slot name="icon"><component :is="icon" size="1.2em" weight="bold" /></slot>
    </span>
    <slot />
  </button>
</template>

<style scoped>
.bd-dropdown-item {
  align-items: center;
  background: none;
  border: 0;
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color);
  cursor: pointer;
  display: flex;
  font-size: var(--bd-font-size-sm);
  gap: var(--bd-space-2);
  padding: var(--bd-space-2) var(--bd-space-3);
  text-align: left;
  transition:
    background-color var(--bd-transition-fast),
    color var(--bd-transition-fast);
  white-space: nowrap;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: var(--bd-bg-lighter);
    color: var(--bd-font-color-light);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/*
 * Atténuée via opacity plutôt qu'une couleur fixe : l'icône suit ainsi le texte
 * de l'item, y compris en variante active ou danger.
 */
.bd-dropdown-item-icon {
  align-items: center;
  display: flex;
  flex: none;
  opacity: 0.65;
  transition: opacity var(--bd-transition-fast);

  .bd-dropdown-item:hover:not(:disabled) &,
  .bd-dropdown-item:focus-visible &,
  .is-active & {
    opacity: 1;
  }
}

.is-active {
  background-color: var(--bd-primary);
  color: var(--bd-on-primary);

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: var(--bd-primary-light);
    color: var(--bd-on-primary);
  }
}

.is-danger {
  color: var(--bd-danger);

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: var(--bd-danger);
    color: #fff;
  }
}
</style>
