<script setup lang="ts">
import { PhCaretDown } from "@phosphor-icons/vue";
import { nextTick, onBeforeUnmount, provide, ref, toRef, useId, watch } from "vue";

import BdButton from "@/components/BdButton.vue";
import { type BdAlign, anchor, type BdSide, useViewportTracker } from "@/composables/useAnchor";
import { bdDropdownClose, bdSize } from "@/injection";
import type { BdSize } from "@/types";

export type BdDropdownPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

export interface BdDropdownProps {
  disabled?: boolean;
  /** Le panneau fait au moins la largeur du trigger (menus de type select). */
  matchWidth?: boolean;
  /** Écart entre le trigger et le panneau, en px. */
  offset?: number;
  /** Placement souhaité : il bascule tout seul s'il manque la place. */
  placement?: BdDropdownPlacement;
  /** En dessous de 768px, le panneau devient une feuille collée en bas. */
  sheetOnMobile?: boolean;
  /** Même échelle que BdButton : le trigger fait exactement la taille d'un bouton. */
  size?: BdSize;
  label?: string;
}

const props = withDefaults(defineProps<BdDropdownProps>(), {
  label: "Menu",
  offset: 6,
  placement: "bottom-start",
  sheetOnMobile: true,
  size: "default",
});

const open = defineModel<boolean>({ default: false });

const triggerEl = ref<HTMLElement>();
const panelEl = ref<HTMLElement>();
const panelId = useId();

const MOBILE_WIDTH = 767;

function isSheet(): boolean {
  return props.sheetOnMobile && window.innerWidth <= MOBILE_WIDTH;
}

function place(): void {
  const panel = panelEl.value;
  const trigger = triggerEl.value;
  if (!panel || !trigger) return;

  if (isSheet()) {
    // Le CSS pilote la feuille : on retire tout ce que le JS avait posé.
    panel.style.cssText = "";
    panel.dataset.placement = "sheet";
    return;
  }

  const [side, align] = props.placement.split("-") as [BdSide, BdAlign];
  anchor(trigger, panel, {
    align,
    constrain: true,
    matchWidth: props.matchWidth,
    offset: props.offset,
    side,
  });
}

const tracker = useViewportTracker(place);

function toggle(): void {
  if (!props.disabled) open.value = !open.value;
}

function close(): void {
  open.value = false;
}

/** Flèches : navigation entre les items, sans piéger le focus d'un contenu libre. */
function onKeydown(event: KeyboardEvent): void {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

  const items = [...(panelEl.value?.querySelectorAll<HTMLElement>(".bd-dropdown-item:not(:disabled)") ?? [])];
  if (items.length === 0) return;

  event.preventDefault();
  const current = items.indexOf(document.activeElement as HTMLElement);
  const next = event.key === "ArrowDown" ? current + 1 : current - 1;
  items[(next + items.length) % items.length]?.focus();
}

watch(open, async (value) => {
  const panel = panelEl.value;
  if (!panel) return;

  if (value) {
    if (!panel.matches(":popover-open")) panel.showPopover();
    await nextTick();
    place();
    tracker.start();
  } else {
    if (panel.matches(":popover-open")) panel.hidePopover();
    tracker.stop();
  }
});

onBeforeUnmount(tracker.stop);

provide(bdDropdownClose, close);
// Un trigger custom hérite de la taille sans avoir à la répéter sur son bouton.
provide(bdSize, toRef(props, "size"));
</script>

<template>
  <div class="bd-dropdown">
    <span
      ref="triggerEl"
      :aria-controls="panelId"
      :aria-expanded="open"
      aria-haspopup="menu"
      class="bd-dropdown-trigger"
      @click="toggle"
    >
      <slot name="trigger" :open="open" :toggle="toggle">
        <BdButton :disabled="disabled">
          {{ label }}
          <PhCaretDown class="bd-dropdown-caret" size="1.1em" weight="bold" />
        </BdButton>
      </slot>
    </span>

    <!-- popover="auto" : top layer, fermeture au clic extérieur et à Échap, sans JS. -->
    <div
      :id="panelId"
      ref="panelEl"
      class="bd-dropdown-panel bd-surface bd-squircle bd-anim-popover"
      :class="{ 'bd-anim-popover-sheet': sheetOnMobile }"
      popover="auto"
      role="menu"
      @keydown="onKeydown"
      @toggle="open = ($event as ToggleEvent).newState === 'open'"
    >
      <slot :close="close" />
    </div>
  </div>
</template>

<style scoped>
.bd-dropdown {
  display: inline-block;
  position: relative;
}

.bd-dropdown-trigger {
  display: inline-flex;
}

.bd-dropdown-caret {
  transition: transform var(--bd-transition);

  [aria-expanded="true"] & {
    transform: rotate(180deg);
  }
}

/* Fond, bordure et couleur viennent de .bd-surface (styles/utilities.css). */
.bd-dropdown-panel {
  border-radius: var(--bd-radius-lg);
  box-shadow: var(--bd-shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--bd-space-1);
  inset: auto; /* neutralise le centrage par défaut du popover */
  margin: 0;
  min-width: 10rem;
  overflow-y: auto;
  padding: var(--bd-space-2);
  position: fixed;

  &:not(:popover-open) {
    display: none;
  }
}

/* Bottom sheet : les coordonnées JS sont effacées, le CSS reprend la main. */
@media (width <= 767px) {
  .bd-dropdown-panel[data-placement="sheet"] {
    border-end-end-radius: 0;
    border-end-start-radius: 0;
    bottom: 0;
    left: 0;
    max-height: 70vh;
    right: 0;
    top: auto;
    width: 100%;
  }
}
</style>
