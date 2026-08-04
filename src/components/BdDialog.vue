<script setup lang="ts">
import { ref, watch } from "vue";

/**
 * Modal built on the native `<dialog>`: focus trap, Escape and inert backdrop
 * come free. Opening and closing are animated by the `.bd-anim-dialog` preset.
 *
 * The dialog never grows past the viewport: header and footer stay put and the
 * body scrolls on its own.
 *
 * @example
 * <BdDialog v-model="open" title="Delete this?">
 *   <p>This cannot be undone.</p>
 *   <template #footer>
 *     <BdButton variant="danger" @click="remove">Delete</BdButton>
 *   </template>
 * </BdDialog>
 *
 * @example
 * <!-- App shell: full-bleed header and footer of your own -->
 * <BdDialog v-model="open" size="big" padding="none">
 *   <template #header><MyToolbar /></template>
 *   <MyLayout />
 * </BdDialog>
 */
export interface BdDialogProps {
  /**
   * Inner spacing. `none` is for dialogs holding their own layout — their
   * header and footer then run edge to edge. @default "default"
   */
  padding?: "default" | "none" | "small";
  /** Max width. `full` fills the viewport, for app-shell dialogs. @default "default" */
  size?: "big" | "default" | "full" | "small";
  /** Heading text. Use the `header` slot for markup. */
  title?: string;
}

const props = withDefaults(defineProps<BdDialogProps>(), {
  padding: "default",
  size: "default",
  title: undefined,
});

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
  <dialog
    ref="el"
    class="bd-dialog bd-surface bd-squircle bd-anim-dialog"
    :class="[
      props.size === 'default' ? '' : `bd-dialog-${props.size}`,
      props.padding === 'default' ? '' : `bd-dialog-padding-${props.padding}`,
    ]"
    @close="open = false"
  >
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
  max-height: 90vh;
  max-width: min(90vw, 32rem);
  overflow: hidden;
  padding: var(--bd-space-5);

  &::backdrop {
    backdrop-filter: blur(2px);
    background-color: var(--bd-overlay-color);
  }
}

/*
 * `[open]` obligatoire : sans lui, ce `display` écraserait le `display: none`
 * que l'agent utilisateur pose sur une dialog fermée.
 */
/*
 * Centrage posé en toutes lettres plutôt que laissé à la feuille de l'agent
 * utilisateur : `inset: 0` + `margin: auto` sur une boîte de taille connue.
 * Le `position` du UA ne vaut que pour `dialog:modal` — une dialog ouverte
 * autrement se retrouverait sinon collée en haut à gauche.
 */
.bd-dialog[open] {
  display: flex;
  flex-direction: column;
  inset: 0;
  margin: auto;
  position: fixed;
}

.bd-dialog-small {
  max-width: min(90vw, 24rem);
}

/*
 * `big` et `full` sont des coques d'application : largeur imposée, sinon le
 * `width: fit-content` de l'agent utilisateur les ferait respirer au gré du
 * contenu, d'un onglet à l'autre. `small` et `default` gardent fit-content,
 * une dialog de confirmation n'a pas à être large parce qu'elle est courte.
 */
.bd-dialog-big {
  width: min(90vw, 56rem);
}

.bd-dialog-full {
  height: 95vh;
  max-height: 95vh;
  max-width: 95vw;
  width: 95vw;
}

/* En-tête et pied portent alors leur propre padding, d'un bord à l'autre. */
.bd-dialog-padding-none {
  padding: 0;
}

.bd-dialog-padding-small {
  padding: var(--bd-space-3);
}

.bd-dialog-title {
  margin: 0;
}

.bd-dialog-header {
  flex-shrink: 0;
  margin-bottom: var(--bd-space-4);
}

/* Seul le corps défile : la dialog ne dépasse jamais du viewport. */
.bd-dialog-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.bd-dialog-footer {
  display: flex;
  flex-shrink: 0;
  gap: var(--bd-space-2);
  justify-content: flex-end;
  margin-top: var(--bd-space-5);
}

/* Sans padding sur la coque, les marges des slots créeraient un blanc parasite. */
.bd-dialog-padding-none {
  & .bd-dialog-header {
    margin-bottom: 0;
  }

  & .bd-dialog-footer {
    margin-top: 0;
  }
}
</style>
