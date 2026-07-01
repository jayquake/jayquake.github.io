/** Raiden HUD motion tokens — opacity/transform only; springs for layout. */

/** Softer ease-out — less abrupt stop on route/panel transitions. */
export const HUD_EASE = [0.16, 1, 0.3, 1];

export const HUD_DURATION = {
  fast: 0.18,
  normal: 0.28,
  route: 0.3,
  slow: 0.36,
};

export const HUD_SPRING = {
  /** Grid columns, pane resize */
  layout: { type: "spring", stiffness: 380, damping: 32, mass: 0.8 },
  /** Softer layout for large shell regions */
  layoutSoft: { type: "spring", stiffness: 320, damping: 28, mass: 0.9 },
  /** Tab pill, row bar, sidebar active — snappy micro layout */
  shared: { type: "spring", stiffness: 420, damping: 34, mass: 0.75 },
};

export const hudFade = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -3 },
};

export const hudSlideX = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 6 },
};

export const hudScaleIn = {
  initial: { opacity: 0, scale: 0.99 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.995 },
};

/** Default tween for panels and tables. */
export function hudTransition(duration = HUD_DURATION.normal, delay = 0) {
  return { duration, delay, ease: HUD_EASE };
}

/** Major route family changes (home ↔ library ↔ examples). */
export function hudRouteTransition(delay = 0) {
  return hudTransition(HUD_DURATION.route, delay);
}

/** Detail pane / library interior swaps. */
export function hudPanelTransition(delay = 0) {
  return hudTransition(HUD_DURATION.normal, delay);
}

/** Rule detail slide — opacity resolves faster than horizontal move. */
export function hudDetailTransition(delay = 0) {
  return {
    delay,
    ease: HUD_EASE,
    opacity: { duration: HUD_DURATION.fast, ease: HUD_EASE },
    x: { duration: HUD_DURATION.normal, ease: HUD_EASE },
  };
}

/** Success / failure variant swap. */
export function hudVariantTransition(delay = 0) {
  return {
    delay,
    ease: HUD_EASE,
    opacity: { duration: HUD_DURATION.fast, ease: HUD_EASE },
    x: { duration: HUD_DURATION.normal, ease: HUD_EASE },
  };
}

/** layoutId and layout prop transitions. */
export function hudLayoutTransition(kind = "layout") {
  const spring =
    kind === "shared"
      ? HUD_SPRING.shared
      : kind === "soft"
        ? HUD_SPRING.layoutSoft
        : HUD_SPRING.layout;
  return { layout: spring };
}

export function resolveHudTransition(preset = "panel", delay = 0) {
  switch (preset) {
    case "route":
      return hudRouteTransition(delay);
    case "detail":
      return hudDetailTransition(delay);
    case "variant":
      return hudVariantTransition(delay);
    case "fast":
      return hudTransition(HUD_DURATION.fast, delay);
    default:
      return hudPanelTransition(delay);
  }
}

/** Success tab enters from the left. */
export const hudVariantSuccess = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 5 },
};

/** Failure tab enters from the right. */
export const hudVariantFailure = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -5 },
};

export function hudVariantMotion(variant) {
  return variant === "failure" ? hudVariantFailure : hudVariantSuccess;
}
