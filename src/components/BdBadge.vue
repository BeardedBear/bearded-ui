<script setup lang="ts">
export interface BdBadgeProps {
  variant?: "danger" | "default" | "info" | "primary" | "success" | "warning";
}

const props = withDefaults(defineProps<BdBadgeProps>(), { variant: "default" });
</script>

<template>
  <span
    class="bd-badge bd-font-bold bd-squircle"
    :class="props.variant === 'default' ? '' : `bd-badge-${props.variant}`"
  >
    <slot />
  </span>
</template>

<style scoped>
.bd-badge {
  align-items: center;
  background-color: var(--bd-bg-lighter);
  border-radius: var(--bd-radius-full);
  color: var(--bd-font-color-light);
  display: inline-flex;
  font-size: var(--bd-font-size-xs);
  gap: var(--bd-space-1);
  line-height: 1;
  padding: var(--bd-space-1) var(--bd-space-2);
  text-transform: uppercase;
}

.bd-badge-primary {
  background-color: var(--bd-primary);
  color: var(--bd-on-primary);
}

.bd-badge-success {
  background-color: var(--bd-success);
  color: #fff;
}

.bd-badge-warning {
  background-color: var(--bd-warning);
}

.bd-badge-danger {
  background-color: var(--bd-danger);
  color: #fff;
}

.bd-badge-info {
  background-color: var(--bd-info);
  color: #fff;
}
</style>
