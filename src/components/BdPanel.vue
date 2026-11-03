<script setup lang="ts">
/**
 * A framed section: title on the left, actions on the right, content below.
 * Where BdCard is a bare surface, BdPanel is the unit a page is made of — a
 * stack of them is what an admin screen looks like.
 *
 * `description` is the muted help text under the header; the `badge` slot sits
 * right after the title (a status, a count).
 *
 * @example
 * <BdPanel title="Spotify" description="Playback runs server-side.">
 *   <template #badge><BdBadge variant="success">live</BdBadge></template>
 *   <template #actions><BdButton size="small">Reconnect</BdButton></template>
 *   …
 * </BdPanel>
 */
export interface BdPanelProps {
  /** Muted help text under the header. */
  description?: string;
  /** Inner spacing, same scale as BdCard. @default "default" */
  padding?: "default" | "none" | "small";
  /** Section heading. Use the `title` slot for markup. */
  title?: string;
}

const props = withDefaults(defineProps<BdPanelProps>(), { padding: "default" });
</script>

<template>
  <section
    class="bd-panel bd-surface bd-squircle"
    :class="props.padding === 'default' ? '' : `bd-panel-${props.padding}`"
  >
    <header v-if="title || $slots.title || $slots.actions" class="bd-panel-header">
      <h2 class="bd-panel-title bd-font-bold">
        <slot name="title">{{ title }}</slot>
        <slot name="badge" />
      </h2>
      <div v-if="$slots.actions" class="bd-panel-actions"><slot name="actions" /></div>
    </header>
    <p v-if="description" class="bd-panel-description">{{ description }}</p>
    <slot />
  </section>
</template>

<style scoped>
/* Fond, bordure et couleur viennent de .bd-surface (styles/utilities.css). */
.bd-panel {
  border-radius: var(--bd-radius-md);
  padding: var(--bd-space-5);
}

.bd-panel-small {
  padding: var(--bd-space-3);
}

.bd-panel-none {
  padding: 0;
}

.bd-panel-header {
  align-items: center;
  display: flex;
  gap: var(--bd-space-3);
  justify-content: space-between;
  margin-bottom: var(--bd-space-3);
}

.bd-panel-title {
  align-items: center;
  color: var(--bd-font-color-light);
  display: flex;
  font-size: var(--bd-font-size-base);
  gap: var(--bd-space-2);
  margin: 0;
}

.bd-panel-actions {
  align-items: center;
  display: flex;
  gap: var(--bd-space-2);
}

.bd-panel-description {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-sm);
  margin: 0 0 var(--bd-space-3);
}
</style>
