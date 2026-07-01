import PropTypes from "prop-types";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domMax,
  m,
  useReducedMotion,
} from "motion/react";
import { useAppReady } from "../../context/AppReadyContext";
import {
  HUD_DURATION,
  HUD_EASE,
  hudFade,
  hudLayoutTransition,
  hudScaleIn,
  hudSlideX,
  hudTransition,
  resolveHudTransition,
} from "../../theme/motionPresets";

const VARIANTS = {
  fade: hudFade,
  slideX: hudSlideX,
  scale: hudScaleIn,
};

/** Lazy-load Motion DOM features once for the app shell. */
export function MotionProvider({ children }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: HUD_DURATION.normal, ease: HUD_EASE }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

MotionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Shared layoutId indicator (tab pill, row bar, sidebar active).
 * Uses a spring so the element glides instead of snapping.
 */
export function HudLayoutIndicator({
  layoutId,
  style,
  className,
  shared = true,
  children,
}) {
  return (
    <m.div
      layoutId={layoutId}
      className={className}
      style={style}
      transition={hudLayoutTransition(shared ? "shared" : "layout")}
    >
      {children}
    </m.div>
  );
}

HudLayoutIndicator.propTypes = {
  layoutId: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  shared: PropTypes.bool,
  children: PropTypes.node,
};

/**
 * Lightweight enter animation for HUD panels and tables.
 * Skips animation until app-ready or when prefers-reduced-motion is set.
 */
export function HudMotion({
  children,
  variant = "fade",
  delay = 0,
  layoutKey,
  className,
  style,
  transitionPreset = "panel",
}) {
  const appReady = useAppReady();
  const reduceMotion = useReducedMotion();
  const v = VARIANTS[variant] || hudFade;

  if (reduceMotion || !appReady) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      key={layoutKey}
      className={className}
      style={style}
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={resolveHudTransition(transitionPreset, delay)}
    >
      {children}
    </m.div>
  );
}

HudMotion.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["fade", "slideX", "scale"]),
  delay: PropTypes.number,
  layoutKey: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  transitionPreset: PropTypes.oneOf(["route", "panel", "detail", "variant", "fast"]),
};

const panelStyle = { height: "100%", minHeight: 0, display: "flex", flexDirection: "column" };

/** Crossfade/swap when `presenceKey` changes (e.g. selected rule). */
export function HudPresence({
  children,
  presenceKey,
  variant = "fade",
  mode = "wait",
  style,
  transitionPreset = "panel",
}) {
  const appReady = useAppReady();
  const reduceMotion = useReducedMotion();
  const v = VARIANTS[variant] || hudFade;
  const mergedStyle = { ...panelStyle, ...style };

  if (reduceMotion || !appReady) {
    return <div style={mergedStyle}>{children}</div>;
  }

  return (
    <AnimatePresence mode={mode}>
      <m.div
        key={presenceKey}
        style={mergedStyle}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={resolveHudTransition(transitionPreset)}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}

HudPresence.propTypes = {
  children: PropTypes.node,
  presenceKey: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["fade", "slideX", "scale"]),
  mode: PropTypes.oneOf(["sync", "wait", "popLayout"]),
  style: PropTypes.object,
  transitionPreset: PropTypes.oneOf(["route", "panel", "detail", "variant", "fast"]),
};

/** Subtle pulse for status indicators (operational dot). */
export function HudPulse({ children, className, style }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      className={className}
      style={style}
      animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.12, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </m.div>
  );
}

HudPulse.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

export { m, hudLayoutTransition, hudTransition, resolveHudTransition };
