<script setup lang="ts">
export interface BdCardProps {
  padding?: "default" | "none" | "small";
}

const props = withDefaults(defineProps<BdCardProps>(), { padding: "default" });
</script>

<template>
  <section
    class="bd-card bd-surface bd-squircle"
    :class="props.padding === 'default' ? '' : `bd-card-${props.padding}`"
  >
    <header v-if="$slots.header" class="bd-card-header bd-font-bold"><slot name="header" /></header>
    <slot />
  </section>
</template>

<style scoped>
/* Fond, bordure et couleur viennent de .bd-surface (styles/utilities.css). */
.bd-card {
  border-radius: var(--bd-radius-md);
  padding: var(--bd-space-5);
}

.bd-card-small {
  padding: var(--bd-space-3);
}

.bd-card-none {
  padding: 0;
}

.bd-card-header {
  color: var(--bd-font-color-light);
  margin-bottom: var(--bd-space-3);
}
</style>
