<script setup lang="ts">
/**
 * Spinner. BdButton mounts one on its own when `loading` is set.
 *
 * @example
 * <BdLoader size="small" />
 */
export interface BdLoaderProps {
  /** Diameter of the spinner. Its own scale, finer than BdSize — a spinner sits inside other controls. @default "default" */
  size?: "default" | "small" | "x-small" | "xx-small";
}

const props = withDefaults(defineProps<BdLoaderProps>(), { size: "default" });
</script>

<template>
  <span
    aria-label="Loading"
    class="bd-loader"
    :class="props.size === 'default' ? '' : `bd-loader-${props.size}`"
    role="status"
  />
</template>

<style scoped>
.bd-loader {
  --loader-border: 0.4rem;
  --loader-size: 2.8rem;

  animation: bd-spin 0.6s linear infinite;
  border: var(--loader-border) solid var(--bd-bg);
  border-radius: 50%;
  border-top-color: var(--bd-primary);
  display: inline-block;
  height: var(--loader-size);
  width: var(--loader-size);
  will-change: transform;
}

/* Size variants only retune the two custom properties above. */
.bd-loader-small {
  --loader-border: 0.3rem;
  --loader-size: 1.8rem;
}

.bd-loader-x-small {
  --loader-border: 0.2rem;
  --loader-size: 1.2rem;
}

.bd-loader-xx-small {
  --loader-border: 0.12rem;
  --loader-size: 0.9rem;
}

@keyframes bd-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
