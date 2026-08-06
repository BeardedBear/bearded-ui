<script setup lang="ts">
import { computed, inject } from "vue";

import type { BdSize } from "@/types";

import BdLoader from "@/components/BdLoader.vue";
import { bdSize } from "@/injection";

/**
 * Button, link or router-link depending on the props: pass `href` for an
 * `<a>`, `to` for a `<router-link>`, nothing for a `<button>`.
 *
 * Height comes from the `--bd-control-height*` tokens, so a button, a
 * BdButtonGroup and a BdDropdown trigger of the same size line up exactly,
 * whatever they contain (icon, spinner, text).
 *
 * @example
 * <BdButton variant="primary" @click="save">Save</BdButton>
 * <BdButton icon-only variant="border"><PhGear size="1.2em" /></BdButton>
 * <BdButton :to="{ name: 'home' }">Home</BdButton>
 */
export interface BdButtonProps {
  /** Content alignment inside the button. @default "center" */
  align?: "center" | "justify" | "left";
  /** Rendered tag. Auto-derived from `to` / `href` when left out. */
  as?: "a" | "button" | "router-link";
  /** Blocks interaction and dims the button. */
  disabled?: boolean;
  /** Stretches the button to the full width of its container. */
  full?: boolean;
  /** Renders an `<a>` pointing here. */
  href?: string;
  /** Square button sized on the control height — for a lone icon. */
  iconOnly?: boolean;
  /** Shows a spinner and blocks interaction, without dimming the button. */
  loading?: boolean;
  /**
   * Height of the control. Falls back to the size provided by an enclosing
   * BdButtonGroup or BdDropdown, then to `"default"`.
   */
  size?: BdSize;
  /** Only meaningful with `href`. `_blank` adds `rel="noopener"`. @default "_self" */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /** vue-router location. Resolves `<router-link>` globally, so vue-router stays optional. */
  to?: unknown;
  /** Native type of the `<button>`. @default "button" */
  type?: "button" | "reset" | "submit";
  /**
   * Visual style. `"danger"` is a solid red button, except with `iconOnly`
   * where the icon carries the red on a neutral background. @default "default"
   */
  variant?: "border" | "danger" | "default" | "nude" | "primary";
}

const props = withDefaults(defineProps<BdButtonProps>(), {
  align: "center",
  as: undefined,
  href: undefined,
  size: undefined,
  target: "_self",
  to: undefined,
  type: "button",
  variant: "default",
});

const inheritedSize = inject(bdSize, undefined);
const size = computed<BdSize>(() => props.size ?? inheritedSize?.value ?? "default");

const tag = computed(() => {
  if (props.as) return props.as;
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const attrs = computed<Record<string, unknown>>(() => {
  if (tag.value === "router-link") return { to: props.to };
  if (tag.value === "a") {
    return {
      href: props.href,
      rel: props.target === "_blank" ? "noopener" : undefined,
      target: props.target,
    };
  }
  return { disabled: props.disabled || props.loading, type: props.type };
});

// "default" emits no modifier class, so variant and size can't collide on it.
const classes = computed(() => [
  props.variant === "default" ? "" : `bd-button-${props.variant}`,
  size.value === "default" ? "" : `bd-button-${size.value}`,
  props.align === "center" ? "" : `bd-button-align-${props.align}`,
  { "bd-button-full": props.full, "bd-button-icon-only": props.iconOnly, "is-loading": props.loading },
]);
</script>

<template>
  <component :is="tag" class="bd-button bd-font-bold bd-squircle" :class="classes" v-bind="attrs">
    <BdLoader v-if="loading" :size="size === 'x-small' ? 'xx-small' : 'x-small'" />
    <slot />
  </component>
</template>

<style scoped>
.bd-button {
  align-items: center;
  appearance: none;
  background-color: var(--bd-bg-light);
  border: 0;
  border-radius: var(--bd-radius-lg);
  color: var(--bd-font-color-dark);
  cursor: pointer;
  display: inline-flex;

  /* Explicite : la hauteur ne doit pas dépendre de la font-size du contexte. */
  font-size: var(--bd-font-size-base);
  gap: var(--bd-space-2);

  /* Hauteur fixe : le contenu (icône, loader, texte) ne peut plus la faire varier. */
  height: var(--bd-control-height);
  justify-content: center;
  line-height: 1;
  padding: 0 var(--bd-space-4);
  text-align: center;
  text-decoration: none;
  transition:
    background-color var(--bd-transition-fast),
    color var(--bd-transition-fast),
    transform 0.1s ease;
  white-space: pre;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Pas d'opacity ici : le spinner porte déjà l'état, l'atténuer le rendrait illisible. */
  &.is-loading {
    cursor: progress;
  }

  &:hover:not(:disabled, .is-loading) {
    background-color: var(--bd-bg-lighter);
    color: var(--bd-font-color-light);
  }

  &:active:not(:disabled, .is-loading) {
    transform: scale(0.97);
  }

  /* Le spinner emprunte la couleur du bouton : lisible sur tous les variants. */
  &.is-loading :deep(.bd-loader) {
    border-color: transparent;
    border-top-color: currentcolor;
  }
}

/* Variants come after the base so equal specificity resolves in their favour. */
.bd-button-primary {
  background-color: var(--bd-primary);
  color: var(--bd-on-primary);

  &:hover:not(:disabled, .is-loading) {
    background-color: var(--bd-primary-light);
    color: var(--bd-on-primary);
  }
}

.bd-button-danger {
  background-color: var(--bd-danger);
  color: #fff;

  &:hover:not(:disabled, .is-loading) {
    background-color: color-mix(in srgb, var(--bd-danger) 85%, white);
    color: #fff;
  }

  /*
   * Icône seule : c'est l'icône qui porte le rouge, pas le fond. Une corbeille
   * dans une barre d'actions se répète à chaque ligne — un aplat plein à chaque
   * fois crie plus fort que l'action ne le mérite, et la forme de l'icône suffit
   * à la nommer. Un bouton danger avec texte, lui, est une décision finale
   * (confirmation, destruction en masse) : il garde son aplat.
   * Le fond reste celui d'un bouton neutre, jamais `transparent` : ces boutons
   * flottent souvent au-dessus d'un contenu qui passerait par-dessous.
   */
  &.bd-button-icon-only {
    background-color: var(--bd-bg-light);
    color: var(--bd-danger);

    &:hover:not(:disabled, .is-loading) {
      background-color: color-mix(in oklab, var(--bd-danger) 15%, var(--bd-bg-lighter));
      color: var(--bd-danger);
    }
  }
}

.bd-button-border {
  background-color: transparent;
  border: 1px solid var(--bd-border-color);
  color: var(--bd-font-color);
}

.bd-button-nude {
  background-color: transparent;
  color: var(--bd-font-color);
  opacity: 0.5;
  padding: 0 var(--bd-space-3);

  &:hover:not(:disabled, .is-loading) {
    background-color: transparent;
    opacity: 1;
  }
}

.bd-button-big {
  height: var(--bd-control-height-big);
  padding: 0 var(--bd-space-5);
}

.bd-button-small {
  font-size: var(--bd-font-size-sm);
  height: var(--bd-control-height-small);
  padding: 0 var(--bd-space-3);
}

.bd-button-x-small {
  font-size: var(--bd-font-size-sm);
  height: var(--bd-control-height-x-small);
  padding: 0 var(--bd-space-2);
}

/* Carré : la largeur suit la hauteur du contrôle, quelle que soit l'icône. */
.bd-button-icon-only {
  aspect-ratio: 1;
  padding: 0;
}

.bd-button-full {
  width: 100%;
}

.bd-button-align-left {
  justify-content: flex-start;
  text-align: left;
}

.bd-button-align-justify {
  justify-content: space-between;
}
</style>
