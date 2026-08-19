<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/**
 * Fill-track slider, dragged anywhere along the track rather than by a knob —
 * a fader, not a form range. Pointer events cover mouse, pen and touch with one
 * path, and the arrow keys move it by one `step`.
 *
 * Vertical mode fills the height it is given, so its length is the caller's
 * decision: a fixed height, a flex row, or a `cqh` expression under a
 * `container-type: size` ancestor.
 *
 * @example
 * <BdSlider v-model="volume" />
 * <BdSlider v-model="brushSize" orientation="vertical" :min="1" :max="200" />
 */
export interface BdSliderProps {
  /** Blocks interaction and dims the track. */
  disabled?: boolean;
  /** Highest value. @default 100 */
  max?: number;
  /** Lowest value. @default 0 */
  min?: number;
  /** Direction the fill grows in. Vertical grows upwards. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Granularity of a drag and of one arrow-key press. @default 1 */
  step?: number;
  /** Thickness of the track in px — its height when horizontal, its width when vertical. */
  thickness?: number;
}

const props = withDefaults(defineProps<BdSliderProps>(), {
  max: 100,
  min: 0,
  orientation: "horizontal",
  step: 1,
  thickness: undefined,
});

const model = defineModel<number>({ default: 0 });

const track = ref<HTMLElement>();
const vertical = computed(() => props.orientation === "vertical");
const ratio = computed(() => {
  const span = props.max - props.min;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (model.value - props.min) / span));
});

function commit(value: number): void {
  const stepped = Math.round(value / props.step) * props.step;
  const clamped = Math.min(props.max, Math.max(props.min, stepped));
  // Le pas peut être fractionnaire : on coupe la dérive du flottant.
  model.value = Number(clamped.toFixed(6));
}

function fromEvent(event: PointerEvent): void {
  const rect = track.value?.getBoundingClientRect();
  if (!rect) return;
  const part = vertical.value
    ? 1 - (event.clientY - rect.top) / rect.height
    : (event.clientX - rect.left) / rect.width;
  commit(props.min + part * (props.max - props.min));
}

function onKeydown(event: KeyboardEvent): void {
  if (props.disabled) return;
  const delta = { ArrowDown: -1, ArrowLeft: -1, ArrowRight: 1, ArrowUp: 1 }[event.key];
  if (delta === undefined) return;
  event.preventDefault();
  commit(model.value + delta * props.step);
}

function onPointerDown(event: PointerEvent): void {
  if (props.disabled) return;
  event.preventDefault();
  fromEvent(event);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", stop);
}

function onPointerMove(event: PointerEvent): void {
  event.preventDefault();
  fromEvent(event);
}

function stop(): void {
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", stop);
}

// Un pointeur relâché hors de la fenêtre laisserait les écouteurs en place.
onBeforeUnmount(stop);
</script>

<template>
  <div
    ref="track"
    :aria-disabled="disabled || undefined"
    :aria-valuemax="max"
    :aria-valuemin="min"
    :aria-valuenow="model"
    class="bd-slider"
    :class="{ 'bd-slider-vertical': vertical, 'is-disabled': disabled }"
    role="slider"
    :style="thickness ? { [vertical ? 'width' : 'height']: `${thickness}px` } : undefined"
    :tabindex="disabled ? undefined : 0"
    @keydown="onKeydown"
    @pointerdown="onPointerDown"
  >
    <div class="bd-slider-fill" :style="{ [vertical ? 'height' : 'width']: `${ratio * 100}%` }" />
  </div>
</template>

<style scoped>
.bd-slider {
  background-color: var(--bd-bg-darker);
  border-radius: var(--bd-radius-full);
  cursor: pointer;
  flex-shrink: 0;
  height: 0.9rem;
  position: relative;

  /* Un doigt qui glisse sur la piste règle la valeur, il ne fait pas défiler la page. */
  touch-action: none;
  width: 100%;

  &:focus-visible {
    outline: 2px solid var(--bd-primary);
    outline-offset: 2px;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.bd-slider-vertical {
  height: 100%;
  width: 1.8rem;
}

.bd-slider-fill {
  background-color: var(--bd-primary);
  border-radius: inherit;
  pointer-events: none;
  position: absolute;
}

.bd-slider:not(.bd-slider-vertical) .bd-slider-fill {
  bottom: 0;
  left: 0;
  top: 0;
}

.bd-slider-vertical .bd-slider-fill {
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
