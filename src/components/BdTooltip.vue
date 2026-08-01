<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId } from "vue";

import { anchor, type BdSide, rafThrottle, useViewportTracker } from "@/composables/useAnchor";

/** Axes along which the tooltip tracks the cursor instead of the trigger. */
export type BdTooltipFollow = "both" | "x" | "y";

/**
 * Tooltip on the default slot. Opens on hover and on keyboard focus, closes on
 * Escape. Built on the Popover API with `popover="manual"`: top layer, without
 * stealing focus or swallowing clicks.
 *
 * Width follows the content up to 20rem then wraps, the side flips when space
 * runs out, and the arrow keeps pointing at the trigger even once the panel
 * has been nudged back inside the viewport.
 *
 * @example
 * <BdTooltip content="Delete permanently">
 *   <BdButton icon-only><PhTrash size="1.2em" /></BdButton>
 * </BdTooltip>
 */
export interface BdTooltipProps {
  /** Tooltip text. Use the `content` slot for markup. An empty tooltip never opens. */
  content?: string;
  /** Never opens the tooltip. */
  disabled?: boolean;
  /** Delay before opening, in ms. Closing is always immediate. @default 150 */
  delay?: number;
  /** Track the cursor instead of staying anchored to the trigger. The axis left out stays pinned to the trigger. Off by default. */
  follow?: BdTooltipFollow;
  /** Gap between trigger and tooltip, in px. @default 8 */
  offset?: number;
  /** Preferred side. Flips to the opposite one on its own when space runs out. @default "top" */
  side?: BdSide;
}

const props = withDefaults(defineProps<BdTooltipProps>(), {
  content: "",
  delay: 150,
  follow: undefined,
  offset: 8,
  side: "top",
});

const triggerEl = ref<HTMLElement>();
const panelEl = ref<HTMLElement>();
const tooltipId = useId();
const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

/** Minimum gap between the arrow and a corner of the panel, in px. */
const ARROW_INSET = 12;

const pointer = { x: 0, y: 0 };

/**
 * Rect to aim at: the trigger's, with the axes listed in `follow` swapped for
 * the cursor position — zero width/height there, so centred alignment lands
 * exactly on the pointer.
 */
function targetRect(trigger: HTMLElement): DOMRect {
  const t = trigger.getBoundingClientRect();
  if (!props.follow) return t;

  const followX = props.follow !== "y";
  const followY = props.follow !== "x";

  return new DOMRect(
    followX ? pointer.x : t.left,
    followY ? pointer.y : t.top,
    followX ? 0 : t.width,
    followY ? 0 : t.height,
  );
}

function place(): void {
  const panel = panelEl.value;
  const trigger = triggerEl.value;
  if (!panel || !trigger) return;

  const target = targetRect(trigger);
  const { left, placement, top } = anchor(target, panel, {
    align: "center",
    offset: props.offset,
    side: props.side,
  });

  /*
   * Le panneau a pu être recalé dans le viewport : la flèche vise le centre du
   * trigger, pas celui du panneau, sinon elle ne pointe plus rien. On part des
   * coordonnées retournées et de offsetWidth/Height — un rect mesuré ici serait
   * celui de l'animation d'entrée, encore à l'échelle.
   */
  const vertical = placement === "top" || placement === "bottom";
  const center = vertical
    ? target.left + target.width / 2 - left
    : target.top + target.height / 2 - top;
  const size = vertical ? panel.offsetWidth : panel.offsetHeight;

  panel.style.setProperty("--arrow-offset", `${Math.min(Math.max(center, ARROW_INSET), size - ARROW_INSET)}px`);
}

const tracker = useViewportTracker(place);
const replace = rafThrottle(place);

function onPointerMove(event: MouseEvent): void {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  if (props.follow && visible.value) replace();
}

async function show(): Promise<void> {
  const panel = panelEl.value;
  if (!panel || props.disabled || (!props.content && !panel.textContent?.trim())) return;

  visible.value = true;
  // popover="manual" : top layer sans light-dismiss, un tooltip ne vole pas le focus.
  if (!panel.matches(":popover-open")) panel.showPopover();
  await nextTick();
  place();
  tracker.start();
}

function hide(): void {
  clearTimeout(timer);
  const panel = panelEl.value;
  visible.value = false;
  if (panel?.matches(":popover-open")) panel.hidePopover();
  tracker.stop();
}

// `Event` et pas `MouseEvent` : appelé aussi par focusin, qui n'a pas de coordonnées.
function scheduleShow(event?: Event): void {
  // Sans ça, un tooltip suiveur ouvert sans mousemove préalable viserait 0,0.
  if (event instanceof MouseEvent) onPointerMove(event);
  clearTimeout(timer);
  timer = setTimeout(show, props.delay);
}

onBeforeUnmount(() => {
  clearTimeout(timer);
  tracker.stop();
});
</script>

<template>
  <span
    ref="triggerEl"
    :aria-describedby="visible ? tooltipId : undefined"
    class="bd-tooltip-trigger"
    @focusin="scheduleShow"
    @focusout="hide"
    @keydown.escape="hide"
    @mouseenter="scheduleShow"
    @mouseleave="hide"
    @mousemove="onPointerMove"
  >
    <slot />

    <div :id="tooltipId" ref="panelEl" class="bd-tooltip bd-squircle bd-anim-popover" popover="manual" role="tooltip">
      <slot name="content">{{ content }}</slot>
    </div>
  </span>
</template>

<style scoped>
/* Pas display:contents : sans box, getBoundingClientRect renverrait un rect vide. */
.bd-tooltip-trigger {
  display: inline-flex;
}

.bd-tooltip {
  background-color: var(--bd-bg-lighter);
  border: 0;
  border-radius: var(--bd-radius-sm);
  box-shadow: var(--bd-shadow-md);
  color: var(--bd-font-color-light);
  font-size: var(--bd-font-size-sm);
  inset: auto; /* neutralise le centrage par défaut du popover */
  line-height: var(--bd-line-height);

  /* S'adapte au contenu : court = étroit, long = wrap plutôt que déborder. */
  margin: 0;
  max-width: min(20rem, calc(100vw - var(--bd-space-6)));

  /* La UA met overflow:auto sur [popover] : la flèche, hors du panneau, y déclenchait une scrollbar. */
  overflow: visible;
  padding: var(--bd-space-2) var(--bd-space-3);

  /* Un tooltip ne capture jamais la souris — surtout en mode suiveur, où il
     passerait sous le curseur et déclencherait un mouseleave du trigger. */
  pointer-events: none;
  position: fixed;
  width: max-content;

  &:not(:popover-open) {
    display: none;
  }
}

/* Flèche : carré tourné, ancré au bord opposé au panneau. */
.bd-tooltip::after {
  background-color: inherit;
  content: "";
  height: 0.5rem;
  position: absolute;
  rotate: 45deg;
  width: 0.5rem;
}

.bd-tooltip[data-placement="top"]::after {
  bottom: -0.2rem;
  left: var(--arrow-offset, 50%);
  translate: -50% 0;
}

.bd-tooltip[data-placement="bottom"]::after {
  left: var(--arrow-offset, 50%);
  top: -0.2rem;
  translate: -50% 0;
}

.bd-tooltip[data-placement="left"]::after {
  right: -0.2rem;
  top: var(--arrow-offset, 50%);
  translate: 0 -50%;
}

.bd-tooltip[data-placement="right"]::after {
  left: -0.2rem;
  top: var(--arrow-offset, 50%);
  translate: 0 -50%;
}
</style>
