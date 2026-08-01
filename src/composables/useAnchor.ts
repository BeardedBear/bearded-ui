/** Side of the trigger a panel is placed on. */
export type BdSide = "bottom" | "left" | "right" | "top";

/** How a panel lines up with its trigger on the cross axis. */
export type BdAlign = "center" | "end" | "start";

/** An element, or a free-standing rect — a point tracking the cursor, say. */
export type BdAnchorTarget = DOMRectReadOnly | HTMLElement;

export interface BdAnchorResult {
  /** Viewport x written to the panel, in px. */
  left: number;
  /** Side actually used, which may differ from the requested one after a flip. */
  placement: BdSide;
  /** Viewport y written to the panel, in px. */
  top: number;
}

export interface BdAnchorOptions {
  /** Cross-axis alignment against the trigger. @default "start" */
  align?: BdAlign;
  /** Caps the panel to the space left on the chosen side, so it scrolls instead of overflowing. */
  constrain?: boolean;
  /** Panel is at least as wide as the trigger. */
  matchWidth?: boolean;
  /** Gap between trigger and panel, in px. @default 6 */
  offset?: number;
  /** Preferred side, flipped when space runs out. @default "bottom" */
  side?: BdSide;
}

const VIEWPORT_MARGIN = 8;
const MIN_SIZE = 120;

const OPPOSITE: Record<BdSide, BdSide> = {
  bottom: "top",
  left: "right",
  right: "left",
  top: "bottom",
};

/**
 * Places a top-layer panel (hence `position: fixed`) against its trigger:
 * flips to the opposite side when space runs out, keeps the panel inside the
 * viewport on the cross axis, and writes the chosen side to `data-placement`
 * so CSS can react to it. Shared by BdDropdown and BdTooltip.
 *
 * The panel is measured with `offsetWidth`/`offsetHeight` rather than a rect,
 * so an entrance animation in progress (which scales the panel) doesn't skew
 * the result.
 *
 * @param trigger Element to anchor to, or a rect to follow the cursor.
 * @param panel Panel to position, already visible.
 * @returns Coordinates written and the side actually used.
 */
export function anchor(
  trigger: BdAnchorTarget,
  panel: HTMLElement,
  options: BdAnchorOptions = {},
): BdAnchorResult {
  const { align = "start", constrain = false, matchWidth = false, offset = 6, side = "bottom" } = options;

  // Réinitialisé avant mesure : sinon on mesure les contraintes du tour précédent.
  panel.style.maxHeight = "";
  panel.style.maxWidth = "";

  const t = trigger instanceof HTMLElement ? trigger.getBoundingClientRect() : trigger;
  if (matchWidth) panel.style.minWidth = `${t.width}px`;

  /*
   * offsetWidth/Height, pas getBoundingClientRect : le panneau est mesuré
   * pendant son animation d'entrée (scale), et le rect renverrait la boîte
   * transformée — panneau trop étroit, donc mal placé.
   */
  const p = { height: panel.offsetHeight, width: panel.offsetWidth };

  const space = {
    bottom: window.innerHeight - t.bottom,
    left: t.left,
    right: window.innerWidth - t.right,
    top: t.top,
  };

  const vertical = side === "top" || side === "bottom";
  const opposite = OPPOSITE[side];
  const needed = (vertical ? p.height : p.width) + offset + VIEWPORT_MARGIN;
  const placement = space[side] >= needed || space[side] >= space[opposite] ? side : opposite;

  const available = Math.max(space[placement] - offset - VIEWPORT_MARGIN, MIN_SIZE);
  const size = Math.min(vertical ? p.height : p.width, available);

  // Axe principal : collé au bord du trigger, décalé de `offset`.
  const main =
    placement === "top" || placement === "left"
      ? (vertical ? t.top : t.left) - offset - size
      : (vertical ? t.bottom : t.right) + offset;

  // Axe croisé : aligné sur le trigger, puis ramené dans le viewport.
  const crossStart = vertical ? t.left : t.top;
  const crossEnd = vertical ? t.right : t.bottom;
  const crossSize = vertical ? p.width : p.height;
  const crossLimit = vertical ? window.innerWidth : window.innerHeight;
  const aligned =
    align === "end"
      ? crossEnd - crossSize
      : align === "center"
        ? crossStart + (crossEnd - crossStart - crossSize) / 2
        : crossStart;
  const cross = Math.min(
    Math.max(VIEWPORT_MARGIN, aligned),
    Math.max(VIEWPORT_MARGIN, crossLimit - crossSize - VIEWPORT_MARGIN),
  );

  const top = vertical ? main : cross;
  const left = vertical ? cross : main;

  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
  if (constrain) panel.style[vertical ? "maxHeight" : "maxWidth"] = `${available}px`;
  panel.dataset.placement = placement;

  return { left, placement, top };
}

/**
 * Runs `callback` at most once per frame. The events that trigger a placement
 * (scroll, resize, mousemove) fire far faster than the browser paints, and a
 * placement reads layout before writing it — one synchronous reflow per event
 * without this.
 */
export function rafThrottle(callback: () => void): () => void {
  let scheduled = false;

  return (): void => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      callback();
    });
  };
}

/**
 * Replays a placement on scroll and resize. Start it when the panel opens,
 * stop it when it closes and on unmount.
 */
export function useViewportTracker(callback: () => void): { start: () => void; stop: () => void } {
  const onEvent = rafThrottle(callback);

  return {
    // `true` en capture : suit aussi le scroll d'un conteneur interne.
    start: (): void => {
      window.addEventListener("scroll", onEvent, true);
      window.addEventListener("resize", onEvent);
    },
    stop: (): void => {
      window.removeEventListener("scroll", onEvent, true);
      window.removeEventListener("resize", onEvent);
    },
  };
}
