<script setup lang="ts">
import { computed } from "vue";

export interface BdButtonProps {
  align?: "center" | "justify" | "left";
  /** Rendered tag. Auto-derived from `to` / `href` when left out. */
  as?: "a" | "button" | "router-link";
  disabled?: boolean;
  full?: boolean;
  href?: string;
  iconOnly?: boolean;
  loading?: boolean;
  size?: "big" | "default" | "small" | "x-small";
  target?: "_blank" | "_parent" | "_self" | "_top";
  /** vue-router location. Resolves <router-link> globally, so vue-router stays optional. */
  to?: unknown;
  type?: "button" | "reset" | "submit";
  variant?: "border" | "danger" | "default" | "nude" | "primary";
}

const props = withDefaults(defineProps<BdButtonProps>(), {
  align: "center",
  as: undefined,
  href: undefined,
  size: "default",
  target: "_self",
  to: undefined,
  type: "button",
  variant: "default",
});

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
  props.size === "default" ? "" : `bd-button-${props.size}`,
  props.align === "center" ? "" : `bd-button-align-${props.align}`,
  { "bd-button-full": props.full, "bd-button-icon-only": props.iconOnly, "is-loading": props.loading },
]);
</script>

<template>
  <component :is="tag" class="bd-button bd-font-bold bd-squircle" :class="classes" v-bind="attrs">
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
  gap: var(--bd-space-2);
  justify-content: center;
  line-height: 1;
  padding: 0.6rem 1rem;
  text-align: center;
  text-decoration: none;
  transition:
    background-color var(--bd-transition-fast),
    color var(--bd-transition-fast),
    transform 0.1s ease;
  white-space: pre;

  &:disabled,
  &.is-loading {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled, .is-loading) {
    background-color: var(--bd-bg-lighter);
    color: var(--bd-font-color-light);
  }

  &:active:not(:disabled, .is-loading) {
    transform: scale(0.97);
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
  padding: var(--bd-space-2) var(--bd-space-3);

  &:hover:not(:disabled, .is-loading) {
    background-color: transparent;
    opacity: 1;
  }
}

.bd-button-big {
  font-size: var(--bd-font-size-base);
  padding: 0.75rem 1.2rem;
}

.bd-button-small {
  font-size: var(--bd-font-size-sm);
  padding: 0.5rem 0.6rem;
}

.bd-button-x-small {
  font-size: var(--bd-font-size-sm);
  padding: 0.1rem 0.5rem;
}

.bd-button-icon-only {
  aspect-ratio: 1;
  padding: 0.6rem;

  &.bd-button-small {
    padding: 0.5rem;
  }

  &.bd-button-x-small {
    padding: 0.25rem;
  }
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
