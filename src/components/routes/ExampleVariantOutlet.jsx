import PropTypes from "prop-types";
import { AnimatePresence } from "motion/react";
import { useAppReady } from "../../context/AppReadyContext";
import { hudVariantMotion, hudVariantTransition } from "../../theme/motionPresets";
import { m } from "../motion/HudMotion";
import EngineExampleLoader from "./EngineExampleLoader";

const panelStyle = { height: "100%", minHeight: 0, display: "flex", flexDirection: "column", flex: 1 };

export default function ExampleVariantOutlet({ ruleId, variant }) {
  const appReady = useAppReady();
  const v = hudVariantMotion(variant);

  if (!appReady) {
    return (
      <div style={panelStyle}>
        <EngineExampleLoader ruleId={ruleId} variant={variant} />
      </div>
    );
  }

  return (
    <AnimatePresence mode="sync" initial={false}>
      <m.div
        key={variant}
        style={panelStyle}
        initial={false}
        animate={v.animate}
        exit={v.exit}
        transition={hudVariantTransition()}
      >
        <EngineExampleLoader ruleId={ruleId} variant={variant} />
      </m.div>
    </AnimatePresence>
  );
}

ExampleVariantOutlet.propTypes = {
  ruleId: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "failure"]).isRequired,
};
