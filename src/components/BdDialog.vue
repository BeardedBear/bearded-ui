<script setup lang="ts">
import { ref, watch } from "vue";

/**
 * Modal built on the native `<dialog>`: focus trap, Escape and inert backdrop
 * come free. Opening and closing are animated by the `.bd-anim-dialog` preset.
 *
 * @example
 * <BdDialog v-model="open" title="Delete this?">
 *   <p>This cannot be undone.</p>
 *   <template #footer>
 *     <BdButton variant="danger" @click="remove">Delete</BdButton>
 *   </template>
 * </BdDialog>
 */
export interface BdDialogProps {
  /** Heading text. Use the `header` slot for markup. */
  title?: string;
}

defineProps<BdDialogProps>();

// ponytail: native <dialog> — focus trap, Esc, inert backdrop for free.
const open = defineModel<boolean>({ default: false });
const el = ref<HTMLDialogElement>();

watch(open, (value) => {
  if (!el.value) return;
  if (value) el.value.showModal();
  else el.value.close();
});
</script>

<template>
  <dialog ref="el" class="bd-dialog bd-surface bd-squircle bd-anim-dialog" @close="open = false">
    <header v-if="title || $slots.header" class="bd-dialog-header">
      <slot name="header">
        <h2 class="bd-dialog-title">{{ title }}</h2>
      </slot>
    </header>
    <div class="bd-dialog-body"><slot /></div>
    <footer v-if="$slots.footer" class="bd-dialog-footer"><slot name="footer" /></footer>
  </dialog>
</template>

<style scoped>
/*
 * Surface : .bd-surface. Ouverture/fermeture : preset .bd-anim-dialog.
 * Ne reste ici que ce qui est propre à la dialog.
 */
.bd-dialog {
  border-radius: var(--bd-radius-lg);
  box-shadow: var(--bd-shadow-lg);
  max-width: min(90vw, 32rem);
  padding: var(--bd-space-5);

  &::backdrop {
    backdrop-filter: blur(2px);
    background-color: var(--bd-overlay-color);
  }
}

.bd-dialog-title {
  margin: 0;
}

.bd-dialog-header {
  margin-bottom: var(--bd-space-4);
}

.bd-dialog-footer {
  display: flex;
  gap: var(--bd-space-2);
  justify-content: flex-end;
  margin-top: var(--bd-space-5);
}
</style>
