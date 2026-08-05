<script setup lang="ts">
import { PhX } from "@phosphor-icons/vue";
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
 * <!-- App shell: body flush to the edges, chrome keeps its own padding -->
 * <BdDialog v-model="open" size="big" padding="none" title="Settings" subtitle="me@example.com">
 *   <template #actions><BdButton variant="nude" icon-only><PhGear /></BdButton></template>
 *   <MyLayout />
 * </BdDialog>
 *
 * @example
 * <!-- Media viewer: the picture sets the size, the viewport caps it -->
 * <BdDialog v-model="open" size="fit" padding="none" :title="filename">
 *   <img :src="src" style="max-width: 100%; max-height: 100%" />
 * </BdDialog>
 */
export interface BdDialogProps {
  /** Hides the close button. Escape still closes — this only removes the cross. */
  hideClose?: boolean;
  /**
   * Body spacing; the header and footer always keep their own. `none` is for a
   * body that runs edge to edge: a form, a picture, an iframe.
   * @default "default"
   */
  padding?: "default" | "none" | "small";
  /**
   * Width preset. `full` fills the viewport, for app-shell dialogs; `fit`
   * shrinks to the content and lets it decide, for media viewers.
   * @default "default"
   */
  size?: "big" | "default" | "fit" | "full" | "small";
  /** Secondary line under the title, truncated when too long. */
  subtitle?: string;
  /** Heading text. Use the `header` slot to replace the whole heading. */
  title?: string;
}

const props = withDefaults(defineProps<BdDialogProps>(), {
  hideClose: false,
  padding: "default",
  size: "default",
  subtitle: undefined,
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
    <header v-if="title || subtitle || $slots.header || $slots.actions || !hideClose" class="bd-dialog-header">
      <slot name="header">
        <div class="bd-dialog-heading">
          <h2 v-if="title" class="bd-dialog-title">{{ title }}</h2>
          <!--
            `title` natif plutôt qu'une infobulle maison : la dialog vit dans le
            top layer, où un popper téléporté sur `body` passerait derrière.
          -->
          <p v-if="subtitle" class="bd-dialog-subtitle" :title="subtitle">{{ subtitle }}</p>
        </div>
      </slot>

      <div v-if="$slots.actions || !hideClose" class="bd-dialog-actions">
        <slot name="actions" />
        <button
          v-if="!hideClose"
          aria-label="Close"
          class="bd-dialog-close"
          type="button"
          @click="open = false"
        >
          <PhX aria-hidden="true" size="1em" weight="bold" />
        </button>
      </div>
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

.bd-dialog-padding-none {
  padding: 0;
}

.bd-dialog-padding-small {
  padding: var(--bd-space-3);
}

.bd-dialog-header {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: var(--bd-space-4);
  justify-content: space-between;
  margin-bottom: var(--bd-space-4);
}

/* `min-width: 0` : sans lui l'ellipse du sous-titre ne se déclenche jamais. */
.bd-dialog-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.bd-dialog-title {
  margin: 0;
}

.bd-dialog-subtitle {
  color: var(--bd-font-color-dark);
  font-size: var(--bd-font-size-sm);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bd-dialog-actions {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: var(--bd-space-1);
}

.bd-dialog-close {
  align-items: center;
  background-color: #0000;
  border: 0;
  border-radius: var(--bd-radius-sm);
  color: var(--bd-font-color-dark);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: var(--bd-space-1);
  transition: background-color var(--bd-transition-fast), color var(--bd-transition-fast);

  &:hover {
    background-color: var(--bd-danger);
    color: #fff;
  }
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
 * Corps plein-bord : la coque ne pose plus de padding, mais l'en-tête et le
 * pied restent du chrome — ils reprennent le leur et se séparent du contenu
 * par un filet, sinon titre et boutons colleraient aux bords.
 */
.bd-dialog-padding-none {
  & .bd-dialog-header {
    border-bottom: 1px solid var(--bd-border-color);
    margin-bottom: 0;
    padding: var(--bd-space-2) var(--bd-space-3);
  }

  & .bd-dialog-body {
    display: flex;
    flex-direction: column;
  }

  & .bd-dialog-footer {
    border-top: 1px solid var(--bd-border-color);
    margin-top: 0;
    padding: var(--bd-space-2) var(--bd-space-3);
  }
}
</style>
