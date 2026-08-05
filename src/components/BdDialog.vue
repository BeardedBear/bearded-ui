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
 *
 * @example
 * <!-- Media viewer: the picture sets the size, the viewport caps it -->
 * <BdDialog v-model="open" size="fit" padding="none">
 *   <img :src="src" style="max-width: 100%; max-height: 100%" />
 * </BdDialog>
 */
export interface BdDialogProps {
  /**
   * Inner spacing. `none` is for dialogs holding their own layout — their
   * header and footer then run edge to edge. @default "default"
   */
  padding?: "default" | "none" | "small";
  /**
   * Width preset. `full` fills the viewport, for app-shell dialogs; `fit`
   * shrinks to the content and lets it decide, for media viewers.
   * @default "default"
   */
  size?: "big" | "default" | "fit" | "full" | "small";
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
/*
 * Centrage posé en toutes lettres plutôt que laissé à la feuille de l'agent
 * utilisateur : `inset: 0` + `margin: auto` sur une boîte de taille connue.
 * Le `position` du UA ne vaut que pour `dialog:modal` — une dialog ouverte
 * autrement se retrouverait sinon collée en haut à gauche.
 *
 * Tout est ici et non sous `[open]` : l'attribut tombe dès la fermeture alors
 * que l'animation de sortie tourne encore, et la dialog sauterait à sa position
 * par défaut le temps du fondu.
 */
.bd-dialog {
  border-radius: var(--bd-radius-lg);
  box-shadow: var(--bd-shadow-lg);
  flex-direction: column;
  inset: 0;
  margin: auto;
  max-height: 90vh;
  /* Garde-fou seulement : c'est `width` qui porte la taille, pour qu'une appli
     puisse imposer la sienne sans buter contre un plafond. */
  max-width: 90vw;
  overflow: hidden;
  padding: var(--bd-space-5);
  position: fixed;
  width: min(90vw, 32rem);

  &::backdrop {
    backdrop-filter: blur(2px);
    background-color: var(--bd-overlay-color);
  }
}

/*
 * Seul `display` reste conditionné : c'est lui qui doit repasser à `none` en
 * fin d'animation, et sans `[open]` il écraserait le `display: none` que
 * l'agent utilisateur pose sur une dialog fermée.
 */
.bd-dialog[open] {
  display: flex;
}

/*
 * Chaque palier impose une largeur, sinon le `width: fit-content` de l'agent
 * utilisateur ferait respirer la dialog au gré de son contenu — une coque de
 * réglages changerait de taille d'un onglet à l'autre. Un `width` posé sur la
 * balise reste prioritaire pour les cas particuliers.
 */
.bd-dialog-small {
  width: min(90vw, 24rem);
}

.bd-dialog-big {
  width: min(90vw, 56rem);
}

.bd-dialog-full {
  height: 95vh;
  max-height: 95vh;
  max-width: 95vw;
  width: 95vw;
}

/*
 * Visionneuse : la dialog épouse son contenu et l'écran tranche. Une image
 * portrait butera sur la hauteur et une paysage sur la largeur, sans que
 * personne ait à mesurer quoi que ce soit — au contenu de porter ses
 * `max-width: 100%` / `max-height: 100%`.
 */
.bd-dialog-fit {
  height: fit-content;
  max-height: 95vh;
  max-width: 95vw;
  width: fit-content;
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

/*
 * Mode coque : la dialog ne pose plus rien et l'application fournit sa propre
 * mise en page. Les marges des slots feraient un blanc parasite contre les
 * bords, le pied cède sa disposition à la barre qu'on lui donne, et le corps
 * devient une colonne pour qu'un contenu en `flex: 1` remplisse la hauteur
 * restante au lieu de flotter en haut.
 */
.bd-dialog-padding-none {
  & .bd-dialog-header {
    margin-bottom: 0;
  }

  & .bd-dialog-body {
    display: flex;
    flex-direction: column;
  }

  & .bd-dialog-footer {
    display: block;
    margin-top: 0;
  }
}
</style>
