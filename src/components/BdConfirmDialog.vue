<script setup lang="ts">
import BdButton from "./BdButton.vue";
import BdDialog from "./BdDialog.vue";

/**
 * Dialog asking to confirm an action. Escape, the close button and the cancel
 * button all resolve the same way — as a `cancel`, never as a silent dismissal.
 *
 * Labels are props rather than built-in strings: the library ships no
 * translations, so an app in another language passes its own.
 *
 * @example
 * <BdConfirmDialog
 *   v-model="askDelete"
 *   danger
 *   title="Delete this label?"
 *   message="Messages keep their content, only the label goes."
 *   confirm-label="Delete"
 *   @confirm="remove"
 * />
 */
export interface BdConfirmDialogProps {
  /** Dismiss button label. @default "Cancel" */
  cancelLabel?: string;
  /** Confirm button label. @default "Confirm" */
  confirmLabel?: string;
  /** Turns the confirm button red, for a destructive action. */
  danger?: boolean;
  /** Body text. Use the default slot when it needs markup. */
  message?: string;
  /** Heading text. */
  title?: string;
}

withDefaults(defineProps<BdConfirmDialogProps>(), {
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  danger: false,
  message: undefined,
  title: undefined,
});

const emit = defineEmits<{
  cancel: [];
  confirm: [];
}>();

const open = defineModel<boolean>({ default: false });

/*
 * Un abandon reste un abandon, quel qu'en soit le geste : Escape et la croix
 * passent par ici comme le bouton, sinon l'appelant devrait deviner qu'une
 * dialog refermée sans `confirm` valait `cancel`.
 */
function cancel(): void {
  open.value = false;
  emit("cancel");
}

function confirm(): void {
  open.value = false;
  emit("confirm");
}
</script>

<template>
  <BdDialog
    :model-value="open"
    size="small"
    :title="title"
    @update:model-value="(value) => !value && cancel()"
  >
    <slot>{{ message }}</slot>

    <template #footer>
      <BdButton variant="border" @click="cancel">{{ cancelLabel }}</BdButton>
      <BdButton :variant="danger ? 'danger' : 'primary'" @click="confirm">
        {{ confirmLabel }}
      </BdButton>
    </template>
  </BdDialog>
</template>
