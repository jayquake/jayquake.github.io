import { useParams } from "react-router-dom";
import EngineLibraryShell from "../pages/Engine/EngineLibraryShell";
import EngineExampleLoader from "./EngineExampleLoader";
import { parseEngineSlug } from "../../utils/engineExampleUtils";

export default function EngineSlugOutlet() {
  const { ruleId: slug } = useParams();
  const { ruleId, variant } = parseEngineSlug(slug);

  if (variant) {
    return <EngineExampleLoader ruleId={ruleId} variant={variant} />;
  }

  return <EngineLibraryShell />;
}
