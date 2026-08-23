<script setup lang="ts">
/**
 * The block a view shows when there is nothing to show, or when loading it
 * failed. One shape for both, because the two look alike and differ only in
 * wording and whether there is something to retry.
 *
 * It exists because the alternative keeps getting written by hand, badly: a
 * view gates its spinner on `!list.length`, so a successful-but-empty response
 * and a failed request both render as a spinner that never stops. Separating
 * loading from empty from error needs somewhere for the last two to land.
 *
 * The icon is a slot rather than a prop: the library ships no icon set, and
 * every consuming app already has its own.
 *
 * @example
 * <BdEmptyState title="No releases yet" message="Nothing has been published." />
 *
 * @example
 * <BdEmptyState
 *   title="Could not load releases"
 *   message="The feed is not answering right now."
 *   action-label="Try again"
 *   @action="retry"
 * >
 *   <template #icon><PhWarning /></template>
 * </BdEmptyState>
 */
export interface BdEmptyStateProps {
  /** Label for the single recovery action. Omit for a plain empty state. */
  actionLabel?: string;
  /** One sentence explaining the state, or what to do about it. */
  message?: string;
  /** Short heading naming the state. */
  title: string;
}

defineProps<BdEmptyStateProps>();

const emit = defineEmits<{ action: [] }>();
</script>

<template>
  <div class="bd-empty-state">
    <span v-if="$slots.icon" class="bd-empty-state-icon" aria-hidden="true"><slot name="icon" /></span>
    <p class="bd-empty-state-title bd-font-bold">{{ title }}</p>
    <p v-if="message" class="bd-empty-state-message">{{ message }}</p>
    <button v-if="actionLabel" class="bd-empty-state-action bd-squircle" type="button" @click="emit('action')">
      {{ actionLabel }}
    </button>
    <slot />
  </div>
</template>

<style scoped>
.bd-empty-state {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-2);
  justify-content: center;
  padding: var(--bd-space-6) var(--bd-space-5);
  text-align: center;
}

.bd-empty-state-icon {
  color: var(--bd-font-color-dark);
  display: inline-flex;
  font-size: var(--bd-font-size-xl);
}

.bd-empty-state-title {
  margin: 0;
}

.bd-empty-state-message {
  color: var(--bd-font-color-dark);
  font-size: var(--bd-font-size-sm);
  margin: 0;

  /* One-sentence explanations, kept to a single pass of reading. */
  max-width: 42ch;
}

.bd-empty-state-action {
  background: none;
  border: 0;
  border-radius: var(--bd-radius-sm);
  color: var(--bd-primary);
  cursor: pointer;
  font: inherit;
  margin-top: var(--bd-space-2);
  padding: var(--bd-space-2) var(--bd-space-4);
}

.bd-empty-state-action:hover {
  background: var(--bd-primary-bg);
}
</style>
