<script setup lang="ts">
import { type BdToast, useToast } from "@/composables/useToast";

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

/*
 * The toast dismisses before the handler runs: a slow restore would otherwise
 * leave a live button sitting on screen, and a second click would fire it twice.
 */
function runAction(t: BdToast): void {
  dismissToast(t.id);
  void t.action?.onAction();
}
</script>

<template>
  <Teleport to="body">
    <TransitionGroup class="bd-toaster" :class="`bd-toaster-${props.position}`" name="bd-toast" tag="div">
      <!--
        Two shapes on purpose. Without an action the whole toast stays one
        button that dismisses on click, which is the behaviour every existing
        caller already relies on. With an action it becomes a plain element —
        a button cannot legally contain another button — and the action and
        dismiss each get their own control.
      -->
      <button
        v-for="t in toasts.filter((toast) => !toast.action)"
        :key="t.id"
        aria-live="polite"
        class="bd-toast bd-font-bold bd-squircle"
        :class="`bd-state-${t.variant}`"
        type="button"
        @click="dismissToast(t.id)"
      >
        {{ t.msg }}
      </button>
      <div
        v-for="t in toasts.filter((toast) => toast.action)"
        :key="`action-${t.id}`"
        aria-live="polite"
        class="bd-toast bd-toast-with-action bd-font-bold bd-squircle"
        :class="`bd-state-${t.variant}`"
      >
        <span class="bd-toast-msg">{{ t.msg }}</span>
        <button class="bd-toast-action" type="button" @click="runAction(t)">
          {{ t.action?.label }}
        </button>
        <button aria-label="Dismiss" class="bd-toast-dismiss" type="button" @click="dismissToast(t.id)">
          &times;
        </button>
      </div>
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

.bd-toast-with-action {
  align-items: center;
  cursor: default;
  display: flex;
  gap: var(--bd-space-3);
}

.bd-toast-msg {
  flex: 1;
}

.bd-toast-action {
  background: none;
  border: 0;
  border-radius: var(--bd-radius-sm);
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: var(--bd-space-1) var(--bd-space-2);
  text-decoration: underline;
  white-space: nowrap;
}

.bd-toast-dismiss {
  background: none;
  border: 0;
  border-radius: var(--bd-radius-sm);
  color: inherit;
  cursor: pointer;
  font: inherit;
  line-height: 1;
  opacity: 0.7;
  padding: var(--bd-space-1) var(--bd-space-2);
}

.bd-toast-action:hover,
.bd-toast-dismiss:hover {
  background: rgb(0 0 0 / 15%);
  opacity: 1;
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
