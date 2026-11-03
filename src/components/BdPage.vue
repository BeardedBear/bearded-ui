<script setup lang="ts">
/**
 * The frame of a whole page: a centred column on the app background, topped by
 * a header (title, subtitle, actions). It exists so that every view lays out
 * its outer shell the same way instead of re-writing a `<header>` by hand.
 *
 * Use the `back` slot for a way out (a link to the hub), `actions` for what
 * sits on the right of the title, and `title` when plain text is not enough.
 *
 * @example
 * <BdPage title="Radio" subtitle="mimix" width="46rem">
 *   <template #actions><BdButton variant="primary">Save</BdButton></template>
 *   <BdPanel title="Queue">…</BdPanel>
 * </BdPage>
 */
export interface BdPageProps {
  /** Line under the title, muted. */
  subtitle?: string;
  /** Page heading. Use the `title` slot for markup. */
  title?: string;
  /** Max width of the column, any CSS length. @default "48rem" */
  width?: string;
}

withDefaults(defineProps<BdPageProps>(), { width: "48rem" });
</script>

<template>
  <div class="bd-page">
    <div class="bd-page-inner" :style="{ maxWidth: width }">
      <header v-if="title || subtitle || $slots.title || $slots.back || $slots.actions" class="bd-page-header">
        <div v-if="$slots.back" class="bd-page-back"><slot name="back" /></div>
        <div class="bd-page-heading">
          <h1 class="bd-page-title bd-heading"><slot name="title">{{ title }}</slot></h1>
          <p v-if="subtitle" class="bd-page-subtitle">{{ subtitle }}</p>
        </div>
        <div v-if="$slots.actions" class="bd-page-actions"><slot name="actions" /></div>
      </header>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bd-page {
  background: var(--bd-bg);
  box-sizing: border-box;
  color: var(--bd-font-color);
  font-family: var(--bd-font-family);
  min-height: 100dvh;
  padding: var(--bd-space-5);
}

.bd-page-inner {
  margin: 0 auto;
}

.bd-page-header {
  align-items: center;
  border-bottom: 1px solid var(--bd-border-color);
  display: flex;
  gap: var(--bd-space-3);
  margin-bottom: var(--bd-space-6);
  padding-bottom: var(--bd-space-4);
}

.bd-page-heading {
  flex: 1;
  min-width: 0;
}

.bd-page-title {
  color: var(--bd-font-color-light);
  font-size: var(--bd-font-size-2xl);
  margin: 0;
}

.bd-page-subtitle {
  color: var(--bd-font-color-darker);
  font-size: var(--bd-font-size-sm);
  margin: var(--bd-space-1) 0 0;
}

.bd-page-actions {
  align-items: center;
  display: flex;
  gap: var(--bd-space-2);
}
</style>
