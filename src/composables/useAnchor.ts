export type BdSide = "bottom" | "left" | "right" | "top";
export type BdAlign = "center" | "end" | "start";

/** Un élément, ou un rect libre — un point suivant le curseur, par exemple. */
export type BdAnchorTarget = DOMRectReadOnly | HTMLElement;

export interface BdAnchorResult {
  left: number;
  placement: BdSide;
  top: number;
}

export interface BdAnchorOptions {
  /** Alignement sur l'axe croisé du côté retenu. */
  align?: BdAlign;
  /** Borne la taille du panneau à l'espace disponible (scroll interne). */
  constrain?: boolean;
  /** Le panneau fait au moins la largeur du trigger. */
  matchWidth?: boolean;
  /** Écart entre le trigger et le panneau, en px. */
  offset?: number;
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
 * Positionne un panneau en top layer (donc en position fixed) contre son
 * trigger : bascule sur le côté opposé s'il manque la place, recale dans le
 * viewport sur l'axe croisé, et pose `data-placement` avec le côté retenu.
 * Partagé par BdDropdown et BdTooltip.
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
 * Une exécution par frame au maximum. Les events qui déclenchent un placement
 * (scroll, resize, mousemove) arrivent bien plus vite que le rendu, et chaque
 * placement lit le layout avant de l'écrire — donc un reflow synchrone par event.
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

/** Rejoue un placement au scroll et au resize. */
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
