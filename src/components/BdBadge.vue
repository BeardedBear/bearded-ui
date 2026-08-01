<script setup lang="ts">
export interface BdBadgeProps {
  variant?: "danger" | "default" | "info" | "primary" | "success" | "warning";
}

const props = withDefaults(defineProps<BdBadgeProps>(), { variant: "default" });
</script>

<template>
  <span class="bd-badge bd-font-bold bd-squircle" :class="`bd-state-${props.variant}`">
    <slot />
  </span>
</template>

<style scoped>
/* Couleurs : .bd-state-* (styles/utilities.css), partagées avec BdToaster. */
.bd-badge {
  align-items: center;
  border-radius: var(--bd-radius-full);
  display: inline-flex;
  font-size: var(--bd-font-size-xs);
  gap: var(--bd-space-1);
  line-height: 1;
  padding: var(--bd-space-1) var(--bd-space-2);
  text-transform: uppercase;
}
</style>
