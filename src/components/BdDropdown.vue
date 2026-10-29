<script setup lang="ts">
import { PhCaretDown } from "@phosphor-icons/vue";
import { nextTick, onBeforeUnmount, provide, ref, toRef, useId, watch } from "vue";

import type { BdSize } from "@/types";

import BdButton from "@/components/BdButton.vue";
import BdInput from "@/components/BdInput.vue";
import { anchor, type BdAlign, type BdSide, useViewportTracker } from "@/composables/useAnchor";
import { bdDropdownClose, bdSize } from "@/injection";

/** Side the panel opens on, plus how it aligns with the trigger on the cross axis. */
export type BdDropdownPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

/**
 * Dropdown menu anchored to its trigger, built on the Popover API: it lives in
 * the top layer (never clipped by an `overflow` or a `z-index`) and closes on
 * outside click and Escape without any custom listener.
 *
 * The panel flips above the trigger when space runs out below, is nudged back
 * inside the viewport, caps its height to the room left, and follows scrolling.
 * Below 768px it becomes a bottom sheet. Arrow keys move between items.
 *
 * @example
 * <BdDropdown label="Actions">
 *   <BdDropdownItem :icon="PhPencilSimple" @click="rename">Rename</BdDropdownItem>
 *   <BdDropdownItem danger :icon="PhTrash" @click="remove">Delete</BdDropdownItem>
 * </BdDropdown>
 */
export interface BdDropdownProps {
  /** Blocks opening and disables the default trigger. */
  disabled?: boolean;
  /** Text of the default trigger button. Ignored when the `trigger` slot is used. @default "Menu" */
  label?: string;
  /** Panel is at least as wide as the trigger — for select-like menus. */
  matchWidth?: boolean;
  /** Gap between trigger and panel, in px. @default 6 */
  offset?: number;
  /** Preferred placement. Flips to the opposite side on its own when space runs out. @default "bottom-start" */
  placement?: BdDropdownPlacement;
  /**
   * Adds a field on top of the panel that hides the items whose text doesn't
   * match, ignoring case and accents — for long lists. Enter picks the first match.
   */
  searchable?: boolean;
  /** Below 768px, turns the panel into a sheet pinned to the bottom of the screen. @default true */
  sheetOnMobile?: boolean;
  /**
   * Height of the default trigger, on the same scale as BdButton. Inherited by
   * buttons in the `trigger` slot.
   * @default "default"
   */
  size?: BdSize;
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
const searchEl = ref<InstanceType<typeof BdInput>>();
const query = ref("");
const matches = ref(0);

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

function close(): void {
  open.value = false;
}

const fold = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();

// ponytail: filters the rendered DOM by textContent, since items are free slot
// content. Fine for a few hundred entries; virtualise if a list ever gets huge.
function filter(): void {
  const needle = fold(query.value.trim());
  const items = panelEl.value?.querySelectorAll<HTMLElement>(".bd-dropdown-item") ?? [];
  let count = 0;
  for (const item of items) {
    const match = fold(item.textContent ?? "").includes(needle);
    item.style.display = match ? "" : "none";
    if (match) count++;
  }
  matches.value = count;
}

/** Arrow keys move between items, without trapping focus inside free-form content. */
function onKeydown(event: KeyboardEvent): void {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

  const items = visibleItems();
  if (items.length === 0) return;

  event.preventDefault();
  const current = items.indexOf(document.activeElement as HTMLElement);
  const next = event.key === "ArrowDown" ? current + 1 : current - 1;
  items[(next + items.length) % items.length]?.focus();
}

function onSearchEnter(): void {
  visibleItems()[0]?.click();
}

function toggle(): void {
  if (!props.disabled) open.value = !open.value;
}

/** Items still shown by the search, in DOM order. */
function visibleItems(): HTMLElement[] {
  const items = panelEl.value?.querySelectorAll<HTMLElement>(".bd-dropdown-item:not(:disabled)") ?? [];
  return [...items].filter((item) => item.style.display !== "none");
}

watch(open, async (value) => {
  const panel = panelEl.value;
  if (!panel) return;

  if (value) {
    if (!panel.matches(":popover-open")) panel.showPopover();
    await nextTick();
    place();
    tracker.start();
    if (props.searchable) {
      query.value = "";
      filter();
      searchEl.value?.focus();
    }
  } else {
    if (panel.matches(":popover-open")) panel.hidePopover();
    tracker.stop();
  }
});

watch(query, filter);

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
      <div v-if="searchable" class="bd-dropdown-search">
        <BdInput
          ref="searchEl"
          v-model="query"
          aria-label="Search"
          autocomplete="off"
          placeholder="Search…"
          size="small"
          type="search"
          @keydown.enter.prevent="onSearchEnter"
        />
      </div>
      <slot :close="close" />
      <p v-if="searchable && query && !matches" class="bd-dropdown-empty">No results</p>
    </div>
  </div>
</template>

<style scoped>
/*
 * `inline-flex`, not `inline-block`: the trigger inside is an inline-level box,
 * so a block container laid it out on a line and left descender space beneath
 * it. The wrapper then measured taller than its own trigger, and an avatar or
 * button placed in a centred flex row sat visibly off-centre. As a flex parent
 * there is no line box, so the wrapper is exactly as tall as what it holds.
 */
.bd-dropdown {
  display: inline-flex;
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

/* Reste visible pendant le défilement ; la marge négative recouvre le padding du panel. */
.bd-dropdown-search {
  background-color: inherit;
  margin: calc(var(--bd-space-2) * -1) calc(var(--bd-space-2) * -1) 0;
  padding: var(--bd-space-2);
  position: sticky;
  top: calc(var(--bd-space-2) * -1);
  z-index: 1;
}

.bd-dropdown-empty {
  color: var(--bd-font-color-light);
  font-size: var(--bd-font-size-sm);
  margin: 0;
  padding: var(--bd-space-2) var(--bd-space-3);
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
