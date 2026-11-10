import { useParams } from "react-router-dom";
import EngineLibraryShell from "../pages/Engine/EngineLibraryShell";
import { HudPresence } from "../motion/HudMotion";
import { parseSlug } from "../../lib/libraryLocation";
import ExampleVariantOutlet from "./ExampleVariantOutlet";

export default function EngineSlugOutlet() {
  const { ruleId: slug } = useParams();
  const { id: ruleId, variant } = parseSlug(slug);

  if (variant) {
    return (
      <HudPresence presenceKey={`example-${ruleId}`} transitionPreset="route" style={{ flex: 1 }}>
        <ExampleVariantOutlet ruleId={ruleId} variant={variant} />
      </HudPresence>
    );
  }

  return <EngineLibraryShell />;
}
