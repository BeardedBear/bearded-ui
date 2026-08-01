<script setup lang="ts">
import { useToast } from "@/composables/useToast";

/**
 * Renders the toast queue. Mount it once, near the root of the app, then call
 * `toast()` from anywhere.
 *
 * @example
 * <BdToaster position="bottom-right" />
 */
export interface BdToasterProps {
  /** Screen corner the stack grows from. @default "bottom-right" */
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const props = withDefaults(defineProps<BdToasterProps>(), { position: "bottom-right" });

const { dismissToast, toasts } = useToast();
</script>

<template>
  <Teleport to="body">
    <TransitionGroup class="bd-toaster" :class="`bd-toaster-${props.position}`" name="bd-toast" tag="div">
      <button
        v-for="t in toasts"
        :key="t.id"
        aria-live="polite"
        class="bd-toast bd-font-bold bd-squircle"
        :class="`bd-state-${t.variant}`"
        type="button"
        @click="dismissToast(t.id)"
      >
        {{ t.msg }}
      </button>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.bd-toaster {
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-2);
  isolation: isolate;
  pointer-events: none;
  position: fixed;
  z-index: 999;
}

.bd-toaster-bottom-right {
  bottom: var(--bd-space-5);
  right: var(--bd-space-5);
}

.bd-toaster-bottom-left {
  bottom: var(--bd-space-5);
  left: var(--bd-space-5);
}

.bd-toaster-top-right {
  right: var(--bd-space-5);
  top: var(--bd-space-5);
}

.bd-toaster-top-left {
  left: var(--bd-space-5);
  top: var(--bd-space-5);
}

/* Couleurs : .bd-state-* (styles/utilities.css), partagées avec BdBadge. */
.bd-toast {
  border: 0;
  border-radius: var(--bd-radius-md);
  box-shadow: var(--bd-shadow-md);
  cursor: pointer;
  font-size: var(--bd-font-size-sm);
  max-width: 22rem;
  padding: var(--bd-space-2) var(--bd-space-4);
  pointer-events: auto;
  text-align: left;
}

.bd-toast-enter-active,
.bd-toast-leave-active {
  transition:
    opacity var(--bd-transition),
    transform var(--bd-transition);
}

.bd-toast-enter-from,
.bd-toast-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}

/* Keeps the remaining toasts from jumping when one leaves mid-stack. */
.bd-toast-leave-active {
  position: absolute;
}

.bd-toaster-bottom-left .bd-toast-enter-from,
.bd-toaster-bottom-left .bd-toast-leave-to,
.bd-toaster-top-left .bd-toast-enter-from,
.bd-toaster-top-left .bd-toast-leave-to {
  transform: translateX(-2rem);
}
</style>
