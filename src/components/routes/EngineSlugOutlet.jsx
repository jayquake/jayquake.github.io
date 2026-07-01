import { useParams } from "react-router-dom";
import EngineLibraryShell from "../pages/Engine/EngineLibraryShell";
import { HudPresence } from "../motion/HudMotion";
import { parseEngineSlug } from "../../utils/engineExampleUtils";
import ExampleVariantOutlet from "./ExampleVariantOutlet";

export default function EngineSlugOutlet() {
  const { ruleId: slug } = useParams();
  const { ruleId, variant } = parseEngineSlug(slug);

  if (variant) {
    return (
      <HudPresence presenceKey={`example-${ruleId}`} mode="wait" transitionPreset="route" style={{ flex: 1 }}>
        <ExampleVariantOutlet ruleId={ruleId} variant={variant} />
      </HudPresence>
    );
  }

  return <EngineLibraryShell />;
}
